module.exports = (sequelize,Sequelize) => {
    const expense_zoho_data = sequelize.define("expense_zoho_data", {
        expense_zoho_data_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        contact_id: {
          type: Sequelize.INTEGER,
         
        },
        br_number:{
            type:Sequelize.INTEGER,
        },
      
        company_name:{
            type:Sequelize.STRING,
        },
        expense_type:{
            type:Sequelize.STRING,
        },
        
        contact_name:{
            type:Sequelize.STRING,
        },
        expense_desc:{
            type:Sequelize.STRING,
        },
        opening_balance_amount:{
            type:Sequelize.INTEGER,
        },
        task_order:{
            type:Sequelize.STRING,
        },
        travel_tickets:{
            type:Sequelize.STRING,
        },
        expense_requestId:{
            type:Sequelize.STRING,
        },
        expense_details:{
            type:Sequelize.STRING,
        },
})
return expense_zoho_data;
    
    }