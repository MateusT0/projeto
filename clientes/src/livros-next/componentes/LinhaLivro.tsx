// components/LinhaLivro.tsx
import * as Livro from '../src/modelo/Livro';

interface LinhaLivroProps {
  livro: Livro.Livro;
  excluir: () => void;
}

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => (
  <tr>
    <td>{livro.titulo}</td>
    <td>{livro.resumo}</td>
    <td>{livro.codEditora}</td> {/* Ajuste conforme a estrutura do seu objeto Livro */}
    <td>{livro.autores.join(', ')}</td>
    <td>
      <button onClick={excluir} className="btn btn-danger">
        Excluir
      </button>
    </td>
  </tr>
);

export default LinhaLivro;
