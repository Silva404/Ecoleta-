//servidor com express 
const express = require('express')
const server = express()

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
    res.render('search-result.html')
})

//porta escutda pelo servidor
server.listen(3000)