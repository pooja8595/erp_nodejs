module.exports = (sequelize, Sequelize) => {
    const candidatesVerificationDetails = sequelize.define("candidates_verification", {
        candidtaes_v_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        candidate_id: {
            type: Sequelize.INTEGER
        },
        candidate_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        mobile_no: {
            type: Sequelize.STRING,
        },
        spoc_name: {
            type: Sequelize.STRING,
        },
        precious_job_status: {
            type: Sequelize.JSON
        },
        others_documents: {
            type: Sequelize.STRING,
        },
        email_verification: {
            type: Sequelize.BOOLEAN(true, false)
        },
        phone_verification: {
            type: Sequelize.BOOLEAN(true, false)
        },
        precious_job_status_verification: {
            type: Sequelize.JSON
        },
        status: {
            type: Sequelize.ENUM("Positive Verified", "Negative Verified", "Unable to Verify" , "Verify"),
            defaultValue: "Unable to Verify"
        },
        candidateOnboard: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    })
    return candidatesVerificationDetails;
}

