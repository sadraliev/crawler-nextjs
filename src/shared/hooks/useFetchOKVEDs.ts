"use client";
import useSWR from "swr";

import { ScrapedData } from "@/shared/interfaces/api.interface";
import { fetcher, pathBuilder } from "@/shared/utils/common";
import { useDebounce } from "./useDebounce";

type UseFetchCodesReturn = {
  scrapedData?: ScrapedData[];
  isLoading: boolean;
  isError: any;
};

export function useFetchCodes(query: string = ""): UseFetchCodesReturn {
  const debouncedQuery = useDebounce(query, 300);

  const fetchUrl = query
    ? pathBuilder
        .addSegment("api")
        .addQueryParam({ query: debouncedQuery })
        .build()
    : pathBuilder.addSegment("api").build();

  const { data, error, isValidating } = useSWR<ScrapedData[]>(
    fetchUrl,
    fetcher
  );

  return {
    scrapedData: data,
    isLoading: isValidating,
    isError: error,
  };
}
