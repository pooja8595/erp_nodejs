module.exports = (sequelize, Sequelize) => {
    const newUserModel = sequelize.define("new_user", {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_user_name: {
            type: Sequelize.STRING
        },
        employee_code: {
            type: Sequelize.STRING
        },
        segment: {
            type: Sequelize.STRING
        },
        roles: {
            type: Sequelize.STRING
        },
        position: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        }
    });
    return newUserModel
}