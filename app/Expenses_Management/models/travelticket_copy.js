module.exports = (sequelize,Sequelize) => {
    const TravelTicket = sequelize.define("travel_ticket_copy", {
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
            type: Sequelize.DATEONLY("2020-01-01"),
            defaultValue: "2020-01-01"
        },
        travel_time: {
            type: Sequelize.STRING
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
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        employee_id: {
            type: Sequelize.INTEGER,
            default: "ACTIVE"
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
        }
    })
    return TravelTicket;
    }