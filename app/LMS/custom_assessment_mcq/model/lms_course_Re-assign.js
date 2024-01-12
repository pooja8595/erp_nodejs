module.exports = (sequelize, Sequelize) => {
    const questionaries = sequelize.define("lms_course_Re-assign", {
        course_Re_assign_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: Sequelize.STRING
        },
        user_name: {
            type: Sequelize.STRING
        },
        segment: {
            type: Sequelize.STRING
        },
        course_name: {
            type: Sequelize.STRING
        },
        re_assigned_by: {
            type: Sequelize.STRING
        },
        author_id: {
            type: Sequelize.INTEGER
        },
        start_date: {
            type: Sequelize.STRING
        },
        end_date: {
            type: Sequelize.STRING
        }
        
    });
    return questionaries;
};