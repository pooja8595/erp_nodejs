module.exports = (sequelize, Sequelize) => {
    const newTraningModel = sequelize.define("new_traning", {
        traning_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        author_course_id: {
            type: Sequelize.INTEGER
        },
        author_course_name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        course_name: {
            type: Sequelize.STRING
        },
        segment: {
            type: Sequelize.STRING
        },
        course_description: {
            type: Sequelize.STRING
        },
        course_thumbnail: {
            type: Sequelize.STRING
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
            type: Sequelize.INTEGER,
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
            type: Sequelize.ENUM("OPEN", "START COURSE", "REQUEST", "INPROGRESS", "COMPLETED"),
            defaultValue: "OPEN"
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        user_category: {
            type: Sequelize.STRING
        },
        add_user: {
            type: Sequelize.JSON
        },
        create_user_status: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        Max_attempt_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        current_attempt_count: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        readyForNextAttempt: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        isExpired: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
    });
    return newTraningModel
}