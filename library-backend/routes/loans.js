const express = require("express");
const { realizarEmprestimo, realizarDevolucao } = require("../controllers/loansController");
const verificarToken = require("../middlewares/verificarToken");
const router = express.Router();
const User = require('../models/user');

// Rota para criar um empréstimo
router.post("/", verificarToken, realizarEmprestimo);

// Rota para devolver um livro
router.put("/", verificarToken, realizarDevolucao);

// Rota para pegar os empréstimos do usuário
router.get("/", verificarToken, async (req, res) => {
    const userId = req.userId;  // Certifique-se de que o ID está sendo extraído corretamente
    console.log('ID do usuário:', userId);

    try {
        const user = await User.findById(userId);

        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(400).json({ success: false, message: "Usuário não encontrado" });
        }

        // Função para formatar as datas no formato brasileiro
        const formatDate = (date) => {
            if (!date) return null;
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).format(new Date(date));
        };

        // Formatar as datas dos empréstimos antes de enviá-las na resposta
        const emprestimos = user.emprestimos.map(emprestimo => ({
            ...emprestimo.toObject(), // Transforma o Mongoose Document em um objeto simples
            dataEmprestimo: formatDate(emprestimo.dataEmprestimo),
            dataDevolucao: formatDate(emprestimo.dataDevolucao),
        }));

        console.log('Empréstimos encontrados:', emprestimos);

        res.status(200).json({
            success: true,
            emprestimos,
        });
    } catch (error) {
        console.error('Erro ao buscar dados do aluno:', error);
        res.status(500).json({ success: false, message: "Erro no servidor", error: error.message });
    }
});

module.exports = router;
