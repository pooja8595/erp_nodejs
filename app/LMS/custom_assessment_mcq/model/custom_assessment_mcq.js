module.exports = (sequelize, Sequelize) => {
    const custom_assesment_mcqDetails = sequelize.define("custom_assesment_mcq", {
        custom_assesment_mcq_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        assesment_id: {
            type: Sequelize.INTEGER,
        },
        content_id: {
            type: Sequelize.INTEGER,
        },
        assesment_type: {
            type: Sequelize.ENUM("MCQ" , "Subjective", "Other"),
            allowNull: true,
        },
        custom_assesment_question_mcq: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        custom_option1: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        custom_option2: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        custom_option3: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        custom_option4: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
    });
    return custom_assesment_mcqDetails;
};