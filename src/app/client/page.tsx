"use client";
import { Providers } from "@/components/Providers";
import { configuration } from "@/config/configuration";
import { useFetchOKVEDs } from "@/hooks/fetch.okved";
import { Detail, scrapedData } from "@/interfaces/api.interface";
import { Suspense } from "react";

function DetailComponent({ detail }: { detail: Detail }) {
  return (
    <li className="ps-4">
      <a href={detail.link}>{detail.fullText}</a>
      {detail.children && detail.children.length > 0 && (
        <ul>
          {detail.children.map(child => (
            <DetailComponent key={child.code} detail={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function RenderScrapedData({ data }: { data: scrapedData }) {
  return (
    <div>
      <h2>{data.sectionName}</h2>
      <a href={data.sectionURL}>{data.sectionType}</a>
      <ul>
        {data.details.map(detail => (
          <DetailComponent key={detail.code} detail={detail} />
        ))}
      </ul>
    </div>
  );
}
export default function Client() {
  const { scrapedData, isLoading, isError } = useFetchOKVEDs();
  //   const baseUrl = configuration.getUrl();
  //   const response = await getData(baseUrl);

  //   const { data, error } = useSWR("/api/profile-data", fetcher);

  //   if (error) return <div>Failed to load</div>;
  //   if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-center 3xl">Client Side Page</h1>
      {scrapedData?.map(okved => {
        return (
          <div className="my-3" key={okved.sectionName}>
            <div className="flex justify-between">
              <b>{okved.sectionType}</b>
              <b>{okved.sectionName}</b>
            </div>
            <ul>
              {okved.details.map(detail => (
                <DetailComponent key={detail.code} detail={detail} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
