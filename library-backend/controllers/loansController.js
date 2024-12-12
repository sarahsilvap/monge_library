const dotenv = require('dotenv');
dotenv.config(); // Garantir que as variáveis de ambiente sejam carregadas antes de usá-las

const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Book = require("../models/book");

// Middleware para verificar o token
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Pega o token do cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token não encontrado' });
  }

  try {
    const secret = process.env.JWT_SECRET; // Verifica a variável de ambiente para a chave secreta
    const decoded = jwt.verify(token, secret);  // Verifica o token com a chave secreta
    req.userId = decoded.id;  // Adiciona o id do usuário ao objeto de requisição
    next();  // Chama o próximo middleware ou a rota
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token inválido ou expirado' });
  }
};

// Função para realizar empréstimo de livro
const realizarEmprestimo = async (req, res) => {
  const { bookId, dias } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(400).json({
        success: false,
        message: "Usuário ou livro não encontrados.",
      });
    }

    if (book.alugado) {
      return res.status(400).json({ success: false, message: "Livro já está alugado." });
    }

    // Marca o livro como alugado
    book.alugado = true;
    await book.save();

    // Adiciona o empréstimo ao usuário
    user.emprestimos.push({
      titulo: book.title,
      dataEmprestimo: new Date(),
      dataDevolucao: new Date(Date.now() + dias * 24 * 60 * 60 * 1000), // Calcula a devolução
    });
    await user.save();

    res.status(200).json({ success: true, message: "Empréstimo realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao realizar empréstimo:", error);
    res.status(500).json({
      success: false,
      message: "Erro no servidor.",
      error: error.message,
    });
  }
};

// Função para realizar devolução de livro
const realizarDevolucao = async (req, res) => {
  const userId = req.userId; // Obtém o ID do usuário a partir do token
  const { titulo } = req.body; // Obtém o título do livro enviado na requisição

  if (!titulo) {
      return res.status(400).json({ success: false, message: "O título do livro é obrigatório." });
  }

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ success: false, message: "Usuário não encontrado." });
      }

      // Encontra o índice do empréstimo do livro no array de empréstimos
      const emprestimoIndex = user.emprestimos.findIndex(emprestimo => emprestimo.titulo === titulo);

      if (emprestimoIndex === -1) {
          return res.status(404).json({ success: false, message: "Empréstimo do livro não encontrado." });
      }

      // Remove o empréstimo do array
      user.emprestimos.splice(emprestimoIndex, 1);

      // Salva o usuário com os empréstimos atualizados
      await user.save();

      res.status(200).json({
          success: true,
          message: `O livro "${titulo}" foi devolvido com sucesso.`,
      });
  } catch (error) {
      console.error("Erro ao realizar devolução:", error);
      res.status(500).json({ success: false, message: "Erro ao processar a devolução.", error: error.message });
  }
};

module.exports = { realizarEmprestimo, realizarDevolucao, verificarToken };
