import React, { useState } from "react";
import api from "../services/api";  // Importando o api.js para usá-lo

interface BookFormProps {
  bookToEdit?: { title: string; author: string; year: number; _id?: string };
  onBookAdded: () => void;
  onBookUpdated: () => void;
}

const BookForm = ({ bookToEdit, onSubmit }) => {
  const [book, setBook] = useState({
    title: bookToEdit?.title || '',
    author: bookToEdit?.author || '',
    year: bookToEdit?.year || '',
    image: bookToEdit?.image || '', // Inicializando com a imagem existente, se houver
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook({
          ...book,
          image: reader.result, // Armazena a URL da imagem no estado
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Autor</label>
        <input
          type="text"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Ano</label>
        <input
          type="number"
          value={book.year}
          onChange={(e) => setBook({ ...book, year: e.target.value })}
          required
        />
      </div>

      {/* Campo de upload da imagem */}
      <div>
        <label>Imagem da Capa</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-4"
        />
      </div>

      {/* Exibir prévia da imagem, se selecionada */}
      {book.image && (
        <div className="mt-4">
          <img
            src={book.image}
            alt="Prévia da Capa"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}

      <button type="submit" className="mt-4">
        {bookToEdit ? 'Atualizar Livro' : 'Adicionar Livro'}
      </button>
    </form>
  );
};

export default BookForm;

