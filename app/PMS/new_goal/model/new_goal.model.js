module.exports = (sequelize, Sequelize) => {
    const new_goalDetails = sequelize.define("new_goal", {
        new_goal_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        new_goal_name: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        rating_id: {
            type: Sequelize.INTEGER
        },
        manager_rating: {
            type: Sequelize.INTEGER
        },
        head_rating: {
            type: Sequelize.INTEGER
        },
        initiate_performance_appraisal_id: {
            type: Sequelize.INTEGER,
        },
        status_neworprev: {
            type: Sequelize.ENUM("New", "Previous"),
            defaultValue: "New"
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return new_goalDetails;
}