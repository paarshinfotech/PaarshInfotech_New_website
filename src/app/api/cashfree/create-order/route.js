import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { amount, customerName, customerEmail, customerPhone } = await request.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'production';

    if (!appId || !secretKey) {
      return NextResponse.json(
        { success: false, error: 'Cashfree credentials (CASHFREE_APP_ID / CASHFREE_SECRET_KEY) are not configured' },
        { status: 500 }
      );
    }

    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        { success: false, error: 'A valid amount is required' },
        { status: 400 }
      );
    }

    const baseUrl = mode === 'sandbox'
      ? 'https://sandbox.cashfree.com/pg'
      : 'https://api.cashfree.com/pg';

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const sanitizedPhone = (customerPhone || '9999999999').replace(/[^0-9]/g, '').slice(-10) || '9999999999';
    const sanitizedEmail = (customerEmail && customerEmail.includes('@') ? customerEmail : 'student@paarshinfotech.com').trim();
    const sanitizedName = (customerName || 'Student').trim().slice(0, 100);

    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secretKey,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: Math.round(amountNum * 100) / 100,
        order_currency: 'INR',
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_name: sanitizedName,
          customer_email: sanitizedEmail,
          customer_phone: sanitizedPhone,
        },
        order_meta: {
          return_url: `${request.nextUrl.origin}/register?cf_order_id={order_id}`,
        },
        order_note: 'Internship Registration Fee',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree API error:', data);
      throw new Error(data.message || data.error?.description || 'Failed to create Cashfree order');
    }

    return NextResponse.json({
      success: true,
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
      mode,
    });
  } catch (error) {
    console.error('Cashfree order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Order creation failed' },
      { status: 500 }
    );
  }
}
