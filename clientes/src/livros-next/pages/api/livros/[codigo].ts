// pages/api/livros/[codigo].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros';

// Instanciar o controlador de livros
const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { codigo }
  } = req;

  try {
    if (req.method === 'DELETE') {
      // Verificar se o código do livro é um número válido
      const cod = parseInt(codigo as string, 10);
      if (isNaN(cod)) {
        return res.status(400).json({ error: 'Invalid book ID' });
      }

      // Excluir o livro e retornar mensagem de sucesso
      controleLivro.excluir(cod);
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } else {
      // Método não permitido
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Erro interno do servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
