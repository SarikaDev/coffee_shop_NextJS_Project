export async function POST(req: Request) {
  try {
    const { user_email, user_password, user_full_name } = await req.json();

    // Validate input
    if (!user_email || !user_password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const postgrestResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/rpc/register_user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Profile": "app",
          apikey: process.env.SUPABASE_ANON_KEY!,
        },
        body: JSON.stringify({
          user_email,
          user_password,
          user_full_name,
          user_role: "app_user",
        }),
      }
    );

    const postgrestData = await postgrestResponse.json();

    // Handle PostgREST errors
    if (!postgrestResponse.ok) {
      return Response.json(
        {
          data: { user: null, session: null },
          error: {
            message:
              postgrestData.message ||
              postgrestData.error ||
              "Registration failed",
          },
        },
        { status: postgrestResponse.status }
      );
    }

    const result = Array.isArray(postgrestData)
      ? postgrestData[0]
      : postgrestData;

    // Check if login was successful
    if (!result || !result.user_id) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Success case
    return Response.json(
      {
        token: result.token,
        user_id: result.user_id,
        expires_at: result.expires_at,
      },
      { status: 200 }
    );
  } catch (err) {
    const error = err as Error;
    console.error("Login error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
