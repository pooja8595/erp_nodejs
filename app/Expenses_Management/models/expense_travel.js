module.exports = (sequelize, Sequelize) => {
    const TravelRequest = sequelize.define("travel_request", {
        expense_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        travel_id: {
            type: Sequelize.INTEGER,
        },
        travel_type: {
            type: Sequelize.STRING,
        },
        select_agent: {
            type: Sequelize.INTEGER,
        },
        empId: {
            type: Sequelize.INTEGER,
        },
        // expense_name: {
        //     type:Sequelize.JSON,
        // },
        travel_desc: {
            type: Sequelize.STRING
        },
        // exp_advance: {
        //     type: Sequelize.INTEGER,
        //     default: 1
        // },
        travel_approval: {
            type: Sequelize.STRING,
            defaultValue: false,
        },
        reporting_manager_id: {
            type: Sequelize.INTEGER,
        },
        reporting_manager_name: {
            type: Sequelize.STRING,
        },
        expense_approval: {
            type: Sequelize.STRING
        },
        task_order: {
            type: Sequelize.STRING
        },
        travel_ticket: {
            type: Sequelize.STRING,
            defaultValue: false,
        },
        traveler_name: {
            type: Sequelize.JSON
        },
        dateOf_travel: {

            // type: Sequelize.DATEONLY("2020-01-01"),
            type: Sequelize.JSON(Sequelize.DATE),
            // defaultValue: "2020-01-01"
        },
        modeOf_travel: {
            type: Sequelize.JSON
        },
        travel_form: {
            type: Sequelize.JSON
        },
        travel_to: {
            type: Sequelize.JSON
        },
        remarks: {
            type: Sequelize.JSON
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
        attach_ticket: {
            type: Sequelize.STRING
        },
        attach_invoice: {
            type: Sequelize.STRING
        },
        attach_remarks: {
            type: Sequelize.STRING
        },
        time_travel: {
            type: Sequelize.JSON
        },
        upload_onbording: {
            type: Sequelize.STRING
        },
        statusInvoice: {
            type: Sequelize.STRING
        },
        taskLeadId: {
            type: Sequelize.STRING
        }

    })
    return TravelRequest;
}