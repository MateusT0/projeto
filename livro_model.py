# livro_model.py
from pymongo import MongoClient
from bson.objectid import ObjectId

class LivroModel:
    def __init__(self):
        self.client = MongoClient('mongodb+srv://mateus:12345@cluster0.9uxnl.mongodb.net/mydatabase?retryWrites=true&w=majority')
        self.db = self.client.mydatabase
        self.collection = self.db.livros

    def to_dict(self, livro):
        livro['_id'] = str(livro['_id'])
        return livro

    def obter_todos(self):
        livros = list(self.collection.find())
        return [self.to_dict(livro) for livro in livros]

    def obter_por_id(self, id):
        livro = self.collection.find_one({'_id': ObjectId(id)})
        return self.to_dict(livro) if livro else None

    def incluir(self, novo_livro):
        resultado = self.collection.insert_one(novo_livro)
        novo_livro['_id'] = str(resultado.inserted_id)
        return novo_livro

    def editar(self, id, livro_alterado):
        result = self.collection.update_one({'_id': ObjectId(id)}, {'$set': livro_alterado})
        if result.modified_count > 0:
            return self.obter_por_id(id)
        return None

    def excluir(self, id):
        resultado = self.collection.delete_one({'_id': ObjectId(id)})
        return resultado.deleted_count > 0
