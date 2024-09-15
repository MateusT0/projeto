// src/LivroCadastro.js
import React, { useState } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const LivroCadastro = () => {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [codEditora, setCodEditora] = useState(1);
  const [autores, setAutores] = useState(['']);

  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoLivro = {
      codigo: 0, // Será definido no backend ou gerado no frontend
      codEditora,
      titulo,
      resumo,
      autores
    };

    controleLivro.incluir(novoLivro);
    setTitulo('');
    setResumo('');
    setCodEditora(1);
    setAutores(['']);
  };

  const handleAutorChange = (index, value) => {
    const novosAutores = [...autores];
    novosAutores[index] = value;
    setAutores(novosAutores);
  };

  const addAutor = () => {
    setAutores([...autores, '']);
  };

  return (
    <main>
      <h1>Cadastro de Livro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo</label>
          <textarea
            className="form-control"
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="editora">Editora</label>
          <select
            className="form-control"
            id="editora"
            value={codEditora}
            onChange={(e) => setCodEditora(Number(e.target.value))}
            required
          >
            {controleEditora.getEditoras().map((editora) => (
              <option key={editora.codEditora} value={editora.codEditora}>
                {editora.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Autores</label>
          {autores.map((autor, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                className="form-control"
                value={autor}
                onChange={(e) => handleAutorChange(index, e.target.value)}
                placeholder={`Autor ${index + 1}`}
              />
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addAutor}>
            Adicionar Autor
          </button>
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </main>
  );
};

export default LivroCadastro;
