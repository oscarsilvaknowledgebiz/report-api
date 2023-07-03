const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/', profileController.obterPerfis);
router.get('/user/:id_user', profileController.obterPerfilPorIdUser);
router.post('/cadastro', profileController.cadastrarPerfil);
router.get('/:id_profile', profileController.obterPerfilPorId);
router.patch('/edit', profileController.editarPerfil);
router.delete('/delete', profileController.excluirPerfil);

module.exports = router;
