module.exports = (sequelize, Sequelize) => {
    const initiate_performance_appraisalDetails = sequelize.define("initiate_performance_appraisal", {
        initiate_performance_appraisal_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        duration_type_name: {
            type: Sequelize.STRING
        },
        emptype_id: {
            type: Sequelize.INTEGER
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        new_region_name: {
            type: Sequelize.JSON
        },
        department_name: {
            type: Sequelize.JSON
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status_date: {
            type: Sequelize.ENUM("Ongoing", "Completed",),
            defaultValue: "Ongoing"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        status_date: {
            type: Sequelize.ENUM("Ongoing", "Completed",),
            defaultValue: "Ongoing"
        },
    });
    return initiate_performance_appraisalDetails;
}