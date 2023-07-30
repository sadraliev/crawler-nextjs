import React from "react";
import { SOMETHING_WENT_WRONG } from "../consts/main";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = SOMETHING_WENT_WRONG,
}) => {
  return (
    <div className="min-h-1/2screen flex items-center justify-center">
      <p className="text-4xl font-bold text-red-500 border-2 border-red-500 p-4 rounded-md shadow-lg">
        {message}
      </p>
    </div>
  );
};
