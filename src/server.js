//servidor com express 
const express = require('express')
const server = express()

// pegar o banco de dados
const db = require('./database/db.js')


//ganhando acesso a pasta public no root
server.use(express.static('public'))



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

server.get('/create-point', (req, res) => {
    res.render('create-point.html')
})

server.get('/search', (req, res) => {
    // pegar o banco de dados
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados.
        res.render('search-result.html', { places: rows, total })
        // como o total: total, é o mesmo nome, pode usar somente total
    })
})



//porta escutda pelo servidor
server.listen(3000)