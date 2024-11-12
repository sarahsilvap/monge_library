"use client";

import Image from "next/image";
import Link from 'next/link'
import { SlArrowLeft } from "react-icons/sl";
import { Button } from "@nextui-org/react";

const Login = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            {/*Imagem à esquerda*/}
            <div className="relative w-full h-full">
                <Image
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
                    <Link href={"/"}>
                        <Button variant="shadow" className="p-0 rounded-full bg-gray-190 hover:bg-gray-200">
                            <SlArrowLeft
                                size={20} />
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

                <div className="flex flex-col w-100 -mt-64">
                    <h2 className="text-left text-2xl mb-4">Login</h2>
                    <h3 className="text-left mb-6 text-sm text-gray-600">
                        Acesse sua conta para gerenciar seus agendamentos de livros.</h3>
                    <h4 className="ml-3 text-sm">E-mail:</h4>
                    <input
                        type="text"
                        placeholder="E-mail"
                        className="max-w-[22vw] w-full p-2 mb-4 border rounded mx-auto"
                    />
                    <h5 className="ml-3 text-sm">Senha:</h5>
                    <input
                        type="password"
                        placeholder="Senha"
                        className="max-w-[22vw] w-full p-2 mb-6 border rounded mx-auto"
                    />
                    <Link href="/" className="text-[#3ba580] mb-6 text-sm text-center">Esqueci minha senha</Link>
                    <button className="bg-[#194737] text-white text-xs py-3 rounded-full w-64 mt-auto mx-auto">
                        ACESSAR CONTA
                    </button>
                </div>

                <div className="absolute bottom-20 text-center w-[50%] bg-gray-200 py-3 px-6 rounded-xl">
                    <h1>Ainda não tem uma conta? <Link href="/cadastro" className="text-[#3ba580]">Criar agora</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default Login;
