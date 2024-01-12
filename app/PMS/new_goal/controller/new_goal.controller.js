const db = require("../../../models/index");

const new_goalDetails = db.new_goal
const Op = db.Sequelize.Op;
const self_appraisalDetails = db.self_appraisal
const initiate_performance_appraisalDetails = db.initiate_performance_appraisal
/////////////// Create new_goal ///////////////

exports.create_new_goal = async (req, res) => {
    try {
        const { new_goal_name , comment , employee_id } = req.body;
        const data = await new_goalDetails.findOne({where: {new_goal_name: new_goal_name}})
        if(data){
            return res.status(400).send({code: 400, message:"new_goal_name is Already Exits!"})
        } else{
        const response = await new_goalDetails.create({
            new_goal_name,
            comment,
            employee_id
        
        });
        return res.status(200).send({ code: 200, message: "new_goal Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit new_goal ///////////////

exports.edit_new_goal = async (req, res) => {
    try {
        const new_goalId = req.params.id;
        const { new_goal_name, comment, employee_id, rating_id, manager_rating, head_rating, status, isChecked } = req.body;
        const editData = await new_goalDetails.findOne({ where: { new_goal_id: new_goalId } });
        if (editData) {
            const updateData = await new_goalDetails.update({
                new_goal_name,
                comment,
                employee_id,
                rating_id,
                manager_rating,
                head_rating,
                status,
                isChecked
            },
                { where: { new_goal_id: new_goalId } });

            return res.status(200).send({ code: 200, message: "new_goal Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById new_goal ///////////////

exports.getAll_new_goal = async (req, res) => {
    try {
        const getAllData = await new_goalDetails.findAll({where: { status: "ACTIVE" },})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All new_goal Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById new_goal ///////////////

exports.get_ById_new_goal = async (req, res) => {
    try {
        const new_goalId = req.params.id;
        const getData = await new_goalDetails.findAll({ where: { new_goal_id: new_goalId  , status: "ACTIVE" }});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_ByEMPId_new_goal = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getData = await new_goalDetails.findAll({ where: { employee_id: employeeId , status: "ACTIVE"} });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete new_goal ///////////////

exports.delete_new_goal = async (req, res) => {
    try {
        const new_goalId = req.params.id;
        const getData = await new_goalDetails.findOne({ where: { new_goal_id: new_goalId } });
        if (getData) {
            const updated = await new_goalDetails.update({ status: "INACTIVE" }, { where: { new_goal_id: new_goalId } });
            return res.status(200).send({ code: 200, message: "new_goal Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.create_ByEMPId_new_goal = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getAllData = await self_appraisalDetails.findAll({ where: { employee_id: employeeId  ,status: "ACTIVE"},
        include: [
            {    
                model: initiate_performance_appraisalDetails,
                attributes: ['initiate_performance_appraisal_id','start_date', 'end_date', 'status_date'],
                where: {status_date: "Ongoing"},
            },

        ]
    });

    // =================================================================================================================================
        if (getAllData) {
            // var array = [];
            for (var i = 0; i < getAllData.length; i++) {          

                var initiate_performance_appraisal_id_V = getAllData[i].initiate_performance_appraisal.initiate_performance_appraisal_id;
                var start_date_V = getAllData[i].initiate_performance_appraisal.start_date;
                var end_date_V = getAllData[i].initiate_performance_appraisal.end_date;
                var status_date_V = getAllData[i].initiate_performance_appraisal.status_date;


                var obj = {
                    "employee_id": getAllData[i].employee_id,
                    "initiate_performance_appraisal_id": initiate_performance_appraisal_id_V,
                    "start_date": start_date_V,
                    "end_date": end_date_V,
                    "status_date": status_date_V,
                    "status": getAllData[i].status,
                    "isChecked":getAllData[i].isChecked,
                    "createdAt":getAllData[i].createdAt,
                    "updatedAt": getAllData[i].updatedAt,
                }
                // array.push(obj);
            }

            const { new_goal_name , comment , } = req.body;
            const data = await new_goalDetails.findOne({where: {new_goal_name: new_goal_name}})
            if(data){
                return res.status(400).send({code: 400, message:"new_goal_name is Already Exits!"})
            } else{
            const createdData = await new_goalDetails.create({
                employee_id: obj.employee_id,
                initiate_performance_appraisal_id: obj.initiate_performance_appraisal_id,
                new_goal_name , 
                comment ,
            });

            return res.status(200).send({ code: 200, message: "Fetch All self_appraisal Data Successfully", data: createdData });
        }
        }  else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_ByEMPId_NEWLIST_goal = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getAllData = await new_goalDetails.findAll({
            where: { employee_id: employeeId, status_neworprev: "New", status: "ACTIVE" },
            include: [
                {
                    model: initiate_performance_appraisalDetails,
                    attributes: ['initiate_performance_appraisal_id', 'status_date'],
                    where: {},
                },
            ],
        });

        if (getAllData) {
            for (var i = 0; i < getAllData.length; i++) {
                var initiate_performance_appraisal_id_V = getAllData[i].initiate_performance_appraisal.initiate_performance_appraisal_id;
                var status_date_V = getAllData[i].initiate_performance_appraisal.status_date;

                if (status_date_V === "Completed") {
                    await new_goalDetails.update(
                        { status_neworprev: "Previous" },
                        { where: { new_goal_id: getAllData[i].new_goal_id } }
                    );
                }
            }

            // After updating, fetch the updated data again
            const updatedData = await new_goalDetails.findAll({
                where: { employee_id: employeeId, status_neworprev: "New", status: "ACTIVE" },
                include: [
                    {
                        model: initiate_performance_appraisalDetails,
                        attributes: ['initiate_performance_appraisal_id', 'status_date'],
                        where: {},
                    },
                ],
            });

            return res.status(200).send({ code: 200, message: "Fetch Get ByEMPId Successfully", data: updatedData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.get_ByEMPId_PREVIOUSLIST_goal = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getData = await new_goalDetails.findAll({ 
            where: { employee_id: employeeId, status_neworprev: "Previous", status: "ACTIVE" },
            include: [
                {
                    model: initiate_performance_appraisalDetails,
                    attributes: ['initiate_performance_appraisal_id', 'status_date'],
                    where: {},
                },
            ],
    });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};