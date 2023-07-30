import React from "react";

interface ListTitleProps {
  type: string;
  name: string;
}

export const ListTitle: React.FC<ListTitleProps> = ({ type, name }) => {
  return (
    <div className="flex text-white font-normal pb-2 mx-6 mb-4 border-b border-white">
      <b className="w-1/5">{type}</b>
      <b className="w-4/5">{name}</b>
    </div>
  );
};
