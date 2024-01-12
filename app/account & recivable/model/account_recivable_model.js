module.exports = (sequelize, Sequelize) => {
    const make_invoice_Details = sequelize.define("make_invoice_manual", {
        make_invoice_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: Sequelize.STRING
        },
        client_name: {
            type: Sequelize.STRING
        },
        br_number: {
            type: Sequelize.INTEGER
        },
        ICTDate: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        associatedCompany: {
            type: Sequelize.STRING
        },
        audit_start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        audit_end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        state: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        creditDays: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        gst_number: {
            type: Sequelize.STRING
        },
        wo_verifyOn: {
            type: Sequelize.STRING
        },
        wo_verifyBy: {
            type: Sequelize.STRING
        },
        wo_verification_status: {
            type: Sequelize.STRING
        },
        export_charges: {
            type: Sequelize.ENUM("YES", "NO"),
            defaultValue: "NO"
        },
        customer_type: {
            type: Sequelize.STRING
        },
        child_name: {
            type: Sequelize.STRING
        },
        product: {
            type: Sequelize.STRING
        },
        discription: {
            type: Sequelize.STRING
        },
        currency: {
            type: Sequelize.STRING
        },
        total_amount: {
            type: Sequelize.INTEGER
        },
        sac_code: {
            type: Sequelize.STRING
        },
        additonal_charges: {
            type: Sequelize.STRING
        },
        gst: {
            type: Sequelize.STRING
        },
        expo_charges: {
            type: Sequelize.STRING
        },
        site_audit: {
            type: Sequelize.ENUM("YES", "NO"),
            defaultValue: "NO"
        },
        associated_company: {
            type: Sequelize.STRING
        },
        br_number1: {
            type: Sequelize.INTEGER
        },
        expo_value: {
            type: Sequelize.ENUM("YES", "NO"),
            defaultValue: "NO"
        },
        mobilePhonenumber: {
            type: Sequelize.BIGINT,
        },
        gstNumber: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        tableRows: {
            type: Sequelize.JSON
        },
        jobTitle: {
            type: Sequelize.STRING
        },
        streetAddress: {
            type: Sequelize.STRING
        },
        addressLine2: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        lead_genrate_id:{
            type: Sequelize.INTEGER,
        },
        totleNetAmount: {
            type: Sequelize.INTEGER
        }
    });
    return make_invoice_Details
}