import { Accordion } from "@/shared/components/Accordion/Accordion";
import { Detail } from "@/shared/interfaces/api.interface";
import { FC } from "react";
import { ListItem } from "./ListItem";
import { STORAGE_KEY } from "@/shared/consts/main";
import {
  doesCodeExist,
  getCode,
  getTreeFromLocalStorage,
  hasChildren,
} from "@/shared/utils/common";

interface IDetailProps {
  detail: Detail;
}

export const DetailItem: FC<IDetailProps> = ({ detail }) => {
  const code = getCode(detail.fullText);

  const isChecked = doesCodeExist(code);
  const hasChild = hasChildren(code);
  if (!detail.children.length) {
    console.log("code", code);
    return (
      <div className="ps-6">
        <ListItem
          text={detail.fullText}
          id={detail.fullText}
          defaultValue={isChecked}
        />
      </div>
    );
  }
  return (
    <Accordion
      title={() => (
        <ListItem
          text={detail.fullText}
          id={detail.fullText}
          defaultValue={isChecked}
        />
      )}
      defaultValue={hasChild}
    >
      {detail.children && detail.children.length > 0 && (
        <>
          {detail.children.map(child => (
            <DetailItem key={child.code} detail={child} />
          ))}
        </>
      )}
    </Accordion>
  );
};
