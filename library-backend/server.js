
require('dotenv').config(); // Carrega as variáveis do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');  // Importa o multer
const path = require('path');

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve as imagens da pasta 'uploads'

// Configuração do multer para salvar as imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Define o diretório de destino para as imagens
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  // Gera um sufixo único
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Define o nome do arquivo
  }
});

const upload = multer({ storage: storage });  // Inicializa o multer com a configuração de storage

// Conexão ao MongoDB
mongoose.connect('mongodb+srv://sarahspereira17:Sarah170103@library.rrmdm.mongodb.net/?retryWrites=true&w=majority&appName=library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Importação das rotas
const bookRoutes = require('./routes/books');  // Roteador para as rotas dos livros
const authRoutes = require('./routes/authRoutes');  // Roteador para as rotas de autenticação

// Usando as rotas na aplicação
app.use('/api/books', bookRoutes);  // Rota para manipulação dos livros
app.use('/api/auth', authRoutes);  // Rota para autenticação
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define a porta do servidor
app.listen(5000, () => {
  console.log('Servidor executando na porta 5000');
});
