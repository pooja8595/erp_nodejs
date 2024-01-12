const db = require("../models/index");
const User = db.user;
const complaintDetails = db.complaint;

/////////////// Create Complaint ///////////////

exports.createComplaint = async (req, res) => {
    try {
        const { complaint_from, complaint_name, complaint_against, reporting_manager, complaint_date, complaint_description, notes, record_added_by, record_added_on, employee_id } = req.body;
            const response = await complaintDetails.create({
                complaint_from,
                complaint_name,
                complaint_against,
                reporting_manager,
                complaint_date,
                complaint_description,
                notes,
                record_added_by,
                record_added_on,
                employee_id
            });
            return res.status(200).send({ code: 200, message: "Complaint Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Complaint ///////////////

exports.editComplaint = async (req, res) => {
    try {
        const complaintId = req.params.id;
        const complaintData = await complaintDetails.findOne({ where: { employee_complaint_id: complaintId } });
        if (complaintData) {
            const updateData = await complaintDetails.update(req.body, { where: { employee_complaint_id: complaintId } });
            return res.status(200).send({ code: 200, message: "Complaint Updated Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By Id Complaint ///////////////

exports.getByIdComplaint = async (req, res) => {
    try {
        const complaintId = req.params.id;
        const getComplaint = await complaintDetails.findOne({ where: { employee_complaint_id: complaintId } });
        if (getComplaint) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: getComplaint });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Gett All Complaint ///////////////

exports.getAllComplaint = async (req, res) => {
    try {
        const Data = await User.findOne({ attributes: ["first_name", "last_name", "reporting_manager", "employee_id"] })
        const getAllData = await complaintDetails.findAll({
            where: { status: "ACTIVE" },
            include: [{
                model: User,
                attributes: ["first_name", "last_name", "reporting_manager"]
            }]
        })
        if (getAllData) {
            getAllData.sort().reverse()
            return res.status(200).send({ code: 200, message: "Fetch All Complaint Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Complaint ///////////////

exports.deleteComplaint = async (req, res) => {
    try {
        const complaintId = req.params.id;
        const deleteData = await complaintDetails.findOne({ where: { employee_complaint_id: complaintId } })
        if (deleteData) {
            const updateStatus = await complaintDetails.update({ status: "INACTIVE" }, { where: { employee_complaint_id: complaintId } })
            return res.status(200).send({ code: 200, message: "Complaint Data is Deleted Successfully!", data: updateStatus })
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};