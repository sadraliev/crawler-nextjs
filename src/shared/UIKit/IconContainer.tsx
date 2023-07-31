import { ReactNode } from "react";

interface IconContainerProps {
  children: ReactNode;
}

export const IconContainer: React.FC<IconContainerProps> = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
    {children}
  </div>
);
