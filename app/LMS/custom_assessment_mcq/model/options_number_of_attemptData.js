module.exports = (sequelize, Sequelize) => {
    const options = sequelize.define("lms_options_attemptData", {
        option_attemptData_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content_id: {
            type: Sequelize.INTEGER
        },
        questionaries_id: {
            type: Sequelize.INTEGER
        },
        option_id: {
            type: Sequelize.INTEGER
        },
        options: {
            type: Sequelize.STRING
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false)
        }
    });
    return options;
};