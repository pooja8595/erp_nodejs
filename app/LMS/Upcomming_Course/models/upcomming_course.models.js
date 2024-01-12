module.exports = (sequelize, Sequelize) => {
    const upcommingCourse = sequelize.define("upcomming_course", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    });
    return upcommingCourse;
}