import { customFetch } from "@/app/helper/revers_proxy";
import { createClient } from "@supabase/supabase-js";
// Specific id,Handles: GET , PATCH, DELETE for specific profiles

// PATCH

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // this id was part of [id]
) {
  try {
    const { id } = await params;
    // GET THE USER'S JWT FROM THE REQUEST
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.replace("Bearer ", "");
    // Decode JWT to see actual claims
    if (token) {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      console.log("🚀 JWT Claims:", {
        sub: payload.sub,
        role: payload.role,
        app_role: payload.app_role,
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        global: {
          fetch: customFetch,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        db: {
          schema: "app",
        },
      }
    );

    // Parse request body
    const updates = await req.json();

    if (!updates || typeof updates !== "object") {
      console.log("🚀 Received body:", await req.text());
      return Response.json(
        { error: "Updates object is required" },
        { status: 400 }
      );
    }

    // Execute the update
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", id)
      .select(); // Return updated record
    console.log("🚀 PATCH - Supabase result:", { data, error });
    if (error) {
      console.error("Update error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }
    if (!data.length) {
      return Response.json(
        { error: "RLS Restricted this action" },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        data,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    const error = err as Error;
    return Response.json(
      { error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
