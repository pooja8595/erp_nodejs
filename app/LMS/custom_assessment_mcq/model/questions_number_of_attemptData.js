module.exports = (sequelize, Sequelize) => {
    const questionaries = sequelize.define("lms_questions_attemptData", {
        number_of_attemptData_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        traning_id: {
            type: Sequelize.INTEGER
        },
        content_id: {
            type: Sequelize.INTEGER
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        attempt_count: {
            type: Sequelize.INTEGER
        },
        questionaries_id: {
            type: Sequelize.INTEGER
        },
        questions: {
            type: Sequelize.STRING
        },
        question_remarks: {
            type: Sequelize.STRING
        },
        option_id: {
            type: Sequelize.INTEGER
        },
        options: {
            type: Sequelize.STRING
        },
        // course_name: {
        //     type: Sequelize.STRING
        // },
        // result: {
        //     type: Sequelize.INTEGER,
        //     defaultValue: 0
        // }
    });
    return questionaries;
};