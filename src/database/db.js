// chamando a dependencia sqlite3
const sqlite3 = require('sqlite3')

// criando o database
const db = new sqlite3.Database('src/database/database.db')


module.exports = db
//usando o serialize para executar comandos em ordem, um esperando o outro
// db.serialize(() => {
    // criar a tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items
    //     )  
    // `)

    // // inserir dados na table

    // // meu query é onde vou inserir os dados e seus respectivos nomes
    // const query = `
    // INSERT INTO places (
    //     image,
    //     name,
    //     address,
    //     address2,
    //     state,
    //     city,
    //     items
    // ) VALUES (?,?,?,?,?,?,?)
    // `

    // // values = valores dos dados do query
    // const values = [
    //     'https://images.unsplash.com/photo-1525695230005-efd074980869?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    //     'Paperside',
    //     'Rua 1082',
    //     'Número 105',
    //     'Ceará',
    //     'Fortaleza',
    //     'Resíduos orgânicos, Lâmpadas'
    // ]

    // //em caso de erro ou acerto, executar isso. COloquei pra expor meus dados.
    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Cadastro efetuado com sucesso!')
    //     console.log(this)
    // }

    // //  vai inserir dados ao ser executado
    // db.run(query, values, afterInsertData)




    //  // consultar os dados
    //  db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Aqui estão seus registros: ')
    //     console.log(rows)
    // })
    



    // // deletar um dado do banco de dados
    // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Registro deletado com sucesso')
    // })   

// })