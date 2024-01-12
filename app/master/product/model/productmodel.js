module.exports = (sequelize, Sequelize) => {
    const product_master = sequelize.define("product_master", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_name: {
            type: Sequelize.STRING
        },
        product_code: {
            type: Sequelize.STRING
        },
        variant_name: {
            type: Sequelize.STRING
        },
        product_description: {
            type: Sequelize.STRING
        },
        mvp: {
            type: Sequelize.STRING
        },
        price_per_unit: {
            type: Sequelize.STRING
        },
        average_production_cost: {
            type: Sequelize.STRING
        },
        product_specification: {
            type: Sequelize.STRING
        },
        maximum_discount:{
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
    },{
        freezeTableName:true
    });
    return product_master;
};