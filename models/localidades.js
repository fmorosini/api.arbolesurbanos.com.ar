const { proyecciones, reproyectar } = require('../functions/projections')
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('localidades', {
    ogc_fid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wkb_geometry: {
      type: DataTypes.GEOMETRY('POINT', 5344),
      allowNull: true
    },
    wkb_geometryWGS84: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('wkb_geometry');
        let coordenadas = reproyectar(proyecciones.EPSG5344,proyecciones.WGS84,rawValue.coordinates)

        return {
          crs: { type: 'name', properties: { name: 'EPSG:4326' } },
          type: 'Point',
          coordinates: coordenadas
        }
      }
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    zoom: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'localidades',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "localidades_pk",
        unique: true,
        fields: [
          { name: "ogc_fid" },
        ]
      },
      {
        name: "localidades_wkb_geometry_geom_idx",
        fields: [
          { name: "wkb_geometry" },
        ]
      },
    ]
  });
};
