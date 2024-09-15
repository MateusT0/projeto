// pages/LivroDados.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { Livro } from '../src/modelo/Livro'; // Verifique o caminho correto
import { ControleEditora } from '../src/controle/ControleEditora'; // Verifique o caminho correto
import { useRouter } from 'next/router';
import Head from 'next/head';
import Menu from '../componentes/Menu'; // Verifique o caminho correto

const baseURL = 'http://localhost:3000/api/livros';

const incluirLivro = async (livro: Livro): Promise<boolean> => {
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(livro),
  });
  return res.ok;
};

const LivroDados = () => {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
  const router = useRouter();

  const controleEditora = new ControleEditora();

  useEffect(() => {
    // Simulando a obtenção das editoras
    const editoras = controleEditora.getEditoras().map((editora: { codEditora: any; nome: any; }) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(editoras);
  }, []);

  const tratarCombo = (e: ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(e.target.value));
  };

  const incluir = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const livro = new Livro(0, codEditora, titulo, resumo, autores.split('\n'));
    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/livro-lista');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Incluir Livro</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Incluir Livro</h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">Resumo</label>
            <textarea
              id="resumo"
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
            <textarea
              id="autores"
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editora" className="form-label">Editora</label>
            <select
              id="editora"
              className="form-select"
              value={codEditora}
              onChange={tratarCombo}
              required
            >
              {opcoes.map(opcao => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Incluir Livro</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
