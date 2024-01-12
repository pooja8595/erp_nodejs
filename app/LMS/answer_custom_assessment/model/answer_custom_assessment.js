module.exports = (sequelize, Sequelize) => {
    const answer_custom_assesmentDetails = sequelize.define("answer_custom_assesment", {
        answer_custom_assesment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        custom_assesment_id: {
            type: Sequelize.INTEGER,
        },
        custom_assesment_answer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        IsCorrect: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull: true
        },
    });
    return answer_custom_assesmentDetails;
};