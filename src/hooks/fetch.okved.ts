"use client";
import { scrapedData } from "@/interfaces/api.interface";
import { MAIN_PATH, fetcher } from "@/utils/common";
import useSWR from "swr";

type UseFetchOKVEDsReturn = {
  scrapedData?: scrapedData[];
  isLoading: boolean;
  isError: any;
};

export function useFetchOKVEDs(): UseFetchOKVEDsReturn {
  const { data, error, isLoading } = useSWR<scrapedData[]>(MAIN_PATH, fetcher);

  return {
    scrapedData: data,
    isLoading,
    isError: error,
  };
}
