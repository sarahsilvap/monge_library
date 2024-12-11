'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SlArrowLeft } from 'react-icons/sl';
import { Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface FormData {
  email: string;
  senha: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const sendForm = async (data: FormData) => {
    try {
      console.log("foi")

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert('Erro no login. Verifique suas credenciais.');
      }

      const { token } = await response.json();

      Cookies.set('token', token, { expires: 0.04 });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/*Imagem à esquerda*/}
      <div className="relative w-full h-full">
        <Image
          //   style={{ height: "auto", width: "auto" }}
          src="/image/livro-login.jpg"
          alt="Imagem de Livros"
          layout="fill"
          objectFit="cover"
          objectPosition="left"
        />
      </div>

      {/* Container do formulário*/}
      <div className="relative flex items-center justify-center bg-white shadow-lg rounded w-full flex-col">
        <div className="absolute top-4 left-2">
          <Link href={'/'}>
            <Button
              variant="shadow"
              className="p-0 rounded-full bg-gray-190 hover:bg-gray-200"
            >
              <SlArrowLeft size={20} />
            </Button>
          </Link>
        </div>

        <div className="absolute top-8 right-7">
          <Link href="/">
            <Image
              src="/image/logoverde.png"
              alt="Logo"
              width={304}
              height={73.87}
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit(sendForm)}>
          <div className="flex flex-col w-100 -mt-64">
            <h2 className="text-left text-2xl mb-4">Login</h2>
            <h3 className="text-left mb-6 text-sm text-gray-600">
              Acesse sua conta para gerenciar seus agendamentos de livros.
            </h3>
            <h4 className="ml-3 text-sm">E-mail:</h4>
            <input
              type="text"
              placeholder="E-mail"
              {...register('email', { required: 'Email é obrigatório' })}
              className="max-w-[22vw] w-full p-2 mb-4 border rounded mx-auto"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <h5 className="ml-3 text-sm">Senha:</h5>
            <input
              type="password"
              placeholder="Senha"
              {...register('senha', { required: 'A Senha é obrigatória' })}
              className="max-w-[22vw] w-full p-2 mb-6 border rounded mx-auto"
            />
            {errors.senha && (
              <p className="text-sm text-red-500">{errors.senha.message}</p>
            )}

            <Link
              href="/"
              className="text-[#3ba580] hover:text-[#6fd3b0] mb-6 text-sm text-center"
            >
              Esqueci minha senha
            </Link>
            <button className="bg-[#194737] hover:bg-[#326d59] text-white text-xs py-3 rounded-full w-64 mt-auto mx-auto">
              ACESSAR CONTA
            </button>
          </div>
        </form>

        <div className="absolute bottom-20 text-center w-[50%] bg-gray-200 py-3 px-6 rounded-xl">
          <h1>
            Ainda não tem uma conta? {" "}
            <Link
              href="/cadastro"
              className="text-[#3ba580] hover:text-[#6fd3b0]"
            >
              Criar agora
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
