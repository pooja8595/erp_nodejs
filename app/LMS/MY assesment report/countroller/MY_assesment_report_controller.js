const db = require('../../../models/index');
const newAssesmentDetails = db.newAssesment;


////////////////// Get All My Assesment Report////////////////
exports.getAllAssesmentReport = async (req,res) => {
    try {
        const getAllData = await newAssesmentDetails.findAll({
         attributes: ["assesment_id", "segment", "category", "assesment_type", ["time_duration","assesment_duration"], ["number_of_attempts", "attempts_configuration"]] })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Assesment Report Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
        
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}