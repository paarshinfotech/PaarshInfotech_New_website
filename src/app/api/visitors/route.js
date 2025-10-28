import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
const Visitor = require('../../../../models/Visitor.model');

// Helper function to detect device type from user agent
function detectDevice(userAgent) {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

// Helper function to detect browser
function detectBrowser(userAgent) {
  const ua = userAgent.toLowerCase();
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('edg')) return 'Edge';
  if (ua.includes('chrome')) return 'Chrome';
  if (ua.includes('safari')) return 'Safari';
  if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
  return 'unknown';
}

// Helper function to detect OS
function detectOS(userAgent) {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac os')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  return 'unknown';
}

// Helper function to detect traffic source
function detectSource(referrer) {
  if (!referrer || referrer === 'direct') return 'direct';
  const ref = referrer.toLowerCase();
  // Social media
  if (ref.includes('facebook') || ref.includes('twitter') || ref.includes('instagram') || 
      ref.includes('linkedin') || ref.includes('pinterest') || ref.includes('youtube') ||
      ref.includes('tiktok') || ref.includes('reddit')) {
    return 'social';
  }
  // Search engines (organic)
  if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo') || 
      ref.includes('duckduckgo') || ref.includes('baidu')) {
    return 'organic';
  }
  // Referral
  return 'referral';
}

export async function POST(request) {
  try {
    await _db();
    const body = await request.json();
    const headersList = request.headers;
    // Get IP address
    const forwarded = headersList.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';
    // Get user agent
    const userAgent = headersList.get('user-agent') || 'unknown';
    const {
      sessionId,
      page,
      referrer = 'direct',
      timeSpent = 0,
      country = 'unknown',
      city = 'unknown',
    } = body;
    if (!sessionId || !page) {
      return NextResponse.json(
        { success: false, error: 'sessionId and page are required' },
        { status: 400 }
      );
    }
    // Detect device, browser, OS, and source
    const deviceType = detectDevice(userAgent);
    const browser = detectBrowser(userAgent);
    const os = detectOS(userAgent);
    const source = detectSource(referrer);
    // Check if this is a unique visit for this session
    const existingVisit = await Visitor.findOne({ sessionId, page });
    const isUniqueVisit = !existingVisit;
    // Create visitor record
    const visitor = await Visitor.create({
      ipAddress,
      sessionId,
      userAgent,
      deviceType,
      browser,
      os,
      page,
      referrer,
      source,
      country,
      city,
      timeSpent,
      isUniqueVisit,
    });
    return NextResponse.json({
      success: true,
      data: visitor,
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await _db();
    const { searchParams } = new URL(request.url);
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;
    // Filters
    const deviceType = searchParams.get('deviceType');
    const source = searchParams.get('source');
    const browser = searchParams.get('browser');
    const os = searchParams.get('os');
    const country = searchParams.get('country');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const pageUrl = searchParams.get('page');
    // Special query types
    const statsOnly = searchParams.get('statsOnly') === 'true';
    const trafficBySource = searchParams.get('trafficBySource') === 'true';
    const visitsByCountry = searchParams.get('visitsByCountry') === 'true';
    // Build filter query
    const filter = {};
    if (deviceType) filter.deviceType = deviceType;
    if (source) filter.source = source;
    if (browser) filter.browser = browser;
    if (os) filter.os = os;
    if (country) filter.country = country;
    if (pageUrl) filter.page = pageUrl;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }
    // Return statistics only
    if (statsOnly) {
      const stats = await Visitor.getStatistics(startDate, endDate);
      return NextResponse.json({
        success: true,
        data: stats,
      });
    }
    // Return traffic by source
    if (trafficBySource) {
      const traffic = await Visitor.getTrafficBySource(startDate, endDate);
      return NextResponse.json({
        success: true,
        data: traffic,
      });
    }
    // Return visits by country
    if (visitsByCountry) {
      const visits = await Visitor.getVisitsByCountry(startDate, endDate);
      return NextResponse.json({
        success: true,
        data: visits,
      });
    }
    // Get total count
    const total = await Visitor.countDocuments(filter);
    // Get visitors with pagination
    const visitors = await Visitor.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return NextResponse.json({
      success: true,
      data: visitors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await _db();
    const { searchParams } = new URL(request.url);
    const daysOld = parseInt(searchParams.get('daysOld') || '90');
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    const result = await Visitor.deleteMany({
      timestamp: { $lt: cutoffDate }
    });
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} visitor records older than ${daysOld} days`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting old visitors:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
