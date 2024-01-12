module.exports = (sequelize, Sequelize) => {
    const newUserModel = sequelize.define("new_content2", {
        content2_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content_id: {
            type: Sequelize.INTEGER,
        },
        traning_id: {
            type: Sequelize.INTEGER,
        },
        employee_id:{
            type:Sequelize.INTEGER,
        },
        question_status: {
            type: Sequelize.STRING
        },
        upload_course_video: {
            type: Sequelize.STRING
        },
        upload_material: {
            type: Sequelize.STRING
        },
        content_name: {
            type: Sequelize.STRING
        },
        content_description: {
            type: Sequelize.STRING
        },
        thumbnail: {
            type: Sequelize.STRING
        },
        option_mode: {
            type: Sequelize.STRING,
        },
        no_of_option_question: {
            type: Sequelize.STRING
        },
        progress_rate: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        video_current_time: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        question_not_attempt: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        result: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        assesment_not_attempt: {
            type: Sequelize.STRING
        },
        assesment: {
            type: Sequelize.BOOLEAN(true,false),
            defaultValue: false
        },
        option_mode: {
            type: Sequelize.ENUM("yes","no"),
            defaultValue: "yes"
        },
        result_preview: {
            type: Sequelize.BOOLEAN(true,false),
            defaultValue: false
        },
        isAssesment_submited: {
            type: Sequelize.BOOLEAN(true,false),
            defaultValue: false
        },
        given_attempt_count: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        status: {
            type: Sequelize.ENUM("ACTIVE","INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return newUserModel
}