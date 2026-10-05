import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { amount, currency = "INR", notes = {} } = await request.json();

    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_SLBxzQHGTzUTCO";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "NkV7Evm48TL3F3HfqI9GUMCW";

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "A valid amount is required" },
        { status: 400 }
      );
    }

    const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Razorpay accepts amount in paise (100 paise = 1 INR)
        currency,
        receipt: `receipt_${Date.now()}`,
        notes,
      }),
    });

    const orderData = await response.json();

    if (!response.ok) {
      throw new Error(orderData.error?.description || "Failed to create Razorpay order");
    }

    return NextResponse.json({
      success: true,
      order: orderData,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Order creation failed" },
      { status: 500 }
    );
  }
}
