module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("procurement_product_request", {
        procurement_product_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        procurement_id: {
            type: Sequelize.INTEGER
        },
        product_image: {
            type: Sequelize.STRING
        },
        item_name: {
            type: Sequelize.STRING
        },
        item_code: {
            type: Sequelize.INTEGER
        },
        unit: {
            type: Sequelize.INTEGER
        },
        priority: {
            type: Sequelize.ENUM("HIGH", "MEDIUM", "LOW")
        },
        mvp: {
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
        name: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        emp_id: {
            type: Sequelize.INTEGER
        },
        approvel_status: {
            type: Sequelize.ENUM("APPROVED", "PENDING", "REJECTED", "TO BE APPROVED"),
            defaultValue: "PENDING"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        end_date: {
            type: Sequelize.STRING
        },
        vendors: {
            type: Sequelize.JSON
        },
        vendors_invited_count: {
            type: Sequelize.INTEGER
        },
        vendors_responded_count: {
            type: Sequelize.INTEGER
        },
        invoice_n_o: {
            type: Sequelize.INTEGER
        },
        invoice_date: {
            type: Sequelize.STRING
        },
        invoice_remarks: {
            type: Sequelize.STRING
        },
        invoice_file: {
            type: Sequelize.STRING
        },
        grn_date: {
            type: Sequelize.STRING
        },
        grn_item_n_o: {
            type: Sequelize.INTEGER
        },
        grn_location: {
            type: Sequelize.STRING
        },
        grn_file: {
            type: Sequelize.STRING
        },
        asset_category_id: {
            type: Sequelize.INTEGER
        },
        rfp_status: {
            type: Sequelize.ENUM("LIVE RFP", "CLOSE RFP"),
        },
        po_status: {
            type: Sequelize.ENUM("DRAFT PO", "ISSUED PO", "ISSUED INVOICE","PAID"),
        },
        statusVendor: {
            type: Sequelize.STRING
        }
    });
    return procurement
}