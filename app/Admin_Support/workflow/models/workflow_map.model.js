module.exports = (sequelize, Sequelize) => {

    const Work_Flow_map = sequelize.define('workFlowmap', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        workflowId:{
            type: Sequelize.INTEGER
        },
        workflow_roleId:{
            type: Sequelize.INTEGER
        },
        workflow_employeeId:{
            type: Sequelize.INTEGER
        },
        status:{
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isApproved: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    },
    )
    return Work_Flow_map;
}