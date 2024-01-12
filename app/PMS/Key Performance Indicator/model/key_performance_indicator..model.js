module.exports = (sequelize, Sequelize) => {
    const key_performance_indicatorDetails = sequelize.define("key_performance_indicator", {
        key_performance_indicator_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        designation_id: {
            type: Sequelize.INTEGER
        },
        unit_id: {
            type: Sequelize.INTEGER
        },
        target_id: {
            type: Sequelize.INTEGER
        },
        kpi: {
            type: Sequelize.STRING
        },
        weightage: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
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
    return key_performance_indicatorDetails;
}