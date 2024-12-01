import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BookModalProps {
  showForm: boolean;
  editingBook?: Books;
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
    _id: "",
    title: "",
    author: "",
    year: 0,
    coverImage: "",
  });

  useEffect(() => {
    if (editingBook) {
      setBookData({
        _id: editingBook._id,
        title: editingBook.title,
        author: editingBook.author,
        year: editingBook.year,
        coverImage: editingBook.coverImage,
      });
    } else {
      setBookData({
        _id: "",
        title: "",
        author: "",
        year: 0,
        coverImage: "",
      });
    }
  }, [editingBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
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
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    formData.append("year", bookData.year.toString());

    if (bookData.coverImage instanceof File) {
      formData.append("coverImage", bookData.coverImage);
    }

    try {
      let response;
      if (editingBook) {
        response = await fetch(
          `http://localhost:5000/api/books/${editingBook._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/books", {
          method: "POST",
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
        console.error("Erro ao enviar o livro");
      }
    } catch (error) {
      console.error("Erro ao enviar o livro:", error);
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
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {editingBook ? "Editar Livro" : "Adicionar Livro"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        <form className="mt-4" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={bookData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={bookData.author}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Ano"
            value={bookData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            required
          />
          <div className="col-span-full mt-4">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-900"
            >
              Adicionar foto
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {bookData.coverImage && (
                  <Image
                    src={getImageSrc()}
                    alt="Foto do livro"
                    className="mx-auto w-28 h-40 object-cover mb-4"
                    width={100}
                    height={150}
                  />
                )}
                <div className="mt-4 flex text-sm text-gray-600">
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
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-600">PNG, JPG, GIF até 10MB</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
          >
            {editingBook ? "Salvar alterações" : "Adicionar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
