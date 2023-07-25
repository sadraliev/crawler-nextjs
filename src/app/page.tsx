import { Providers } from "@/components/Providers";
import { scrapedData, Detail } from "@/interfaces/api.interface";

import okveds from "@public/results.json";

async function getData(url: string): Promise<scrapedData[]> {
  const res = await fetch(url);

  if (!res.ok) {
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

export default async function Home() {
  return (
    <Providers>
      <div className="container mx-auto">
        <h1 className="text-center 3xl">Server Side Page</h1>
        {okveds.map(okved => {
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
