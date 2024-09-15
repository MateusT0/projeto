from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS  # Importa a biblioteca flask-cors

app = Flask(__name__)

# Configura o CORS para permitir chamadas de qualquer origem
CORS(app)

# Conectar ao MongoDB usando URI de conexão
client = MongoClient('mongodb+srv://mateus:12345@cluster0.9uxnl.mongodb.net/mydatabase?retryWrites=true&w=majority')
bd = client.livraria  # Nome do banco de dados
livros_collection = bd.livros  # Nome da coleção

@app.route('/')
def home():
    return "Bem-vindo à API de Livros!"

@app.route('/users')
def users():
    return "Lista de usuários"

# Consultar todos os livros
@app.route('/livros', methods=['GET'])
def obter_livros():
    livros = list(livros_collection.find())
    for livro in livros:
        livro['_id'] = str(livro['_id'])
    return jsonify(livros)

# Consultar livro por ID
@app.route('/livros/<id>', methods=['GET'])
def obter_livro_por_id(id):
    livro = livros_collection.find_one({'_id': ObjectId(id)})
    if livro:
        livro['_id'] = str(livro['_id'])
        return jsonify(livro)
    else:
        return jsonify({'error': 'Livro não encontrado'}), 404

# Editar livro por ID
@app.route('/livros/<id>', methods=['PUT'])
def editar_livro_por_id(id):
    livro_alterado = request.get_json()
    result = livros_collection.update_one(
        {'_id': ObjectId(id)},
        {'$set': livro_alterado}
    )
    if result.modified_count > 0:
        livro = livros_collection.find_one({'_id': ObjectId(id)})
        livro['_id'] = str(livro['_id'])
        return jsonify(livro)
    else:
        return jsonify({'error': 'Livro não encontrado'}), 404

# Criar um novo livro
@app.route('/livros', methods=['POST'])
def incluir_novo_livro():
    novo_livro = request.get_json()
    
    # Adicione logs para verificar o que está sendo recebido
    print(f"Dados recebidos: {novo_livro}")
    
    # Verificar se o corpo da requisição está presente e contém os campos necessários
    if not novo_livro or 'título' not in novo_livro or 'autor' not in novo_livro:
        return jsonify({'error': 'Dados inválidos. Certifique-se de que os campos "título" e "autor" estão presentes.'}), 400
    
    # Inserir o novo livro na coleção
    try:
        resultado = livros_collection.insert_one(novo_livro)
        novo_livro['_id'] = str(resultado.inserted_id)
        return jsonify(novo_livro), 201
    except Exception as e:
        print(f"Erro ao inserir no banco de dados: {e}")
        return jsonify({'error': 'Erro ao inserir no banco de dados'}), 500

# Excluir livro por ID
@app.route('/livros/<id>', methods=['DELETE'])
def excluir_livro(id):
    resultado = livros_collection.delete_one({'_id': ObjectId(id)})
    if resultado.deleted_count > 0:
        return jsonify({'message': 'Livro excluído com sucesso'})
    else:
        return jsonify({'error': 'Livro não encontrado'}), 404

if __name__ == '__main__':
    app.run(port=5000, host='localhost', debug=True)
