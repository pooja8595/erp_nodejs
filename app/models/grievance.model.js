module.exports = (sequelize, Sequelize) => {
    const grievanceDetail = sequelize.define("grievanve", {
        employee_grievance_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        action_manager: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        reporting_manager: {
            type: Sequelize.STRING
        },
        grievance_date: {
            type: Sequelize.DATEONLY
        },
        note: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        grievance_type: {
            type: Sequelize.STRING
        },
        record_added_on: {
            type: Sequelize.DATEONLY
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "ACTIVE"
        },
        employee_id: {
            type: Sequelize.INTEGER
        }
    });
    return grievanceDetail
}