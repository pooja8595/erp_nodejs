module.exports = (sequelize, Sequelize) => {
    const documentChannelPartner = sequelize.define("document_channel_partner", {
        document_channel_partner_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        channel_partner_id: {
            type: Sequelize.INTEGER
        },
        vendor_Reg_Form: {
            type: Sequelize.STRING
        },
        NDA_WordFormat: {
            type: Sequelize.STRING
        },
        acceptance_offer: {
            type: Sequelize.STRING
        },
        agreement: {
            type: Sequelize.STRING
        },
        vendor_declarations: {
            type: Sequelize.STRING
        },
        Whistle_Blower_Policy: {
            type: Sequelize.STRING
        },
        Remarks: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE",),
            defaultValue: "ACTIVE",
        }
    });
    return documentChannelPartner;
};