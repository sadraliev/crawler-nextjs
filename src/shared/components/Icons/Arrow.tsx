import { FC } from "react";

interface ArrowIconProps {
  color?: string;
  injectClass?: string;
}

export const ArrowIcon: FC<ArrowIconProps> = ({
  color = "currentColor",
  injectClass = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={injectClass}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};
