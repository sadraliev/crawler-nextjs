import { InputHTMLAttributes, FC } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: React.Ref<HTMLInputElement>;
}
export const Input: FC<InputProps> = ({ ref, ...props }) => (
  <input
    ref={ref}
    {...props}
    className="w-full px-10 py-2 border rounded-md focus:outline-none focus:border-gray-700"
  />
);
