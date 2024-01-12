module.exports = (sequelize, Sequelize) => {
    const bonusDetailsModel = sequelize.define("Employee_Bonus", {
        Bonus_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        add_multiplr_user:{
            type: Sequelize.JSON,
        },
        bonus_amount:{
            type: Sequelize.INTEGER
        },
        bonus_date:{
            type:Sequelize.STRING
        },
        BonusType: {
            type:Sequelize.STRING,
        },
        department:{
            type:Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING,
        },
        status:{
            type: Sequelize.STRING,
            defaultValue: "Bonus Added"
        }
    });
    return bonusDetailsModel;
}

