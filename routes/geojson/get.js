const bodyParser = require("body-parser")
const { Sequelize } = require('sequelize')
const initModels = require('../../models/init-models')
const sequelize = new Sequelize(process.env.urlDB)
const { localidades } = initModels(sequelize)
const express = require("express")

const app = express()

app.use(bodyParser.json())

app.get('/geojson/localidades', (req,res) => {

    localidades.findAll()
    .then((data) => res.send({
        type: "FeatureCollection",
            features: data.map((localidad) => {
                
                return (
                {
                    type: "Feature",
                    geometry: {
                        type: localidad.wkb_geometryWGS84.type,
                        coordinates: localidad.wkb_geometryWGS84.coordinates
                        },
                        properties: {
                            ogc_fid: localidad.ogc_fid,
                            nombre: localidad.nombre,
                            zoom: localidad.zoom
                        }
                        
                    })

            })
    }
    ))    
    .catch((error) => {
        
        res.status(500).send({
            resposne: "Error",
            message: error
        })

    })    

})

app.get('/geojson/arboles', (req,res) => {


    let nombre = req.query.nombre ? req.query.nombre.toUpperCase() : ''

    let bbox = ''

    let x1 = 0
    let y1 = 0
    let x2 = 0
    let y2 = 0 

    let localidad = ''

    let sql = `select  e.nombrecientifico,e.nombrevulgar,e.imagen,e.thumbnail,e.url_ficha,e.follaje,e.magnitud,e.tipo,ST_Transform(ST_SetSRID(a.posicion, 5344), 4326) as posicion from arboles as a `
    sql += ` inner join especies as e on a.especie = e.id `
    sql += ` inner join localidades as l on a.localidad = l.ogc_fid where 1=1`
    
    if(nombre){

        sql += ` and (upper(e.nombrecientifico) like '${nombre}%' or upper(e.nombrevulgar) like '${nombre}%')`

    }
    
    if(req.body.bbox){
    
        bbox = req.body.bbox
        
        x1 = bbox['NE'][0]
        y1 = bbox['NE'][1]
        x2 = bbox['SO'][0]
        y2 = bbox['SO'][1]   

        sql += ` and st_within(ST_Transform(ST_SetSRID(a.posicion, 5344), 4326),st_makeenvelope(${x1},${y1},${x2},${y2},4326))`
    }

    if(req.body.localidad){

        localidad = req.body.localidad

        sql += ` and upper(l.nombre) = upper('${localidad}')`

    }
    
    sequelize.query(sql)
    .then(data => {

        res.status(200).send({
            type: "FeatureCollection",
                features: data[0].map((arbol) => {
                    
                    return (
                    {
                        type: "Feature",
                        geometry: {
                            type: arbol.posicion.type,
                            coordinates: arbol.posicion.coordinates
                            },
                            properties: {
                                nombrecientifico: arbol.nombrecientifico,
                                nombrevulgar: arbol.nombrevulgar,
                                imagen: arbol.imagen,
                                thumbnail: arbol.thumbnail,
                                url_ficha: arbol.url_ficha,
                                follaje: arbol.follaje,
                                magnitud: 3,
                                tipo: arbol.tipo
                            }  
                        })
    
                })
        })

    })  
    .catch((error) => {

        res.status(500).send({
            response: "Error",
            message: error
        })

    })

})

module.exports = app 