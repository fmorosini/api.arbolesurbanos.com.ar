process.env.PORT = process.env.PORT || 3000

let urlDesarrollo = `http://192.168.1.200:${process.env.PORT}/`

process.env.NODE_ENV = process.env.NODE_ENV || 'desarrollo'

process.env.urlDB = 'postgres://postgres:kkck0303456@localhost:5432/arbolado'

process.env.urlApi = (process.env.NODE_ENV === 'desarrollo' ? urlDesarrollo : 'https://api.arbolesurbanos.com.ar/')