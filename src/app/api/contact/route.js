import _db from "../../../lib/utils/db";
import ContactModel from "../../../../models/Contact.model";

// Establish MongoDB connection once at startup
_db();

export async function GET() {
  try {
    const contacts = await ContactModel.find().sort({ date: -1 }).lean();
    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch contacts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newContact = new ContactModel({
      name,
      email,
      phone,
      message,
      date: new Date(),
      status: "New",
    });

    await newContact.save();

    return new Response(
      JSON.stringify({
        message: "Contact request created successfully",
        data: newContact,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return new Response(JSON.stringify({ error: "Failed to create contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, status } = data;

    if (!_id || !status) {
      return new Response(
        JSON.stringify({ error: "_id and status are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!["New", "Read", "Archived"].includes(status)) {
      return new Response(JSON.stringify({ error: "Invalid status" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
      _id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return new Response(JSON.stringify({ error: "Contact not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Contact status updated successfully",
        data: updatedContact,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return new Response(JSON.stringify({ error: "Failed to update contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return new Response(JSON.stringify({ error: "_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedContact = await ContactModel.findByIdAndDelete(_id);

    if (!deletedContact) {
      return new Response(JSON.stringify({ error: "Contact not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Contact deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting contact:", error);
    return new Response(JSON.stringify({ error: "Failed to delete contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
