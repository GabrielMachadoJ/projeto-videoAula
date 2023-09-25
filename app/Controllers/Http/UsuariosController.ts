import Database from '@ioc:Adonis/Lucid/Database';
import Usuario from 'App/Models/Usuario';

class UsuariosController {
  async get({ response }) {
    try {
      const sql = `SELECT u.nome, u.email, u.idade FROM usuarios u`;

      const resposta = await Database.rawQuery(sql);

      if (!resposta) {
        throw new Error('Erro ao localizar o usuario!');
      }
      response.status(200).json(resposta.rows);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async add({ request, response }) {
    try {
      const body = request.body();
      const { nome, email, idade } = body;

      const user = new Usuario();
      user.nome = nome;
      user.email = email;
      user.idade = idade;
      await user.save();

      return response.status(201).json({ message: 'Usuario cadastrado com sucesso' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update({ request, response }) {
    try {
      const userId = request.routeParams.id;
      const body = request.body();
      const { nome, email, idade } = body;

      const userToUpdate = await Usuario.findByOrFail('id', userId).catch((error) => {
        throw new Error(`Erro ao localizar usuario para atualizar!. Motivo: ${error.message}`);
      });

      if (!nome && !email && !idade) {
        throw new Error('Pelo menos uma das propriedades precisa ser passada');
      }

      if (nome) {
        userToUpdate.nome = nome;
      }

      if (email) {
        userToUpdate.email = email;
      }

      if (idade) {
        userToUpdate.idade = idade;
      }

      userToUpdate.save();
      return response
        .status(200)
        .json({ message: 'Usuario alterado com sucesso!', data: userToUpdate });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async remove({ request, response }) {
    try {
      const userId = request.routeParams.id;

      const userToDelete = await Usuario.findByOrFail('id', userId).catch((error) => {
        throw new Error(`Erro ao localizar usuario para deletar!. Motivo: ${error.message}`);
      });

      userToDelete.delete();
      return response.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = UsuariosController;
