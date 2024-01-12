module.exports = (sequelize, Sequelize) => {
    const po_details = sequelize.define("po_details", {
        po_details_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        po_date: {
            type: Sequelize.STRING
        },
        raised_by: {
            type: Sequelize.STRING
        },
        procurement_product_id: {
            type: Sequelize.INTEGER,
        },
        total: {
            type: Sequelize.INTEGER,
        },
        grand_total: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        total: {
            type: Sequelize.INTEGER,
        },
       
    });
    return po_details
}