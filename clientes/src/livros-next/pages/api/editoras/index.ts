// pages/api/editoras/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/controle/ControleEditora';

// Instanciar o controlador de editoras
const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Obter a lista de editoras e retornar em formato JSON
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
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
