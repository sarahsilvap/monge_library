import React from "react";
import Image from "next/image";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="grid grid-cols-8 gap-6 h-screen">
      <div className="col-span-1 bg-[#204637] text-white p-4">
        <div className="items-center">
          <Link href={"/login"}>
            <Image
              src={"/image/logobranco.png"}
              alt="logo"
              width={180}
              height={100}
            />
          </Link>
          <h2 className="pt-8 pb-6 text-xl">Administração</h2>
        </div>
        <ul>
          <li>
            <a href="/livros" className="block py-2 hover:bg-[#41725e]">
              Livros
            </a>
          </li>
          <li>
            <a href="/empréstimos" className="block py-2 hover:bg-[#41725e]">
              Empréstimos
            </a>
          </li>
          <li>
            <a href="/configurações" className="block py-2 hover:bg-[#41725e]">
              Configurações
            </a>
          </li>
        </ul>
      </div>
      <div className="col-start-2 col-span-8 p-6 mx-auto">
        {/* Área de Conteúdo */}
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
                <button className="bg-yellow-500 text-white py-1 px-4">
                  Editar
                </button>
                <button className="bg-red-500 text-white py-1 px-4 ml-2">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
