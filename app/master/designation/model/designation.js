module.exports = (sequelize, Sequelize) => {
    const stageDetails = sequelize.define("designation", {
        designation_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        designation_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
        filter_status:{
            type: Sequelize.STRING,
            defaultValue:"HRMS"
          }
    });
    return stageDetails;
};