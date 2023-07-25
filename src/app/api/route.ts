import { NextResponse } from "next/server";
import data from "../../../public/results.json";

export async function GET(req: Request) {
  return NextResponse.json(data);
}
