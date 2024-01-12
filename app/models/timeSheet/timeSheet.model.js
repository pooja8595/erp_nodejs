module.exports = (sequelize, Sequelize) => {
    const TimeSheet = sequelize.define("timeSheet", {
        timesheet_id: {
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
        manager_name: {
            type: Sequelize.STRING
        },
        contact_no: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        time_off_request: {
            type: Sequelize.STRING
        },
        time_off_taken: {
            type: Sequelize.STRING
        },
        time_off_request_reason: {
            type: Sequelize.STRING
        },
        date_off_request: {
            type: Sequelize.DATEONLY('2020-01-01'),
        },
        other_reason: {
            type: Sequelize.STRING
        },
        remark: {
            type: Sequelize.STRING
        },
        approve_status: {
            type: Sequelize.BOOLEAN,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    })
    return TimeSheet;
};