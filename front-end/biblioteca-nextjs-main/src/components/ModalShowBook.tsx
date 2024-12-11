'use client';

import React from 'react';

const BookShowModal: React.FC<BookShowProps> = ({
  showBook,
  bookData,
  onClose,
  onRent,
}) => {
  if (!showBook || !bookData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
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

        {/* Botão de alugar */}
        <div className="flex justify-end">
          <button
            onClick={onRent}
            className="w-32 bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Alugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookShowModal;
