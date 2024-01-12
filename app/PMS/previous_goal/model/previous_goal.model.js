module.exports = (sequelize, Sequelize) => {
    const previous_goalDetails = sequelize.define("previous_goal", {
        previous_goal_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        previous_goal_name: {
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
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return previous_goalDetails;
}