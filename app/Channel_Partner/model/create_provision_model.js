module.exports = (sequelize, Sequelize) => {
    const createProvisionDetails = sequelize.define("provision_details_data", {
        create_provision_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        lead_genration_id: {
            type: Sequelize.INTEGER
        },
        associated_company: {
            type: Sequelize.STRING
        },
        CP_Name: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.INTEGER
        },
        city_name: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.INTEGER
        },
        state_name: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.INTEGER
        },
        region_name: {
            type: Sequelize.STRING
        },
        stage: {
            type: Sequelize.STRING
        },
        certificate_type_name: {
            type: Sequelize.STRING
        },
        s1_wo: {
            type: Sequelize.STRING
        },
        s2_wo: {
            type: Sequelize.STRING
        },
        product_request: {
            type: Sequelize.STRING
        },
        street_address: {
            type: Sequelize.STRING
        },
        address2: {
            type: Sequelize.STRING
        },
        gst_number: {
            type: Sequelize.STRING
        },
        msme_number: {
            type: Sequelize.STRING
        },
        standard_program_assement: {
            type: Sequelize.INTEGER
        },
        delivery_month: {
            type: Sequelize.STRING
        },
        channel_partner_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        },
        cp_veriferId: {
            type: Sequelize.INTEGER
        },
        cp_veriferName: {
            type: Sequelize.STRING
        },
        sp_id: {
            type: Sequelize.INTEGER
        },
        sp_name: {
            type: Sequelize.STRING
        },
        Cp_registration_Approver_id: {
            type: Sequelize.INTEGER
        },
        Cp_registration_Approver_name: {
            type: Sequelize.STRING
        },
        Cp_source_id: {
            type: Sequelize.INTEGER
        },
        Cp_source_name: {
            type: Sequelize.STRING
        },
        Agreed_prec_incentive: {
            type: Sequelize.STRING
        },
        designation: {
            type: Sequelize.STRING
        },
        requsted_incentive: {
            type: Sequelize.STRING
        },
        special_incentive_amount: {
            type: Sequelize.STRING
        },
        invoice_number: {
            type: Sequelize.STRING
        },
        invoice_date: {
            type: Sequelize.STRING
        },
        invoice_submitted_By_CP: {
            type: Sequelize.STRING
        },
        provision_verified_by_Id: {
            type: Sequelize.INTEGER,
        },
        Provision_Created_By: {
            type: Sequelize.STRING
        },
        Provision_Created_Date: {
            type: Sequelize.STRING
        },
        provision_verified_by: {
            type: Sequelize.STRING,
        },
        provision_verified_date: {
            type: Sequelize.STRING
        },
        comments: {
            type: Sequelize.STRING
        },
        rbh_id: {
            type: Sequelize.INTEGER
        },
        rbh_name: {
            type: Sequelize.STRING
        },
        provision_status: {
            type: Sequelize.STRING,
        }
    });
    return createProvisionDetails;
}; 