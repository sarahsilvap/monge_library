'use client'; // Direciona o Next.js a tratar esse arquivo como um componente do lado do cliente (client-side), necessário para hooks e interações dinâmicas

import React, { useEffect, useState } from 'react'; // Importa o React e os hooks useEffect e useState
import Cookies from 'js-cookie'; // Importa o módulo js-cookie para ler e escrever cookies
import jwt from 'jsonwebtoken'; // Importa o módulo jwt para decodificar o token JWT

interface BookShowProps {
  showBook: boolean; // Define se o modal de exibição do livro será mostrado ou não
  bookData: any;  // Dados do livro a serem exibidos no modal
  onClose: () => void; // Função que será chamada para fechar o modal
  onRent: () => void; // Função que será chamada após o aluguel do livro (para atualizar o estado do componente pai)
}

const BookShowModal: React.FC<BookShowProps> = ({ showBook, bookData, onClose, onRent }) => {
  const [userId, setUserId] = useState<string | null>(null); // Estado para armazenar o ID do usuário
  const [isAdmin, setIsAdmin] = useState(false); // Estado para determinar se o usuário é administrador


  useEffect(() => {
    // Hook que é executado quando o componente é montado
    const cookieToken = Cookies.get('token') || localStorage.getItem('authToken');
    // Recupera o token JWT do cookie ou do localStorage

    if (cookieToken) {
      const decoded = jwt.decode(cookieToken) as { id: string; roles: string[] } | null;
      // Decodifica o token JWT para obter o ID do usuário e as funções/roles

      setUserId(decoded?.id || null); // Armazena o id do usuário do token decodificado
      setIsAdmin(decoded?.roles?.some((role) => role === 'Administrador') || false); // Verifica se o usuário tem a role de 'Administrador' e atualiza o estado de isAdmin
    }
  }, []); // A dependência vazia faz o hook rodar apenas uma vez, quando o componente é montado

  if (!showBook || !bookData) return null; // Se showBook for falso ou bookData não estiver disponível, o modal não será renderizado


  const handleRent = async () => {
    const bookId = bookData._id; // Obtém o ID do livro que será alugado
    const diasEmprestimo = 7; // Define o número de dias do aluguel
    const token = Cookies.get('token') || localStorage.getItem('authToken'); // Token para envio no cabeçalho
    // Obtém o token JWT do cookie ou localStorage

    if (!token) {
      alert('Você precisa estar logado para realizar um empréstimo.');
      // Caso não tenha token (usuário não está logado), exibe um alerta
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/loans', {
        // Envia uma requisição POST para a API de empréstimos
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Envia o token JWT no cabeçalho
        },
        body: JSON.stringify({ userId, bookId, dias: diasEmprestimo }),
        // Envia o corpo da requisição com os dados necessários: ID do usuário, ID do livro e dias de aluguel
      });

      const data = await response.json(); // Recebe a resposta da API e converte para JSON

      if (data.success) {
        alert('Empréstimo realizado com sucesso!');
        onRent(); // Notificar o componente pai para fechar o modal ou atualizar o estado
        onClose(); // Fecha o modal após o aluguel
      } else {
        alert(data.message); // Exibir mensagem de erro caso o empréstimo falhe
      }
    } catch (error) {
      console.error('Erro ao realizar empréstimo:', error);  // Se ocorrer um erro durante a requisição, loga o erro
      alert('Ocorreu um erro. Tente novamente mais tarde.'); // Exibe um alerta de erro
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[1000]">
      <div className="bg-white rounded-lg shadow-lg w-[750px] overflow-y-auto p-4">
        {/* Cabeçalho com botão "X" */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-3xl font-semibold">{bookData.title}</h2>
          <button
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="flex">
          {/* Imagem do livro */}
          <div
            className="flex-shrink-0 w-[210px] h-[326px] rounded-md bg-cover bg-center mr-4"
            style={{
              backgroundImage: `url(http://localhost:5000${bookData.coverImage})`,
            }}
          ></div>

          {/* Informações do livro */}
          <div className="flex flex-col flex-grow">
            <p className="mt-2 text-gray-600">
              <strong>Sinopse:</strong>
            </p>
            <div className="flex rounded-lg border border-gray-900/25 px-4 py-2 h-[200px] overflow-y-auto overflow-x-hidden">
              <p className="text-gray-600 text-sm">{bookData.synopsis}</p>
            </div>
            <p className="mt-2">
              <strong>Autor:</strong> {bookData.author}
            </p>
            <p className="mt-2">
              <strong>Categoria:</strong> {bookData.category}
            </p>
            <p className="mt-2">
              <strong>Ano:</strong> {bookData.year}
            </p>
          </div>
        </div>

        {/* Botão de alugar (escondido para administradores) */}
        {!isAdmin && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleRent}
              className="w-32 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Alugar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookShowModal;
