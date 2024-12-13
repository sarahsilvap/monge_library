'use client'; // Indica que este é um Client Component

import Image from 'next/image'; // Importa o componente de imagem do Next.js, que é otimizado para renderização no lado do cliente.
import Link from 'next/link';  // Importa o componente Link do Next.js para navegação entre páginas.
import { SlArrowLeft } from 'react-icons/sl';  // Importa o ícone de seta para voltar da biblioteca react-icons.
import { Button } from '@nextui-org/react'; // Importa o componente Button da biblioteca @nextui-org/react.
import { useForm } from 'react-hook-form'; // Importa o hook useForm do react-hook-form para gerenciamento de formulários.
import { useRouter } from 'next/navigation'; // Importa o hook useRouter para navegação no Next.js.
import Cookies from 'js-cookie'; // Importa a biblioteca js-cookie para manipulação de cookies no lado do cliente.

interface FormData {
  email: string;  // Define o tipo para o campo 'email' como uma string.
  senha: string; // Define o tipo para o campo 'senha' como uma string.
}

const Login = () => { // Define o componente funcional Login.
  const {
    register, // Função para registrar campos de entrada do formulário.
    handleSubmit, // Função para processar a submissão do formulário.
    formState: { errors }, // Estado do formulário, incluindo os erros de validação.
  } = useForm<FormData>(); // Chama o hook useForm para gerenciar o estado e a validação do formulário.

  const router = useRouter(); // Cria uma instância do useRouter para navegação programática entre as páginas.

  const sendForm = async (data: FormData) => { // Função assíncrona chamada ao enviar o formulário.
    try {
      console.log("foi") // Exibe "foi" no console para depuração, indicando que o formulário foi enviado.

      const response = await fetch('http://localhost:5000/api/auth/login', { // Faz uma requisição POST para a API de login.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição como JSON.
        },
        body: JSON.stringify(data), // Converte os dados do formulário para o formato JSON e os envia no corpo da requisição.
      });

      if (!response.ok) { // Verifica se a resposta da API é bem-sucedida.
        alert('Erro no login. Verifique suas credenciais.'); // Exibe um alerta se a resposta for negativa.
      }

      const { token } = await response.json(); // Converte a resposta JSON da API e extrai o token.

      Cookies.set('token', token, { expires: 0.04 });  // Armazena o token no cookie com uma expiração de 0.04 dias (cerca de 1 hora).

      router.push('/'); // Redireciona o usuário para a página principal após o login bem-sucedido.
    } catch (error) {
      console.log(error); // Exibe qualquer erro no console caso ocorra durante a requisição.
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
