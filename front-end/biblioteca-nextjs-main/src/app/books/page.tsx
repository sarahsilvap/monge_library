"use client"; // Este é um componente de cliente (React Client Component)

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BiSolidBookAdd } from "react-icons/bi";
import HeaderAdm from "@/components/HeaderAdm";
import BookModal from "@/components/ModalBooks";  // Importando o componente do modal

const AdminPage = () => {
  const [query, setQuery] = useState(""); // Estado para armazenar a pesquisa
  const [showForm, setShowForm] = useState(false); // Controla a visibilidade do modal
  const [editingBook, setEditingBook] = useState<Books | null>(null); // Livro a ser editado
  const [books, setBooks] = useState<Books[] | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);  // Armazenar base64 da imagem

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      // Lê o arquivo como uma URL base64
      reader.onloadend = () => {
        setImageSrc(reader.result as string);  // Define a imagem base64 no estado
      };

      // Lê o arquivo
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books"); // URL do seu backend
        const data = await response.json();
        setBooks(data); // Atualiza o estado com os livros do backend
      } catch (error) {
        console.error("Erro ao carregar os livros:", error);
      }
    };

    fetchBooks();
  }, []); // A dependência vazia faz a chamada apenas uma vez, ao carregar a página.

  // Função para filtrar os livros com base na pesquisa
  const filteredBooks = books ? books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  ) : [];

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Função para abrir o modal de adicionar um novo livro
  const handleAddBookClick = () => {
    setEditingBook(null); // Garante que estamos criando um livro novo
    setShowForm(true);
  };

  // Função para abrir o modal de edição de um livro
  const handleEditBook = (book: Books) => {
    setEditingBook(book); // Preenche o modal com os dados do livro a ser editado
    setShowForm(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowForm(false);
    setEditingBook(null); // Limpa o estado do livro em edição
  };

  // Função para salvar ou atualizar um livro
  const handleSubmit = async (bookData: Books) => {
    try {
      if (editingBook) {
        // Atualiza o livro existente (PUT request)
        const response = await fetch(`http://localhost:5000/api/books/${editingBook._id}`, { // Alteração de `id` para `_id`
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });

        if (response.ok) {
          const updatedBook = await response.json();
          setBooks((books ?? []).map((book) =>
            book._id === updatedBook._id ? updatedBook : book
          ));
          setShowForm(false);
        } else {
          alert('Erro ao atualizar o livro!');
        }
      } else {
        // Adiciona um novo livro (POST request)
        const response = await fetch('http://localhost:5000/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });

        if (response.ok) {
          const newBook = await response.json();
          setBooks(books ? [...books, newBook] : [newBook]);
          setShowForm(false);
        } else {
          alert('Erro ao adicionar o livro!');
        }
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
      alert('Erro na requisição.');
    }
  };

  // Função para excluir um livro
  const handleDeleteBook = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setBooks((books ?? []).filter((book) => book._id !== bookId));
        alert('Livro excluído com sucesso!')
      } else {
        alert('Erro ao excluir o livro!');
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição de exclusão', error);
      alert('Erro na requisição.');
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
                <button onClick={handleAddBookClick}>
                  <BiSolidBookAdd color="#3B82F6" size={30} />
                </button>
              </div>
              <div className="flex w-1/3 justify-end">
                {/* Campo de Pesquisa */}
                <input
                  type="file"
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
                  <th className="p-3 border-b rounded-md min-w-[150px]">Capa</th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">Título</th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">Autor</th>
                  <th className="p-3 border-b rounded-md min-w-[150px]">Ano</th>
                  <th className="p-3 border-b rounded-md min-w-[150px]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td className="border-b p-2 text-center">
                        <div className="relative w-28 h-40 mx-auto">
                          {imageSrc && (
                            <img src={imageSrc} alt="Book cover" width={500} height={500} />
                          )}
                        </div>
                      </td>
                      <td className="border-b p-2 text-center">{book.title}</td>
                      <td className="border-b p-2 text-center">{book.author}</td>
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
                          onClick={() => handleDeleteBook(book._id ?? '')}
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
