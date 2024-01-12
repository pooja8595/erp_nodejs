module.exports = (sequelize, Sequelize) => {
    const leaveShow = sequelize.define("schedule_fixed_interview", {
        interview_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        candidate_id: {
            type: Sequelize.INTEGER
        },
        round_level: {
            type: Sequelize.STRING
        },
        mode_of_interview: {
            type: Sequelize.STRING
        },
        interviewer_name: {
            type: Sequelize.STRING
        },
        schedule_interview_date: {
            type: Sequelize.DATEONLY('01-01-2000')
        },
        schedule_interview_time: {
            type: Sequelize.TIME
        },
        remark: {
            type: Sequelize.STRING
        },
        action: {
            type: Sequelize.ENUM("Pending" ,"Shortlisted","Rejected","Finalshortlisted"),
            defaultValue: "Pending"
        },
        final_shortlisted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM("Reject" , "Cancel")
        },
    });
    return leaveShow;
};