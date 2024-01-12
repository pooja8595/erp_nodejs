const db = require("../../../models/index");
const newAssesmentDetails = db.newAssesment;
const categoryDetails = db.category;
const op = db.Sequelize.Op
const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "http://localhost:5000/"

/////////////// Create New Assessment ///////////////

exports.create_New_Assesment = async (req, res) => {
    try {
        const { segment, category, assesment_type, other_mention_specify, assesment_format, number_of_content, time_duration,
            number_of_attempts, passing_criteria, due_date, status } = req.body;
        if (req.file) {
            var doc = req.file.path
        } else {
            var doc = ""
        }
        if (number_of_attempts && number_of_attempts != null) {
            var number = number_of_attempts
            var model = (number + " " + "Attempts")
        }
        const response = await newAssesmentDetails.create({
            segment,
            category,
            assesment_type,
            other_mention_specify,
            assesment_format,
            upload_assesment: baseUrl + doc,
            number_of_content,
            time_duration,
            number_of_attempts: model,
            passing_criteria,
            due_date,
            status
        });
        return res.status(200).send({ code: 200, message: "New Assesment Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit New Assessment ///////////////

exports.edit_New_Assessment = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const { segment, category, assesment_type, other_mention_specify, assesment_format, number_of_content, time_duration,
            number_of_attempts, passing_criteria, due_date, status } = req.body;
        if (req.file) {
            var doc = req.file.path
        } else {
            var doc = ""
        }
        if (number_of_attempts && number_of_attempts != null) {
            var number = number_of_attempts
            var model = (number + " " + "Attempts")
        }
        const editData = await newAssesmentDetails.findOne({ where: { assesment_id: assessmentId } });
        if (editData) {
            const updateData = await newAssesmentDetails.update(
                {
                    segment,
                    category,
                    assesment_type,
                    other_mention_specify,
                    assesment_format,
                    upload_assesment: baseUrl + doc,
                    number_of_content,
                    time_duration,
                    number_of_attempts: model,
                    passing_criteria,
                    due_date,
                    status
                },
                { where: { assesment_id: assessmentId } }
            );
            return res.status(200).send({ code: 200, message: "Assessment Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

// /////////////// Get All Category ///////////////

exports.get_All_category = async (req, res) => {
    try {
        const getAllData = await categoryDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Category Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Get All New Assessment ///////////////

exports.get_All_New_Assessment = async (req, res) => {
    try {
        const getData = await newAssesmentDetails.findAll();
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Assessment Data Successfully", data: getData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        };
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ message: "error", error: err.message });
    }
};

/////////////// Get ById New Assessment ///////////////

exports.get_ById_New_Assessment = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const getData = await newAssesmentDetails.findOne({ where: { assesment_id: assessmentId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Assessment ///////////////

exports.delete_Assessment = async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const { status } = req.body
        const getData = await newAssesmentDetails.findOne({ where: { assesment_id: assessmentId } });
        if (getData) {
            const updated = await newAssesmentDetails.update({ status }, { where: { assesment_id: assessmentId } });
            return res.status(200).send({ code: 200, message: "Assessment Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(400).send({ code: 400, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};