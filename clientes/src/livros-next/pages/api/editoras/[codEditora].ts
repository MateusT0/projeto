// pages/api/editoras/[codEditora].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/controle/ControleEditora';

// Instanciar o controlador de editoras
const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { codEditora }
  } = req;

  try {
    if (req.method === 'GET') {
      // Verificar se o código da editora é um número válido
      const cod = parseInt(codEditora as string, 10);
      if (isNaN(cod)) {
        res.status(400).json({ error: 'Invalid editor ID' });
        return;
      }

      // Obter o nome da editora e retornar em formato JSON
      const nomeEditora = controleEditora.getNomeEditora(cod);
      if (nomeEditora) {
        res.status(200).json({ nome: nomeEditora });
      } else {
        res.status(404).json({ error: 'Editor not found' });
      }
    } else {
      // Método não permitido
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Erro interno do servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
