module.exports = (sequelize, Sequelize) => {
    const custom_assesmentDetails = sequelize.define("custom_assesment", {
        custom_assesment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        assesment_id: {
            type: Sequelize.INTEGER,
        },
        assesment_type: {
            type: Sequelize.ENUM("MCQ", "Subjective", "Other"),
            allowNull: false,
        },
        custom_assesment_question: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull: true
        },
    });
    return custom_assesmentDetails;
};