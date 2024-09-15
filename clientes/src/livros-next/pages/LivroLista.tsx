// pages/LivroLista.tsx
import { useState, useEffect } from 'react';
import { Livro } from '../src/modelo/Livro'; // Verifique o caminho correto
import styles from '../styles/Home.module.css';
import Menu from '../componentes/Menu'; // Verifique o caminho correto
import Head from 'next/head';
import LinhaLivro from '../componentes/LinhaLivro'; // Verifique o caminho correto

const baseURL = 'http://localhost:3000/api/livros';

const obterLivros = async (): Promise<Livro[]> => {
  const res = await fetch(baseURL);
  return res.json();
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
  const res = await fetch(`${baseURL}/${codigo}`, {
    method: 'DELETE',
  });
  return res.ok;
};

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    obterLivros()
      .then((livros) => {
        setLivros(livros);
        setCarregado(true);
      })
      .catch((err) => {
        setErro('Erro ao carregar livros');
        setCarregado(true);
      });
  }, []);

  const excluir = async (codigo: number) => {
    try {
      const sucesso = await excluirLivro(codigo);
      if (sucesso) {
        setLivros(livros.filter(livro => livro.codigo !== codigo));
        setCarregado(false);
      }
    } catch (error) {
      console.error('Erro ao excluir livro', error);
    }
  };

  if (!carregado) {
    return <div className={styles.container}>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de Livros</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        {erro && <div className="alert alert-danger">{erro}</div>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(livro => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
