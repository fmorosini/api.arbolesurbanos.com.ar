const express = require('express');
const bodyParser = require('body-parser')

const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.post('/test', (req,res) => {

    res.json({
        ok: true
    })

})

app.get('/', (req,res) => {

    res.status(200).send('Hola')

})

app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});