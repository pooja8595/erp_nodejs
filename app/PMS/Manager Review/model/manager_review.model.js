module.exports = (sequelize, Sequelize) => {
    const manager_reviewDetails = sequelize.define("manager_review", {
        manager_review_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        first_name: {
            type: Sequelize.STRING
        },       
        designation: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        rating_id: {
            type: Sequelize.INTEGER
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        comment:{
            type: Sequelize.TEXT
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        review_status: {
            type: Sequelize.ENUM("Pending", "Reviewed"),
            defaultValue: "Pending"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return manager_reviewDetails;
}