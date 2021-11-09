const express = require("express")

const app = express()

const { verificaAuth } = require("../../auth/verificaAuth")

const { proyecciones, reproyectar} = require('../../functions/projections')
const { Op, Sequelize } = require('sequelize')

const initModels = require('../../models/init-models')

const sequelize = new Sequelize(process.env.urlDB)

const { arboles } = initModels(sequelize)

app.put("/json/arbol", verificaAuth, (req,res) => {

    const id = req.body.id
    const nuevaEspecie = req.body.especie
    const nuevaLocalidad = req.body.localidad
    let nuevaPosicion = req.body.posicion

    if(!id){

        res.status(401).send({
            response: "Error",
            message: "Debe indicar el id de arbol"
        })

        return

    }
    
    if(!req.usuario){

        res.status(401).send({
            response: "Error",
            message: "No autorizado"
        })

       return

    }

    if(nuevaPosicion){

        nuevaPosicion = reproyectar(proyecciones.WGS84, proyecciones.EPSG5344, nuevaPosicion)
    }

    arboles.findByPk(id)
    .then((data) => {

        if(data){
            

            arboles.update({
                //posicion: nuevaPosicion || data.posicion.coordinates,
                especie: nuevaEspecie || data.especie,
                localidad: nuevaLocalidad || data.localidad
            },
            {
                where: {
                id: id
            }})
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(500).send({
                    response: "Error",
                    message: error
                })
            })

        }
        else{
            res.status(404).send({
                response: "Error",
                message: "arbol no encontrado"
            })
        }

    })
    .catch((error) => {

        res.status(500).send({
            response: "Error",
            message: error
        })

    })



} )



module.exports = app