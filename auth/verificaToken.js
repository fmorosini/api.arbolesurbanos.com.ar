const admin = require("firebase-admin");
const serviceAccount = require(process.env.pathToFireBaseAdminSecret);

const verificaToken = async (token) => {

    admin.initializeApp({    
        credential: admin.credential.cert(serviceAccount)
    })

    let usuario = await admin.auth().verifyIdToken(token)

    return usuario


    
}

module.exports =  verificaToken