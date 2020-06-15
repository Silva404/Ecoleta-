//servidor com express 
const express = require('express')
const server = express()

// pegar o banco de dados
const db = require('./database/db.js')


//ganhando acesso a pasta public no root (pasta styles, images e scripts)
server.use(express.static('public'))

//habilitando o req.body
server.use(express.urlencoded({ extended: true}))


//aplicando o nunjucks
const nunjucks = require('nunjucks')
//configurando o nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})



// pages
server.get('/', (req, res) => {
    res.render('index.html')
})

// testando o post
server.get('/create-point', (req, res) => {
    // query strings => os titulos do meu url, dados do formulário

    res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {
    console.log(req.body)


    return res.send('oi')
})


// ================= acima mesma página
server.get('/search', (req, res) => {
    // pegar o banco de dados
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        // Variável para o total de pontos encontrados
        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados.
        res.render('search-result.html', { places: rows, total })
        // como o total: total, é o mesmo nome, pode usar somente total
    })
})



//porta escutda pelo servidor
server.listen(3000)