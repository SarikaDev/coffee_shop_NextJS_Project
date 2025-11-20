// import { customFetch } from "@/app/helper/revers_proxy";
// import { createClient } from "@supabase/supabase-js";

// export async function GET(req: Request) {
//   try {
//     // Initialize Supabase client
//     const supabase = createClient(
//       "http://localhost:3000",
//       // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoicG9zdGdyZXN0IiwiYXVkIjoicG9zdGdyZXN0Iiwic3ViIjoic3RhcmJ1Z3Nfc2VydmljZV9yb2xlIiwiaWF0IjoxNzYzMzM0NDI1LCJleHAiOjE3OTQ4NzA0MjV9.cqMWehZOPg2DeqMSsNK6C2frlmQMMw4K1OsOciTtYUw",
//       "eyJhbGciOiJIUzI1fNiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsInN1YiI6ImMzNmMwYTg1LTUzYTctNDRiNC1hZWEzLTNhMTJkM2U3ZjQ1NyIsImVtYWlsIjoic2FpcmFtc2FyaWthOTlAZ21haWwuY29tIiwiYXVkIjoicG9zdGdyZXN0IiwiZXhwIjoxNzYzNDIwNjIwLCJpYXQiOjE3NjMzMzQyMjAsInVzZXJfbWV0YWRhdGEiOnsiYXBwX3JvbGUiOiJhcHBfbWFuYWdlciJ9fQ.2bX0Kp02lPt4iO72okY6WvrugeGNYaPiPSV0LpdXu4k",
//       {
//         global: { fetch: customFetch },
//         db: {
//           schema: "app",
//         },
//       }
//     );

//     // Get query parameters from URL
//     const url = new URL(req.url);
//     const select = url.searchParams.get("select") || "*";
//     const limit = url.searchParams.get("limit");
//     const offset = url.searchParams.get("offset");

//     // Build query with Supabase client
//     let query = supabase
//       .from("users")
//       .select(select, { count: "exact", head: false });

//     // Apply limit if provided
//     if (limit) {
//       query = query.limit(Number(limit));
//     }

//     // Apply offset if provided
//     if (offset) {
//       query = query.range(
//         Number(offset),
//         Number(offset) + (Number(limit) || 10) - 1
//       );
//     }

//     // Execute the query
//     const { data, error, count } = await query;

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(
//       {
//         data,
//         totalCount: count,
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     const error = err as Error;
//     return Response.json(
//       { error: error.message || "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
// }
// NO NEED AT THE MOMENT
