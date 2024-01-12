module.exports = (sequelize, Sequelize) => {
    const Invoice_Inline = sequelize.define("invoice_inline", {
        invoice_inline_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        item_description: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        unit: {
            type: Sequelize.STRING
        },
        unitPrice: {
            type: Sequelize.INTEGER
        },
        netAmount: {
            type: Sequelize.INTEGER
        },
        lineItem: {
            type: Sequelize.STRING
        },
        lead_genrate_id: {
            type: Sequelize.INTEGER
        },
        br_number: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            default: "false"
        },
        lineItem_status: {
            type: Sequelize.STRING,
            default: "false"
        },
        statusInvoice:{
            type: Sequelize.STRING,
            default: "Send Finance"
        },
        totleNetAmount: {
            type: Sequelize.INTEGER
        }
    });
    return Invoice_Inline
}