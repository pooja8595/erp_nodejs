module.exports = (sequelize,Sequelize) => {
    const TravelTicket = sequelize.define("travel_ticket", {
        ticket_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        flight_no: {
          type: Sequelize.STRING,
        },
        travel_amount : {
            type:Sequelize.INTEGER,
        },
        mode_of_travel : {
            type:Sequelize.STRING,
        },
        travel_date: {
            type: Sequelize.STRING,
        },
        travel_time: {
            type: Sequelize.STRING
        },
        ticketTypeDetails:{
            type:Sequelize.STRING
        },
        travel_status: {
            type: Sequelize.STRING,
        },
        attach_ticket: {
            type: Sequelize.STRING
        },
        attach_invoice: {
            type: Sequelize.STRING,
        },
        attach_remarks: {
            type: Sequelize.STRING,
        },
        time: {
            type: Sequelize.STRING,
        },
        finalAmount: {
            type: Sequelize.INTEGER,
        },
        exr: {
            type: Sequelize.STRING,
        },
        arrivalTime: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        employee_id: {
            type: Sequelize.INTEGER,
            default: "ACTIVE"
        },
        sugested_employee_id:{
            type: Sequelize.INTEGER,
        },
        flight_name: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        departure: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        arrival: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        quotation_currency: {
            type: Sequelize.STRING,
        },
        expenseId: {
            type: Sequelize.INTEGER,
        },
        verifier_status_name: {
            type: Sequelize.STRING,
        },
        verifier_comment: {
            type: Sequelize.STRING,
        },
        myexpense_status: {
            type: Sequelize.STRING,
            default: "INACTIVE"
        },
        time: {
            type: Sequelize.STRING,
        },
        finalAmount: {
            type: Sequelize.INTEGER,
        },
        exr: {
            type: Sequelize.STRING,
        },
        arrivalTime: {
            type: Sequelize.STRING,
        },
        select_agent:{
            type:Sequelize.INTEGER,
        },
        mangement_fee: {
            type:Sequelize.INTEGER,
        }

    })
    return TravelTicket;
    }