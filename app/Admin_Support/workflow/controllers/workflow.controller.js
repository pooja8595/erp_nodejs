const { response } = require("express");
const db = require("../../../models/index");
const workFlow = db.Work_Flow;
const workFlowMap = db.workflowmap;
const itemMaster = db.ItemMaster;
const serviceMaster = db.Service_master;
const user = db.user;
const role = db.role_master

exports.create_work_Flow = async (req, res) => {
    try{
        const {workflowType,wokflowcategory,workflowdepartment,roleFiled} = req.body;
       console.log("roleFiledddd",roleFiled)
        let roleFiledValue = req.body.roleFiled
        let response;
        const createWorkFlow = await workFlow.create({
            workflow_type: req.body.workflowType,
            workflow_category: req.body.wokflowcategory,
            workflow_department: req.body.workflowdepartment,
        });
        if(roleFiledValue){
            for(let i=0; i< roleFiledValue.length; i++){
                response = await workFlowMap.create({
                   workflowId: createWorkFlow.workflow_id,
                   workflow_roleId:roleFiledValue[i].roleId,
                   workflow_employeeId: roleFiledValue[i].employeeId,
               });
           }
        }
        
       
        return res.status(200).send({ code: 200, message: "Work Flow Created Successfully!", data: createWorkFlow });
        
    }catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

exports.get_All_workflow = async (req, res) => {
    try {
        // const getData = await workFlow.findAll({
        //     where: { status: "ACTIVE" },
        //     // include: [{model: itemMaster,attributes: ["item_name", "item_code"]}]
        //     include: [
        //     {
        //         model:itemMaster,
        //         as: 'itemmaster',
        //         attributes: ['id', 'item_name', 'item_code']
        //     },
        //     {
        //         model:serviceMaster,
        //         as: 'servicemaster',
        //         attributes: ['service_id', 'service_name', 'service_code']
        //     },
        //     {
        //         model:user,
        //         attributes: ['employee_id', 'user_role', 'first_name', 'middle_name', 'last_name']
            
        //     },
        //     {
        //         model:role,
        //         attributes: ['role_master_id', 'role_master_name']
            
        //     }
        // ]
        // });

        const query = `SELECT wf.workflow_id,wf.workflow_type,im.id AS itemId,im.item_name,im.item_code,
        sm.service_id,
        sm.service_name,dp.dept_id,dp.department_name FROM workFlows AS wf 
        LEFT JOIN ItemMasters AS im ON im.id = wf.workflow_category AND wf.workflow_type='item'
        LEFT JOIN tbl_servicemaster AS sm ON sm.service_id = wf.workflow_category AND wf.workflow_type='service'
        LEFT JOIN departments AS dp ON dp.dept_id=wf.workflow_department AND dp.status='ACTIVE'
         WHERE wf.status='ACTIVE'`;

         const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
        if (data) {
            return res.status(200).send({ code: 200, message: "Fetch All Security_Agreement Data Successfully", data: data });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

exports.view_workflow_byId = async (req, res) => {
    try {
        const workFlowId = req.params.id;

        const workFlowData = await workFlow.findOne({ where: { workflow_id: workFlowId, status: "ACTIVE" } });
        console.log("workflowdatatatta", workFlowData);
        const workFlowMapData = await workFlowMap.findAll({where: {workflowId: workFlowId, status: "ACTIVE"} });
        console.log("workFlowMapData", workFlowMapData);
        if (workFlowData) {
            const query = `SELECT wf.workflow_id,wf.workflow_type,im.id AS itemId,im.item_name,im.item_code,
        sm.service_id,
        sm.service_name,dp.dept_id,dp.department_name FROM workFlows AS wf 
        LEFT JOIN ItemMasters AS im ON im.id = wf.workflow_category AND wf.workflow_type='item'
        LEFT JOIN tbl_servicemaster AS sm ON sm.service_id = wf.workflow_category AND wf.workflow_type='service'
        LEFT JOIN departments AS dp ON dp.dept_id=wf.workflow_department AND dp.status='ACTIVE'
         WHERE wf.status='ACTIVE' AND workflow_id = ${workFlowData.workflow_id}`;

         const data = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
            let alldata = {};
            let valueForRoleEmployee
         if(data.length > 0){
            const workFlowMapData = await workFlowMap.findAll({where: {workflowId: workFlowId, status: "ACTIVE"} });

            if(workFlowMapData.length > 0){
                const getRoleEmployeeData = `SELECT wfm.id AS worklowmapId,ru.employee_id,ru.user_role,
                CONCAT(ru.first_name," ",ru.middle_name," ", ru.last_name) AS employeeName  
                FROM workFlowmaps AS wfm
                INNER JOIN workFlows AS wf ON wf.workflow_id = wfm.workflowId AND wf.status='ACTIVE'
                INNER JOIN registered_users AS ru ON ru.employee_id = wfm.workflow_employeeId
                WHERE wfm.workflowId= ${workFlowId} AND wfm.status='ACTIVE'`
                 valueForRoleEmployee = await db.sequelize.query(getRoleEmployeeData, { type: db.sequelize.QueryTypes.SELECT });

                alldata = {...data,employeedetails:valueForRoleEmployee}
            }
         }
            return res.status(200).send({ code: 200, message: "Work Flow Details Fetched Successfull!", data: alldata });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.update_workflow_byId = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const {workflowType,wokflowcategory,workflowdepartment,roleFiled} = req.body;
            const getAllData = await workFlow.findOne({ where: { workflow_id: id } });
            let roleFiledValue = req.body.roleFiled
            if (getAllData) {
                const updateWorkFlow = await workFlow.update({
                    workflow_type: req.body.workflowType,
                    workflow_category: req.body.wokflowcategory,
                    workflow_department: req.body.workflowdepartment
                },
                    {
                        where: { workflow_id: id }
                    });

                const singleWorkFlowMap = await workFlowMap.findAll({where: {workflowId: id}}) 
                let getWorkFlowSingleId;
                if(roleFiledValue){
                    getWorkFlowSingleId = await workFlowMap.findOne({where: {workflowId: id}});
                    if(getWorkFlowSingleId){
                        await workFlowMap.update({ status: "INACTIVE" }, { where: { workflowId: id } });
                        for(let i=0; i<roleFiledValue.length; i++){
                            const createUpdateWorkFlowMap = await workFlowMap.create({
                                workflowId: id,
                                workflow_roleId: roleFiledValue[i].roleId,
                                workflow_employeeId: roleFiledValue[i].employeeId
                            })
                        }
                    }else{
                    for(let i=0; i<roleFiledValue.length; i++){
                        const createUpdateWorkFlowMap = await workFlowMap.create({
                            workflowId: id,
                            workflow_roleId: roleFiledValue[i].roleId,
                            workflow_employeeId: roleFiledValue[i].employeeId
                        })
                    }
                    }
                }

                return res.status(200).send({
                    code: 200, message: "WorkFlow update Successfully!",
                });
            } else {
                return res.status(404).send({ code: 403, message: "id not found" });
            };
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    };
};