module.exports = (sequelize, Sequelize) => {
    const postVacancyDetails = sequelize.define("job_description_details", {
        job_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        job_title_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        job_role: {
            type: Sequelize.STRING
        },
        job_type: {
            type: Sequelize.STRING
        },
        age_range:{ 
            type: Sequelize.STRING,
        },
        FK_job_type_id: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        number_of_position: {
            type: Sequelize.INTEGER
        },
        candidate_age: {
            type: Sequelize.STRING
        },
        job_description: {
            type: Sequelize.TEXT
        },
        experience: {
            type: Sequelize.STRING
        },
        requisition: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        qualification: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "OPEN"
        },
        Interview_level:{
            type:Sequelize.STRING, 
        }
    });
    return postVacancyDetails;
};