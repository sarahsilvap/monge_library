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
  roles: string[]; // ou o tipo esperado para roles
  [key: string]: unknown; // para quaisquer outros atributos no token
}

const Header = () => {
  const path = usePathname();

  const router = useRouter();

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookieToken = Cookies.get('token');

    if (cookieToken) {
      const decoded = jwt.decode(cookieToken) as DecodedToken | null;

      console.log(decoded);

      setIsAdmin(
        decoded?.roles.some((role) => role === 'Administrador') ?? false,
      );
    }
  }, []);

  return (
    <div className="bg-[#204637] h-44 grid grid-cols-4 relative shadow-2xl">
      <div className="my-auto mx-auto">
        <Image
          src={'/image/logobranco.png'}
          alt="logo"
          width={280}
          height={100}
        />
      </div>

      <div className="flex flex-col mx-auto col-span-2">
        <div className="my-auto mb-10 relative flex items-center gap-5">
          <div className="absolute right-4 mt-1 md:right-2">
            <button>
              <SearchIcon fill="grey" size={20} height={20} width={20} />
            </button>
          </div>
          <input
            className="rounded-md p-2 pr-10 w-[40vw] placeholder:text-sm"
            placeholder="Busque por um título, autor ou editora"
          />
        </div>

        <div className="flex gap-32 mx-auto mb-4">
          <Link
            className={
              path === '/' || path === '/'
                ? 'text-gray-400 text-sm'
                : 'text-white hover:text-gray-400 text-sm'
            }
            href={'/'}
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
                <Link href="/catalogo">
                  <button
                    className={
                      path === '/catalogo'
                        ? 'text-gray-400 text-sm'
                        : 'text-white hover:text-gray-400 text-sm'
                    }
                  >
                    CATÁLOGO
                  </button>
                </Link>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>TERROR</DropdownItem>
                <DropdownItem>ROMANCE</DropdownItem>
                <DropdownItem>FICÇÃO</DropdownItem>
                <DropdownItem>NÃO-FICÇÃO</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="my-12 -ml-20">
        {Cookies.get('token') && isAdmin && (
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

        {Cookies.get('token') && !isAdmin && (
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
                  Cookies.remove('token');
                  window.location.reload();
                }}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {!Cookies.get('token') && (
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
