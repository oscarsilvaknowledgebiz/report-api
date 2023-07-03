const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Envio = conn.define(
  "tb_envio",
  {
    id_envio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_envio: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  { freezeTableName: true }
);

module.exports = Envio;
