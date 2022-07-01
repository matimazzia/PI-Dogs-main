const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    weightMin:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    weightMax:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    life_span:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull:false
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    },
  },{
    timestamps:false
  });
};
