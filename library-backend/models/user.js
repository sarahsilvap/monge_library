const mongoose = require("mongoose");

// Define o esquema de usuario

const EmprestimoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  dataEmprestimo: { type: Date, default: Date.now },
  dataDevolucao: { type: Date, required: false },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  telefone: { type: String, required: true },
  ra: { type: String, required: true },
  cep: { type: String, required: true },
  rua: { type: String, required: true },
  num: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  roles: { type: [String], default: ["Aluno"] },
  emprestimos: { type: [EmprestimoSchema], default: [] },
});

// Exporta o modelo de usuário

module.exports = mongoose.model("User", userSchema);
