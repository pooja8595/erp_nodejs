module.exports = (sequelize, Sequelize) => {
    const newUser_TraningModel = sequelize.define("new_traning_user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        traning_id: {
            type: Sequelize.INTEGER
        },
        employee_id: {
            type: Sequelize.JSON
        },
        user_id: {
            type: Sequelize.JSON
        },
        user_name: {
            type: Sequelize.JSON
        },
    });
    return newUser_TraningModel
}