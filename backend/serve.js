require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Teste de conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

// Criar tabela (se não existir)
db.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    data_nascimento DATE,
    cpf VARCHAR(14)
  )
`);

// Rota para listar usuários
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Rota para cadastrar usuário
app.post("/usuarios", (req, res) => {
  console.log("Dados recebidos no backend:", req.body); // <- Aqui
  const { nome, email, data_nascimento, cpf } = req.body;
  db.query(
    "INSERT INTO usuarios (nome, email, data_nascimento, cpf) VALUES (?, ?, ?, ?)",
    [nome, email, data_nascimento, cpf],
    (err , result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Usuário cadastrado com sucesso!" });
    }
  );
});

// Iniciar servidor
app.listen(5000, () => {
  console.log("🚀 Servidor rodando em http://localhost:5000");
});
