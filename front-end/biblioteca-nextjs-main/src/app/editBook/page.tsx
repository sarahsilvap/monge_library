import React from "react";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const AdminPage = () => {
  return (
    <>
      <Navbar className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <NavbarBrand>
          <Link href="/">
            <div className="relative w-32 h-8">
              <Image
                src="/image/logoverde.png" 
                alt="Logo"
                layout="fill" 
                objectFit="contain" 
              />
            </div>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">Livros</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">Empréstimos</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">Alunos</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Conteúdo da Página - espaço para a Navbar não sobrepor o conteúdo */}
      <div className="pt-24">
        <div className="grid grid-cols-8 gap-6">
          <div className="col-start-1 col-span-8 p-6 mx-auto">
            {/* Título e Tabela de Livros */}
            <h1 className="text-3xl mb-4">Gerenciar Livros</h1>

            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b rounded-md min-w-[150px]">Capa</th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">Título</th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">Autor</th>
                  <th className="p-3 border-b rounded-md min-w-[150px]">Ano</th>
                  <th className="p-3 border-b rounded-md min-w-[150px]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* Exemplo de Livro */}
                <tr>
                  <td className="border-b p-2 text-center">
                    <div className="relative w-28 h-40 mx-auto">
                      <Image
                        src="/image/senhor-dos-aneis.webp"
                        alt="Capa do livro"
                        layout="fill"
                        objectFit="cover"  
                        className="rounded-md"
                      />
                    </div>
                  </td>
                  <td className="border-b p-2 text-center">O Senhor dos Anéis</td>
                  <td className="border-b p-2 text-center">J.R.R. Tolkien</td>
                  <td className="border-b p-2 text-center">2013</td>
                  <td className="border-b p-2 text-center">
                    <button className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                      Editar
                    </button>
                    <button className="bg-red-500 text-white py-1 px-4 ml-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
