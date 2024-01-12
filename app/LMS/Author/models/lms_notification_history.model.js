
module.exports = (sequelize, Sequelize) => {
    const lms_notification_history = sequelize.define("lms_notification_histories", {
        lms_notification_history_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        lead_genration_id: {
            type: Sequelize.INTEGER,
        },
        employee_id: {
            type: Sequelize.INTEGER,
        },
        emp_name: {
            type: Sequelize.STRING,
        },
        employee_official_email: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING,
        },
        role_id: {
            type: Sequelize.INTEGER,
        },
        remark: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }

    });
    return lms_notification_history;
};