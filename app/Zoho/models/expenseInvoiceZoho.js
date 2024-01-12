module.exports = (sequelize, Sequelize) => {
    
    const ExpenseInvoiceZoho = sequelize.define('expense_invoice_zoho', {
        myexpense_id: {
            type: Sequelize.INTEGER,
        },
        contact_id: {
            type: Sequelize.STRING,
        },
        bearer: {
            type: Sequelize.STRING,
        },
        expense_report_no:{
            type: Sequelize.STRING,
           },
        opening_balance_amount:{
            type: Sequelize.INTEGER,
          },
          contact_type:{
            type: Sequelize.STRING,
           },
        contact_name:{
            type: Sequelize.STRING,
           },
        br_number:{
            type: Sequelize.STRING,
           },
        // company_name:{
        //     type: Sequelize.STRING,
        // },
        zoho_sync_status:{
            type: Sequelize.STRING,
            default: false
        },
        customer_name: {
            type: Sequelize.STRING,
        },
    })
    
    return ExpenseInvoiceZoho;
}