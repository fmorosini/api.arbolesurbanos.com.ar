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

        constructor(nombrevulgar, nombrecientifico, tipo, follaje, magnitud, imagen, thumbnail) {

            this.nombrevulgar = nombrevulgar
            this.nombrecientifico = nombrecientifico
            this.tipo = tipo
            this.magnitud = magnitud
            this.follaje = follaje
            this.imagen = imagen
            this.thumbnail = thumbnail

        }
    }

    let fichures = new featureCollection([])

    data.forEach(arbol => {

        let geometria = new geometry(arbol.posicion.coordinates)
        let propiedades = new properties(arbol.nombrevulgar,arbol.nombrecientifico,arbol.tipo,arbol.follaje,arbol.magnitud,arbol.imagen,arbol.thumbnail)
        let fichur = new feature(geometria,propiedades)

        fichures.features.push(fichur)
        
    })

    return fichures

}

module.exports = {

    toGeoJSON

}