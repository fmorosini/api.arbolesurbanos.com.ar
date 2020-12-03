# api.arbolesurbanos.com.ar
API REST NodeJs Express para el sitio arbolesurbanos.com.ar

Devuelve en formato GeoJson los datos del arbolado georreferenciado en la página www.arbolesurbanos.com.ar

GET /arbolitos => Trae todos los arboles georreferenciados

  mismos campos que "especies" más posición en formato WGS84 y "nombre" nombre de la localidad según tabla "localidades"

GET /especies => Trae la tabla de especies

  nombrecientifico
  nombrevulgar
  magnitud (1,2,3)
  tipo (Latifoliada,Conífera,Monocotiledónea)
  follaje (Perenne,Caduco)
  thumbnail (url al thumbnail en www.arbolesurbanos.com.ar)
  imagen (url al ícono en www.arbolesurbanos.com.ar)

GET /localidades => Trae las localidades

  nombre
  centro (posición WGS84 del centro de la localidad)
  zoom (zoom inicial para Openstreetmaps)
