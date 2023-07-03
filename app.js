const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const rotaLogin = require('./routes/login')
const rotaAtividade = require('./routes/atividade')
const rotaNivel = require('./routes/nivel')
const rotaProfile = require('./routes/profile')
const rotaProjeto = require('./routes/projetos')
const rotaStatus = require('./routes/status')
const rotaUsuarios = require('./routes/usuarios')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
        return res.status(200).send({})
    }
    next();
})

app.use('/atividade', rotaAtividade);
app.use('/login', rotaLogin);
app.use('/usuarios', rotaUsuarios);
app.use('/nivel', rotaNivel);
app.use('/status', rotaStatus);
app.use('/perfil', rotaProfile);
app.use('/projetos', rotaProjeto);


app.get('/api/test', (req,res) => {
    res.status(200).json({message: 'OK'})
})

app.use(express.static('public'))

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    })
});

module.exports = app;