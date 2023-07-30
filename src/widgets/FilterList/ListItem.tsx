import React, { useId, useState } from "react";

import {
  getTreeFromLocalStorage,
  removeItemFromTree,
  saveTreeToLocalStorage,
  updateTreeWithItem,
} from "@/shared/utils/common";

interface ListItemProps {
  text: string;
  id: string;
  defaultValue?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  text,
  id,
  defaultValue = false,
}) => {
  const checkboxId = useId();
  const [checked, setChecked] = useState(defaultValue);

  const handleClick = () => {
    const currentTree = getTreeFromLocalStorage();
    const updatedTree = !checked
      ? updateTreeWithItem(currentTree, id)
      : removeItemFromTree(currentTree, id);

    saveTreeToLocalStorage(updatedTree);
    setChecked(!checked);
  };
  return (
    <div className="flex items-center">
      <input
        id={checkboxId}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={handleClick}
      />
      <label htmlFor={checkboxId} className="flex items-center cursor-pointer">
        <div
          className={`w-5 h-5 border-2 ${
            checked ? "bg-amber-500" : "bg-white"
          } rounded-md mr-2`}
        ></div>
        {text}
      </label>
    </div>
  );
};
