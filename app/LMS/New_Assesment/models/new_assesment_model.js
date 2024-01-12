module.exports = (sequelize, Sequelize) => {
    const newUserModel = sequelize.define("new_assesment", {
        assesment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        segment: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        assesment_type: {
            type: Sequelize.STRING
        },
        assesment_format: {
            type: Sequelize.STRING
        },
        upload_assesment: {
            type: Sequelize.STRING
        },
        number_of_content: {
            type: Sequelize.INTEGER
        },
        time_duration: {
            type: Sequelize.STRING
        },
        number_of_attempts: {
            type: Sequelize.STRING
        },
        passing_criteria: {
            type: Sequelize.STRING
        },
        due_date: {
            type: Sequelize.DATEONLY("DD-MM-YYYY")
        },
        status: {
            type: Sequelize.STRING
        },
    });
    return newUserModel
}