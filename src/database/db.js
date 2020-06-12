// importar a dependencia do sqlite
const sqlite3 = require('sqlite3').verbose()

//criar o objeto de banco de dados, para manuzea-lo
const db = new sqlite3.Database('./src/database/database.db')

// utilizar o banco de dados
db.serialize(() => {
    // criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?
            );
 `

    const values = [
        'https://images.unsplash.com/photo-1525695230005-efd074980869?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
        'Paperside',
        'Rua 1082',
        'Número 105',
        'Ceará',
        'Fortaleza',
        'Resíduos orgânicos, Lâmpadas'
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log('Cadastrado com sucesso!')
        console.log(this)
    }


    db.run(query, values, afterInsertData)

    // consultar os dados

    // deletar
})