module.exports = (sequelize, Sequelize) => {
    const holiday_Details = sequelize.define("holiday", {
        holiday_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        holiday_name: {
            type: Sequelize.STRING
        },
        holiday_type: {
            type: Sequelize.STRING
        },
        holiday_from: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        holiday_to: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        total_leave: {
            type: Sequelize.INTEGER
        },
        resion: {
            type: Sequelize.STRING
        },
        restricted_holiday: {
            type: Sequelize.BOOLEAN(true, false)
        },
        holiday_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return holiday_Details;
}