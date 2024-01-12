const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const proposalData = sequelize.define(
    "CRM_CREATE_PROPOSAL_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      proposal_no:{
        type: Sequelize.STRING,
      },
      proposal_type:{
        type: Sequelize.STRING,
      },
      gst_no:{
        type: Sequelize.STRING,
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
  return proposalData;
};