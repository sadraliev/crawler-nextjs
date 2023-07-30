import { FC, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <h1 className="text-center  text-white  py-3  bg-black bg-opacity-20">
      {children}
    </h1>
  );
};
