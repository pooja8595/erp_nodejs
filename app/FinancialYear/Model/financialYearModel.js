module.exports = (sequelize, Sequelize) => {
    const tbl_financialYear = sequelize.define("tbl_financialYear", {
        financialYear_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        financialYearValue: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    });
    return tbl_financialYear;
}