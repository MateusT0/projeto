// src/controle/ControleLivros.ts
import { Livro } from '../modelo/Livro';

export class ControleLivros {
  private livros: Livro[];

  constructor() {
    // Inicializando com dados fictícios
    this.livros = [
      new Livro(1, 1, 'Livro A', 'Resumo do Livro A', ['Autor A1', 'Autor A2']),
      new Livro(2, 2, 'Livro B', 'Resumo do Livro B', ['Autor B1']),
      new Livro(3, 3, 'Livro C', 'Resumo do Livro C', ['Autor C1', 'Autor C2', 'Autor C3'])
    ];
  }

  public obterLivros(): Livro[] {
    return this.livros;
  }

  public incluir(livro: Livro): void {
    const novoCodigo = this.livros.length > 0 ? Math.max(...this.livros.map(l => l.codigo)) + 1 : 1;
    livro.codigo = novoCodigo;
    this.livros.push(livro);
  }

  public excluir(codigo: number): void {
    const index = this.livros.findIndex(l => l.codigo === codigo);
    if (index !== -1) {
      this.livros.splice(index, 1);
    }
  }
}
