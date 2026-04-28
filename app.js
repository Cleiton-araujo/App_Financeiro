const express = require('express')
const cors = require('cors')
const financeiroRoutes = require("./routes/financeiroRoutes")
const { conexaoBanco } = require('./models')
const fs = require('fs')
const path = require('path')


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/financeiro", financeiroRoutes)

// Servir frontend React buildado
app.use(express.static(__dirname + '/frontend/dist'))

// Rota catch-all para SPA React
app.use((req, res) => {
    const distPath = path.join(__dirname, 'frontend', 'dist', 'index.html')
    if (fs.existsSync(distPath)) {
        res.sendFile(distPath)
    } else {
        res.status(404).send('<h2>Frontend não buildado</h2><p>Execute <code>npm run build</code> para gerar o frontend.</p>')
    }
})

conexaoBanco.sync().then( () =>{
    app.listen(port, () => console.log(`App rodando na porta ${port}`))
})

