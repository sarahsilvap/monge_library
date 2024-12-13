'use client'; // Indica que este é um Client Component no Next.js.

import { useEffect, useState } from 'react'; // Importa os hooks useEffect e useState do React.
import './globals.css'; // Importa o arquivo CSS global.
import Carousel from '@/components/Carousel'; // Importa o componente Carousel de um diretório local.
import { Spinner } from '@nextui-org/react'; // Importa o componente Spinner da biblioteca NextUI para exibir uma animação de carregamento.

const Home = () => {  // Define o componente Home como uma função.
  const [loading, setLoading] = useState(true); // Declara o estado 'loading' para controlar o estado de carregamento da página.
  const [books, setBooks] = useState<Books[] | null>(null); // Estado para armazenar os livros recuperados da API, com tipo 'Books[]' ou null.
  const [booksByCategory, setBooksByCategory] = useState<Record<string, Books[]>>({}); // Estado para armazenar os livros agrupados por categoria.

  const fetchBooks = async () => { // Função assíncrona para buscar os livros da API.
    try {
      const response = await fetch('http://localhost:5000/api/books'); // Faz uma requisição GET para a API de livros.
      const data = await response.json(); // Converte a resposta da requisição para JSON.
      setBooks(data); // Armazena os livros recebidos no estado 'books'.

      // Agrupa os livros por categoria
      const categorizedBooks = data.reduce((acc: Record<string, Books[]>, book: Books) => {
        const category = book.category || 'Sem Categoria'; // Se não houver categoria, a categoria será 'Sem Categoria'.
        if (!acc[category]) { // Se a categoria não existir no objeto 'acc', cria um array vazio.
          acc[category] = [];
        }
        acc[category].push(book); // Adiciona o livro à categoria correspondente.
        return acc; // Retorna o objeto acumulado.
      }, {});

      setBooksByCategory(categorizedBooks); // Armazena os livros agrupados no estado 'booksByCategory'.
    } catch (error) {
      console.error('Erro ao carregar os livros:', error); // Caso ocorra um erro na requisição, exibe no console.
    } finally {
      setLoading(false); // Após a requisição (sucesso ou falha), define 'loading' como false para indicar que o carregamento acabou.
    }
  };

  useEffect(() => { // Hook useEffect que é executado uma vez após a renderização inicial do componente.
    fetchBooks(); // Chama a função 'fetchBooks' para buscar os livros da API.
  }, []); // O array vazio garante que o efeito só será executado uma vez.

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-center font-medium pt-6">Catálogo de Livros</h1>
      {loading ? ( // Condicional que verifica o estado 'loading'.
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div>
          {Object.keys(booksByCategory).map((category) => ( // Itera pelas categorias de livros.
            <div key={category} className="mt-8"> // Para cada categoria, renderiza um bloco com o nome da categoria e o carrossel de livros.
              <h2 className="absolute left-12 font-medium text-lg">{category}</h2> // Título da categoria.
              <Carousel books={booksByCategory[category]} /> // Exibe o componente Carousel com os livros da categoria.
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
