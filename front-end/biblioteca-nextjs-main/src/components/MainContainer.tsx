"use client";

import { ReactNode } from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const route = usePathname();

  const hideHeaderPaths = ["/login", "/cadastro"];

  const showHeader = hideHeaderPaths.includes(route);

  return (
    <>
      {!showHeader && <Header />}
      {children}
    </>
  );
};

export default MainContainer;
