"use client"; // Indica que este é um Client Component

import React, { useState } from "react";
import Image from "next/image";
import { BiSolidBookAdd } from "react-icons/bi";
import HeaderAdm from "@/components/HeaderAdm";
import BookForm from "@/components/BookForm";  // Importando o formulário de livro
import { Button } from "@nextui-org/react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const AdminPage = () => {
  // Estado para o valor da pesquisa
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false); // Estado para controlar a visibilidade do formulário

  // Dados de exemplo para os livros
  const books = [
    {
      id: 1,
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      year: 2013,
      image: "/image/senhor-dos-aneis.webp"
    },
    {
      id: 2,
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      year: 1997,
      image: "/image/harry-potter-e-a-pedra-filosofal.jpg"
    },
    {
      id: 3,
      title: "O Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
      image: "/image/hobbit.jpg"
    }
  ];

  // Função para filtrar os livros com base na pesquisa
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  });

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  // Função para alternar a visibilidade do formulário
  const handleAddBookClick = () => {
    setShowForm(true); // Exibe o formulário quando o botão "Adicionar Livro" for clicado
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowForm(false); // Fecha o modal
  };

  return (
    <>
      <HeaderAdm />
      <div className="pt-24">
        <div className="grid grid-cols-8 gap-6">
          <div className="col-start-1 col-span-8 p-6 mx-auto">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center gap-4">
                {/* Título e Campo de Pesquisa ao lado */}
                <h1 className="text-3xl">Gerenciar Livros</h1>
                <button onClick={handleAddBookClick}>
                  <BiSolidBookAdd color="#3B82F6" size={30} />
                </button>
              </div>
              <div className="flex w-1/3 justify-end">
                {/* Campo de Pesquisa */}
                <input
                  type="text"
                  placeholder="Pesquisar livro por título ou autor"
                  className="p-2 w-full rounded-md border border-gray-300"
                  value={query}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Exibe o formulário de adicionar livro somente se o estado showForm for true */}
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                {/* Este é o conteúdo do modal */}
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Adicionar Livro</h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleCloseModal}
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>
                  <form className="mt-4">
                    <input
                      type="text"
                      placeholder="Título"
                      className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    />
                    <input
                      type="text"
                      placeholder="Autor"
                      className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    />
                    <input
                      type="number"
                      placeholder="Ano"
                      className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    />

                    <div className="col-span-full">
                      <label htmlFor="cover-photo" className="pt-4 block text-sm/6 font-medium text-gray-900">
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                          <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
                    >
                      Adicionar
                    </button>
                  </form>
                </div>
              </div>
            )}

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
                {/* Mapeando os livros filtrados */}
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="border-b p-2 text-center">
                        <div className="relative w-28 h-40 mx-auto">
                          <Image
                            src={book.image}
                            alt="Capa do livro"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      </td>
                      <td className="border-b p-2 text-center">{book.title}</td>
                      <td className="border-b p-2 text-center">{book.author}</td>
                      <td className="border-b p-2 text-center">{book.year}</td>
                      <td className="border-b p-2 text-center">
                        <button className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                          Editar
                        </button>
                        <button className="bg-red-500 text-white py-1 px-4 ml-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3 text-center">Nenhum livro encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
