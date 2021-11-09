require('./config/config')
const express = require('express')
const cors = require('cors')
const { proyecciones, reproyectar} = require('./functions/projections')
const { Op, Sequelize } = require('sequelize')
const initModels = require('./models/init-models')

const app = express()

const sequelize = new Sequelize(process.env.urlDB)

const { especies, localidades, arboles } = initModels(sequelize)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(require("./routes/geojson/get"))
app.use(require("./routes/json/post"))
app.use(require("./routes/misc/get"))
app.use(require("./routes/json/get"))

app.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)

    console.log(process.env.NODE_ENV)

    sequelize.authenticate()
    .then(() =>  console.log("Conectado a la BBDD via sequelize"))
    .catch((e) => console.log(e))

})

