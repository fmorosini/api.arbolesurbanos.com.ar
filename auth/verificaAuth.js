require("../config/config")
const { Sequelize } = require('sequelize')
const initModels = require('../models/init-models')
const sequelize = new Sequelize(process.env.urlDB)
const { usuarios } = initModels(sequelize)



const verificaToken = require("./verificaToken")

const verificaAuth = (req,res,next) => {


    const idToken = req.get("token") 
    
    if(idToken){
    
        verificaToken(idToken)
        .then((usuario) => {

            const uid = usuario.uid

            usuarios.findByPk(uid)
            .then((data) => {

                if(data){
                    req.usuario = uid
                    next()
                }
                else{
                    req.usuario = null    
                    next()              
                }

            })
            .catch((error) => {
                req.usuario = null
                next()
            })

            
        })
        .catch((error) => {
            req.usuario = null
            next()
        })
    }
    else{
        req.usuario = null
        next()
    }

    
    

}



module.exports = { verificaAuth }