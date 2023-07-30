import { FC, ReactNode, useState } from "react";
import { ArrowIcon } from "../Icons";

interface IAccordion {
  title: () => ReactNode;
  children: ReactNode;
  defaultValue?: boolean;
}
export const Accordion: FC<IAccordion> = ({
  title,
  defaultValue = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  return (
    <div className="flex flex-wrap justify-between font-medium  text-white text-left  ">
      {title()}
      <button onClick={() => setIsOpen(!isOpen)}>
        <div className="w-6">
          <ArrowIcon
            injectClass={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            } h-5 w-5`}
          />
        </div>
      </button>
      {isOpen && <div className="w-full">{children}</div>}
    </div>
  );
};
