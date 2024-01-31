import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const result = await sql`SELECT cnt FROM counter;`;

  return NextResponse.json({ cnt: result.rows[0].cnt });
}

export async function POST(request: Request) {
  try {
    await sql`UPDATE counter SET cnt = cnt + 1;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json("success");
}
