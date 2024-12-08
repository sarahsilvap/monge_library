"use client";

import { useForm } from "react-hook-form";


const FormCadastro = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-6">Cadastro</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Nome Completo */}
                <div className="col-span-2 sm:col-span-4">
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input
                        id="nome"
                        type="text"
                        {...register('nome', { required: 'Nome é obrigatório' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
                </div>

                {/* Data de Nascimento */}
                <div className="col-span-2">
                    <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <input
                        id="dataNascimento"
                        type="date"
                        {...register('dataNascimento', { required: 'Data de nascimento é obrigatória' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.dataNascimento && <p className="text-sm text-red-500">{errors.dataNascimento.message}</p>}
                </div>

                {/* Telefone */}
                <div className="col-span-2">
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                        id="telefone"
                        type="tel"
                        {...register('telefone', { required: 'Número de telefone é obrigatório' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.telefone && <p className="text-sm text-red-500">{errors.telefone.message}</p>}
                </div>

                {/* Email */}
                <div className="col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email é obrigatório', pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Email inválido'
                            }
                        })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* RA */}
                <div className="col-span-1">
                    <label htmlFor="ra" className="block text-sm font-medium text-gray-700">RA do Aluno</label>
                    <input
                        id="ra"
                        type="text"
                        {...register('ra', {
                            required: 'RA é obrigatório', pattern: {
                                value: /^[0-9]+$/,
                                message: 'RA inválido, deve ser composto apenas por números.'
                            }
                        })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.ra && <p className="text-sm text-red-500">{errors.ra.message}</p>}
                </div>


                {/* CEP */}
                <div className="col-span-1">
                    <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
                    <input
                        id="cep"
                        type="text"
                        {...register('cep', { required: 'CEP é obrigatório' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cep && <p className="text-sm text-red-500">{errors.cep.message}</p>}
                </div>

                {/* Rua */}
                <div className="col-span-2">
                    <label htmlFor="rua" className="block text-sm font-medium text-gray-700">Rua</label>
                    <input
                        id="rua"
                        type="text"
                        {...register('rua', { required: 'Rua é obrigatória' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.rua && <p className="text-sm text-red-500">{errors.rua.message}</p>}
                </div>

                {/* Número */}
                <div className="col-span-1">
                    <label htmlFor="cep" className="block text-sm font-medium text-gray-700">Número</label>
                    <input
                        id="num"
                        type="text"
                        {...register('num', { required: 'Número é obrigatório' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cep && <p className="text-sm text-red-500">{errors.cep.message}</p>}
                </div>

                {/* Bairro */}
                <div className="col-span-2">
                    <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
                    <input
                        id="bairro"
                        type="text"
                        {...register('bairro', { required: 'Bairro é obrigatório' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.bairro && <p className="text-sm text-red-500">{errors.bairro.message}</p>}
                </div>

                {/* Cidade */}
                <div className="col-span-2">
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
                    <input
                        id="cidade"
                        type="text"
                        {...register('cidade', { required: 'Cidade é obrigatória' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cidade && <p className="text-sm text-red-500">{errors.cidade.message}</p>}
                </div>

                {/* Senha */}
                <div className="col-span-2">
                    <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                        id="senha"
                        type="text"
                        {...register('cidade', { required: 'Cidade é obrigatória' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.senha && <p className="text-sm text-red-500">{errors.senha.message}</p>}
                </div>

                {/* Confirmar Senha */}
                <div className="col-span-2">
                    <label htmlFor="confirmSenha" className="block text-sm font-medium text-gray-700">Confirmar senha</label>
                    <input
                        id="senha"
                        type="text"
                        {...register('cidade', { required: 'Cidade é obrigatória' })}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmSenha && <p className="text-sm text-red-500">{errors.confirmSenha.message}</p>}
                </div>

                {/* Botão de Enviar */}
                <div className="col-start-2 col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="w-full p-3 bg-[#194737] text-white hover:bg-[#326d59] py-3 rounded-full">
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormCadastro;