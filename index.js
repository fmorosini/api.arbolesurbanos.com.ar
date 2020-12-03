require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const pg = require('postgis-promise')({})

const hbs = require('hbs')

const path = require('path')

const app = express()

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const publicPath = path.resolve(__dirname, 'public')

const abreDB = () => {

   
    const db = pg(process.env.urlDB)

    return db

}

const base = abreDB()


app.use(express.static(publicPath))

app.get('/arbolitos', (req,res) => {

    base.any("SELECT nombrecientifico,nombrevulgar,imagen,thumbnail,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arbolitos")
    
    .then(data => {

        res.send({
            data
        })

    })
   
})

app.get('/especies', (req,res) => {

    base.result('select * from especies order by nombrecientifico').then(data => {

        res.json({
            data
        })

    })
   
})

app.get('/localidades', (req,res) => {

    base.result('select * from localidades order by nombre').then(data => {

        res.json({
            data
        })

    })
   
})

app.get('/', (req,res) => {

    let datos = {
        urlApi: process.env.urlApi
    }
    
    res.render('index',datos)

})


app.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
    console.log(process.env.NODE_ENV)

})