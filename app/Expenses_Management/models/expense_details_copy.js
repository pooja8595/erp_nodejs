module.exports = (sequelize,Sequelize) => {
    const ExpensesDetail = sequelize.define("expenses_detail_copy", {
        exp_detail_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        expensefor: {
          type: Sequelize.STRING,
        },
        billAmount : {
            type:Sequelize.STRING,
        },
        attachedBill : {
            type:Sequelize.STRING,
        },
        exp_start_date: {
            type: Sequelize.DATEONLY("2020-01-01"),
            defaultValue: "2020-01-01"
        },
        exp_end_date: {
            type: Sequelize.DATEONLY("2020-01-01"),
            defaultValue: "2020-01-01"
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        quotation_currency: {
            type: Sequelize.STRING,
        }
    })
    return ExpensesDetail;
    }