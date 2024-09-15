export class Livro {
    constructor(
      public codigo: string = '', // Alterado para string e inicializado como vazio
      public titulo: string,
      public resumo: string,
      public autores: string[],
      public codEditora: number
    ) {}
  }
  