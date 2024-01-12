module.exports = (sequelize, Sequelize) => {
    const tbl_budget = sequelize.define("tbl_budget", {
        budget_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, 
        type: {
            type: Sequelize.ENUM("Capex", "Opex")
        },
        budgetAllocated: {
            type: Sequelize.STRING
        },
        remainingAmount: {
            type: Sequelize.FLOAT
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
    return tbl_budget;
}