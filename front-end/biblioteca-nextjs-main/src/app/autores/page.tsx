"use client";

import Image from "next/image"; // Certifique-se de importar o Image
import { useState, useEffect } from "react";
import '../globals.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Escritores = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-left ml-4">Autores</h1>
      {isClient ? (
        <div className="flex gap-8 items-center justify-center flex-wrap">
          {/* Autor 1 */}
          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/Pedro-Bandeira.jpg"
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Pedro Bandeira</h2>
          </div>

          {/* Autor 2 */}
          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/machado-assis.jpg" // Substitua pelo caminho da imagem do autor 2
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Machado de Assis</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/clarice-lispector2.jpg" // Substitua pelo caminho da imagem do autor 3
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Clarisse Lispector</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/clarice-lispector2.jpg" // Substitua pelo caminho da imagem do autor 3
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Clarisse Lispector</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/clarice-lispector2.jpg" // Substitua pelo caminho da imagem do autor 3
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Clarisse Lispector</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/clarice-lispector2.jpg" // Substitua pelo caminho da imagem do autor 3
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Clarisse Lispector</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/clarice-lispector2.jpg" // Substitua pelo caminho da imagem do autor 3
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Clarisse Lispector</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/clarice-lispector2.jpg" // Substitua pelo caminho da imagem do autor 3
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Clarisse Lispector</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <Image
                src="/image/clarice-lispector2.jpg" // Substitua pelo caminho da imagem do autor 3
                alt="Avatar"
                width={128}
                height={128}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <h2 className="mt-2 text-center">Clarisse Lispector</h2>
          </div>
        </div>
      ) : (
        <p>Prerendered</p>
      )}
    </div>
  );
}

export default Escritores;
