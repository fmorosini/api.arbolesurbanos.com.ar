const express = require("express")

const app = express()

const { verificaAuth } = require("../../auth/verificaAuth")

const { proyecciones, reproyectar} = require('../../functions/projections')
const { Op, Sequelize } = require('sequelize')

const initModels = require('../../models/init-models')

const sequelize = new Sequelize(process.env.urlDB)

const { arboles } = initModels(sequelize)


app.post("/json/arbol", verificaAuth, (req,res) => {

    let { especie, localidad, posicion } = req.body  
    
    if(!req.usuario){

        res.status(401).send({
            response: "Error",
            message: "No autorizado"
        })

       return

    }

    if (especie && posicion && localidad){
      
        posicion = reproyectar(proyecciones.WGS84, proyecciones.EPSG5344, posicion)
                        
        arboles.create({
            especie: especie,
            localidad: localidad,
            posicion: {
                type: 'Point',
                coordinates: posicion,
                crs: { type: 'name', properties: { name: 'EPSG:5344'} }
            },
            usuario: req.usuario
            
        }).then((newArbol) => {

            res.status(200).send({
                response: "OK",
                data: newArbol
                
            })

        })
        .catch((error) => {

            res.status(500).send({
                response: "Error",
                message: error
            })

        })
        
        
        

    }
    else{

        res.status(400).send({
            response: "Error",
            message: "La petición está mal formada"
        })


    }

    
})

module.exports = app
