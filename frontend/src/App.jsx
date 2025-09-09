import React, { useState, useEffect } from "react";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const cadastrar = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    }).then(() => {
      setUsuarios([...usuarios, { nome, email }]);
      setNome("");
      setEmail("");
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Cadastro de Usuários</h1>

      <form onSubmit={cadastrar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((u, i) => (
          <li key={i}>
            {u.nome} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
