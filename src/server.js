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
    // console.log(req.body)

    // inserir dados no banco de dados
    // criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items
        )  
    `)

    // inserir dados na table

    // meu query é onde vou inserir os dados e seus respectivos nomes
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?)
    `

    // values = valores dos dados do query
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    //em caso de erro ou acerto, executar isso. COloquei pra expor meus dados.
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log('Cadastro efetuado com sucesso!')
        console.log(this)

        return res.render('create-point.html', { saved: true})        
    }

    //  vai inserir dados ao ser executado
    db.run(query, values, afterInsertData)
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