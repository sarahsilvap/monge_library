'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { UserIcon } from './Icons/UserIcon';
import { SearchIcon } from './Icons/SearchIcon';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';

interface DecodedToken {
  id: string;
  roles: string[];
  [key: string]: unknown;
}

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cookieToken = Cookies.get('token');

    if (cookieToken) {
      const decoded = jwt.decode(cookieToken) as DecodedToken | null;
      setIsAdmin(
        decoded?.roles.some((role) => role === 'Administrador') ?? false
      );
    }
  }, []);

  return (
    <div className="bg-[#204637] h-44 grid grid-cols-3 relative shadow-2xl">
      {/* Logo */}
      <div className="my-auto mx-auto">
        <Image
          src={'/image/logobranco.png'}
          alt="logo"
          width={280}
          height={100}
        />
      </div>

      {/* Menu */}
      <div className="flex flex-col justify-center mx-auto">
        {/* Barra de pesquisa */}
        <div className="relative flex items-center mb-6">
          <input
            className="rounded-md p-2 pr-10 w-[40vw] placeholder:text-sm"
            placeholder="Busque por um título, autor ou editora"
          />
          <div className="absolute right-4 mt-1">
            <button>
              <SearchIcon fill="grey" size={20} height={20} width={20} />
            </button>
          </div>
        </div>

        {/* Links do menu */}
        <div className="flex justify-center">
          <Link
            className={`text-sm ${
              path === '/'
                ? 'text-gray-400'
                : 'text-white hover:text-gray-400'
            }`}
            href={'/'}
          >
            PÁGINA INICIAL
          </Link>
        </div>
      </div>

      {/* Perfil / Login */}
      <div className="my-auto flex justify-end pr-96 pb-11">
        {isClient && Cookies.get('token') && isAdmin && (
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" aria-label="Clique aqui para perfil">
                <UserIcon
                  fill="white"
                  size={24}
                  filled={false}
                  height={0}
                  width={0}
                  label="Ícone do Usuário"
                />
                <p className="text-white mt-0"> Perfil </p>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  router.push('/books');
                }}
              >
                Gerenciar Livros
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  Cookies.remove('token');
                  window.location.reload();
                }}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {isClient && Cookies.get('token') && !isAdmin && (
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" aria-label="Clique aqui para perfil">
                <UserIcon
                  fill="white"
                  size={24}
                  filled={false}
                  height={0}
                  width={0}
                  label="Ícone do Usuário"
                />
                <p className="text-white mt-0"> Perfil </p>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  router.push('/emprestimos');
                }}
              >
                Gerenciar Empréstimos
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  Cookies.remove('token');
                  window.location.reload();
                }}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {isClient && !Cookies.get('token') && (
          <Button
            variant="light"
            aria-label="Clique aqui para perfil"
            onClick={() => {
              router.push('/login');
            }}
          >
            <UserIcon
              fill="white"
              size={24}
              filled={false}
              height={0}
              width={0}
              label="Ícone do Usuário"
            />
            <p className="text-white mt-0"> Login </p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
