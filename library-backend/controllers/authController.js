/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

// Função para registrar novos usuários
exports.register = async (req, res) => {
  try {
    const { email, senha, ...body } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria um novo usuário
    const newUser = new User({
      email,
      senha: hashedPassword,
      ...body,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error(error); // Loga o erro
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

// Função para fazer login de usuários
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca usuário pelo nome
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    // Compara a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch)
      return res.status(400).json({
        error: "Senha incorreta",
      });

    // Cria web token
    const token = jwt.sign(
      { id: user.id, roles: user.roles },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({ message: "Login realizado", token });
  } catch (error) {
    console.error(error); // Loga o erro
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
