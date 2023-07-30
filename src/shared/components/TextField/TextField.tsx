"use client";
import { InputHTMLAttributes, ReactNode, forwardRef, useId } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  labelText?: string;
  autofocus?: boolean;
}

export const TextField = forwardRef(
  (props: TextFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const { labelText, leftIcon, autoFocus = false, ...inputProps } = props;

    const id = useId();

    return (
      <div className="w-full max-w-xs mx-auto mt-10">
        <label htmlFor={id} className="block text-sm font-bold text-black mb-2">
          {labelText}
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            {leftIcon}
          </div>

          <input
            ref={ref}
            id={id}
            {...inputProps}
            className={
              "w-full px-10 py-2 border rounded-md focus:outline-none focus:border-gray-700 "
            }
          />
        </div>
      </div>
    );
  }
);
