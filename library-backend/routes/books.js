// Criando as rotas
const express = require("express"); // Importa o express para criar o servidor
const Book = require("../models/book.js"); // Importa o modelo dos livros
const router = express.Router(); // Cria o roteador
const multer = require("multer"); // Importando o multer
const path = require("path"); // Para manipulação de caminhos de arquivos

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        ); // Gera um nome único para o arquivo
    },
});

// Verifique a configuração de multer para aceitar o campo "coverImage"
const upload = multer({
    storage: storage, // Já definimos o storage com o destino do arquivo
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "coverImage") {
            return cb(null, true); 
        }
        cb(new Error("Unexpected field"), false); // Se o campo não for 'coverImage', retorna erro
    },
});

// **** CRIAÇÃO (POST) ****
router.post("/", upload.single("coverImage"), async (req, res) => {
    console.log(req.file);
    console.log("Dados recebidos no backend:", req.body); // Mostra os dados do livro
    console.log("Arquivo recebido:", req.file); // Mostra o arquivo de imagem (se houver)

    const { title, author, year } = req.body; // Extrai os dados do corpo da requisição
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null; // Define o caminho da imagem

    try {
        const newBook = new Book({ title, author, year, coverImage });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Erro no backend:", error);
        res.status(500).json({ message: "Erro ao criar livro", error });
    }
});

// **** LEITURA (GET) ****
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Erro ao criar livro:", error); // Exibe o erro no console do servidor
        res
            .status(500)
            .json({ message: "Erro ao criar livro", error: error.message });
    }
});

// **** ATUALIZAÇÃO (PUT) ****
router.put("/:id", upload.single("coverImage"), async (req, res) => {
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
        res.status(500).json({ message: "Erro ao atualizar livro", error });
    }
});

// **** EXCLUSÃO (DELETE) ****
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar livro", error }); // Corrigido para status 500
    }
});

module.exports = router;
