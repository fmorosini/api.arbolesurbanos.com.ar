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


//  ============================================= GETs =====================================================================================================


// Trae Todos los arbolitos

app.get('/arbolitos', (req,res) => {

    let sql = "SELECT nombrecientifico,nombrevulgar,imagen,thumbnail,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arbolitos"
     
    base.any(sql)
    
    .then(data => {

        res.send({
            data
        })

    })
   
})

// Trae arbolitos filtrado por nombre científico o vulgar

app.get('/arbolitos/:nombre', (req,res) => {

    let sql = "SELECT nombrecientifico,nombrevulgar,imagen,thumbnail,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arbolitos"

    let nombre = req.params.nombre.toUpperCase()

    sql += ` where (upper(nombrecientifico) like '%${nombre}%' or upper(nombrevulgar) like '%${nombre}%')`

    //console.log(sql)
      
    base.any(sql)
    
    .then(data => {

        res.send({
            data
        })

    })
   
})

// Trae arbolitos por localidad y nombre cientifico o vulgar (opcional)

app.get('/arbolitos/localidades/:localidad', (req,res) => {

    let sql = "SELECT nombrecientifico,nombrevulgar,imagen,thumbnail,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arbolitos"

    let localidad = req.params.localidad.toUpperCase()

    let nombre = req.query.nombre.toUpperCase()

    sql += ` where upper(nombre) = '${localidad}'`

    if(nombre){

        sql += ` and (upper(nombrecientifico) like '%${nombre}%' or upper(nombrevulgar) like '%${nombre}%')`

    }

    //console.log(sql)
      
    base.any(sql)
    
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

// ========================================== Fin GETs ========================================================================================


app.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)

    console.log(process.env.NODE_ENV)

})