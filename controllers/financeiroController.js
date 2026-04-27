const {FinanceiroModel} = require("../models")

exports.listar = async(req, res) =>{
    
    try{
        const registros = await FinanceiroModel.findAll()
        res.json(registros)

    }catch(error){
        res.status(500).json({erro: "Erro ao tentar recuperar os dados"})

    }

    
}

//metodo que sera usado post

exports.criar = async(req, res) =>{
    
    try{
        const registros = await FinanceiroModel.create(req.body)
        res.status(201).json(registros);

    }catch(error){
        console.error("Erro ao criar:", error)
        res.status(500).json({erro: "Erro em gravar os dados", detalhe: error.message})

    }

    
}

exports.atualizar = async(req, res) =>{
    try{
        const { id } = req.params
        const [atualizado] = await FinanceiroModel.update(req.body, {where: {id}})
        if(atualizado){
            const registroAtualizado = await FinanceiroModel.findByPk(id)
            res.status(200).json(registroAtualizado)
        }else{
            res.status(404).json({erro: "Registro não encontrado"})
        }
    }catch(error){
        res.status(500).json({erro: "Erro ao atualizar os dados"})
    }
}

exports.deletar = async(req, res) =>{
    try{
        const { id } = req.params
        const deletado = await FinanceiroModel.destroy({where: {id}})
        if(deletado){
            res.status(204).send()
        }else{
            res.status(404).json({erro: "Registro não encontrado"})
        }
    }catch(error){
        res.status(500).json({erro: "Erro ao deletar os dados"})
    }
}
