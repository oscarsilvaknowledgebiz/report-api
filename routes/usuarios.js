const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/", userController.obterUsuarios);
router.get("/:id_user", userController.obterUsuarioPorId);
router.patch("/edit", userController.atualizarUsuario);
router.delete("/delete", userController.excluirUsuario);
router.post("/cadastro", userController.cadastrarUsuario);

module.exports = router;
