"use client"; // Indica que este é um Client Component

import React, { useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import HeaderAdm from "@/components/HeaderAdm";

const AdminPage = () => {
  // Estado para o valor da pesquisa
  const [query, setQuery] = useState("");

  // Estado para ordenar os alunos por nome ou RA
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" ou "desc"
  const [sortedBy, setSortedBy] = useState("name"); // Pode ser "name" ou "ra"

  // Dados de exemplo para os alunos
  const [students, setStudents] = useState([
    {
      id: 1,
      ra: "2456",
      name: "Sarah da Silva Pereira",
      status: "OK",
      emprestimos: [
        {
          livroId: 1,
          titulo: "O Senhor dos Anéis",
          dataEmprestimo: "2024-10-01",
          dataDevolucao: "2024-10-15"
        },
        {
          livroId: 2,
          titulo: "Harry Potter e a Pedra Filosofal",
          dataEmprestimo: "2024-10-05",
          dataDevolucao: "2024-10-20"
        }
      ]
    },
    {
      id: 2,
      ra: "1234",
      name: "João da Silva",
      status: "OK",
      emprestimos: [
        {
          livroId: 3,
          titulo: "O Hobbit",
          dataEmprestimo: "2024-09-15",
          dataDevolucao: "2024-10-10"
        }
      ]
    }
  ]);

  // Função para filtrar os alunos
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.ra.includes(query.toLowerCase())
    );
  });

  // Função para ordenar os alunos
  const sortStudents = (students) => {
    return students.sort((a, b) => {
      const valueA = sortedBy === "name" ? a.name : a.ra;
      const valueB = sortedBy === "name" ? b.name : b.ra;

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  // Função para adicionar empréstimo
  const addEmprestimo = (studentId, livroId, titulo) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        const newEmprestimo = {
          livroId,
          titulo,
          dataEmprestimo: new Date().toISOString().split("T")[0],
          dataDevolucao: "", // Pode ser preenchido depois
        };
        return { ...student, emprestimos: [...student.emprestimos, newEmprestimo] };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  // Função para remover empréstimo
  const removeEmprestimo = (studentId, livroId) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        const updatedEmprestimos = student.emprestimos.filter(
          (emp) => emp.livroId !== livroId
        );
        return { ...student, emprestimos: updatedEmprestimos };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  // Função para alternar a ordenação
  const handleSortChange = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortedBy(sortBy);
  };

  // Usando o useRouter para navegar entre páginas
  // const router = useRouter();

  // Função para redirecionar para a página de empréstimos atrasados
  const navigateToAtrasados = () => {
    router.push("/");
  };

  return (
    <div>
      <HeaderAdm />
      <div className="pt-24">
        <div className="grid grid-cols-8 gap-6">
          <div className="col-start-1 col-span-8 p-6 mx-auto">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl">Gerenciar Alunos</h1>
                <button>
                  <RiUserAddLine fill="#3B82F6" size={26} />
                </button>
              </div>
              <div className="flex w-1/3 justify-end">
                {/* Campo de Pesquisa */}
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou RA"
                  className="p-2 w-full rounded-md border border-gray-300"
                  value={query}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th
                    className="p-3 border-b rounded-md min-w-[150px] cursor-pointer"
                    onClick={() => handleSortChange("ra")}
                  >
                    RA {sortedBy === "ra" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="p-3 border-b rounded-md min-w-[300px] cursor-pointer"
                    onClick={() => handleSortChange("name")}
                  >
                    Nome {sortedBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">Empréstimos</th>
                  <th className="p-3 border-b rounded-md min-w-[300px]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sortStudents(filteredStudents).map((student) => (
                  <tr key={student.id}>
                    <td className="border-b p-2 text-center">{student.ra}</td>
                    <td className="border-b p-2 text-center">{student.name}</td>
                    <td className="border-b p-2 text-center">
                      <ul>
                        {student.emprestimos.length > 0 ? (
                          student.emprestimos.map((emp) => (
                            <li key={emp.livroId}>
                              {emp.titulo} - Devolução: {emp.dataDevolucao || "Pendente"}
                              <button
                                className="bg-red-500 text-white py-1 px-2 ml-2 rounded"
                                onClick={() => removeEmprestimo(student.id, emp.livroId)}
                              >
                                Remover
                              </button>
                            </li>
                          ))
                        ) : (
                          <span>Nenhum empréstimo</span>
                        )}
                      </ul>
                    </td>
                    <td className="border-b p-2 text-center">
                      <button
                        className="bg-green-500 text-white py-1 px-4 rounded"
                        onClick={() => addEmprestimo(student.id, 3, "O Hobbit")}
                      >
                        Adicionar Empréstimo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Botão para acessar os empréstimos atrasados */}
            <div className="flex justify-center mt-4">
              <button
                onClick={navigateToAtrasados}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Ver Empréstimos Atrasados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;