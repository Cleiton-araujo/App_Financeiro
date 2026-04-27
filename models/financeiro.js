    const {DataTypes} = require('sequelize')

    module.exports = (conexaoBanco)=>{
        const FinanceiroModel = conexaoBanco.define('Financeiro', {
            data: DataTypes.DATE,
            descricao: DataTypes.STRING,
            formaPagamento: DataTypes.STRING,
            valor: DataTypes.FLOAT,
            tipo: DataTypes.ENUM('entrada', 'saida'),
        },{
            tableName: 'financeiro',  // forca o nome minusculo no banco
            freezeTableName: true,   // impedi pluralizacao automatico
        })
        return FinanceiroModel;
    }