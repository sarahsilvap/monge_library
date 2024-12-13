/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'; // Importa as dependências do React e hooks useState e useEffect
import Image from 'next/image'; // Importa o componente Image do Next.js para otimizar imagens
import Select from 'react-select'; // Importa o componente Select para seleção de categorias (dropdown)

const BookAddModal: React.FC<BookAddProps> = ({
   // Define o tipo do componente e suas props: showForm, editingBook, onClose, onSubmit
  showForm,
  editingBook,
  onClose,
  onSubmit,
}) => {
  const [bookData, setBookData] = useState<Books>({
    _id: '', // Inicializa o estado do livro com valores vazios
    id: '',
    title: '',
    author: '',
    synopsis: '',
    category: '',
    year: '',
    coverImage: '',
  });

  useEffect(() => {
    if (editingBook) {
      // Hook useEffect que é executado quando o estado de showForm ou editingBook muda
      setBookData({
        // Se o livro for para edição, preenche o estado com os dados do livro
        _id: editingBook._id,
        id: editingBook.id,
        title: editingBook.title,
        author: editingBook.author,
        synopsis: editingBook.synopsis,
        category: editingBook.category,
        year: editingBook.year,
        coverImage: editingBook.coverImage,
      });
      setSelectedValue({
        value: editingBook.category,
        label:
          options.find((option) => option.value === editingBook.category)
            ?.label || '',
      });
    } else if (showForm) {
      // Se o form não está editando, mas está sendo exibido, limpa o estado
      setBookData({
        _id: '',
        id: '',
        title: '',
        author: '',
        synopsis: '',
        category: '',
        year: '',
        coverImage: '',
      });
      setSelectedValue(null); // Reseta a seleção da categoria
    }
  }, [editingBook, showForm]); // Dependências que acionam o efeito quando mudam

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; // Extrai o nome e o valor do campo
    setBookData({ ...bookData, [name]: value }); // Atualiza o estado com o novo valor
  };

  const options = [
    // Define as opções de categorias para o select
    { value: 'Romance', label: 'Romance' },
    { value: 'Fantasia', label: 'Fantasia' },
    { value: 'Terrir', label: 'Terror' },
    { value: 'Aventura', label: 'Aventura' },
    { value: 'Ficção científica', label: 'Ficção científica' },
    { value: 'Distopia', label: 'Distopia' },
    { value: 'Drama', label: 'Drama' },
  ];

  const [selectedOption, setSelectedValue] = useState<{  // Inicializa o estado para armazenar a opção selecionada do select
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
    const file = e.target.files?.[0]; // Obtém o arquivo da imagem
    if (file) {
      setBookData({ ...bookData, coverImage: file }); // Atualiza o estado com o arquivo da imagem
    } 
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do form

    const formData = new FormData();
    // Cria um objeto FormData para enviar os dados do livro (incluindo arquivo de imagem)
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('year', bookData.year.toString());
    formData.append('category', bookData.category);
    formData.append('synopsis', bookData.synopsis);

    if (bookData.coverImage instanceof File) {
      formData.append('coverImage', bookData.coverImage); // Adiciona a imagem se for um arquivo
    } else if (editingBook?.coverImage) {
      formData.append('coverImage', editingBook.coverImage); // Caso o livro tenha uma imagem de capa, mas sem mudança
    }

    try {
      let response;
      // Envia os dados para a API (POST ou PUT dependendo se estamos editando ou criando um novo livro)
  
      if (editingBook) {
        response = await fetch(
          `http://localhost:5000/api/books/${editingBook._id}`,
          {
            method: 'PUT', // Se está editando, envia um PUT
            body: formData, // Envia os dados
          }
        );
      } else {
        response = await fetch('http://localhost:5000/api/books', {
          method: 'POST', // Se está criando, envia um POST
          body: formData, // Envia os dados
        });
      }

      if (response.ok) {
        const newBook = await response.json(); // Se a resposta for OK, pega os dados do novo livro
        onSubmit({
          ...newBook,
          coverImage: `http://localhost:5000${newBook.coverImage}`, // Atualiza o URL da imagem com o prefixo da API
        });
        onClose(); // Fecha o modal
      } else { 
        console.error('Erro ao enviar o livro'); // Caso ocorra erro, loga no console
      }
    } catch (error) {
      console.error('Erro ao enviar o livro:', error);  // Loga qualquer erro de requisição
    }
  };

  const getImageSrc = () => {
    if (bookData.coverImage instanceof File) {
      // Se coverImage for um arquivo, usa o URL.createObjectURL para gerar um link temporário
      return URL.createObjectURL(bookData.coverImage);
    } else if (bookData.coverImage) {
      return `http://localhost:5000${bookData.coverImage}`; // Se houver uma URL, concatena com o prefixo
    }
    return ''; // Se não houver imagem, retorna uma string vazia
  };

  if (!showForm) return null;  // Se showForm for false, não renderiza o modal

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
              rows={4} // Define a altura inicial (4 linhas)
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
                      onChange={handleImageChange}  // Função para tratar o upload da imagem
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

export default BookAddModal;
