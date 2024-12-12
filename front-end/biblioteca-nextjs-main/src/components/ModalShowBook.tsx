'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

interface BookShowProps {
  showBook: boolean;
  bookData: any;
  onClose: () => void;
  onRent: () => void;
}

const BookShowModal: React.FC<BookShowProps> = ({ showBook, bookData, onClose, onRent }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Recuperando o token do cookie ou localStorage
    const cookieToken = Cookies.get('token') || localStorage.getItem('authToken');

    if (cookieToken) {
      const decoded = jwt.decode(cookieToken) as { id: string; roles: string[] } | null;
      setUserId(decoded?.id || null); // Armazena o id do usuário do token decodificado
      setIsAdmin(decoded?.roles?.some((role) => role === 'Administrador') || false); // Verifica se o usuário é admin
    }
  }, []);

  if (!showBook || !bookData) return null; // Verifica se a informação está disponível

  const handleRent = async () => {
    const bookId = bookData._id; // ID do livro
    const diasEmprestimo = 7; // Número de dias do aluguel
    const token = Cookies.get('token') || localStorage.getItem('authToken'); // Token para envio no cabeçalho

    if (!token) {
      alert('Você precisa estar logado para realizar um empréstimo.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Envia o token JWT no cabeçalho
        },
        body: JSON.stringify({ userId, bookId, dias: diasEmprestimo }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Empréstimo realizado com sucesso!');
        onRent(); // Notificar o componente pai para fechar o modal ou atualizar o estado
        onClose(); // Fecha o modal após o aluguel
      } else {
        alert(data.message); // Exibir mensagem de erro caso o empréstimo falhe
      }
    } catch (error) {
      console.error('Erro ao realizar empréstimo:', error);
      alert('Ocorreu um erro. Tente novamente mais tarde.');
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
