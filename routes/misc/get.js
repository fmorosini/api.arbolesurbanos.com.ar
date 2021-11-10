const pg = require('postgis-promise')
const express = require("express")
const app = express()

const abreDB = () => {
   
    const db = pg(process.env.urlDB)

    return db

}


app.get('/misc/nombres/:buscar', (req,res) => {

    const base = abreDB()

        
    let nombre = req.params.buscar.toUpperCase()

    let sql = `select nombrecientifico as nombre from especies where upper(nombrecientifico) like '${nombre}%' union select nombrevulgar as nombre from especies where upper(nombrevulgar) like '${nombre}%' order by 1`
   
    base.result(sql)
    .then(data => {

        let nombres = ''

        let i = 1

        data.rows.forEach(item => {

            nombres += `<div><a class='suggest-element' nombre='${item.nombre}' id='arbol.${i}'><strong>${item.nombre}</strong></a></div>`
            i++
            
        });

        res.status(200).send(nombres)

    })
    .catch((error) => {
        res.status(500).send({
            response: "Error",
            message: error
        })
    })
   
})

module.exports = app 