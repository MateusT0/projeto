# livro_dao.py
from livro_model import LivroModel

livro_model = LivroModel()

def obter_livros():
    return livro_model.obter_todos()

def obter_livro_por_id(id):
    return livro_model.obter_por_id(id)

def incluir_novo_livro(novo_livro):
    return livro_model.incluir(novo_livro)

def editar_livro_por_id(id, livro_alterado):
    return livro_model.editar(id, livro_alterado)

def excluir_livro(id):
    return livro_model.excluir(id)
