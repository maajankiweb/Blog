import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      config: {
        enabled: true,
        version: "1.0.0",
      },
    },
    { status: 200 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      status: "ok",
      config: {
        enabled: true,
        version: "1.0.0",
      },
    },
    { status: 200 }
  );
}
