"use client";

import Image from "next/image";
import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import FormCadastro from "@/components/FormCadastro";

interface FormData {
    nome: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    ra: string;
    num: number;
    senha: string;
    confirmSenha: string;
}

const Cadastro = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            {/* Imagem de fundo */}
            <div className="relative w-full h-full">
                <Image
                
                    src="/image/livro-login.jpg"
                    alt="Imagem de Livros"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="left"
                />
            </div>

            <div className="relative flex items-center justify-center bg-white shadow-lg rounded-lg w-full p-6 md:p-8">
                <div className="absolute top-4 left-2">
                    <Link href={"/login"}>
                        <Button variant="shadow" className="p-0 rounded-full bg-gray-190 hover:bg-gray-200">
                            <SlArrowLeft size={20} />
                        </Button>
                    </Link>
                </div>

                <div className="absolute top-8 right-7">
                    <Link href="/">
                        <Image
                            src="/image/logoverde.png"
                            alt="Logo"
                            width={200}
                            height={73.87}
                        />
                    </Link>
                </div>
                <FormCadastro />
            </div>
        </div>
    );
};

export default Cadastro;
