import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  text: string;
}

export const Label: React.FC<LabelProps> = ({ id, text, ...labelProps }) => (
  <label
    htmlFor={id}
    {...labelProps}
    className="block text-sm font-bold text-black mb-2"
  >
    {text}
  </label>
);
