const express = require("express")
const app = express()
const { verificaAuth } = require("../../auth/verificaAuth")
const { Sequelize } = require('sequelize')
const initModels = require('../../models/init-models')
const sequelize = new Sequelize(process.env.urlDB)
const { arboles } = initModels(sequelize)

app.delete("/json/arbol", verificaAuth, (req,res) => {

    const id = req.body.id

    if(!req.usuario){

        res.status(401).send({
            response: "Error",
            message: "No autorizado"
        })

       return

    }

    if(!id){

        res.status(401).send({
            response: "Error",
            message: "Debe indicar el id de arbol"
        })

        return

    }   
   

    arboles.findByPk(id)
    .then((data) => {

        if(data){

            arboles.destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                res.status(200).send({
                    response: "OK",
                    message: `Se borró árbol ${id}`
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

})

module.exports = app