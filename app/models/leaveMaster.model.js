module.exports = (sequelize, Sequelize) => {
    const leaveTypesDetails = sequelize.define("emp_leave_table", {
        emp_leave_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        leave_id:{
            type: Sequelize.INTEGER,
      },
      count:{
        type:Sequelize.INTEGER,
      },
      applier_name:{
        type: Sequelize.STRING
      },
        leave_type: {
            type: Sequelize.STRING
        },
        fromDate: {
            type: Sequelize.DATE
        },
        toDate: {
            type: Sequelize.DATE
        },
        remaning_leave: {
            type: Sequelize.INTEGER
        },
        reason: {
            type: Sequelize.STRING
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "APPROVE" , "REJECT"),
            defaultValue: "ACTIVE"
        },
    });
    return leaveTypesDetails;
};