module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("procurement_approvel_level", {
       approved_level_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        approver_name: {
            type: Sequelize.STRING
        },
        approvel_level: {
            type: Sequelize.INTEGER
        },
        Approvel_status: {
            type: Sequelize.ENUM("APPROVED", "PENDING"),
            defaultValue: "PENDING"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
       
    });
    return procurement
}