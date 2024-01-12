const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const proposalList = sequelize.define(
    "CRM_PROPOSAL_LIST_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      qty:{
        type: Sequelize.STRING
      },
      cgst:{
        type: Sequelize.FLOAT,
      },
      sgst:{
        type: Sequelize.FLOAT
      },
      igst:{
        type: Sequelize.FLOAT
      },
      status:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
      }
    },
    
    {
      freezeTableName: true,
    }
  );
  return proposalList;
};