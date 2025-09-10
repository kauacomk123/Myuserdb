import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");

  // Buscar usuários do backend
  useEffect(() => {
    fetch("http://localhost:5000/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

   // Cadastrar usuário
  const cadastrar = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email,data_nascimento:dataNascimento,cpf })
    }).then(() => {
      setUsuarios([...usuarios, { nome, email,data_nascimento:dataNascimento,cpf }]);
      setNome("");
      setEmail("");
      setDataNascimento("");
      setCpf("");
    });
  };

  return (
    <div className="app">
      <div className="form-container">
        <h2>Cadastro</h2>
        <form onSubmit={cadastrar}>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
          <input
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>

       <div className="lista-container">
        <h3>Lista de Usuários cadastrados</h3>
        <ul>
          {usuarios.map((u, i) => (
            <li key={i}>
              <strong>{u.nome}</strong> <br />
              {u.email} <br />
              {u.data_nascimento?.substring(0, 10)} <br />
              {u.cpf}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
