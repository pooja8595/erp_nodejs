module.exports = (sequelize, Sequelize) => {
    const add_user = sequelize.define("add_new_user", {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        traning_id: {
            type: Sequelize.INTEGER
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        user_category: {
            type: Sequelize.STRING
        },
        add_user: {
            type: Sequelize.JSON
        },
        author_course_id : {
            type: Sequelize.INTEGER
        },
        author_course_name : {
            type: Sequelize.STRING
        },
        assigned: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        create_user_status: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        status: {
            type: Sequelize.ENUM("EXPIRED", "INPROGRESS", "COMPLETED"),
            defaultValue: "INPROGRESS"
        },
        current_attempt_count:{
            type: Sequelize.INTEGER
        }
    });
    return add_user
}