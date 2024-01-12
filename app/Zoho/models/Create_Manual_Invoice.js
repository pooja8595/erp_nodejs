module.exports = (sequelize, Sequelize) => {

    const Manual_Invoice = sequelize.define('manual_invoice_data', {
        Manual_Invoice_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        work_oder_number:{
            type: Sequelize.INTEGER,
        },
        client_name:{
            type: Sequelize.STRING
        },
        br_number:{
            type: Sequelize.STRING
        },
        child_name:{
            type: Sequelize.STRING
        },
        product:{
            type: Sequelize.STRING
        },
        discription:{
            type: Sequelize.STRING
        },
        currency:{
            type: Sequelize.STRING
        },
        total_amount:{
            type: Sequelize.INTEGER
        },
        export_charges:{
            type: Sequelize.STRING
        },
        expo_charges:{
            type:Sequelize.STRING
        },
        gst:{
            type:Sequelize.STRING
        },
        sac_code:{
            type:Sequelize.STRING
        },
        wo_verifyOn:{
            type:Sequelize.STRING
        },
        wo_verifyBy:{
            type:Sequelize.STRING
        },
        wo_verification_status:{
            type:Sequelize.STRING
        },
        firstName:{
            type:Sequelize.STRING
        },
        audit_start_date:{
            type:Sequelize.STRING
        },
        audit_end_date:{
            type:Sequelize.STRING
        },
        ICTDate:{
            type:Sequelize.STRING
        },
        associatedCompany:{
            type:Sequelize.STRING
        },
        jobTitle:{
            type:Sequelize.STRING
        },
        city:{
            type:Sequelize.STRING
        },
        state:{
            type:Sequelize.STRING
        },
        mobilePhonenumber:{
            type:Sequelize.STRING
        },
        streetAddress:{
            type:Sequelize.STRING
        },
        addressLine2:{
            type:Sequelize.STRING
        },

        creditDays:{
            type:Sequelize.STRING
        },
        item_details:{
            type:Sequelize.JSON
        },
        manual_invoice_status:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        reson:{
            type:Sequelize.STRING
        },
        status:{
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    
    return Manual_Invoice;
}