const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Atividade = conn.define(
  "tb_atividade",
  {
    id_atividade: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    dataR:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    projeto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tempo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    horas: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    deadline: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    brief: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    observation: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nome_user: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    dia_semana: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data_send: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

Atividade.belongsTo(Usuario, {
  foreignKey: "id_user",
  constraints: true,
  foreignKeyConstraint: "id_user",
});

module.exports = Atividade;
