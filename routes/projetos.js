const express = require('express');
const router = express.Router();
const projetoController = require('../controller/projetoController');

router.get('/', projetoController.obterProjetos);
router.get('/:id_projetos', projetoController.obterProjetoPorId);
router.patch('/edit', projetoController.editarProjeto);
router.delete('/delete', projetoController.excluirProjeto);
router.post('/cadastro', projetoController.cadastrarProjeto);

module.exports = router;
