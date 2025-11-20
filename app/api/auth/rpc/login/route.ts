export async function POST(req: Request) {
  try {
    const { p_email, p_password } = await req.json();

    // Validate input
    if (!p_email || !p_password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch("http://localhost:3000/rpc/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Profile": "app",
      },
      body: JSON.stringify({
        p_email,
        p_password,
        p_secret_key: "reallyreallyreallyreallyverysafe",
      }),
    });

    const data = await response.json();

    // Handle PostgREST errors
    if (!response.ok) {
      return Response.json(
        { error: data.message || data.error || "Login failed" },
        { status: response.status }
      );
    }

    const result = Array.isArray(data) ? data[0] : data;

    // Check if login was successful
    if (!result || !result.token) {
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
