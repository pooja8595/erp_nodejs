module.exports = (sequelize,Sequelize) => {
    const MyExpenses = sequelize.define("expensechild", {
        expensechildId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ticket_id:{
            type:Sequelize.INTEGER
        },
        ticketType:{
            type:Sequelize.STRING
        },

        traveler_name: {
            type:Sequelize.STRING,
        },
        dateOf_travel:{
            type: Sequelize.STRING
        },
        modeOf_travel:{
            type:Sequelize.STRING,
        },
        travel_form:{
            type:Sequelize.STRING,
        },
        travel_to:{
            type:Sequelize.STRING,
        },
        time_travel:{
            type:Sequelize.STRING,
        },
        remarks:{
            type:Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
       

    })
    return MyExpenses;
    }