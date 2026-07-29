import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      token: "provisioned-token-ok",
    },
    { status: 200 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      status: "ok",
      token: "provisioned-token-ok",
    },
    { status: 200 }
  );
}
