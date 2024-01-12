module.exports = (sequelize, Sequelize) => {
    const candidateProfileDetails = sequelize.define("candidate_profile", {
        candidate_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        condidate_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        application_date:{
            type:Sequelize.DATEONLY,
        },
        mobile: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        upload_resume: {
            type: Sequelize.STRING,
            allowNull: true
        },
        assigned_hiring_manager: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status1: {
            type: Sequelize.STRING
        },
        // status: {
        //     type: Sequelize.ENUM("Not Reviewed", "Reviewed", "Shortlisted",),
        //     defaultValue: "Not Reviewed"
        // },
        status: {
            type: Sequelize.STRING,
            defaultValue: "Not Reviewed"
        },
        job_applied: {
            type: Sequelize.STRING,
        },
        job_title: {
            type: Sequelize.STRING
        },
        job_role: {
            type: Sequelize.STRING
        },
        application_date: {
            type: Sequelize.DATE(6)	
        },
        department: {
            type: Sequelize.STRING
        },
        job_type: {
            type: Sequelize.STRING
        },
        exprience: {
            type: Sequelize.STRING
        },
        requisition_status: {
            type: Sequelize.ENUM("Approved", "Pending"),
            defaultValue: "Pending"
        },
        address: {
            type: Sequelize.STRING
        },
        spoc_name: {
            type: Sequelize.STRING
        },
        interview_date: {
            type: Sequelize.DATEONLY
        },
        schedule_interview_date: {
            type: Sequelize.DATEONLY("DD-MM-YYYY")
        },
        schedule_interview_time: {
            type: Sequelize.TIME
        },
        final_interview_status: {
            type: Sequelize.ENUM("Pending", "Shortlisted"),
            defaultValue: "Pending"
        },
        interviewStatus: {
            type: Sequelize.STRING,
        },
        interviewer_name: {
            type: Sequelize.STRING
        },
        mode_of_interview: {
            type: Sequelize.STRING
        },
        round_level: {
            type: Sequelize.INTEGER
        },
        fixed_interview_date: {
            type: Sequelize.DATEONLY('01-01-2020')
        },
        fixed_interview_time: {
            type: Sequelize.TIME
        },
        fixed_interview_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        assigned_hiring_manager_id: {
            type: Sequelize.INTEGER
        },
        interview_level: {
            type: Sequelize.INTEGER
        },
        interviewCount: {
            type: Sequelize.JSON
        },
        background_verification_status:{
            type:Sequelize.STRING
        },
        send_loi_status:{
            type:Sequelize.STRING
        },
        date_of_joining:{
            type:Sequelize.STRING,
        }
    });
    return candidateProfileDetails;
};