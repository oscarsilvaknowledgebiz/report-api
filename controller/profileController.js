const Profile = require('../models/tb_profile');
const Projeto = require('../models/tb_projetos');

const obterPerfis = async (req, res, next) => {
  try {
    const perfis = await Profile.findAll();
    return res.status(200).send({ response: perfis });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterPerfilPorIdUser = async (req, res, next) => {
  try {
    const idUser = req.params.id_user;
    const perfis = await Profile.findAll({
      where: {
        id_user: idUser
      },
      include: { model: Projeto, as: 'tb_projeto' }
    });
    return res.status(200).send({ response: perfis });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarPerfil = async (req, res, next) => {
  try {
    const novoPerfil = await Profile.create({
      id_projetos: req.body.projetos,
      id_user: req.body.user
    });

    return res.status(201).send({
      mensagem: 'Perfil cadastrado com sucesso!',
      id_profile: novoPerfil.id_profile
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterPerfilPorId = async (req, res, next) => {
  try {
    const idProfile = req.params.id_profile;
    const perfil = await Profile.findByPk(idProfile);
    if (!perfil) {
      return res.status(404).send({ mensagem: 'Perfil não encontrado.' });
    }
    return res.status(200).send({ response: perfil });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const editarPerfil = async (req, res, next) => {
  try {
    const idProfile = req.body.id_profile;
    const perfil = await Profile.findByPk(idProfile);
    if (!perfil) {
      return res.status(404).send({ mensagem: 'Perfil não encontrado.' });
    }
    perfil.id_projetos = req.body.projetos;
    perfil.id_user = req.body.user;
    await perfil.save();

    const response = {
      mensagem: 'Perfil atualizado com sucesso',
      perfilEditado: {
        id_profile: perfil.id_profile,
        nivel: perfil.nivel,
        request: {
          tipo: 'PATCH',
          descricao: 'Atualiza um nivel de acesso',
          url: 'http://localhost:3000/nivel/' + perfil.id_plano
        }
      }
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const excluirPerfil = async (req, res, next) => {
  try {
    const idProfile = req.body.id_profile;
    const perfil = await Profile.findByPk(idProfile);
    if (!perfil) {
      return res.status(404).send({ mensagem: 'Perfil não encontrado.' });
    }
    await perfil.destroy();
    return res.status(202).send({ mensagem: 'Perfil excluído com sucesso!' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterPerfis,
  obterPerfilPorIdUser,
  cadastrarPerfil,
  obterPerfilPorId,
  editarPerfil,
  excluirPerfil
};
