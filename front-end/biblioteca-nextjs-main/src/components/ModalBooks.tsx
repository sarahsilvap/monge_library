import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from 'react-select';

interface BookModalProps {
  showForm: boolean;
  editingBook: Books | null;
  onClose: () => void;
  onSubmit: (book: Books) => void;
}

const BookModal: React.FC<BookModalProps> = ({
  showForm,
  editingBook,
  onClose,
  onSubmit,
}) => {
  const [bookData, setBookData] = useState<Books>({
    _id: '',
    id:'',  
    title: '',
    author: '',
    synopsis: '',
    category: '',
    year: '',
    coverImage: '',
  });

  useEffect(() => {
    if (editingBook) {
      setBookData({
        _id: editingBook._id,
        id: editingBook.id,
        title: editingBook.title,
        author: editingBook.author,
        synopsis: editingBook.synopsis,
        category: editingBook.category,
        year: editingBook.year,
        coverImage: editingBook.coverImage,
      });
    } else {
      setBookData({
        _id: '',
        id:'',
        title: '',
        author: '',
        synopsis: '',
        category: '',
        year: '',
        coverImage: '',
      });
    }
  }, [editingBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const options = [
    { value: 'romance', label: 'Romance' },
    { value: 'Fantasy', label: 'Fantasia' },
    { value: 'Horror', label: 'Terror' },
    { value: 'Adventure', label: 'Aventura' },
    { value: 'SciendFiction', label: 'Ficção científica' },
  ];

  const [selectedOption, setSelectedValue] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const handleSelected = (
    selected: { value: string; label: string } | null
  ) => {
    setSelectedValue(selected); // Armazena o objeto completo no estado
    if (selected) {
      setBookData({ ...bookData, category: selected.value }); // Atualiza a categoria do livro
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBookData({ ...bookData, coverImage: file });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('year', bookData.year.toString());
    formData.append('category', bookData.category);

    if (bookData.coverImage instanceof File) {
      formData.append('coverImage', bookData.coverImage);
    }

    try {
      let response;
      if (editingBook) {
        response = await fetch(
          `http://localhost:5000/api/books/${editingBook._id}`,
          {
            method: 'PUT',
            body: formData,
          }
        );
      } else {
        response = await fetch('http://localhost:5000/api/books', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        const newBook = await response.json();
        onSubmit({
          ...newBook,
          coverImage: `http://localhost:5000${newBook.coverImage}`,
        });
        onClose();
      } else {
        console.error('Erro ao enviar o livro');
      }
    } catch (error) {
      console.error('Erro ao enviar o livro:', error);
    }
  };

  const getImageSrc = () => {
    if (bookData.coverImage instanceof File) {
      return URL.createObjectURL(bookData.coverImage);
    }
    return `http://localhost:5000${bookData.coverImage}`;
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {editingBook ? 'Editar Livro' : 'Adicionar Livro'}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        <form className="mt-4" onSubmit={handleFormSubmit}>
          <p>Título:</p>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={bookData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            required
          />
          <p className="mt-2">Autor:</p>
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={bookData.author}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            required
          />
          <p className="mt-2">Ano:</p>
          <input
            type="text"
            name="year"
            placeholder="Ano"
            value={bookData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            required
          />
          <div className="pt-2">
            <label htmlFor="category">Categoria:</label>
            <Select
              className="pt-2"
              id="dropdown"
              options={options}
              value={selectedOption}
              onChange={handleSelected}
              placeholder="Selecione uma opção"
            ></Select>
          </div>
          <div className="h-32">
            <p className="mt-2">Sinopse:</p>
            <textarea
              name="synopsis"
              placeholder=""
              value={bookData.synopsis}
              onChange={handleChange}
              className="w-full h-[80%] p-2 border border-gray-300 rounded-md mt-2 resize-y overflow-auto"
              rows={4}// Define a altura inicial (4 linhas)
              style={{ wordWrap: 'break-word' }}
              required
            />
          </div>
          <div className="col-span-full mt-4">
            <label htmlFor="cover-photo" className="block font-medium">
              Adicionar capa
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4 pt-0">
              <div className="text-center">
                {bookData.coverImage && (
                  <div className="pt-4">
                    <Image
                      src={getImageSrc()}
                      alt="Foto do livro"
                      className="mx-auto w-28 h-30 object-cover mb-4"
                      width={100}
                      height={150}
                    />
                  </div>
                )}
                <div className="mt-4 flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Faça o upload</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-600">
                  Arquivos PNG e JPG até 10MB
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
          >
            {editingBook ? 'Salvar alterações' : 'Adicionar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
