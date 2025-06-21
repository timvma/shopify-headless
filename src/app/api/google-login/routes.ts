// app/api/google-login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  const verify = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );
  if (!verify.ok)
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 400 }
    );

  const googleUser = await verify.json();
  const email = googleUser.email;
  const name = googleUser.name;

  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN!,
  };

  // 1. Search for existing customer
  const search = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/admin/api/2023-10/customers/search.json?query=email:${email}`,
    { headers }
  );
  const { customers } = await search.json();
  let customer = customers?.[0];

  // 2. Create if not found
  if (!customer) {
    const createRes = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/admin/api/2023-10/customers.json`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          customer: {
            email,
            first_name: name,
            tags: "google_one_tap",
            metafields: [
              {
                namespace: "oauth",
                key: "google_login",
                type: "boolean",
                value: "true",
              },
            ],
          },
        }),
      }
    );
    const createData = await createRes.json();
    customer = createData.customer;
  }

  return NextResponse.json({ success: true, customer });
}
