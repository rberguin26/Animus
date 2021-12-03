const database = require('./databasemysql')

const usuariosmysql = database.sequelize.define('usuariosmysql', {
    nome: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    celular: {
        type: database.Sequelize.STRING,
        allowNull: false
    }
})

//usuariosmysql.sync({force: true})
module.exports = usuariosmysql 