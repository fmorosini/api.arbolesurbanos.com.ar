process.env.PORT = process.env.PORT || 5000

let urlDesarrollo = `http://localhost:${process.env.PORT}/json/`

process.env.NODE_ENV = process.env.NODE_ENV || 'desarrollo'

process.env.urlDB = `postgres://${process.env.PG_USR}:${process.env.PG_PWD}@localhost:5432/arbolado`

process.env.urlApi = (process.env.NODE_ENV === 'desarrollo' ? urlDesarrollo : 'https://api.arbolesurbanos.com.ar/json/')

process.env.pathToFireBaseAdminSecret = process.env.pathToFireBaseAdminSecret || "../prueba-5ecd4-firebase-adminsdk-xxync-db234b68fb.json"