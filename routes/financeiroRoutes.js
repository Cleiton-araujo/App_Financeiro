const express = require('express')
const router = express.Router()
const financeiroController = require("../controllers/financeiroController")

router.get("/", financeiroController.listar)
router.post("/", financeiroController.criar)
router.put("/:id", financeiroController.atualizar)
router.delete("/:id", financeiroController.deletar)

module.exports= router
