import { NextResponse } from "next/server";
import { data } from "src/mock/data";

export async function GET() {
  return NextResponse.json(data);
}
