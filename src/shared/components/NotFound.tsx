import { FC } from "react";
import { NOT_FOUND } from "../consts/main";

interface NotFoundProps {
  text?: string;
}

export const NotFound: FC<NotFoundProps> = ({ text = NOT_FOUND }) => {
  return (
    <div className="min-h-1/2screen flex items-center justify-center">
      <p className="text-4xl font-bold text-white border-2 border-white p-4 rounded-md shadow-lg">
        {text}
      </p>
    </div>
  );
};
