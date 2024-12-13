'use client';

import Image from 'next/image'; // Importa o componente Image do Next.js, utilizado para carregar imagens.
import Link from 'next/link'; // Importa o componente Link do Next.js para navegação entre páginas.
import { usePathname, useRouter } from 'next/navigation'; // Importa hooks de navegação do Next.js.
import {
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'; // Importa componentes do NextUI para criar botões e menus dropdown.
import { UserIcon } from './Icons/UserIcon'; // Importa o ícone de usuário customizado.
import { SearchIcon } from './Icons/SearchIcon'; // Importa o ícone de pesquisa customizado.
import Cookies from 'js-cookie'; // Importa a biblioteca js-cookie para gerenciar cookies no navegador.
import jwt from 'jsonwebtoken'; // Importa a biblioteca jsonwebtoken para manipulação de tokens JWT.
import React, { useEffect, useState } from 'react'; // Importa hooks do React.

interface DecodedToken { // Interface para a estrutura esperada do token decodificado.
  id: string;
  roles: string[];
  [key: string]: unknown; // Permite propriedades adicionais no token.
}

const Header = () => { // Definição do componente Header.
  const path = usePathname(); // Hook para obter o pathname atual da URL.
  const router = useRouter();  // Hook para acessar o roteador e realizar navegações programáticas.

  const [isClient, setIsClient] = useState(false); // Estado que determina se o código está rodando no cliente.
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o usuário é um administrador.


  useEffect(() => { // Hook useEffect que é executado após a renderização inicial.
    setIsClient(true); // Marca como cliente após a primeira renderização.
    const cookieToken = Cookies.get('token'); // Recupera o token armazenado no cookie.

    if (cookieToken) { // Se o token estiver presente.
      const decoded = jwt.decode(cookieToken) as DecodedToken | null; // Decodifica o token JWT.
      setIsAdmin(
        decoded?.roles.some((role) => role === 'Administrador') ?? false // Verifica se o usuário possui a role 'Administrador'.
      );
    }
  }, []); // O array vazio garante que a execução ocorra apenas uma vez, após a renderização inicial.

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
        {isClient && Cookies.get('token') && isAdmin && ( // Se estiver no cliente, o token estiver presente e o usuário for admin.
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
                  router.push('/books'); // Redireciona para a página de gerenciamento de livros.
                }}
              >
                Gerenciar Livros
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  Cookies.remove('token'); // Remove o token do cookie e recarrega a página.
                  window.location.reload();
                }}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {isClient && Cookies.get('token') && !isAdmin && (  // Se o usuário for autenticado mas não for admin.
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
                  router.push('/emprestimos'); // Redireciona para a página de gerenciamento de empréstimos.
                }}
              >
                Gerenciar Empréstimos
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  Cookies.remove('token'); // Remove o token e recarrega a página.
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
