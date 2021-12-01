var DataTypes = require("sequelize").DataTypes;
var _arboles = require("./arboles");
var _arboles_bariloche = require("./arboles_bariloche");
var _especies = require("./especies");
var _layer = require("./layer");
var _localidades = require("./localidades");
var _topology = require("./topology");
var _usuarios = require("./usuarios");


function initModels(sequelize) {
  var arboles = _arboles(sequelize, DataTypes);
  var arboles_bariloche = _arboles_bariloche(sequelize, DataTypes);
  var especies = _especies(sequelize, DataTypes);
  var layer = _layer(sequelize, DataTypes);
  var localidades = _localidades(sequelize, DataTypes);
  var topology = _topology(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);


  arboles.belongsTo(especies, { as: "arbol_especie", foreignKey: "especie"});
  especies.hasMany(arboles, { as: "arboles", foreignKey: "especie"});
  arboles.belongsTo(localidades, { as: "localidad_localidade", foreignKey: "localidad"});
  localidades.hasMany(arboles, { as: "arboles", foreignKey: "localidad"});
  layer.belongsTo(topology, { as: "topology", foreignKey: "topology_id"});
  topology.hasMany(layer, { as: "layers", foreignKey: "topology_id"});
  arboles.belongsTo(usuarios, { as: "usuario_usuario", foreignKey: "usuario"});
  usuarios.hasMany(arboles, { as: "arboles", foreignKey: "usuario"});

  return {
    arboles,
    arboles_bariloche,
    especies,
    layer,
    localidades,
    topology,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
