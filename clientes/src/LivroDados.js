import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ControleLivros } from '../controle/ControleLivros';
import { Livro } from '../modelo/Livro';

interface Editora {
  value: number;
  text: string;
}

const LivroDados = () => {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controleLivros = new ControleLivros();
  const router = useRouter();

  // Método para incluir um livro
  const incluir = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setLoading(true);
    setError(null);
    const novoLivro = new Livro('', titulo, resumo, autores.split('\n'), codEditora);
    try {
      const sucesso = await controleLivros.incluir(novoLivro);
      if (sucesso) {
        router.push('/');
      } else {
        setError('Falha ao incluir o livro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao incluir o livro:', error);
      setError('Erro ao incluir o livro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Método para lidar com mudanças nos campos do formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'titulo':
        setTitulo(value);
        break;
      case 'resumo':
        setResumo(value);
        break;
      case 'autores':
        setAutores(value);
        break;
      case 'editora':
        setCodEditora(Number(value));
        break;
      default:
        break;
    }
  };

  // Carregar editoras quando o componente é montado
  useEffect(() => {
    const fetchEditoras = async () => {
      try {
        // Substitua pelo código real para buscar editoras
        const response = await fetch('/api/editoras');
        if (!response.ok) {
          throw new Error('Erro ao buscar editoras');
        }
        const editorasObtidas: Editora[] = await response.json();
        setEditoras(editorasObtidas);
      } catch (error) {
        console.error('Erro ao carregar editoras:', error);
        setError('Erro ao carregar editoras.');
      }
    };

    fetchEditoras();
  }, []);

  return (
    <main>
      <h1>Cadastro de Livro</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo</label>
          <textarea
            id="resumo"
            name="resumo"
            value={resumo}
            onChange={handleChange}
            className="form-control"
            rows={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="autores">Autores (um por linha)</label>
          <textarea
            id="autores"
            name="autores"
            value={autores}
            onChange={handleChange}
            className="form-control"
            rows={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="editora">Editora</label>
          <select
            id="editora"
            name="editora"
            value={codEditora}
            onChange={handleChange}
            className="form-control"
            required
          >
            {editoras.map(opcao => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar Livro'}
        </button>
      </form>
    </main>
  );
};

export default LivroDados;
