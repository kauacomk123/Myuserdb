require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
    email VARCHAR(100)
  )
`);

// Rota para listar usuários
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, result) => {
    if (err) return res.status(5000).send(err);
    res.json(result);
  });
});

// Rota para cadastrar usuário
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;
  db.query("INSERT INTO usuarios (nome, email) VALUES (?, ?)", [nome, email], (err) => {
    if (err) throw err;
    res.json({ message: "Usuário cadastrado com sucesso!" });
  });
});

// Iniciar servidor
app.listen(5000, () => {
  console.log("🚀 Servidor rodando em http://localhost:5000");
});
