/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from 'react'; // Importa hooks do React.
import Slider from 'react-slick'; // Importa o componente Slider da biblioteca react-slick.
import 'slick-carousel/slick/slick.css'; // Importa o arquivo de estilo do slick carousel.
import 'slick-carousel/slick/slick-theme.css'; // Importa o arquivo de estilo do tema do slick carousel.
import { Button } from '@nextui-org/react'; // Importa o componente Button da biblioteca NextUI.
import BookShowModal from './ModalShowBook';  // Importa o componente ModalShowBook, que exibe o modal com mais informações sobre o livro.

const Carousel = ({ books }: CarouselProps) => { // Componente funcional Carousel recebe uma prop 'books'.
  const sliderRef = useRef<any>(null); // Cria uma referência para o slider, usada para controlar o carrossel programaticamente.
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined); // Cria uma referência para armazenar o intervalo do carrossel automático.
  const [isClient, setIsClient] = useState(false); // Estado para verificar se o componente está sendo renderizado no cliente.
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal.
  const [selectedBook, setSelectedBook] = useState(null); // Estado para armazenar o livro selecionado.

  const openModal = (book) => { // Função para abrir o modal e passar o livro selecionado.
    setSelectedBook(book); // Define o livro atual
    setIsModalOpen(true); // Abre o modal
  };
 
  const closeModal = () => { // Função para fechar o modal.
    setSelectedBook(null); // Limpa o livro selecionado
    setIsModalOpen(false); // Fecha o modal
  };

  const handleRentBook = (book) => { // Função chamada quando o botão "Alugar" é pressionado.
    console.log(`Alugando o livro: ${book.title}`); // Apenas imprime no console o livro alugado.
    
  };
  
  useEffect(() => { // Hook useEffect que será executado uma vez após a montagem do componente.
    // Marca como client-side após a primeira renderização
    setIsClient(true);
  }, []);

  const settings = { // Configurações do carrossel slick.
    dots: false, // Desativa os pontos de navegação.
    infinite: true, // Permite que o carrossel se mova infinitamente.
    speed: 500, // Define a velocidade da transição de slides.
    slidesToShow: 8, // Exibe 8 slides ao mesmo tempo.
    slidesToScroll: 1, // Move 1 slide por vez.
    responsive: [ // Configurações responsivas para diferentes larguras de tela.
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

  const slideNext = () => { // Função para mover o carrossel para o próximo slide.
    if (sliderRef.current) { 
      sliderRef.current.slickNext(); // Chama o método slickNext() no slider.
    }
  };

  const slidePrev = () => {  // Função para mover o carrossel para o slide anterior.
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // Chama o método slickPrev() no slider.
    }
  };

  const handleMouseEnter = (direction: 'left' | 'right') => { // Inicia um intervalo para mover o carrossel automaticamente ao passar o mouse.
    if (intervalRef.current) return; // Se o intervalo já estiver ativo, não faz nada.

    intervalRef.current = setInterval(() => { // Cria um intervalo para mover o carrossel automaticamente.
      if (direction === 'right') {
        slideNext(); // Move para o próximo slide.
      } else {
        slidePrev(); // Move para o slide anterior.
      }
    }, 200);  // A cada 200ms.
  };

  const handleMouseLeave = () => { // Limpa o intervalo quando o mouse sai da área do carrossel.
    clearInterval(intervalRef.current); // Limpa o intervalo.
    intervalRef.current = undefined; // Reseta a referência do intervalo.
  };

  // Renderiza o carrossel apenas no cliente
  if (!isClient) { // Se não for renderizado no cliente, retorna null para não renderizar o carrossel.
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

      <Slider ref={sliderRef} {...settings}> // Slider com as configurações definidas acima.
        {books?.map((book) => ( // Mapeia os livros recebidos na prop 'books'.
          <div className="p-5 mt-6" key={book.id}> // Cada livro é renderizado em um slide.
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
        onRent={() => handleRentBook(selectedBook)} // Função para alugar o livro.
      />
    </div>
  );
};

export default Carousel;
