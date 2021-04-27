//Recibe el array resultado de la consulta a PostGIS y lo transforma en GeoJSON

const toGeoJSON = (data) => {

    class featureCollection {

        constructor(features) {

            this.type = "FeatureCollection"
            this.features = features

        }
    }

    class feature {

        constructor(geometry, properties) {

            this.type = "Feature"
            this.geometry = geometry
            this.properties = properties

        }
    }

    class geometry {

        constructor(coordinates) {

            this.type = "Point"
            this.coordinates = coordinates

        }
    }

    class properties {

        constructor(nombrevulgar, nombrecientifico, tipo, follaje, magnitud, imagen, thumbnail, url_ficha) {

            this.nombrevulgar = nombrevulgar
            this.nombrecientifico = nombrecientifico
            this.tipo = tipo
            this.magnitud = magnitud
            this.follaje = follaje
            this.imagen = imagen
            this.thumbnail = thumbnail
            this.url_ficha = url_ficha

        }
    }

    let fichures = new featureCollection([])

    data.forEach(arbol => {

        let geometria = new geometry(arbol.posicion.coordinates)
        let propiedades = new properties(arbol.nombrevulgar,arbol.nombrecientifico,arbol.tipo,arbol.follaje,arbol.magnitud,arbol.imagen,arbol.thumbnail,arbol.url_ficha)
        let fichur = new feature(geometria,propiedades)

        fichures.features.push(fichur)
        
    })

    return fichures

}

module.exports = {

    toGeoJSON

}