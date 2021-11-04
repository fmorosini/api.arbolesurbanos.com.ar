const proj4 = require('proj4')

const wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'"

let epsg5344 = 'PROJCS["POSGAR 2007 / Argentina 2",'
epsg5344 += 'GEOGCS["POSGAR 2007",'
epsg5344 += '    DATUM["Posiciones_Geodesicas_Argentinas_2007",'
epsg5344 += '        SPHEROID["GRS 1980",6378137,298.257222101,'
epsg5344 += '            AUTHORITY["EPSG","7019"]],'
epsg5344 += '        TOWGS84[0,0,0,0,0,0,0],'
epsg5344 += '        AUTHORITY["EPSG","1062"]],'
epsg5344 += '    PRIMEM["Greenwich",0,'
epsg5344 += '        AUTHORITY["EPSG","8901"]],'
epsg5344 += '    UNIT["degree",0.0174532925199433,'
epsg5344 += '        AUTHORITY["EPSG","9122"]],'
epsg5344 += '    AUTHORITY["EPSG","5340"]],'
epsg5344 += 'PROJECTION["Transverse_Mercator"],'
epsg5344 += 'PARAMETER["latitude_of_origin",-90],'
epsg5344 += 'PARAMETER["central_meridian",-69],'
epsg5344 += 'PARAMETER["scale_factor",1],'
epsg5344 += 'PARAMETER["false_easting",2500000],'
epsg5344 += 'PARAMETER["false_northing",0],'
epsg5344 += 'UNIT["metre",1,'
epsg5344 += '    AUTHORITY["EPSG","9001"]],'
epsg5344 += 'AUTHORITY["EPSG","5344"]]'

const proyecciones = {

    WGS84: wgs84,
    EPSG5344: epsg5344

}

const reproyectar = (proyeccionOrigen,proyeccionDestino,coordenadas) => {

    return proj4(proyeccionOrigen,proyeccionDestino,coordenadas)

}

module.exports = {

    proyecciones,
    reproyectar

}