module.exports = (sequelize, Sequelize) => {
    const addUserCourseDetsil = sequelize.define("add_user_course", {
        assigned_id: {
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
        user_id: {
            type: Sequelize.JSON
        },
        author_course_id: {
            type: Sequelize.INTEGER
        },
        reporting_manager_id: {
            type: Sequelize.INTEGER
        },
        author_course_name: {
            type: Sequelize.JSON
        },
        category: {
            type: Sequelize.JSON
        },
        course_name: {
            type: Sequelize.JSON
        },
        segment: {
            type: Sequelize.JSON
        },
        course_description: {
            type: Sequelize.JSON
        },
        course_thumbnail: {
            type: Sequelize.JSON
        },
        user_status: {
            type: Sequelize.ENUM("NO", "YES"),
            defaultValue: "NO"
        },
        content_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        no_of_option_question: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        progress_rate: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        not_attempt: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        result: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        assigned: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        course_request_status: {
            type: Sequelize.ENUM("NOT REQUEST", "REQUEST", "APPROVED", "REJECTED"),
            defaultValue: "NOT REQUEST"
        },
        status: {
            type: Sequelize.ENUM("EXPIRED", "INPROGRESS", "COMPLETED" , "REQUEST", "FAILED"),
            defaultValue: "INPROGRESS"
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        new_max_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    });
    return addUserCourseDetsil
}