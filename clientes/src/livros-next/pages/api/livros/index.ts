// pages/api/livros/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros';

// Instanciar o controlador de livros
const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Obter a lista de livros e retornar em formato JSON
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      // Capturar os dados do livro do corpo da requisição
      const livro = req.body;
      
      // Validar se o corpo da requisição possui os campos necessários
      if (!livro || !livro.titulo || !livro.resumo || !livro.codEditora || !livro.autores) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      controleLivro.incluir(livro);
      res.status(200).json({ message: 'Livro incluído com sucesso' });
    } else {
      // Método não permitido
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Erro interno do servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
