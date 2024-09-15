import React, { useState, useEffect } from 'react';
import { ControleLivros } from '../controle/ControleLivros';
import { Livro } from '../modelo/Livro';

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);
  const controleLivros = new ControleLivros();

  // Função para excluir um livro
  const excluir = async (codigo: string) => {
    try {
      const sucesso = await controleLivros.excluir(codigo);
      if (sucesso) {
        // Atualizar a lista de livros após a exclusão
        setLivros(prevLivros => prevLivros.filter(livro => livro.codigo !== codigo));
      } else {
        console.error('Falha ao excluir o livro');
      }
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
    } finally {
      setCarregado(false);
    }
  };

  // Efeito para carregar livros quando o componente é montado
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const livrosObtidos = await controleLivros.obterLivros();
        setLivros(livrosObtidos);
      } catch (error) {
        console.error('Erro ao obter livros:', error);
      } finally {
        setCarregado(true);
      }
    };

    fetchLivros();
  }, []); // Reexecuta apenas na montagem do componente

  // Componente para exibir uma linha de livro
  const LinhaLivro = ({ livro }: { livro: Livro }) => {
    return (
      <tr>
        <td>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>{livro.titulo}</span>
            <button onClick={() => excluir(livro.codigo)} style={{ marginTop: '10px' }}>Excluir</button>
          </div>
        </td>
        <td>{livro.resumo}</td>
        <td>{livro.codEditora}</td>
        <td>
          <ul>
            {livro.autores.map((autor, i) => (
              <li key={i}>{autor}</li>
            ))}
          </ul>
        </td>
      </tr>
    );
  };

  return (
    <main>
      <h1>Catálogo de Livros</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
