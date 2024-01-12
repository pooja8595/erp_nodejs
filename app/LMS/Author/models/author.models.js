
module.exports = (sequelize, Sequelize) => {
    const authorModel = sequelize.define("new_author", {
        author_trainer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        region_id: {
            type: Sequelize.INTEGER,
        },
        category_id: {
            type: Sequelize.INTEGER,
        },
        employee_id: {
            type: Sequelize.INTEGER,
        },
        author_name: {
            type: Sequelize.STRING
        },
        fullName: {
            type: Sequelize.STRING
        },
        employee_code: {
            type: Sequelize.STRING
        },
        segment_suv: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        module: {
            type: Sequelize.STRING
        },
        branch: {
            type: Sequelize.STRING
        },
        course_name: {
            type: Sequelize.STRING
        },
        created_by: {
            type: Sequelize.STRING
        },
        upload_trainer_document: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        }
    });
    return authorModel;
};