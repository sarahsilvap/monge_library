/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
  books: Books[] | null;
}

const Carousel = ({ books }: CarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isClient, setIsClient] = useState(false); // Estado para controlar a renderização no cliente

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
            <div
              className="bg-white rounded-md shadow-md text-center flex flex-col justify-center items-center"
              style={{
                width: '180px',
                height: '250px',
                backgroundImage: `url(http://localhost:5000${book.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className='flex flex-col items-center justify-center pt-2'>
              <h2 className="text-base font-semibold text-center w-full break-words">{book.title}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
