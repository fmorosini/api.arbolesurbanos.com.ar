require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require('postgis-promise')({geoJSON: true})

const { toGeoJSON } = require('./utils/features.js')

const hbs = require('hbs')

const path = require('path')

const app = express()

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const publicPath = path.resolve(__dirname, 'public')

const abreDB = () => {

   
    const db = pg(process.env.urlDB)

    return db

}

const base = abreDB()


app.use(express.static(publicPath))


//  ============================================= GETs =====================================================================================================

//Devuelve un array con los nonbres vulgares y científicos ordenados por nombre filtrados por un LIKE del parámetro
//Se usa en el buscador del visualizador (sólo para eso)

app.get('/json/nombres/:buscar', (req,res) => {

        
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

        res.send(nombres)

    })
   
})

// Trae Todos los arboles en crudo en JSON


app.get('/json/arboles', (req,res) => {

    let sql = "SELECT id,especie,localidad,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arboles"
     
    base.any(sql)
    
    .then(data => {

        res.send({'data': data})

    })
   
})



// Trae arbolitos filtrado por nombre científico o vulgar
/*
app.get('/json/arbolitos/:nombre', (req,res) => {

    let sql = "SELECT nombrecientifico,nombrevulgar,imagen,thumbnail,url_ficha,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arbolitos"

    let nombre = req.params.nombre.toUpperCase()

    sql += ` where (upper(nombrecientifico) like '${nombre}%' or upper(nombrevulgar) like '%${nombre}%')`

        
    base.any(sql)
    
    .then(data => {

        res.send(toGeoJSON(data))

    })
   
})
*/

// Trae arbolitos por localidad y nombre cientifico o vulgar (opcional)
/*
app.get('/json/arbolitos/localidades/:localidad', (req,res) => {

    let sql = "SELECT nombrecientifico,nombrevulgar,imagen,thumbnail,url_ficha,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion FROM arbolitos"

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
*/

app.get('/json/arbolitos/', (req,res) => {

    
//
    let nombre = req.query.nombre ? req.query.nombre.toUpperCase() : ''

    let bbox = ''

    let x1 = 0
    let y1 = 0
    let x2 = 0
    let y2 = 0 

    let localidad = ''

    let sql = `select  nombrecientifico,nombrevulgar,imagen,thumbnail,url_ficha,follaje,magnitud,tipo,ST_Transform(ST_SetSRID(posicion, 5344), 4326) as posicion from arbolitos where 1=1`
    
    if(nombre){

        sql += ` and (upper(nombrecientifico) like '${nombre}%' or upper(nombrevulgar) like '${nombre}%')`

    }
    
    if(req.body.bbox){
     
        bbox = req.body.bbox
        
        x1 = bbox['NE'][0]
        y1 = bbox['NE'][1]
        x2 = bbox['SO'][0]
        y2 = bbox['SO'][1]   

        sql += ` and st_within(ST_Transform(ST_SetSRID(posicion, 5344), 4326),st_makeenvelope(${x1},${y1},${x2},${y2},4326))`
    }

    if(req.body.localidad){

        localidad = req.body.localidad

        sql += ` and upper(nombre) = upper('${localidad}')`

    }

    //console.log(sql)   
    
    
    base.result(sql)
    .then(data => {

        //res.send(toGeoJSON(data))

        res.send(toGeoJSON(data.rows))

    })  

    
    

})


app.get('/json/especies', (req,res) => {

    base.result('select nombrecientifico,nombrevulgar,magnitud,tipo,follaje,imagen,thumbnail,url_ficha from especies order by nombrecientifico')
    .then(data => {

        res.send({'data': data})

    })
   
})


app.get('/json/localidades', (req,res) => {

    base.result('select nombre,zoom,ST_Transform(ST_SetSRID(wkb_geometry, 5344), 4326) as posicion,ogc_fid from localidades order by ogc_fid')
    .then(data => {

        res.send({'data': data.rows})

    })
   
})

app.get('/', (req,res) => {

    let sql = 'select count(*) as cantidad from arboles'

    let cantidad = 0

    base.result(sql) 

    .then(data => {

        data.rows.forEach(item => {

            cantidad = item.cantidad
            
        });

        let datos = {
            arboles: cantidad,
            urlApi: process.env.urlApi
        }
       
        res.render('index',datos)

    })



   

})

// ========================================== Fin GETs ========================================================================================


app.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)

    console.log(process.env.NODE_ENV)

})

