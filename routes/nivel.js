const express = require("express");
const router = express.Router();
const nivelController = require("../controller/nivelController");

router.get("/", nivelController.obterNiveis);
router.get("/:id_nivel", nivelController.obterNivelPorId);
router.delete("/delete", nivelController.excluirNivel);
router.post("/cadastro", nivelController.cadastrarNivel);
router.patch("/edit", nivelController.editarNivel);

module.exports = router;
