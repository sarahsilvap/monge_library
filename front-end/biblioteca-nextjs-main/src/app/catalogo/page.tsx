"use client";

import { useEffect, useState } from "react";
import "../globals.css";
import Carousel from "@/components/Carousel";
import { Spinner } from "@nextui-org/react";

const Catalogo = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Books[] | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/books"); // URL do seu backend
      const data = await response.json();
      setBooks(data); // Atualiza o estado com os livros do backend
    } catch (error) {
      console.error("Erro ao carregar os livros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      <h1 className="text-2xl text-center font-medium">Catálogo de Livros</h1>
      <div>
        <h1 className="absolute left-10 font-medium text-lg">Novidades</h1>
        {loading ? (<Spinner />) : (<Carousel books={books} />)}
      </div>

    </div>
  );
};

export default Catalogo;