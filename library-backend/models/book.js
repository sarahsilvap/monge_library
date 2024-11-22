const express = require("express");
const multer = require("multer");
const path = require("path");
const Book = require("../models/Book"); // Importando o modelo do livro

const router = express.Router();

// Configuração do Multer para salvar as imagens em uma pasta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Pasta onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    },
});

// Filtrando os tipos de arquivo permitidos (apenas imagens)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Arquivo não permitido. Apenas imagens (jpeg, png, jpg) são permitidas."
            )
        );
    }
};

// Inicializando o multer com as opções de armazenamento e filtro
const upload = multer({ storage, fileFilter });

// Rota para fazer o upload da imagem
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Nenhuma imagem enviada." });
        }
        // Salvar a URL da imagem no campo 'image' do livro
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        // Aqui, você pode criar um novo livro ou atualizar um livro existente com a imagem
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            image: imageUrl,
        });

        await newBook.save();

        return res
            .status(200)
            .json({ message: "Livro adicionado com sucesso!", book: newBook });
    } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        res.status(500).json({ message: "Erro ao fazer upload da imagem" });
    }
});

module.exports = router;
