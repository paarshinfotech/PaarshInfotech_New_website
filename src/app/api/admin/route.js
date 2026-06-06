import _db from "../../../lib/utils/db";
import AdminModel from "../../../../models/Admin.model";

// Establish MongoDB connection
_db();

// GET: Fetch admin profile
export async function GET() {
  try {
    const admin = await AdminModel.findOne().lean();

    if (!admin) {
      return new Response(JSON.stringify({ error: "No admin found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { password, ...adminWithoutPassword } = admin;
    return new Response(JSON.stringify(adminWithoutPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch admin profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PUT: Update admin profile or change password
export async function PUT(request) {
  try {
    const data = await request.json();
    const { action } = data;

    const admin = await AdminModel.findOne();
    if (!admin) {
      return new Response(JSON.stringify({ error: "No admin found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (action === "updateProfile") {
      const { name, email } = data;
      if (name !== undefined) admin.name = name;
      if (email !== undefined) admin.email = email;
      await admin.save();

      const { password, ...adminWithoutPassword } = admin.toObject();
      return new Response(
        JSON.stringify({ message: "Profile updated successfully", data: adminWithoutPassword }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (action === "changePassword") {
      const { currentPassword, newPassword } = data;

      if (currentPassword !== admin.password) {
        return new Response(
          JSON.stringify({ error: "Incorrect Password", description: "The current password you entered is wrong." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (!newPassword || newPassword.length < 6) {
        return new Response(
          JSON.stringify({ error: "Password Too Short", description: "New password must be at least 6 characters." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      admin.password = newPassword;
      await admin.save();

      return new Response(
        JSON.stringify({ message: "Password changed successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    return new Response(JSON.stringify({ error: "Failed to update admin profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST: Login - verify credentials using email + password
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const admin = await AdminModel.findOne();

    if (!admin) {
      return new Response(
        JSON.stringify({ success: false, message: "No admin account found" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (email === admin.email && password === admin.password) {
      return new Response(
        JSON.stringify({ success: true, message: "Login successful" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "Invalid email or password" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
