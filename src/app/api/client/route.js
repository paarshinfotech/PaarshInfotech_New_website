import _db from "../../../lib/utils/db";
import ClientModel from "../../../../models/Client.model";

// Establish MongoDB connection once at startup
_db();

export async function GET() {
  try {
    const clients = await ClientModel.find().sort({ order: 1, name: 1 }).lean();
    return new Response(JSON.stringify(clients), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch clients" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, industry, since, logo, published } = data;

    if (!name || !industry || !since) {
      return new Response(
        JSON.stringify({ error: "Name, industry, and since are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate since is a 4-digit year
    if (!/^\d{4}$/.test(since)) {
      return new Response(
        JSON.stringify({ error: "Since must be a valid year" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Set order to the highest current order + 1
    const maxOrder = await ClientModel.find().sort({ order: -1 }).limit(1);
    const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;

    const newClient = new ClientModel({
      name,
      industry,
      since,
      logo: logo || "https://placehold.co/40x40.png",
      published: published ?? true,
      order: newOrder,
    });

    await newClient.save();

    return new Response(
      JSON.stringify({
        message: "Client created successfully",
        data: newClient,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return new Response(JSON.stringify({ error: "Failed to create client" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, name, industry, since, logo, published } = data;

    if (!_id || !name || !industry || !since) {
      return new Response(
        JSON.stringify({
          error: "_id, name, industry, and since are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate since is a 4-digit year
    if (!/^\d{4}$/.test(since)) {
      return new Response(
        JSON.stringify({ error: "Since must be a valid year" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedClient = await ClientModel.findByIdAndUpdate(
      _id,
      { name, industry, since, logo, published },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Client updated successfully",
        data: updatedClient,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating client:", error);
    return new Response(JSON.stringify({ error: "Failed to update client" }), {
      status: 500, headers: { "Content-Type": "application/json" },
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

    const deletedClient = await ClientModel.findByIdAndDelete(_id);

    if (!deletedClient) {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Client deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting client:", error);
    return new Response(JSON.stringify({ error: "Failed to delete client" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(request) {
  try {
    const { clients } = await request.json();

    if (!Array.isArray(clients) || clients.length === 0) {
      return new Response(
        JSON.stringify({ error: "Clients array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update order for each client
    const updatePromises = clients.map(({ _id, order }) =>
      ClientModel.findByIdAndUpdate(
        _id,
        { order },
        { new: true, runValidators: true }
      )
    );

    const updatedClients = await Promise.all(updatePromises);

    if (updatedClients.some((client) => !client)) {
      return new Response(JSON.stringify({ error: "One or more clients not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Clients reordered successfully",
        data: updatedClients,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error reordering clients:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reorder clients" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}