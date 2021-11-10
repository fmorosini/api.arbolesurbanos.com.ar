require("../config/config")



const verificaToken = require("./verificaToken")

const verificaAuth = (req,res,next) => {


    const idToken = req.get("token") 
    
    if(idToken){
    
        verificaToken(idToken)
        .then((usuario) => {
            req.usuario = usuario.email
            next()
        })
        .catch((error) => {
            console.log(error)
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