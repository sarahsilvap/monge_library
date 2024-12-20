'use client'; // Este componente é um "client-side" React Component, ou seja, deve ser renderizado no cliente.

import Image from 'next/image'; // Importa o componente Image do Next.js para exibição de imagens
import Link from 'next/link';  // Importa o componente Link do Next.js para navegação entre páginas
import { SlArrowLeft } from 'react-icons/sl'; // Importa um ícone de seta para a esquerda
import { Button } from '@nextui-org/react';  // Importa o componente Button da biblioteca NextUI
import { useForm } from 'react-hook-form'; // Importa o hook 'useForm' da biblioteca react-hook-form para gerenciar formulários
import { useRouter } from 'next/navigation'; // Importa o hook 'useRouter' do Next.js para navegar entre páginas

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
    const {
        register,  // Função do react-hook-form para registrar os campos do formulário
        handleSubmit, // Função para lidar com o envio do formulário
        getValues, // Função para acessar os valores atuais dos campos do formulário
        formState: { errors }, // Objeto que contém erros de validação dos campos
    } = useForm<FormData>(); // Inicializa o hook do react-hook-form com os dados definidos na interface FormData

    const router = useRouter(); // Cria uma instância do useRouter para navegar entre páginas

    const sendForm = async (data: FormData) => { // Função para enviar o formulário
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', { // Envia os dados do formulário para o backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Converte os dados para JSON
            });

            if (response.ok) { // Se a resposta for bem-sucedida
                alert('Usuário criado com sucesso.'); // Exibe uma mensagem de sucesso

                router.push('/login'); // Redireciona para a página de login
            }
        } catch (error) {
            console.log(error);  // Se ocorrer um erro, ele é mostrado no console
        }
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
                    <Link href={'/login'}>
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
                            width={200}
                            height={73.87}
                        />
                    </Link>
                </div>

                <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-center mb-6">Cadastro</h2>

                    <form
                        onSubmit={handleSubmit(sendForm)}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {/* Nome Completo */}
                        <div className="col-span-2 sm:col-span-4">
                            <label
                                htmlFor="nome"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nome Completo
                            </label>
                            <input
                                id="nome"
                                type="text"
                                {...register('nome', { required: 'Nome é obrigatório' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.nome && (
                                <p className="text-sm text-red-500">{errors.nome.message}</p>
                            )}
                        </div>

                        {/* Data de Nascimento */}
                        <div className="col-span-2">
                            <label
                                htmlFor="dataNascimento"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Data de Nascimento
                            </label>
                            <input
                                id="dataNascimento"
                                type="date"
                                {...register('dataNascimento', {
                                    required: 'Data de nascimento é obrigatória',
                                })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.dataNascimento && (
                                <p className="text-sm text-red-500">
                                    {errors.dataNascimento.message}
                                </p>
                            )}
                        </div>

                        {/* Telefone */}
                        <div className="col-span-2">
                            <label
                                htmlFor="telefone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Telefone
                            </label>
                            <input
                                id="telefone"
                                type="tel"
                                {...register('telefone', {
                                    required: 'Número de telefone é obrigatório',
                                })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.telefone && (
                                <p className="text-sm text-red-500">
                                    {errors.telefone.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="col-span-3">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email é obrigatório',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Email inválido',
                                    },
                                })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* RA */}
                        <div className="col-span-1">
                            <label
                                htmlFor="ra"
                                className="block text-sm font-medium text-gray-700"
                            >
                                RA do Aluno
                            </label>
                            <input
                                id="ra"
                                type="text"
                                {...register('ra', {
                                    required: 'RA é obrigatório',
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message:
                                            'RA inválido, deve ser composto apenas por números.',
                                    },
                                })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.ra && (
                                <p className="text-sm text-red-500">{errors.ra.message}</p>
                            )}
                        </div>

                        {/* CEP */}
                        <div className="col-span-1">
                            <label
                                htmlFor="cep"
                                className="block text-sm font-medium text-gray-700"
                            >
                                CEP
                            </label>
                            <input
                                id="cep"
                                type="text"
                                {...register('cep', { required: 'CEP é obrigatório' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.cep && (
                                <p className="text-sm text-red-500">{errors.cep.message}</p>
                            )}
                        </div>

                        {/* Rua */}
                        <div className="col-span-2">
                            <label
                                htmlFor="rua"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Rua
                            </label>
                            <input
                                id="rua"
                                type="text"
                                {...register('rua', { required: 'Rua é obrigatória' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.rua && (
                                <p className="text-sm text-red-500">{errors.rua.message}</p>
                            )}
                        </div>

                        {/* Número */}
                        <div className="col-span-1">
                            <label
                                htmlFor="cep"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Número
                            </label>
                            <input
                                id="num"
                                type="text"
                                {...register('num', { required: 'Número é obrigatório' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.cep && (
                                <p className="text-sm text-red-500">{errors.cep.message}</p>
                            )}
                        </div>

                        {/* Bairro */}
                        <div className="col-span-2">
                            <label
                                htmlFor="bairro"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Bairro
                            </label>
                            <input
                                id="bairro"
                                type="text"
                                {...register('bairro', { required: 'Bairro é obrigatório' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.bairro && (
                                <p className="text-sm text-red-500">{errors.bairro.message}</p>
                            )}
                        </div>

                        {/* Cidade */}
                        <div className="col-span-2">
                            <label
                                htmlFor="cidade"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Cidade
                            </label>
                            <input
                                id="cidade"
                                type="text"
                                {...register('cidade', { required: 'Cidade é obrigatória' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.cidade && (
                                <p className="text-sm text-red-500">{errors.cidade.message}</p>
                            )}
                        </div>

                        {/* Senha */}
                        <div className="col-span-2">
                            <label
                                htmlFor="senha"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Senha
                            </label>
                            <input
                                id="senha"
                                type="password"
                                {...register('senha', { required: 'A senha é obrigatória' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.senha && (
                                <p className="text-sm text-red-500">{errors.senha.message}</p>
                            )}
                        </div>

                        {/* Confirmar Senha */}
                        <div className="col-span-2">
                            <label
                                htmlFor="confirmSenha"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirmar senha
                            </label>
                            <input
                                id="senha"
                                type="password"
                                {...register('confirmSenha', { required: 'Confirme a senha' })}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.confirmSenha && (
                                <p className="text-sm text-red-500">
                                    {errors.confirmSenha.message}
                                </p>
                            )}

                            {getValues().senha !== getValues().confirmSenha && (
                                <p className="text-sm text-red-500">
                                    As senhas não são iguais.
                                </p>
                            )}
                        </div>

                        {/* Botão de Enviar */}
                        <div className="col-start-2 col-span-2 flex justify-center">
                            <button
                                type="submit"
                                className="w-full p-3 bg-[#194737] text-white hover:bg-[#326d59] py-3 rounded-full"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;