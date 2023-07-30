"use client";
import React from "react";
import { SWRConfig } from "swr";

interface IProviders {
  children: React.ReactNode;
}

export const Providers: React.FC<IProviders> = ({ children }) => {
  return <SWRConfig>{children}</SWRConfig>;
};
