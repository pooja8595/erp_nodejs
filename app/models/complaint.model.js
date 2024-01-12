module.exports = (sequelize, Sequelize) => {
    const complaintDetail = sequelize.define("complaint", {
        employee_complaint_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        complaint_from: {
            type: Sequelize.STRING
        },
        complaint_name: {
            type: Sequelize.STRING
        },
        complaint_against: {
            type: Sequelize.STRING
        },
        reporting_manager: {
            type: Sequelize.STRING
        },
        complaint_date: {
            type: Sequelize.DATEONLY
        },
        complaint_description: {
            type: Sequelize.STRING
        },
        notes: {
            type: Sequelize.STRING
        },
        record_added_by: {
            type: Sequelize.STRING
        },
        record_added_on: {
            type: Sequelize.DATEONLY
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "ACTIVE"
        }
    });
    return complaintDetail;
};