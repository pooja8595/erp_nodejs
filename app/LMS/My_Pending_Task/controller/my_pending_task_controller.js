const db = require("../../../models/index");
const myPendingTaskDetails = db.myPendingTaskDetails
const newTraningDetails = db.newTraning;
// const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "http://localhost:5000/"
const Op = db.Sequelize.Op;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Create NEW Course//////////////////////////////////////////// 

exports.create_New_Pending_Course = async (req, res) => {
    try {
        const traning_id = req.params.id
        const getData = await newTraningDetails.findOne({ where: { traning_id: traning_id, course_request_status: "REQUEST" } });
        const { employee_id, author_course_id, start_date, end_date } = req.body;
        const response = await myPendingTaskDetails.create({
            employee_id,
            author_course_id,
            start_date,
            end_date,
            traning_id: getData.traning_id
        });
        return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Edit Candidate ShortListed ///////////////

exports.edit_Pending_Status = async (req, res) => {
    try {
        const traning_id = req.params.id;
        const { course_request_status, employee_id, author_course_id } = req.body;
        const editData = await myPendingTaskDetails.findOne({ where: { traning_id: traning_id } });
        if (editData) {
            const updateData = await myPendingTaskDetails.update(
                {
                    course_request_status,
                    employee_id,
                    author_course_id
                },
                { where: { traning_id: traning_id } }
            );
            return res.status(200).send({ code: 200, message: "My Pending Task Status Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////////// Get ById Requested ////////////////////////// 

exports.get_ById_Requested = async (req, res) => {
    try {
        const author_course_id = req.params.id
        const getData = await myPendingTaskDetails.findOne({ where: { author_course_id: author_course_id, course_request_status: "REQUEST" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });

    }
};
////////////////////////////////////LIST NEW Course//////////////////////////////////////////// 

exports.get_by_id_pending_task_list = async (req, res) => {
    try {
        const author_course_id = req.params.id
        const Alldata = await myPendingTaskDetails.findAll({
            where: { author_course_id: author_course_id },
            include: [{
                model: newTraningDetails,
            }]
        });
        if (Alldata) {
            return res.status(200).send({ code: 200, message: "Fetch All Course Data Successfully", data: Alldata });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });

    }
};
