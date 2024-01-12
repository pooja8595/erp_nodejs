module.exports = (sequelize, Sequelize) => {
    const questionaries = sequelize.define("lms_no_of_attempt", {
        attempt_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content_id: {
            type: Sequelize.INTEGER
        },
        total_question: {
            type: Sequelize.INTEGER
        },
        Attempted_question: {
            type: Sequelize.INTEGER
        },
        NotAttempt_question: {
            type: Sequelize.INTEGER
        },
        right_answer_count: {
            type: Sequelize.INTEGER
        },
        start_time: {
            type: Sequelize.TIME
        },
        end_time: {
            type: Sequelize.TIME
        },
        start_date: {
            type: Sequelize.DATEONLY()
        },
        end_date: {
            type: Sequelize.DATEONLY()
        },
    });
    return questionaries;
};