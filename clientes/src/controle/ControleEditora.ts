// src/controle/ControleEditora.ts
import { Editora } from '../modelo/Editora';

export class ControleEditora {
  private editoras: Editora[];

  constructor() {
    // Inicializando com dados fictícios
    this.editoras = [
      new Editora(1, 'Editora A'),
      new Editora(2, 'Editora B'),
      new Editora(3, 'Editora C')
    ];
  }

  public getEditoras(): Editora[] {
    return this.editoras;
  }

  public getNomeEditora(codEditora: number): string | undefined {
    const editora = this.editoras.find(e => e.codEditora === codEditora);
    return editora?.nome;
  }
}
