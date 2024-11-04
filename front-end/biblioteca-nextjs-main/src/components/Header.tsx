"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { UserIcon } from "./Icons/UserIcon";
import { SearchIcon } from "./Icons/SearchIcon";

import React, { useState } from "react";

const Header = () => {
  const path = usePathname();

  const [onMouseEnter, setOnMouseEnter] = useState(false);

  return (
    <div className="bg-[#204637] h-44 grid grid-cols-4 relative">
      <div className="my-auto mx-auto">
        <Image
          src={"/image/logobranco.png"}
          alt="logo"
          width={300}
          height={100}
        />
      </div>

      <div className="flex flex-col mx-auto col-span-2">
        <div className="my-auto mb-10 relative flex items-center gap-5">
          <div className="absolute right-4 mt-1">
            <button>
              <SearchIcon
                fill="grey"
                size={24}
                filled={false}
                height={24}
                width={24}
                label="Ícone de Pesquisa"
              />
            </button>
          </div>
          <input
            className="rounded-md p-2 pr-10 w-[50vw]"
            placeholder="Busque por um título, autor ou editora"
          />
        </div>

        <div className="flex gap-32 mx-auto mb-4">
          <Link
            className={
              path === "/catalogo" || path === "/"
                ? "text-gray-400"
                : "text-white hover:text-gray-400"
            }
            href={"/"}
          >
            PÁGINA INICIAL
          </Link>

          <div
            className="relative min-h-8"
            onMouseEnter={() => setOnMouseEnter(true)}
            onMouseLeave={() => setOnMouseEnter(false)}
          >
            <Dropdown isOpen={onMouseEnter}>
              <DropdownTrigger>
                <button
                  className={
                    path === "/catalogo"
                      ? "text-gray-400"
                      : "text-white hover:text-gray-400"
                  }
                >
                  CATALOGO
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>TERROR</DropdownItem>
                <DropdownItem>ROMANCE</DropdownItem>
                <DropdownItem>FICÇÃO</DropdownItem>
                <DropdownItem>NÃO-FICÇÃO</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

      <div className="my-12 ml-5">
        <Link href="/login" passHref>
          <Button variant="light" aria-label="Clique aqui para usuário">
            {/* Botão com acessibilidade */}
            <UserIcon
              fill="white"
              size={36}
              filled={false}
              height={26}
              width={26}
              label="Ícone do Usuário"
            />
            <p className="text-white mt-0">Login</p>
            {/* Texto abaixo do botão */}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
