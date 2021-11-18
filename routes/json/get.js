const express = require("express")

const app = express()

const { Op, Sequelize } = require('sequelize')

const initModels = require('../../models/init-models')

const sequelize = new Sequelize(process.env.urlDB)

const { especies } = initModels(sequelize)

app.get('/json/especies', (req,res) => {

  let nombre = req.query.nombre ? req.query.nombre : null

  const predicate = nombre ? 
    {
      where: {
        [Op.or]:
          [
            {nombrecientifico: {
              [Op.iLike]: `${nombre}%`
            }},
            {nombrevulgar: {
              [Op.iLike]: `${nombre}%`
            }}
          ]

        }  
    }  
  : {}

    
  especies.findAll(predicate)
  .then((data) => res.send({
      data: data
  }))    
    .catch((error) => {
        res.status(500).send({
          response: "Error",
          message: error
        })
      })

      
})

module.exports = app