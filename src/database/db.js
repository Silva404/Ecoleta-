// importar a dependencia do sqlite
const sqlite3 = require('sqlite3').verbose()

//criar o objeto de banco de dados, para manuzea-lo
const db = new sqlite3.Database('./src/database/database.db')

// utilizar o banco de dados
db.serialize(() => {
    // criar uma tabela
    db.run(`
        
    `)

    // inserir dados na tabela

    // consultar os dados

    // deletar

    
})