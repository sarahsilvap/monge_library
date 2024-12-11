/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '@nextui-org/react';
import BookShowModal from './ModalShowBook';

const Carousel = ({ books }: CarouselProps) => {
  const sliderRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [selectedBook, setSelectedBook] = useState(null); // Livro selecionado

  const openModal = (book) => {
    setSelectedBook(book); // Define o livro atual
    setIsModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setSelectedBook(null); // Limpa o livro selecionado
    setIsModalOpen(false); // Fecha o modal
  };

  const handleRentBook = (book) => {
    console.log(`Alugando o livro: ${book.title}`);
    // Aqui você pode implementar a lógica de aluguel, como chamar um endpoint da API
  };
  
  useEffect(() => {
    // Marca como client-side após a primeira renderização
    setIsClient(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1630,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
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

  const handleMouseEnter = (direction: 'left' | 'right') => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (direction === 'right') {
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

  // Renderiza o carrossel apenas no cliente
  if (!isClient) {
    return null;
  }

  return (
    <div className="relative mt-10 px-10">
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[50px] w-1/12 z-10 cursor-pointer"
        onMouseEnter={() => handleMouseEnter('left')}
        onMouseLeave={handleMouseLeave}
      />
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 h-[50px] w-1/12 z-10 cursor-pointer"
        onMouseEnter={() => handleMouseEnter('right')}
        onMouseLeave={handleMouseLeave}
      />

      <Slider ref={sliderRef} {...settings}>
        {books?.map((book) => (
          <div className="p-5 mt-6" key={book.id}>
            <Button onClick={() => openModal(book)}
              className="bg-white rounded-md shadow-md text-center flex flex-col justify-center items-center"
              style={{
                width: '180px',
                height: '250px',
                backgroundImage: `url(http://localhost:5000${book.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></Button>
            <div className='flex flex-col items-center justify-center pt-2'>
              <h2 className="text-base font-semibold text-center w-full break-words">{book.title}</h2>
            </div>
          </div>
        ))}
      </Slider>

      <BookShowModal
        showBook={isModalOpen}
        bookData={selectedBook}
        onClose={closeModal}
        onRent={() => handleRentBook(selectedBook)}
      />
    </div>
  );
};

export default Carousel;
