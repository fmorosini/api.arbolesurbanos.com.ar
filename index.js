require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const pg = require('postgis-promise')({geoJSON: true })

const path = require('path')

const app = express()

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

    base.result("SELECT row_to_json(fc) FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (  SELECT 'Feature' As type, ST_AsGeoJSON(posicion)::json As geometry,           row_to_json((nombrecientifico,nombrevulgar,imagen,thumbnail,magnitud,follaje)) As properties FROM arbolitos        ) As f    ) As fc")
    
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


app.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)

})