//BANCO DE DADOS MYSQL
const Sequelize = require('sequelize') 
const sequelize = new Sequelize('cadastro', 'root', '',  {
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}