# livro_routes.py
from flask import Blueprint, jsonify, request
from livro_dao import obter_livros, obter_livro_por_id, incluir_novo_livro, editar_livro_por_id, excluir_livro

livro_bp = Blueprint('livro', __name__)

@livro_bp.route('/livros', methods=['GET'])
def obter_livros():
    return "Lista de livros"

@livro_bp.route('/livros', methods=['GET'])
def listar_livros():
    try:
        livros = obter_livros()
        return jsonify(livros)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@livro_bp.route('/livros/<id>', methods=['GET'])
def livro_por_id(id):
    livro = obter_livro_por_id(id)
    if livro:
        return jsonify(livro)
    return jsonify({'error': 'Livro não encontrado'}), 404

@livro_bp.route('/livros', methods=['POST'])
def adicionar_livro():
    try:
        novo_livro = request.get_json()
        livro_incluido = incluir_novo_livro(novo_livro)
        return jsonify(livro_incluido), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@livro_bp.route('/livros/<id>', methods=['PUT'])
def atualizar_livro(id):
    try:
        livro_alterado = request.get_json()
        livro_atualizado = editar_livro_por_id(id, livro_alterado)
        if livro_atualizado:
            return jsonify(livro_atualizado)
        return jsonify({'error': 'Livro não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@livro_bp.route('/livros/<id>', methods=['DELETE'])
def remover_livro(id):
    try:
        if excluir_livro(id):
            return jsonify({'message': 'Livro excluído com sucesso'})
        return jsonify({'error': 'Livro não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400
