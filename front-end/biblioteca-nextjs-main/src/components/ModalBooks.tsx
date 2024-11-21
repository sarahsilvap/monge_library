"use client"; // Este é um componente de cliente (React Client Component)

import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const BookModal = ({ showForm, editingBook, onClose, onSubmit }) => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        year: "",
        image: null,
    });

    // Atualiza os dados do livro quando o componente for editado
    useEffect(() => {
        if (editingBook) {
            // Se estamos no modo de edição, atualize os dados com as informações do livro
            setBookData({
                title: editingBook.title,
                author: editingBook.author,
                year: editingBook.year,
                image: editingBook.image, // A imagem pode ser uma URL ou um arquivo
            });
        } else {
            // Se não estamos editando um livro, limpe os dados
            setBookData({
                title: "",
                author: "",
                year: "",
                image: null,
            });
        }
    }, [editingBook]);

    // Função para lidar com as mudanças nos campos de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    // Função para submeter o formulário
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(bookData); // Passa os dados do livro para o pai (AdminPage)
    };

    // Verifica se a imagem é um arquivo ou uma URL
    const getImageSrc = () => {
        if (bookData.image instanceof File) {
            return URL.createObjectURL(bookData.image); // Usado quando o arquivo é novo
        }
        return bookData.image; // Usado quando é um caminho de URL (como "/images/hobbit.jpg")
    };

    if (!showForm) return null; // Se o modal não deve ser mostrado, retorna null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{editingBook ? "Editar Livro" : "Adicionar Livro"}</h2>
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
                        type="text"
                        name="year"
                        placeholder="Ano"
                        value={bookData.year}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md mt-2"
                        required
                    />

                    {/* Foto do livro */}
                    <div className="col-span-full mt-4">
                        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
                            Adicionar foto
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                {/* Se houver uma imagem, exibe a imagem atual */}
                                {bookData.image && (
                                    <img
                                        src={getImageSrc()} // Usa a função para obter o caminho correto da imagem
                                        alt="Foto do livro"
                                        className="mx-auto w-28 h-40 object-cover mb-4"
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
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setBookData({ ...bookData, image: file });
                                            }}
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
