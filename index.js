const 
	express = require('express'),
	app = express(),
	fs = require('fs'), 
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	exphbs = require('express-handlebars'),
	mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:BIfv3gJWVWkWSdYE@animusbancodedados.s1335.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
	console.log('Conectado Ao Banco de Dados!')
})

mongoose.connection.on('error', (err) => {
	console.log('Erro Na Conexão' + err)
})

mongoose.connection.on('disconnect', () => {
	console.log('Desconectado :(')
})

require('./src/models/User')
require('./src/models/Class')

app.use(express.static(__dirname, { dotfiles: 'allow' } ))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs')

// Require Routes
fs.readdirSync('./src/routes/').forEach(file => {
	app.use(require('./src/routes/'+file))
})

app.listen(80, () => {
	console.log('Server Rodando Na Porta 3000')
})
