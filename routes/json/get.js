const express = require("express")

const app = express()

const { Op, Sequelize } = require('sequelize')

const initModels = require('../../models/init-models')

const sequelize = new Sequelize(process.env.urlDB)

const { especies, usuarios } = initModels(sequelize)

app.get('/json/usuarios', (req,res) => {

  usuarios.findAll({
    attributes: ['uid','email','apellido','nombre']
  }).then((data) => res.status(200).send({
    data: data
  }))

})

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
  .then((data) => res.status(200).send({
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