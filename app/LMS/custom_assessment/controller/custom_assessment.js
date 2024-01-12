const db = require("../../../models/index");
const custom_assesmentDetails = db.custom_assesment;
const newAssesmentDetails = db.newAssesment;
const answer_custom_assesmentDetails = db.answer_custom_assesment;
const op = db.sequelize.op;

exports.createCustom_Assesment = async (req, res) => {
    try {
        const { assesment_id, assesment_type, custom_assesment_question } = req.body;
        if (req.body.assesment_type == "MCQ") {
            const custom_assesmentdata = await custom_assesmentDetails.findOne({ where: { custom_assesment_question: custom_assesment_question } });
            if (custom_assesmentdata) {
                return res.status(403).send({ code: 403, message: "Assessment Question is Already Exits!" });
            }
            const response = await custom_assesmentDetails.create({
                assesment_id,
                assesment_type,
                custom_assesment_question
            });
            return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
        } else {
            return res.status(403).send({ code: 403, message: "Assessment Type (Not a MCQ)" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllCustom_Assesment = async (req, res) => {
    try {
        const getAllData = await custom_assesmentDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////// GetById Stage ///////////////

exports.getByIdCustom_Assesment = async (req, res) => {
    try {
        const custom_assesment_id = parseInt(req.params.custom_assesment_id);
        const getData = await custom_assesmentDetails.findOne({ where: { custom_assesment_id: custom_assesment_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Stage ///////////////

exports.deleteCustom_Assesment = async (req, res) => {
    try {
        const custom_assesment_id = parseInt(req.params.custom_assesment_id);
        const dltStage = await custom_assesmentDetails.findOne({ where: { custom_assesment_id: custom_assesment_id } });
        if (dltStage) {
            const deleteData = await custom_assesmentDetails.update({ status: "INACTIVE" }, { where: { custom_assesment_id: custom_assesment_id } });
            return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.editCustom_Assesment = async (req, res) => {
    try {
        const custom_assesment_id = parseInt(req.params.custom_assesment_id);
        const { assesment_id, assesment_type, custom_assesment_question } = req.body;
        if (req.body.assesment_type == "MCQ") {
            const custom_assesmentdata = await custom_assesmentDetails.findOne({ where: { custom_assesment_question: custom_assesment_id } });
            if (custom_assesmentdata) {
                return res.status(403).send({ code: 403, message: "Assessment Question is Already Exits!" });
            }
            const response = await custom_assesmentDetails.update({
                assesment_id,
                assesment_type,
                custom_assesment_question
            }, { where: { custom_assesment_id: parseInt(req.params.custom_assesment_id) } });
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: response })
        } else {
            return res.status(403).send({ code: 403, message: "Assessment Type (Not a MCQ)" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllAnswer_custom_assesmentChild = async (req, res) => {
    try {
        const answers = await custom_assesmentDetails.findAll({ include: answer_custom_assesmentDetails });
        if (answers) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: answers });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};