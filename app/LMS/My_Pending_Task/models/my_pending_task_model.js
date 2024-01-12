module.exports = (sequelize, Sequelize) => {
    const myPendingTaskDetail = sequelize.define("lms_my_pending_task", {
        my_pending_task_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        traning_id: {
            type: Sequelize.INTEGER
        },
        author_course_id: {
            type: Sequelize.INTEGER
        },       
        course_request_status: {
            type: Sequelize.ENUM("NOT REQUEST", "REQUEST", "APPROVED", "REJECTED"),
            defaultValue: "REQUEST"
        },
        start_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        end_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        }
    });
    return myPendingTaskDetail
}