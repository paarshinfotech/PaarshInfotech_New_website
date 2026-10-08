import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { orderId } = await request.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'production';

    if (!appId || !secretKey) {
      return NextResponse.json(
        { success: false, error: 'Cashfree credentials not configured' },
        { status: 500 }
      );
    }

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const baseUrl = mode === 'sandbox'
      ? 'https://sandbox.cashfree.com/pg'
      : 'https://api.cashfree.com/pg';

    // 1. Fetch order status
    const orderRes = await fetch(`${baseUrl}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secretKey,
      },
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      console.error('Cashfree order fetch error:', orderData);
      throw new Error(orderData.message || 'Failed to fetch Cashfree order status');
    }

    // 2. Fetch payments for this order
    let successfulPayment = null;
    try {
      const paymentsRes = await fetch(`${baseUrl}/orders/${orderId}/payments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-version': '2023-08-01',
          'x-client-id': appId,
          'x-client-secret': secretKey,
        },
      });

      if (paymentsRes.ok) {
        const payments = await paymentsRes.json();
        if (Array.isArray(payments)) {
          successfulPayment = payments.find((p) => p.payment_status === 'SUCCESS');
        }
      }
    } catch (e) {
      console.warn('Could not fetch payments list:', e);
    }

    if (orderData.order_status === 'PAID' || successfulPayment) {
      const paymentId = successfulPayment?.cf_payment_id
        ? String(successfulPayment.cf_payment_id)
        : orderId;

      return NextResponse.json({
        success: true,
        orderStatus: 'PAID',
        paymentId,
        orderId,
        amount: orderData.order_amount,
        currency: orderData.order_currency || 'INR',
        paymentUrl: `https://merchant.cashfree.com/merchants/orders/${orderId}`,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: `Payment is ${orderData.order_status || 'not completed'}`,
        orderStatus: orderData.order_status,
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Cashfree verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
