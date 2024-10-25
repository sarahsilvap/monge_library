"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import { UserIcon } from "../components/UserIcon/UserIcon";
import React, { useState } from 'react';

const Header = () => {
  const path = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let timeoutId: NodeJS.Timeout | undefined; // Declare o tipo de timeoutId

  const handleMouseEnter = () => setDropdownOpen(true);

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Ajuste o tempo conforme necessário
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Cancela o delay se o mouse estiver sobre o dropdown
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Ajuste o tempo conforme necessário
  };

  return (
    <div className="bg-[#204637] h-44 grid grid-cols-4 relative">
      <div className="my-auto mx-auto">
        <Image src={"/image/logo.png"} alt="logo" width={160} height={100} />
      </div>

      <div className="flex flex-col mx-auto col-span-2">
        <div className="my-auto mb-10">
          <input
            className="rounded-md p-2 w-[50vw]"
            placeholder="Busque por um título, autor ou editora"
          />
        </div>

        <div className="flex gap-32 mx-auto mb-5">
          <Link
            className={
              path === "/catalogo" || path === "/"
                ? "text-gray-400"
                : "text-white hover:text-gray-400"
            }
            href={"/catalogo"}
          >
            PÁGINA INICIAL
          </Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link className={path === "/catalogo" ? "text-gray-400" : "text-white hover:text-gray-400"} href={"/catalogo"}>
              CATÁLOGO
            </Link>
            {dropdownOpen && (
              <div
                className="absolute bg-white text-black shadow-lg mt-2 rounded-md border border-gray-300"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <Link href="/catalogo/romance" className="block px-4 py-2 hover:bg-gray-200 transition duration-200 text-left whitespace-nowrap">Romance</Link>
                <Link href="/catalogo/terror" className="block px-4 py-2 hover:bg-gray-200 transition duration-200 text-left whitespace-nowrap">Terror</Link>
                <Link href="/catalogo/ficcao" className="block px-4 py-2 hover:bg-gray-200 transition duration-200 text-left whitespace-nowrap">Ficção Científica</Link>
                <Link href="/catalogo/nonficcao" className="block px-4 py-2 hover:bg-gray-200 transition duration-200 text-left whitespace-nowrap">Não-ficção</Link>
              </div>
            )}
          </div>

          <Link
            className={
              path === "/autores"
                ? "text-gray-400"
                : "text-white hover:text-gray-400"
            }
            href={"./autores"}
          >
            AUTORES
          </Link>
          <Link
            className={
              path === "/servicos"
                ? "text-gray-400"
                : "text-white hover:text-gray-400"
            }
            href={" "}
          >
            CATEGORIAS
          </Link>
        </div>
      </div>

      <div className="absolute top-4 right-5">
        <Link href="/login" passHref>
          <Button aria-label="Clique aqui para usuário"> {/* Botão com acessibilidade */}
            <UserIcon fill="white" size={36} filled={false} height={26} width={26} label="Ícone do Usuário" />
            <p className="text-white mt-0">Login</p> {/* Texto abaixo do botão */}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
