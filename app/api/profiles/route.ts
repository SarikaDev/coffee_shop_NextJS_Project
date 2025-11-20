import { customFetch } from "@/app/helper/revers_proxy";
import { createClient } from "@supabase/supabase-js";
// Handles: GET /api/profiles (list) and POST /api/profiles (create)
export async function GET(req: Response) {
  try {
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

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      //   anon
      process.env.SUPABASE_ANON_KEY!,

      {
        global: {
          fetch: customFetch,
          // Only do this if you have a custom auth flow
          headers: {
            Authorization: `Bearer ${token}`, // USE THE USER'S TOKEN HERE!
          },
        },
        db: {
          schema: "app",
        },
      }
    );

    // Get query parameters from URL
    const url = new URL(req.url);
    const select = url.searchParams.get("select") || "*";
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset");

    // Build query with Supabase client
    let query = supabase
      .from("profiles")
      .select(select, { count: "exact", head: false });

    // Apply limit if provided
    if (limit) {
      query = query.limit(Number(limit));
    }

    // Apply offset if provided
    if (offset) {
      query = query.range(
        Number(offset),
        Number(offset) + (Number(limit) || 10) - 1
      );
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (err) {
    const error = err as Error;
    return Response.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}
