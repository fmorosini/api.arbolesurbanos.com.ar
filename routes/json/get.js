const express = require("express")

const app = express()

const { proyecciones, reproyectar} = require('../../functions/projections')
const { Op, Sequelize } = require('sequelize')

const initModels = require('../../models/init-models')

const sequelize = new Sequelize(process.env.urlDB)

const { especies } = initModels(sequelize)

app.get('/json/especies', (req,res) => {

    
    especies.findAll()
     .then((data) => res.send({
         data: data
        }
      ))    
     .catch((error) => {
         res.status(500).send({
           response: "Error",
           message: error
         })
       })

      
})

module.exports = app