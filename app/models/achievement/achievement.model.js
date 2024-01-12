module.exports = (sequelize, Sequelize) => {

    const Achievement = sequelize.define("achievement",{
        achievement_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        achieved_by:{
            type: Sequelize.STRING,
        },
        achievements:{
             type: Sequelize.STRING,
        },
        reporting_manager:{
          type: Sequelize.STRING,
        }, 
        achieve_date: {
          type: Sequelize.DATEONLY('2020-01-01'),
        },
        achieve_description:{
          type: Sequelize.STRING,
        },
        notes:{
          type: Sequelize.STRING,
        },  
        recognized_by:{
          type: Sequelize.STRING,
        },  
        recognized_date: {
          type: Sequelize.DATEONLY('2020-01-01'),
        },
        course:{
          type: Sequelize.STRING,
        },  
        badges:{
          type: Sequelize.STRING,
        },  
        course_employee:{
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
          defaultValue: "ACTIVE",
        },
    })
    
  return Achievement
}