"use client";

import "./globals.css";
import Carousel from "@/components/Carousel";

const Home = () => {
  return (
    <div className="bg-gray-100 py-10">
      <h1 className="text-2xl text-center font-medium">Sejam bem-vindos ao Cantinho da Leitura!</h1>
      <p className="text-center mt-5 text-base">
        Explore nossa vasta coleção de livros, e-books e outros materiais.
        Encontre seu próximo livro favorito agora!
      </p>
      <div>
        <h1 className="absolute left-10 font-medium text-lg">Novidades</h1>
        <Carousel />
      </div>
      <Carousel /> 
      <Carousel />
      <Carousel />
    </div>
  );
};

export default Home;