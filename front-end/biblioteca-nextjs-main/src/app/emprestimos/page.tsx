'use client'; // Indica que este é um Client Component

import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';  // Importa o ícone de lixeira para deletar empréstimos
import { useRouter } from 'next/navigation'; // Importa useRouter da versão de navegação do Next.js 13
import Cookies from 'js-cookie'; // Para gerenciar cookies no lado do cliente

const Emprestimos = () => {
  const [query, setQuery] = useState(''); // Estado para armazenar o termo de pesquisa
  const [student, setStudent] = useState<any>(null); // Estado para armazenar os dados do aluno
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados
  const [isClient, setIsClient] = useState(false); // Flag para verificar se é no cliente

  const router = useRouter(); // Instância do useRouter para navegação

  // Função para remover empréstimo
  const removeEmprestimo = async (titulo: string) => {
    if (!student) return;

    const token = Cookies.get('token'); // Obtém o token armazenado no cookie
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    try {
      // Faz a requisição para a API para remover o empréstimo
      const response = await fetch('http://localhost:5000/api/loans', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho para autenticação
        },
        body: JSON.stringify({ titulo }), // Envia o título como parte do corpo
      });

      if (!response.ok) {
        throw new Error('Erro ao remover o empréstimo');
      }

      // Atualiza a lista de empréstimos localmente após a remoção
      const updatedEmprestimos = student.emprestimos.filter(
        (emp: any) => emp.titulo !== titulo
      );

      setStudent({
        ...student,
        emprestimos: updatedEmprestimos, // Atualiza o estado de 'student' com os empréstimos restantes
      });
    } catch (error) {
      console.error('Erro ao remover o empréstimo:', error);
    }
  };

  useEffect(() => {
    setIsClient(true); // Marca que o componente foi montado no cliente

    const token = Cookies.get('token'); // Verifica se o token está disponível nos cookies
    if (!token) {
      console.log('Token não encontrado. Redirecionando para login...'); 
      router.push('/login');  // Redireciona para o login se o token não for encontrado
      return;
    }

    // Função para buscar os dados do aluno
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/loans', {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token para autenticação na API
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do aluno');
        }

        const alunoLogado = await response.json(); // Obtém os dados do aluno da resposta
        setStudent(alunoLogado); // Armazena os dados do aluno
      } catch (error) {
        console.error('Erro ao obter dados do aluno:', error);
        router.push('/login'); // Redireciona para login se houver erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData(); // Chama a função para buscar os dados assim que o componente for montado
  }, [router]); // O useEffect é executado apenas uma vez após o componente ser montado

  if (!isClient) {
    return null; // Retorna nada enquanto não está no cliente
  }

  // Filtra os empréstimos com base na consulta de pesquisa
  const filteredEmprestimos = student
    ? student.emprestimos.filter((emp: any) => {
        return (
          emp.titulo.toLowerCase().includes(query.toLowerCase()) ||
          emp.dataEmprestimo.includes(query) ||
          emp.dataDevolucao.includes(query)
        );
      })
    : [];

  if (loading) {
    return <div>Carregando...</div>; // Exibe um loading enquanto os dados estão sendo carregados
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="pt-10 mx-auto flex-1">
        <div className="grid grid-cols-8 gap-6">
          <div className="col-start-2 col-span-6 p-6 mx-auto max-w-7xl">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl">Meus Empréstimos</h1>
              </div>
              <div className="flex w-1/3 justify-end">
                {/* Campo de Pesquisa */}
                <input
                  type="text"
                  placeholder="Pesquisar por título ou data"
                  className="p-2 w-full rounded-md border border-gray-300"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tabela de Empréstimos */}
            <table className="w-full table-auto border-collapse justify-items-center justify-center">
              <thead>
                <tr>
                  <th className="p-3 border-b rounded-md min-w-[200px]">
                    Título
                  </th>
                  <th className="p-3 border-b rounded-md min-w-[200px]">
                    Data de Retirada
                  </th>
                  <th className="p-3 border-b rounded-md min-w-[200px]">
                    Data de Devolução
                  </th>
                  <th className="p-3 border-b rounded-md min-w-[200px]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmprestimos.length > 0 ? (
                  filteredEmprestimos.map((emp: any) => (
                    <tr key={emp.titulo}>
                      <td className="border-b p-2 text-center align-middle">{emp.titulo}</td>
                      <td className="border-b p-2 text-center align-middle">{emp.dataEmprestimo}</td>
                      <td className="border-b p-2 text-center align-middle">{emp.dataDevolucao}</td>
                      <td className="border-b p-2 text-center align-middle">
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded"
                          onClick={() => removeEmprestimo(emp.titulo)}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      Nenhum empréstimo encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emprestimos;
