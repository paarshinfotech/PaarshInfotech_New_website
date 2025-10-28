const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  // IP address or unique identifier
  ipAddress: {
    type: String,
    required: true,
  },
  
  // Session identifier (generated on client)
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  
  // User agent information
  userAgent: {
    type: String,
    required: true,
  },
  
  // Device type (mobile, tablet, desktop)
  deviceType: {
    type: String,
    enum: ['mobile', 'tablet', 'desktop', 'unknown'],
    default: 'unknown',
  },
  
  // Browser information
  browser: {
    type: String,
    default: 'unknown',
  },
  
  // Operating system
  os: {
    type: String,
    default: 'unknown',
  },
  
  // Page visited
  page: {
    type: String,
    required: true,
  },
  
  // Referrer URL
  referrer: {
    type: String,
    default: 'direct',
  },
  
  // Traffic source (organic, social, referral, direct)
  source: {
    type: String,
    enum: ['organic', 'social', 'referral', 'direct', 'unknown'],
    default: 'direct',
  },
  
  // Geographic location (optional, can be enhanced with IP geolocation)
  country: {
    type: String,
    default: 'unknown',
  },
  
  city: {
    type: String,
    default: 'unknown',
  },
  
  // Time spent on page (in seconds)
  timeSpent: {
    type: Number,
    default: 0,
  },
  
  // Is this a unique visitor (first visit for this session)
  isUniqueVisit: {
    type: Boolean,
    default: true,
  },
  
  // Timestamp
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
}, {
  timestamps: true,
});

// Index for efficient querying
VisitorSchema.index({ timestamp: -1 });
VisitorSchema.index({ sessionId: 1, timestamp: -1 });
VisitorSchema.index({ page: 1, timestamp: -1 });

// Static method to get visitor statistics
VisitorSchema.statics.getStatistics = async function(startDate, endDate) {
  const match = {};
  if (startDate || endDate) {
    match.timestamp = {};
    if (startDate) match.timestamp.$gte = new Date(startDate);
    if (endDate) match.timestamp.$lte = new Date(endDate);
  }
  
  const stats = await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalVisits: { $sum: 1 },
        uniqueVisitors: { $addToSet: '$sessionId' },
        mobileVisits: {
          $sum: { $cond: [{ $eq: ['$deviceType', 'mobile'] }, 1, 0] }
        },
        desktopVisits: {
          $sum: { $cond: [{ $eq: ['$deviceType', 'desktop'] }, 1, 0] }
        },
        tabletVisits: {
          $sum: { $cond: [{ $eq: ['$deviceType', 'tablet'] }, 1, 0] }
        },
      }
    },
    {
      $project: {
        _id: 0,
        totalVisits: 1,
        uniqueVisitors: { $size: '$uniqueVisitors' },
        mobileVisits: 1,
        desktopVisits: 1,
        tabletVisits: 1,
      }
    }
  ]);
  
  return stats.length > 0 ? stats[0] : {
    totalVisits: 0,
    uniqueVisitors: 0,
    mobileVisits: 0,
    desktopVisits: 0,
    tabletVisits: 0,
  };
};

// Static method to get traffic by source
VisitorSchema.statics.getTrafficBySource = async function(startDate, endDate) {
  const match = {};
  if (startDate || endDate) {
    match.timestamp = {};
    if (startDate) match.timestamp.$gte = new Date(startDate);
    if (endDate) match.timestamp.$lte = new Date(endDate);
  }
  
  return await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$source',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        source: '$_id',
        visitors: '$count'
      }
    }
  ]);
};

// Static method to get visits by country
VisitorSchema.statics.getVisitsByCountry = async function(startDate, endDate) {
  const match = { country: { $ne: 'unknown' } };
  if (startDate || endDate) {
    match.timestamp = {};
    if (startDate) match.timestamp.$gte = new Date(startDate);
    if (endDate) match.timestamp.$lte = new Date(endDate);
  }
  
  return await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$country',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        country: '$_id',
        value: '$count'
      }
    },
    { $sort: { value: -1 } },
    { $limit: 10 }
  ]);
};

module.exports = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
