const Projeto = require('../models/tb_projetos');

// Obtém todos os projetos
const obterProjetos = async (req, res, next) => {
  try {
    const projetos = await Projeto.findAll();
    return res.status(200).send({ response: projetos });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Obtém um projeto por ID
const obterProjetoPorId = async (req, res, next) => {
  try {
    const projeto = await Projeto.findByPk(req.params.id_projetos);
    if (!projeto) {
      return res.status(404).send({ mensagem: 'Projeto não encontrado' });
    }
    return res.status(200).send({ response: projeto });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Cadastra um novo projeto
const cadastrarProjeto = async (req, res, next) => {
  try {
    const novoProjeto = await Projeto.create(req.body);
    return res.status(201).send({
      mensagem: 'Projeto cadastrado com sucesso!',
      id_projeto: novoProjeto.id_projetos,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Edita um projeto existente
const editarProjeto = async (req, res, next) => {
  try {
    const projeto = await Projeto.findByPk(req.body.id_projetos);
    if (!projeto) {
      return res.status(404).send({ mensagem: 'Projeto não encontrado' });
    }
    await projeto.update(req.body);
    return res.status(200).send({
      mensagem: 'Dados do projeto alterados com sucesso!',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Exclui um projeto existente
const excluirProjeto = async (req, res, next) => {
  try {
    const projeto = await Projeto.findByPk(req.body.id_projetos);
    if (!projeto) {
      return res.status(404).send({ mensagem: 'Projeto não encontrado' });
    }
    await projeto.destroy();
    return res.status(202).send({
      mensagem: 'Projeto excluído com sucesso!',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterProjetos,
  obterProjetoPorId,
  cadastrarProjeto,
  editarProjeto,
  excluirProjeto,
};