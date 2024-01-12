module.exports = (sequelize, Sequelize) => {
    const attendanceDetails = sequelize.define("attendance_calender", {
        attendance_calender_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        employee_name: {
            type: Sequelize.STRING
        },
        punching_date: {
            type: Sequelize.STRING,
        },
        punching_time: {
            type: Sequelize.STRING,
        },
        punching_status: {
            type: Sequelize.ENUM("IN", "OUT")
        },
        attendance_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    });
    return attendanceDetails;
};