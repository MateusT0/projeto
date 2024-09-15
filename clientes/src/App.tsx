// src/App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import LivroCadastro from './LivroCadastro';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const App = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Catálogo de Livros</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Catálogo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dados">Cadastro</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro">Novo Livro</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<LivroLista />} />
          <Route path="/dados" element={<LivroDados />} />
          <Route path="/cadastro" element={<LivroCadastro />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
