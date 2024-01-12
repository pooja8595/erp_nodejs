const db = require("../models/index");
const User = db.user;
const grievanceDetails = db.grievance
const Op = db.Sequelize.Op;

/////////////// Create Grievancy ///////////////

exports.createGrievance = async (req, res) => {
    try {
        const { action_manager, subject, reporting_manager, grievance_date, note, comment, grievance_type, record_added_on, employee_id } = req.body;
        const response = await grievanceDetails.create({
            action_manager,
            subject,
            reporting_manager,
            grievance_date,
            note,
            comment,
            grievance_type,
            record_added_on,
            employee_id
        });
        return res.status(200).send({ code: 200, message: "Grievance Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Grievancy ///////////////

exports.editGrievance = async (req, res) => {
    try {
        const grievanceId = req.params.id;
        const grievancel = await grievanceDetails.findOne({ where: { employee_grievance_id: grievanceId } });
        if (grievancel) {
            const updateData = await grievanceDetails.update(req.body, { where: { employee_grievance_id: grievanceId } });
            return res.status(200).send({ code: 200, message: "Grievance Updated SuccessFully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Grievancy ///////////////

exports.getGrievancyById = async (req, res) => {
    try {
        const grievanceId = req.params.id;
        const getGrievancy = await grievanceDetails.findOne({
            where: { employee_grievance_id: grievanceId, status: "ACTIVE" },
            include: [{
                model: User,
                attributes: ["first_name", "department"]
            }]
        });
        if (getGrievancy) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getGrievancy });
        } else {
            return res.status(404).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Grievancy ///////////////

exports.getAllGrievancy = async (req, res) => {
    try {
        const Data = await User.findOne({ attributes: ["first_name", "department", "employee_id"] })
        let candidateone = Data.employee_id
        const getAllData = await grievanceDetails.findAll({
            // where: {employee_id: candidateone},
            where: { status: "ACTIVE" },
            include: [{
                model: User,
                attributes: ["first_name", "department"]
            }]
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Grievance Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Grievancy ///////////////

exports.deleteGrievancy = async (req, res) => {
    try {
        const grievanceId = req.params.id;
        const getData = await grievanceDetails.findOne({ where: { employee_grievance_id: grievanceId } });
        if (getData) {
            const updated = await grievanceDetails.update({ status: "INACTIVE" }, { where: { employee_grievance_id: grievanceId } });
            return res.status(200).send({ code: 200, message: "Grievancy Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 403, message: "Invalid grievanceId..." });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};