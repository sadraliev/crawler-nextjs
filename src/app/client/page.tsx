"use client";
import { Accordion } from "@/shared/components/Accordion/Accordion";

import { useAutoFocus } from "@/shared/hooks/useAutoFocus";
import { useFetchCodes } from "@/shared/hooks/useFetchOKVEDs";
import { Detail, ScrapedData } from "@/shared/interfaces/api.interface";
import FilterList from "@/widgets/FilterList";
import { useState } from "react";

function DetailComponent({ detail }: { detail: Detail }) {
  if (!detail.children.length) {
    return (
      <li className="flex justify-between items-center w-full  mr-1 text-white rounded-md ps-6 pe-3 py-2 font-medium ">
        {detail.fullText}
      </li>
    );
  }
  return (
    <li className="ps-6">
      <Accordion title={detail.fullText}>
        {detail.children && detail.children.length > 0 && (
          <ul>
            {detail.children.map(child => (
              <DetailComponent key={child.code} detail={child} />
            ))}
          </ul>
        )}
      </Accordion>
    </li>
  );
}

function RenderScrapedData({ data }: { data: ScrapedData }) {
  return (
    <ul>
      {data.details.map(detail => (
        <DetailComponent key={detail.code} detail={detail} />
      ))}
    </ul>
  );
}
export default function Client() {
  const [query, setQuery] = useState<string>("");
  const { scrapedData, isLoading, isError } = useFetchCodes(query);
  const searchRef = useAutoFocus();

  // if (isError) return <div>Failed to load</div>;
  // if (!scrapedData) return <div>Loading...</div>;

  return (
    <>
      <FilterList />
      {/* <TextField
        ref={searchRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        labelText="Поиск по ОКВЭД коду"
        leftIcon={<SearchIcon color="#e5e7eb" />}
      />
      {scrapedData && scrapedData[0].details.length === 0 ? <NotFound /> : null}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {scrapedData?.map(okved => {
            return (
              <div
                className="my-3 py-3 rounded bg-black bg-opacity-20"
                key={okved.sectionName}
              >
                {okved.sectionName ? (
                  <div className="flex text-white font-normal pb-2 mx-6 mb-4 border-b border-white">
                    <b className="mr-2">{okved.sectionType}</b>
                    <b>{okved.sectionName}</b>
                  </div>
                ) : null}
                <ul>
                  {okved.details.map(detail => (
                    <DetailComponent key={detail.code} detail={detail} />
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      )} */}
    </>
  );
}
