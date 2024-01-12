
module.exports = (sequelize, Sequelize) => {
    const authorModel = sequelize.define("CP_notification", {
        cp_notification_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }

    });
    return authorModel;
};