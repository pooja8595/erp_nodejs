module.exports = (sequelize,Sequelize) => {
    const MyExpenses = sequelize.define("myexpense", {
        myexpense_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        expense_report_no: {
          type: Sequelize.INTEGER,
        },
        brNumber:{
            type: Sequelize.STRING,
        },
        expense_type: {
            type:Sequelize.STRING,
        },
        expense_name: {
            type:Sequelize.JSON,
        },
        expense_desc: {
            type: Sequelize.STRING
        },
        expense_advance: {
            type:Sequelize.INTEGER,
            // defaultValue:0,
        
        },
        task_order: {
            type: Sequelize.STRING
        },
        taskOrdersNum: {
            type: Sequelize.INTEGER
        },
        travel_ticket: {
            type: Sequelize.STRING,
        },
        travel_remarks: {
            type: Sequelize.STRING
        },
        expenses_requestId: {
            type: Sequelize.INTEGER
        },
        date_posted:  {
            type: Sequelize.DATEONLY("DD/MM/YYYY"),
            defaultValue: null
        },
        remarks_posted: {
            type: Sequelize.DATEONLY("DD/MM/YYYY"),
            defaultValue: null
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        attach_bill:  {
            type: Sequelize.STRING,
        },

        expenseApproval:  {
            type: Sequelize.STRING,
        },
        leadId:{
            type: Sequelize.INTEGER,
            default: 0
        },
        ManageApproval: {
            type: Sequelize.INTEGER,
            default: 0
        },
        ticket_id: {
            type: Sequelize.JSON,
        },
        finalAmount: {
            type: Sequelize.JSON,
        },
        taskOrders: {
            type: Sequelize.JSON,
        },
        role_id: {
            type: Sequelize.INTEGER,
        }

    })
    return MyExpenses;
    }