module.exports = (sequelize, Sequelize) => {
    const questionaries = sequelize.define("questionaries", {
        questionaries_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        questions: {
            type: Sequelize.JSON
        },
        question_remarks: {
            type: Sequelize.STRING
        },
        correct_answer: {
            type: Sequelize.STRING
        },
        options_content: {
            type: Sequelize.JSON
        },
        content_id: {
            type: Sequelize.INTEGER,
        },
        user_answer: {
            type: Sequelize.JSON, 
        },
        user_login_id: {
            type: Sequelize.INTEGER,
        },
        option_mode: {
            type: Sequelize.ENUM("yes","no"),
            defaultValue: "yes"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE"
          }, 
        no_of_assesment_attempt: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },  
    });
    return questionaries;
};