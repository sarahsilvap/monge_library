"use client";

import { ReactNode } from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const route = usePathname();

  const hideHeaderPaths = ["/login", "/cadastro", "/books", "/alunos"];

  const showHeader = hideHeaderPaths.includes(route);

  {/*const typeAccount = "dksajdk"*/}

  return (
    <>
      {!showHeader && <Header />}
      {children} 
      {/*typeAccount === "ADM"? <div>ADM</div> : (<div>Cliente</div>)*/}
    </>
  );
};

export default MainContainer;
