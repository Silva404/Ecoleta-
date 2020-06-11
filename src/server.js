const express = require('express')
const server = express()

//configurar pasta pública
server.use(express.static('public'))

// chamando a template engine
const nunjucks = require('nunjucks')
// configurando o nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})
// express será meu servidor e noCache que é pra ele sempre ficar atualizado, sem resquicios de uma versão antiga dos arquivos.

// page home
// req = requisition
// res = response
server.get('/', (req, res) => {
    return res.render('index.html')
})

server.get('create-point', (req, res) => {
    return res.render('create-point.html')
})

// ligando o servidor
server.listen(3000)