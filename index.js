require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const pg = require('postgis-promise')({geoJSON: true})

const { toGeoJSON } = require('./utils/features.js')

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

        res.send(toGeoJSON(data))

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

        res.send(toGeoJSON(data))

    })
   
})

// Trae arbolitos por localidad y nombre cientifico o vulgar (opcional)

app.get('/arbolitos/localidades/:localidad', (req,res) => {

    let sql = "SELECT nombrecientifico,nombrevulgar,imagen,thumbnail,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arbolitos"

    let localidad = req.params.localidad.toUpperCase()

    let nombre = req.query.nombre

    sql += ` where upper(nombre) = '${localidad}'`

    if(nombre){

        sql += ` and (upper(nombrecientifico) like '%${nombre.toUpperCase()}%' or upper(nombrevulgar) like '%${nombre.toUpperCase()}%')`

    }

    //console.log(sql)
      
    base.any(sql)
    
    .then(data => {

        res.send(toGeoJSON(data))

    })
   
})

app.post('/arbolitos/bbox/', (req,res) => {

        
    let bbox = req.body

   

    let x1 = bbox['NE[]'][0]
    let y1 = bbox['NE[]'][1]
    let x2 = bbox['SO[]'][0]
    let y2 = bbox['SO[]'][1]   
    
    
    
    base.result(`select nombrecientifico,nombrevulgar,imagen,thumbnail,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion from arbolitos where st_within(ST_Transform(ST_SetSRID(posicion, 5344), 4326),st_makeenvelope(${x1},${y1},${x2},${y2},4326))`)
    .then(data => {

        //res.send(toGeoJSON(data))

        res.send(data)

    })  
    

})


app.get('/especies', (req,res) => {

    base.result('select nombrecientifico,nombrevulgar,magnitud,tipo,follaje,imagen,thumbnail,url_ficha from especies order by nombrecientifico')
    .then(data => {

        res.send(data)

    })
   
})

app.get('/localidades', (req,res) => {

    base.result('select nombre,zoom,ST_Transform(ST_SetSRID(wkb_geometry, 5344), 4326) as posicion,ogc_fid from localidades order by nombre')
    .then(data => {

        res.send(data)

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

