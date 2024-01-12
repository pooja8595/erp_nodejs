module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("procurement_purchase_request", {
        procurement_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        alldata: {
            type: Sequelize.JSON
        },
       
        name: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        emp_id: {
            type: Sequelize.INTEGER
        },
        location: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        pin: {
            type: Sequelize.INTEGER
        },
        delivery_address: {
            type: Sequelize.STRING
        },
        file: {
            type: Sequelize.STRING
        },
        remarks: {
            type: Sequelize.STRING
        },
        asset_category_id: {
            type: Sequelize.INTEGER
        },
        approvel_status: {
            type: Sequelize.ENUM("APPROVED", "PENDING", "REJECTED"),
            defaultValue: "PENDING"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return procurement
}