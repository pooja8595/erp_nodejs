module.exports = (sequelize, Sequelize) => {
    const resignationDetail = sequelize.define("employeeResignation", {
        employee_resignation_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        employee_name: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        joining_date: {
            type: Sequelize.DATEONLY
        },
        years_of_service: {
            type: Sequelize.STRING
        },
        job_location: {
            type: Sequelize.STRING
        },
        manager: {
            type: Sequelize.STRING
        },
        resign_date: {
            type: Sequelize.DATEONLY
        },
        reason: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM( "INACTIVE","ACTIVE","APPROVED", "DENIED"),
            defaultValue: "ACTIVE"
        },
      
    });
    return resignationDetail;
};