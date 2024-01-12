module.exports = (sequelize, Sequelize) => {
    const self_appraisalDetails = sequelize.define("self_appraisal", {
        self_appraisal_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        key_performance_indicator_id: {
            type: Sequelize.INTEGER,
        },       
        kpi: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        rating_id: {
            type: Sequelize.INTEGER
        },
        manager_rating: {
            type: Sequelize.INTEGER
        },
        head_rating: {
            type: Sequelize.INTEGER
        },
        final_hr_rating: {
            type: Sequelize.INTEGER
        },
        initiate_performance_appraisal_id: {
            type: Sequelize.INTEGER,
        },
        review_status: {
            type: Sequelize.ENUM("Pending", "Reviewed"),
            defaultValue: "Reviewed"
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return self_appraisalDetails;
}