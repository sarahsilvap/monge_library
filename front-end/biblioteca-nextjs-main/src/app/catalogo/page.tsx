"use client";

import '../globals.css';
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

const Carousel = () => {
  const sliderRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slideNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const slidePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleMouseEnter = (direction: "left" | "right") => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (direction === "right") {
        slideNext();
      } else {
        slidePrev();
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  return (
    <div className="relative mt-10 px-20">
      <div
        className="absolute left-0 top-0 h-full w-1/12 z-10 cursor-pointer"
        onMouseEnter={() => handleMouseEnter("left")}
        onMouseLeave={handleMouseLeave}
      />
      <div
        className="absolute right-0 top-0 h-full w-1/12 z-10 cursor-pointer"
        onMouseEnter={() => handleMouseEnter("right")}
        onMouseLeave={handleMouseLeave}
      />

      <Slider ref={sliderRef} {...settings}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="p-5" key={index}>
            <div
              className="bg-white rounded-md shadow-md text-center flex flex-col justify-center items-center"
              style={{ width: "150px", height: "250px" }}
            >
              <h2 className="text-lg font-semibold">Categoria {index + 1}</h2>
              <p className="text-sm mt-2">Descrição da categoria.</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const Catalogo = () => {
  return (
    <div className="bg-gray-100 py-10">
      <h1 className="text-3xl text-center font-bold">Catálogo de Livros</h1>
      <p className="text-center mt-5 text-lg">
        Explore nossa vasta coleção de livros, e-books e outros materiais.
        Encontre seu próximo livro favorito agora!
      </p>
      <div className="flex justify-center mt-10">
        <Link href="/explore">
          <Button size="lg">Explore o Catálogo</Button>
        </Link>
      </div>

      <Carousel /> {/* Primeiro carrossel */}
      <Carousel /> {/* Segundo carrossel */}
      <Carousel />
      <Carousel />
    </div>
  );
};

export default Catalogo;
