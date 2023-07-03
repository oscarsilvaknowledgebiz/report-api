const express = require("express");
const router = express.Router();
const atividadeController = require('../controller/atividadeController');

router.get('/', atividadeController.listarAtividades);
router.get('/calculate/:id_user', atividadeController.calcularTotalTempo);
router.post('/envio', atividadeController.enviarRelatorio);
router.post('/cadastro', atividadeController.cadastrarAtividade);
router.get("/:id_user", atividadeController.getAtividadesPorUsuario); 
router.patch('/edit', atividadeController.editarAtividade);
router.delete('/delete', atividadeController.excluirAtividade);

module.exports = router;
