// Criando as rotas
const express = require('express'); // Importa o express para criar o servidor
const Book = require('../models/book.js'); // Importa o modelo dos livros
const router = express.Router(); // Cria o roteador
const multer = require('multer'); // Importando o multer
const path = require('path'); // Para manipulação de caminhos de arquivos

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Gera um nome único para o arquivo
    }
});

const upload = multer({ storage: storage });

// **** CRIAÇÃO (POST) ****
router.post('/', async (req, res) => {
    const { title, author, year } = req.body; // Extrai os dados da requisição
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;
    
    try {
        const newBook = new Book({ title, author, year, coverImage });
        await newBook.save();
        res.status(201).json(newBook); // Corrigido 'newBok' para 'newBook'
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
});

// **** LEITURA (GET) ****
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Erro ao criar livro:", error); // Exibe o erro no console do servidor
        res.status(500).json({ message: 'Erro ao criar livro', error: error.message });
    }
});

// **** ATUALIZAÇÃO (PUT) ****
router.put('/:id',  upload.single('coverImage'), async (req, res) => {
    const { title, author, year } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;
    
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            { title, author, year, coverImage }, 
            { new: true }
        );
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
});

// **** EXCLUSÃO (DELETE) ****
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error }); // Corrigido para status 500
    }
});

module.exports = router;
