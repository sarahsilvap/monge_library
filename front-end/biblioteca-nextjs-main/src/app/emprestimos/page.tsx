'use client'; // Indica que este é um Client Component

import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useRouter } from 'next/navigation'; // Importa useRouter da versão de navegação do Next.js 13
import Cookies from 'js-cookie';

const Emprestimos = () => {
  const [query, setQuery] = useState('');
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Flag para verificar se é no cliente

  const router = useRouter(); // useRouter no lado do cliente

  // Função para remover empréstimo
  const removeEmprestimo = async (titulo: string) => {
    if (!student) return;

    const token = Cookies.get('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    try {
      // Chama a API para remover o empréstimo
      const response = await fetch('http://localhost:5000/api/loans', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo }), // Envia o título como parte do corpo
      });

      if (!response.ok) {
        throw new Error('Erro ao remover o empréstimo');
      }

      // Atualiza os empréstimos no estado local
      const updatedEmprestimos = student.emprestimos.filter(
        (emp: any) => emp.titulo !== titulo
      );

      setStudent({
        ...student,
        emprestimos: updatedEmprestimos,
      });
    } catch (error) {
      console.error('Erro ao remover o empréstimo:', error);
    }
  };

  useEffect(() => {
    setIsClient(true); // Marca que o componente foi montado no cliente

    const token = Cookies.get('token');
    if (!token) {
      console.log('Token não encontrado. Redirecionando para login...');
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/loans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do aluno');
        }

        const alunoLogado = await response.json();
        setStudent(alunoLogado); // Armazena os dados do aluno
      } catch (error) {
        console.error('Erro ao obter dados do aluno:', error);
        router.push('/login'); // Redireciona para login se houver erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData();
  }, [router]);

  if (!isClient) {
    return null; // Retorna nada enquanto não está no cliente
  }

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
