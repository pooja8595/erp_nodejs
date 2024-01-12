const db = require("../../../models/index");
const answer_custom_assesmentDetails = db.answer_custom_assesment;
const custom_assesmentDetails = db.custom_assesment;
const op = db.sequelize.op;

exports.createAnswer_custom_assesment = async (req, res) => {
    try {
        const { custom_assesment_id, custom_assesment_answer, IsCorrect } = req.body;
        const response = await answer_custom_assesmentDetails.create({
            custom_assesment_id,
            custom_assesment_answer,
            IsCorrect
        });
        return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllAnswer_custom_assesment = async (req, res) => {
    try {
        const getAllData = await answer_custom_assesmentDetails.findAll({ where: { status: "ACTIVE" } })
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

exports.getByIdAnswer_custom_assesment = async (req, res) => {
    try {
        const answer_custom_assesment_id = parseInt(req.params.answer_custom_assesment_id);
        const getData = await answer_custom_assesmentDetails.findOne({ where: { answer_custom_assesment_id: answer_custom_assesment_id } });
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

exports.deleteAnswer_custom_assesment = async (req, res) => {
    try {
        const answer_custom_assesment_id = parseInt(req.params.answer_custom_assesment_id);
        const dltStage = await answer_custom_assesmentDetails.findOne({ where: { answer_custom_assesment_id: answer_custom_assesment_id } });
        if (dltStage) {
            const deleteData = await answer_custom_assesmentDetails.update({ status: "INACTIVE" }, { where: { answer_custom_assesment_id: answer_custom_assesment_id } });
            return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.editAnswer_custom_assesment = async (req, res) => {
    try {
        const answer_custom_assesment_id = parseInt(req.params.answer_custom_assesment_id);
        const { custom_assesment_id, custom_assesment_answer, IsCorrect } = req.body;
        const response = await answer_custom_assesmentDetails.update({
            custom_assesment_id,
            custom_assesment_answer,
            IsCorrect
        }, { where: { answer_custom_assesment_id: parseInt(req.params.answer_custom_assesment_id) } });
        return res.status(200).send({ code: 200, message: "Updated Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


