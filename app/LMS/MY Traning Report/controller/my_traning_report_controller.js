const db = require('../../../models/index');
const newTraningDetails = db.newTraning;


////////////////// Get All My Traning Report////////////////
exports.getAllTraningReport = async (req,res) => {
    try {
        const getAllData = await newTraningDetails.findAll({
            attributes:  ["traning_id", "category", "course_name", ["mode", "mode_of_traning"],]
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Traning Report Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
        
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}


////////////////// Get All My Scheduled Training////////////////
exports.getAllScheduledTrainng = async (req,res) => {
    try {
        const employeeId = req.params.id
        const getAllData = await newTraningDetails.findAll({ where: {employee_id:employeeId},
            attributes:  ["traning_id", "category", ["course_name", "module"], ["mode", "mode_of_traning"], "venue", ["from_scheduled_date", "start_date"], ["to_scheduled_date", "end_date"], ["status", "action"] ]
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Scheduled Traning Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
        
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}