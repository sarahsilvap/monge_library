/* eslint-disable @next/next/no-img-element */
// Desativa a regra do ESLint que proíbe o uso da tag <img> sem o atributo alt, permitindo o uso de imagens sem esse atributo, conforme a necessidade.

'use client'; // Este é um componente de cliente (React Client Component)
// Indica que este componente React será renderizado no lado do cliente, ou seja, no navegador, não no servidor.

import React, { useState, useEffect } from 'react'; // Importa o React e os hooks useState e useEffect do React. useState é usado para criar e gerenciar estados locais, e useEffect para lidar com efeitos colaterais como buscar dados ou executar ações ao carregar o componente.
import { BiSolidBookAdd } from 'react-icons/bi'; // Importa o ícone BiSolidBookAdd da biblioteca react-icons, que será usado no botão de adicionar livro.
import HeaderAdm from '@/components/HeaderAdm'; // Importa o componente HeaderAdm, que provavelmente contém a estrutura de cabeçalho da página de administração, como navegação e título.
import BookAddModal from '@/components/ModalAddBooks'; // Importa o componente BookAddModal, usado para abrir um modal onde o usuário pode adicionar ou editar um livro.
import { Spinner } from '@nextui-org/react'; // Importa o componente Spinner da biblioteca @nextui/org/react, usado para mostrar uma animação de carregamento enquanto os dados são carregados.

const AdminPage = () => { // Declara o componente funcional AdminPage.
  const [query, setQuery] = useState(''); // Estado para armazenaro valor da pesquisa (inicialmente vazio).

  const [showForm, setShowForm] = useState(false); // Controla a visibilidade do modal
  const [editingBook, setEditingBook] = useState<Books | null>(null);   // Cria um estado chamado editingBook, que armazena o livro que está sendo editado (inicialmente nulo).
  const [books, setBooks] = useState<Books[] | null>(null); // Cria um estado chamado books, que armazenará a lista de livros (inicialmente nulo).
  const [loading, setLoading] = useState(true); // Cria um estado chamado loading, que indica se os dados estão sendo carregados (inicialmente verdadeiro).

  const fetchBooks = async () => {  // Função assíncrona para buscar os livros do backend.
    try { 
      setLoading(true); // Marca o início do carregamento.

      const response = await fetch('http://localhost:5000/api/books'); // Faz a requisição para obter os livros do backend.
      const data = await response.json(); // Converte a resposta em JSON.
      setBooks(data); // Atualiza o estado com os livros do backend
    } catch (error) { // Se ocorrer erro, loga no console.
      console.error('Erro ao carregar os livros:', error);
    } finally {
      setLoading(false); // Marca o término do carregamento, independentemente de sucesso ou falha.
    }
  };

  useEffect(() => {
    fetchBooks(); // Chama a função fetchBooks para buscar os livros ao carregar o componente.
  }, []);

  // Função para filtrar os livros
  const filteredBooks = books
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) || // Filtra livros pelo título ou autor, ignorando maiúsculas/minúsculas. 
          book.author.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Função busca
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value); // Atualiza o estado query com o valor digitado no campo de pesquisa.
  };

  // Função para abrir o modal de adicionar um novo livro
  const handleAddBookClick = () => {
    setEditingBook(null); // Garante que estamos criando um livro novo
    setShowForm(true); // Exibe o modal.
  };

  // Função para edição de um livro
  const handleEditBook = (book: Books) => {
    setEditingBook(book); // Preenche o modal com os dados do livro a ser editado
    setShowForm(true); // Exibe o modal.
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setEditingBook(null); // Limpa o estado editingBook.
    setShowForm(false); // Fecha o modal.
  };

  // Função para salvar ou atualizar um livro
  const handleSubmit = async () => {
    await fetchBooks(); // Recarrega a lista de livros após salvar ou atualizar um livro.

    setShowForm(false); // Fecha o modal
  };

  // Função para excluir um livro
  const handleDeleteBook = async (bookId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}`,  // Faz uma requisição DELETE para excluir o livro com o ID especificado.
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'multipart/form-data', // Define o cabeçalho para indicar o tipo de conteúdo.
          },
        }
      );

      if (response.ok) {
        setBooks((books ?? []).filter((book) => book._id !== bookId)); // Atualiza a lista de livros removendo o livro excluído.
        alert('Livro excluído com sucesso!'); // Exibe um alerta de sucesso.
      } else {
        alert('Erro ao excluir o livro!'); // Exibe um alerta de erro se a requisição falhar.
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição de exclusão', error); // Loga o erro no console.
      alert('Erro na requisição.'); // Exibe um alerta de erro.
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
                {loading && <Spinner />}
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
            <BookAddModal
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
                  <th className="p-3 border-b rounded-md min-w-[300px]">
                    Categoria
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
                      <td className="border-b p-2 text-center">
                        {book.category}
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
