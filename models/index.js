const conexaoBanco = require("../config/database")
const FinanceiroModel = require("./financeiro")(conexaoBanco)
module.exports = {conexaoBanco, FinanceiroModel}
