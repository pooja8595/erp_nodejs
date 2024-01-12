module.exports = (sequelize, Sequelize) => {
    const shift = sequelize.define("shift", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        shift_name: {
            type: Sequelize.STRING
        },
        shift_from_time: {
            type: Sequelize.STRING
        },
        shift_to_time: {
            type: Sequelize.STRING
        },
        working_hour: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
    return shift;
}