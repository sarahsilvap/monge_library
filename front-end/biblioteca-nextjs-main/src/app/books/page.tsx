/* eslint-disable @next/next/no-img-element */
"use client"; // Este é um componente de cliente (React Client Component)

import React, { useState, useEffect } from "react";
import { BiSolidBookAdd } from "react-icons/bi";
import HeaderAdm from "@/components/HeaderAdm";
import BookModal from "@/components/ModalBooks";
import { Spinner } from "@nextui-org/react";

const AdminPage = () => {
  const [query, setQuery] = useState(""); // Estado para armazenar a pesquisa
  const [showForm, setShowForm] = useState(false); // Controla a visibilidade do modal
  const [editingBook, setEditingBook] = useState<Books | null>(null); // Livro a ser editado
  const [books, setBooks] = useState<Books[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/books"); // URL do seu backend
      const data = await response.json();
      setBooks(data); // Atualiza o estado com os livros do backend
    } catch (error) {
      console.error("Erro ao carregar os livros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Função para filtrar os livros
  const filteredBooks = books
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Função busca
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Função para abrir o modal de adicionar um novo livro
  const handleAddBookClick = () => {
    setEditingBook(null); // Garante que estamos criando um livro novo
    setShowForm(true);
  };

  // Função para edição de um livro
  const handleEditBook = (book: Books) => {
    setEditingBook(book); // Preenche o modal com os dados do livro a ser editado
    setShowForm(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowForm(false);
    setEditingBook(null);
  };


  // Função para salvar ou atualizar um livro
  const handleSubmit = async () => {
    await fetchBooks();

    setShowForm(false); // Fecha o modal
  };

  // Função para excluir um livro
  const handleDeleteBook = async (bookId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        setBooks((books ?? []).filter((book) => book._id !== bookId));
        alert("Livro excluído com sucesso!");
      } else {
        alert("Erro ao excluir o livro!");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição de exclusão", error);
      alert("Erro na requisição.");
    }
  };

  return (
    <>
      <HeaderAdm />
      <div className="pt-24">
        <div className="grid grid-cols-8 gap-6">
          <div className="col-start-1 col-span-8 p-6 mx-auto">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center gap-4">
                {/* Título e Botão de Adicionar Livro */}
                <h1 className="text-3xl">Gerenciar Livros</h1>
                {loading && (<Spinner />)}
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
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Exibe o modal de adicionar/editar livro */}
            <BookModal
              showForm={showForm}
              editingBook={editingBook}
              onClose={handleCloseModal}
              onSubmit={handleSubmit}
            />

            {/* Tabela de Livros */}
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b rounded-md min-w-[150px]">
                    Capa
                  </th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">
                    Título
                  </th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">
                    Autor
                  </th>
                  <th className="p-3 border-b rounded-md min-w-[150px]">Ano</th>
                  <th className="p-3 border-b rounded-md min-w-[150px]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td className="border-b p-2 text-center">
                        <div className="relative w-28 h-40 mx-auto">
                          {typeof book.coverImage === 'string' && (
                            <img
                              src={`http://localhost:5000${book.coverImage}`} // Certifique-se de concatenar a URL corretamente
                              alt="Foto do livro"
                              className="mx-auto w-28 h-40 object-cover mb-4 rounded"
                            />
                          )}
                        </div>
                      </td>
                      <td className="border-b p-2 text-center">{book.title}</td>
                      <td className="border-b p-2 text-center">
                        {book.author}
                      </td>
                      <td className="border-b p-2 text-center">{book.year}</td>
                      <td className="border-b p-2 text-center">
                        {/* Botões de Ação */}
                        <button
                          className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                          onClick={() => handleEditBook(book)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-4 ml-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          onClick={() => handleDeleteBook(book._id ?? "")}
                        >
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
