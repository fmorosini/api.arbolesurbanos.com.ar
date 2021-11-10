const admin = require("firebase-admin");
const serviceAccount = require(process.env.pathToFireBaseAdminSecret);

const verificaToken = async (token) => {

    if (!admin.apps.length) {
    admin.initializeApp({    
        credential: admin.credential.cert(serviceAccount)
    })}
    
    let usuario = await admin.auth().verifyIdToken(token)

    console.log(usuario)

    return usuario


    
}

module.exports =  verificaToken