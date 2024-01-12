const db = require("../../../models/index");

const previous_goalDetails = db.previous_goal
const Op = db.Sequelize.Op;

/////////////// Create previous_goal ///////////////

exports.create_previous_goal = async (req, res) => {
    try {
        const { previous_goal_name , comment , employee_id } = req.body;
        const data = await previous_goalDetails.findOne({where: {previous_goal_name: previous_goal_name}})
        if(data){
            return res.status(400).send({code: 400, message:"previous_goal_name is Already Exits!"})
        } else{
        const response = await previous_goalDetails.create({
            previous_goal_name,
            comment,
            employee_id
        
        });
        return res.status(200).send({ code: 200, message: "previous_goal Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit previous_goal ///////////////

exports.edit_previous_goal = async (req, res) => {
    try {
        const previous_goalId = req.params.id;
        const { previous_goal_name, comment, employee_id, rating_id, manager_rating, head_rating, status, isChecked } = req.body;
        const editData = await previous_goalDetails.findOne({ where: { previous_goal_id: previous_goalId } });
        if (editData) {
            const updateData = await previous_goalDetails.update({
                previous_goal_name,
                comment,
                employee_id,
                rating_id,
                manager_rating,
                head_rating,
                status,
                isChecked
            },
                { where: { previous_goal_id: previous_goalId } });

            return res.status(200).send({ code: 200, message: "previous_goal Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById previous_goal ///////////////

exports.getAll_previous_goal = async (req, res) => {
    try {
        const getAllData = await previous_goalDetails.findAll({where: { status: "ACTIVE" },})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All previous_goal Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById previous_goal ///////////////

exports.get_ById_previous_goal = async (req, res) => {
    try {
        const previous_goalId = req.params.id;
        const getData = await previous_goalDetails.findOne({ where: { previous_goal_id: previous_goalId , status: "ACTIVE"}});
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

exports.get_ByEMPId_previous_goal = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getData = await previous_goalDetails.findAll({ where: { employee_id: employeeId  ,status: "ACTIVE"}});
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
/////////////// Delete previous_goal ///////////////

exports.delete_previous_goal = async (req, res) => {
    try {
        const previous_goalId = req.params.id;
        const getData = await previous_goalDetails.findOne({ where: { previous_goal_id: previous_goalId } });
        if (getData) {
            const updated = await previous_goalDetails.update({ status: "INACTIVE" }, { where: { previous_goal_id: previous_goalId } });
            return res.status(200).send({ code: 200, message: "previous_goal Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};