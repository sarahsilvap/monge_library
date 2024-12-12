'use client';

import { useEffect, useState } from 'react';
import './globals.css';
import Carousel from '@/components/Carousel';
import { Spinner } from '@nextui-org/react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Books[] | null>(null);
  const [booksByCategory, setBooksByCategory] = useState<Record<string, Books[]>>({});

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books'); // URL do seu backend
      const data = await response.json();
      setBooks(data);

      // Agrupa os livros por categoria
      const categorizedBooks = data.reduce((acc: Record<string, Books[]>, book: Books) => {
        const category = book.category || 'Sem Categoria';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(book);
        return acc;
      }, {});

      setBooksByCategory(categorizedBooks);
    } catch (error) {
      console.error('Erro ao carregar os livros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-center font-medium pt-6">Catálogo de Livros</h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div>
          {Object.keys(booksByCategory).map((category) => (
            <div key={category} className="mt-8">
              <h2 className="absolute left-12 font-medium text-lg">{category}</h2>
              <Carousel books={booksByCategory[category]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
