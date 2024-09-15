// src/modelo/Livro.ts
export class Livro {
  public codigo: string;
  public titulo: string;
  public resumo: string;
  public autores: string[];
  public codEditora: number;

  constructor(codigo: string, titulo: string, resumo: string, autores: string[], codEditora: number) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.resumo = resumo;
    this.autores = autores;
    this.codEditora = codEditora;
  }
}
