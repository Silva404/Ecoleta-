const express = require('express')
const server = express()

// page home
server.get('/', (req, res) => {
    res.send('eae mah')
})

// ligando o servidor
server.listen(3000)