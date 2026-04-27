const express = require('express')
const cors = require('cors')
const financeiroRoutes = require("./routes/financeiroRoutes")
const { conexaoBanco } = require('./models')


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/financeiro", financeiroRoutes)

// Servir frontend React buildado
app.use(express.static(__dirname + '/frontend/dist'))

// Rota catch-all para SPA React
app.use((req, res) => {
    res.sendFile(__dirname + '/frontend/dist/index.html')
})

conexaoBanco.sync().then( () =>{
    app.listen(port, () => console.log(`App rodando na porta ${port}`))
})

