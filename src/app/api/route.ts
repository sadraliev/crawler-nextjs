import { NextResponse } from "next/server";

import { searchInScrapedData } from "@/shared/utils/common";
import scrapedData from "@public/results.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");

  if (query) {
    return NextResponse.json([
      { details: searchInScrapedData(scrapedData[0], query) },
    ]);
  }

  return NextResponse.json(scrapedData);
}
