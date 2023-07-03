const express = require('express');
const router = express.Router();
const statusController = require('../controller/statusController');

router.get('/', statusController.obterStatus);
router.post('/cadastro', statusController.cadastrarStatus);
router.get('/:id_status', statusController.obterStatusPorId);
router.patch('/edit', statusController.editarStatus);
router.delete('/delete', statusController.excluirStatus);

module.exports = router;