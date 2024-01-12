module.exports = (sequelize, Sequelize) => {
    const tbl_budgetMapping = sequelize.define("tbl_budgetMapping", {
        budgetMap_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        budgetAllocatedBy: {
            type: Sequelize.STRING
        },
        budgetAllocatedDate: {
            type: Sequelize.DATE,
            defaultValue: new Date
        },
        amount: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
    return tbl_budgetMapping;
}