import { Providers } from "@/components/Providers";
import { configuration } from "@/config/configuration";
import { scrapedData, Detail } from "@/interfaces/api.interface";
import { GetStaticProps } from "next";

interface MyComponentProps {
  data: any; // Вы можете типизировать это на ваше усмотрение
}
import { useEffect } from "react";

async function getData(url: string): Promise<scrapedData[]> {
  const res = await fetch(url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

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
export default async function Home() {
  const baseUrl = configuration.getUrl();
  const response = await getData(baseUrl);

  return (
    <Providers>
      <div className="container mx-auto">
        <h1 className="text-center 3xl">Server Side Page</h1>
        {response.map(okved => {
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
    </Providers>
  );
}
