module.exports = (sequelize, Sequelize) => {
  const channelPartnerDetails = sequelize.define("channel_partner", {
    channel_partner_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cp_veriferId: {
      type: Sequelize.INTEGER,
    },
    cp_veriferName: {
      type: Sequelize.STRING,
    },
    associated_comapny: {
      type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    designation: {
      type: Sequelize.STRING,
    },
    city_id: {
      type: Sequelize.INTEGER,
    },
    city_name: {
      type: Sequelize.STRING,
    },
    state_id: {
      type: Sequelize.INTEGER,
    },
    state_name: {
      type: Sequelize.STRING,
    },
    Region_id: {
      type: Sequelize.INTEGER,
    },
    Region_name: {
      type: Sequelize.STRING,
    },
    Cp_registration_Approver_id: {
      type: Sequelize.INTEGER,
    },
    Cp_registration_Approver_name: {
      type: Sequelize.STRING,
    },
    Cp_source_id: {
      type: Sequelize.INTEGER,
    },
    Cp_source_name: {
      type: Sequelize.STRING
    },
    Contact_source_id: {
      type: Sequelize.INTEGER,
    },
    Contact_source_name: {
      type: Sequelize.STRING
    },
    Agreed_prec_incentive: {
      type: Sequelize.STRING,
    },
    Phone_number: {
      type: Sequelize.STRING,
    },
    mobile_phone_number: {
      type: Sequelize.STRING,
    },
    Re_Ap_Rmarks: {
      type: Sequelize.STRING,
    },
    Approved_date: {
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
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE", "YET TO APPROVED", "APPROVED", "REJECTED"),
      defaultValue: "YET TO APPROVED",
    },
  });
  return channelPartnerDetails;
};
