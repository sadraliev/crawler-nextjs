import React from "react";

interface ListTitleProps {
  type: string;
  name: string;
}

export const ListTitle: React.FC<ListTitleProps> = ({ type, name }) => {
  if (!type && !type) {
    return null;
  }
  return (
    <div className="flex text-white font-normal pb-2 mx-6 mb-4 border-b border-white">
      <b className="w-2/12 text-gray-700">{type}</b>
      <b className="w-11/12">{name}</b>
    </div>
  );
};
