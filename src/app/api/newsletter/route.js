import _db from "../../../lib/utils/db";
import NewsletterModel from "../../../../models/Newsletter.model";

_db();

export async function GET() {
    try {
        const subscribers = await NewsletterModel.find().sort({ subscribedAt: -1 }).lean();
        return new Response(JSON.stringify(subscribers), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching newsletter subscribers:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch newsletter subscribers" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { email } = data;

        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: "Please enter a valid email address" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if email already exists
        const existingSubscriber = await NewsletterModel.findOne({ email });
        if (existingSubscriber) {
            return new Response(
                JSON.stringify({ error: "This email is already subscribed" }),
                { status: 409, headers: { "Content-Type": "application/json" } }
            );
        }

        const newSubscriber = new NewsletterModel({
            email,
            subscribedAt: new Date(),
        });

        await newSubscriber.save();

        return new Response(
            JSON.stringify({
                message: "Subscribed successfully",
                data: newSubscriber,
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return new Response(
            JSON.stringify({ error: "Failed to subscribe to newsletter" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function DELETE(request) {
    try {
        const { _id } = await request.json();

        if (!_id) {
            return new Response(
                JSON.stringify({ error: "_id is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const deletedSubscriber = await NewsletterModel.findByIdAndDelete(_id);

        if (!deletedSubscriber) {
            return new Response(
                JSON.stringify({ error: "Subscriber not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: "Subscriber removed successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error deleting newsletter subscriber:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete subscriber" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
