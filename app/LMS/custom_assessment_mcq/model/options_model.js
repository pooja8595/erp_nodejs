module.exports = (sequelize, Sequelize) => {
    const questionaries = sequelize.define("option", {
        option_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        options: {
            type: Sequelize.JSON
        },
        content_id: {
            type: Sequelize.INTEGER
        },
        questionaries_id: {
            type: Sequelize.INTEGER
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE"
          }, 
    });
    return questionaries;
};