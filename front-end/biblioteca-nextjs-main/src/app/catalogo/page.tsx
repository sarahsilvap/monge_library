"use client";

import "../globals.css";
import { Button } from "@nextui-org/react";
import Carousel from "@/components/Carousel";

const Catalogo = () => {
  return (
    <div className="bg-gray-100 py-10">
      <h1 className="text-3xl text-center font-bold">Catálogo de Livros</h1>
      <p className="text-center mt-5 text-lg">
        Explore nossa vasta coleção de livros, e-books e outros materiais.
        Encontre seu próximo livro favorito agora!
      </p>
      <div className="flex justify-center mt-10">
        <Button variant="shadow">TESTE</Button>
      </div>
      <Carousel /> {/* Primeiro carrossel */}
      <Carousel /> {/* Segundo carrossel */}
      <Carousel />
      <Carousel />
    </div>
  );
};

export default Catalogo;
