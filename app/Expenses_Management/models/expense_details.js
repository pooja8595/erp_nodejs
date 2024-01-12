module.exports = (sequelize,Sequelize) => {
    const ExpensesDetail = sequelize.define("expenses_detail", {
        exp_detail_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        myexpense_id:{
          type: Sequelize.INTEGER,
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
            type: Sequelize.STRING,
            defaultValue: null
        },
        exp_end_date: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        expense_location: {
            type: Sequelize.STRING,
        },
        quotation_currency: {
            type:Sequelize.STRING,
        },
        indianAmount: {
            type:Sequelize.STRING,
        },
        quantity: {
            type:Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false, 
        },
        exr: {
            type:Sequelize.INTEGER,
        },
        finalAmount: {
            type:Sequelize.INTEGER,
        },
        verifier_status_name: {
            type:Sequelize.STRING,
        },
        verifier_comment: {
            type:Sequelize.STRING,
        },
        Currency_Type: {
            type:Sequelize.STRING,
        }
    })
    return ExpensesDetail;
    }