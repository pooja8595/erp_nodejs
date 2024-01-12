const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const createDescription = sequelize.define(
    "CRM_DESCRIPTION_CREATE_MST",
    {
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
      },
      description:{
        type: Sequelize.TEXT
      },
      status:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    },
    {
      freezeTableName: true,
    }
  );
  return createDescription;
};