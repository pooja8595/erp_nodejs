const db = require("../../../models/index");


exports.getEmployeeByRollId = async (req, res) => {
    try {
        const id = parseInt(req.query.role_master_id);
        const branch_id = parseInt(req.query.branch_id);
        const getData = await db.user.findAll({ where: { role_master_id: id,branch_id:branch_id} , status:"ACTIVE",
        attributes:['employee_id','first_name','middle_name','last_name','role_master_id','branch_id']});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

module.exports.createAssignUser = async (req, res) => {
    try {
        const { role_id, branch_id, employee_id, assigned_employee_list } = req.body;
        
        const employeeExists = await db.user.findOne({
            where: {
                employee_id:employee_id,
                role_master_id: role_id
            }
        });
        if (!employeeExists) {
            return res.status(200).send({ code: 200, message: 'Employee  not found' });
        } 
        const branchExists = await db.role_master.findOne({where:{branch_id:branch_id}})
        if(!branchExists) {
            return res.status(200).send({code: 200,message: 'Branch not found'});
        }
        const existingRecord = await db.models.assignUser.findOne({
            where: { role_id, branch_id, employee_id },
            include: [{ model: db.models.assignEmployee, where: { assign_id: assigned_employee_list.map(item => item.assign_id) } }]
        });

        if (existingRecord) {
            return res.status(409).send({ code: 409, message: 'Data already exists' });
        }
        const createdAssignUsers = await db.models.assignUser.create({role_id,branch_id,employee_id});
        await Promise.all(
            assigned_employee_list.map(async (assignedUser) => {
                        const { assign_id } = assignedUser;
                        return await db.models.assignEmployee.create({
                            assign_user_id:createdAssignUsers.id,
                            assign_id
                        });
        }))
        if (createdAssignUsers) {
            return res.status(201).send({ code: 201, message: "Successfully created" });
        } else {
            return res.status(404).send({ code: 404, message: "Data not found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

module.exports.getAssignUserList = async(req, res) => {
    try {
        const {branch_id}= req.query;
        let condition='';
        if(branch_id){
            condition = `WHERE C.branch_id=${branch_id} `
        }else{
            condition = `WHERE 1=1 `
        }
        const query=
            `SELECT C.id,R.employee_id,R.first_name,R.middle_name,R.last_name,R.employee_code, M.role_master_name,
            T.branch_name,T.id AS branch_id,DATE_FORMAT(R.createdAt, '%Y-%m-%d') AS createdAt,
            DATE_FORMAT(R.updatedAt, '%Y-%m-%d') AS updatedAt FROM CRM_ASSIGN_USER_MST AS C
            INNER JOIN registered_users AS R ON R.employee_id= C.employee_id
            INNER JOIN role_masters AS M ON M.role_master_id= C.role_id
            INNER JOIN tbl_branch AS T ON T.id = C.branch_id
            ${condition} `
        const allData = await db.sequelize.query(query, { replacements: { branch_id  }, type: db.sequelize.QueryTypes.SELECT });
        if (branch_id) {
            if (allData.length > 0) {
                return res.status(200).send({ code: 200, message: "Get Data Successfully", data: allData });
            } else {
                return res.status(200).send({ code: 200, message: "No Data Found " ,data: allData});
            }
        } else {
            return res.status(200).send({ code: 200, message: "Get All Data Successfully", data: allData });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.getEmployeeListOfBranchId = async(req, res, next) => {
    try {
        const employeeList = await db.user.findAll({where:{branch_id:req.params.branch_id}});
        if(employeeList.length > 0) {
            return res.status(200).json({code: 200,message: "Success ",data: employeeList});
        }else{
            return res.status(404).json({ code : 404, message : "   employee not found" , data: employeeList});
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "server Error" });
    }
}

module.exports.getAssignUserListById= async (req, res) => {
    try {
        const {id} = req.params;
        const employeeList = await db.sequelize.query(
            `SELECT CS.employee_id ,R.first_name,R.middle_name,R.last_name,R.employee_code,CS.role_id,
            M.role_master_name,T.branch_name, T.id AS branch_id,C.assign_id,
            DATE_FORMAT(C.createdAt, '%Y-%m-%d') AS createdAt,
            DATE_FORMAT(C.updatedAt, '%Y-%m-%d') AS updatedAt
            FROM CRM_ASSIGN_EMPLOYEE_MST AS C
            INNER JOIN CRM_ASSIGN_USER_MST AS CS ON CS.id=C.assign_user_id
            INNER JOIN registered_users AS R ON R.employee_id= C.assign_id
            INNER JOIN role_masters AS M ON M.role_master_id= R.role_master_id
            INNER JOIN tbl_branch AS T ON T.id = R.branch_id 
            WHERE CS.id=${id} ORDER BY C.createdAt DESC `
        )
        if(employeeList.length > 0) {
            return res.status(200).send({ code: 200, message: "Get Data SuccessFully",data:employeeList[0] });
        }else{
            return res.status(404).send({ code: 404, message: " data Not Found", data: employeeList });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: " server Error" });
    }
}

module.exports.patchAssignUserListById = async (req, res) => {
    try {
        const {role_id, branch_id, employee_id, assigned_employee_list } = req.body;
        const id=parseInt(req.params.id)
        const employeeExists = await db.user.findOne({
            where: {
                employee_id:employee_id,
                role_master_id: role_id
            }
        });
        if (!employeeExists) {
            return res.status(200).send({ code: 200, message: 'Employee  not found' });
        } 
        const branchExists = await db.role_master.findOne({where:{branch_id:branch_id}})
        if(!branchExists) {
            return res.status(200).send({code: 200,message: 'Branch not found'});
        }
        const existingRecord = await db.models.assignUser.findOne({
            where: { role_id, branch_id, employee_id },
            include: [{ model: db.models.assignEmployee, where: { assign_id: assigned_employee_list.map(item => item.assign_id) } }]
        });

        if (existingRecord) {
            return res.status(409).send({ code: 409, message: 'Data Already Exists' });
        }
        const dataExists = await db.models.assignUser.findOne({id:id})
        if(!dataExists){
            return res.status(404).send({ code: 404, message: " data Not Found"}); 
        }
        const updateData = await db.models.assignUser.update({
            employee_id:employee_id,role_id:role_id, branch_id:branch_id
        },{where:{id}})
            await db.models.assignEmployee.destroy({where:{assign_user_id:id}})
            await Promise.all(
                assigned_employee_list.map(async (assignedUser) => {
                            const { assign_id } = assignedUser;
                            return await db.models.assignEmployee.create({
                                assign_user_id:id,
                                assign_id
                            });
            }))

        if (updateData.length > 0) {
            return res.status(200).send({ code: 200, message: 'Successfully updated' });
        } else {
            return res.status(404).send({ code: 404, message: 'Data not found' });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Server Error' });
    }
};
