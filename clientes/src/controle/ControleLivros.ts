// src/controle/ControleLivros.ts
import { Livro } from '../modelo/Livro';
import { LivroMongo } from '../modelo/Interfaces';

const baseURL = "http://localhost:3030/livros";

export class ControleLivros {
  public async obterLivros(): Promise<Livro[]> {
    try {
      const response = await fetch(baseURL);
      const livrosMongo: LivroMongo[] = await response.json();

      return livrosMongo.map(livroMongo => new Livro(
        livroMongo.codigo,
        livroMongo.titulo,
        livroMongo.resumo,
        livroMongo.autores,
        livroMongo.codEditora
      ));
    } catch (error) {
      console.error('Erro ao obter livros:', error);
      return [];
    }
  }

  public async incluir(livro: Livro): Promise<boolean> {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codigo: livro.codigo, // O código deve ser vazio para o backend gerar
          titulo: livro.titulo,
          resumo: livro.resumo,
          autores: livro.autores,
          codEditora: livro.codEditora
        })
      });
      const resultado = await response.json();
      return resultado.ok;
    } catch (error) {
      console.error('Erro ao incluir livro:', error);
      return false;
    }
  }

  public async excluir(codigo: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE'
      });
      const resultado = await response.json();
      return resultado.ok;
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      return false;
    }
  }
}
