const express = require('express')
const server = express()

//configurar pasta pública
server.use(express.static('public'))

// page home
// req = requisition
// res = response
server.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

server.get('/create-point', (req, res) => {
    res.sendFile(__dirname + '/views/create-point.html')
})

// ligando o servidor
server.listen(3000)