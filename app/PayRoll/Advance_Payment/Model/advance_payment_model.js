module.exports = (sequelize, Sequelize) => {
    const advancedPaymentDetail = sequelize.define("advance_payment", {
        advance_payment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        advance_amount: {
            type: Sequelize.STRING
        },
        created_by: {
            type: Sequelize.STRING
        },
        department: {
            type: Sequelize.STRING
        },
        employee_name: {
            type: Sequelize.STRING
        },
        employee_code: {
            type: Sequelize.STRING
        },
        installment_start_date: {
            type: Sequelize.STRING
        },
        installment_duration: {
            type: Sequelize.STRING
        },
        installment_data: {
            type: Sequelize.JSON
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    });
    return advancedPaymentDetail;
}