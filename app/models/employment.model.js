module.exports = (sequelize, Sequelize) => {
    const EmploymentType = sequelize.define("employmenttype", {
      emptype_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      emptype_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },  
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
      },
      filter_status:{
        type: Sequelize.STRING,
        defaultValue:"HRMS"
      }
    },{
        timestamps: true,
      },
      
    );

    return EmploymentType;
  };