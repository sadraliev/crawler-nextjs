import { ScrapedData } from "@/shared/interfaces/api.interface";
import React from "react";
import { DetailItem } from "./DetailItem";
import { ListTitle } from "./DetailTItle";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { Loader } from "@/shared/components/Loader/Loader";
import { NotFound } from "@/shared/components/NotFound";

interface ListProps {
  list: ScrapedData[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const List: React.FC<ListProps> = ({ list, isLoading, isError }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <ErrorMessage />;
  }
  if (list && list[0].details.length === 0) {
    return <NotFound />;
  }
  return list?.map(okved => (
    <div
      className="my-3 py-3 rounded bg-black bg-opacity-20"
      key={okved.sectionName}
    >
      <ListTitle type={okved.sectionType} name={okved.sectionName} />
      <ul className="mx-6">
        {okved.details.map(detail => (
          <DetailItem key={detail.code} detail={detail} />
        ))}
      </ul>
    </div>
  ));
};
