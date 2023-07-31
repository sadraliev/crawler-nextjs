"use client";
import { InputHTMLAttributes, ReactNode, forwardRef, useId } from "react";

import { IconContainer, Input, Label } from "@/shared/UIKit";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  labelText?: string;
  autofocus?: boolean;
}

export const TextField = forwardRef(
  (props: TextFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const { labelText, leftIcon, autoFocus = false, ...inputProps } = props;

    const TextInputId = useId();

    return (
      <div className="w-full max-w-xs mx-auto mt-10">
        {labelText && <Label id={TextInputId} text={labelText} />}
        <div className="relative ">
          {leftIcon && <IconContainer>{leftIcon}</IconContainer>}
          <Input ref={ref} id={TextInputId} {...inputProps} />
        </div>
      </div>
    );
  }
);
