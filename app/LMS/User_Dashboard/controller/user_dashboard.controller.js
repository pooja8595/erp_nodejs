const db = require("../../../models/index");
const newTraningDetails = db.newTraning;
const newContentDetails = db.newContent;
// const pendingTaskDetails = db.pendingTask;

/////////////// getAllCourse ///////////////

exports.getAllCourse = async (req, res) => {
    try {
        const getAllData = await newTraningDetails.findAll({
            attributes: [['traning_id', 'course_id'], 'course_name', ['scheduled_date', 'due_date'], 'status'],
        })
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

/////////////// getByIdCourse ///////////////

exports.getByIdCourse = async (req, res) => {
    try {
        const courseId = req.params.employee_id;
        const getAllData = await newTraningDetails.findAll({
            where: { employee_id: courseId },
            attributes: [['traning_id', 'course_id'], 'course_name', ['scheduled_date', 'due_date'], 'status'],
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data by employee_id Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// getById_Course ///////////////

exports.getById_Course_Name = async (req, res) => {
    try {
        const courseId = req.params.id;
        const getData = await newTraningDetails.findOne({
            where: { traning_id: courseId },
            attributes: [['traning_id', 'course_id'], 'course_name', ['scheduled_date', 'due_date'], 'status'],
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", result: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Course Pending Task ///////////////

exports.getAll_Course_Pending_Task = async (req, res) => {
    try {
        const getAllData = await newTraningDetails.findAll({
            where: { status: "OPEN" },
            attributes: ['traning_id', 'employee_id', 'course_name']
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Pending Task Successfully", result: getAllData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Course Pending Task ///////////////

exports.get_All_Video_list = async (req, res) => {
    try {
        const getAllContent = await newContentDetails.findAll({ where: { content_type: "video", status: "ACTIVE" },
            attributes: ['content_id', 'segment', 'category', 'content_type', 'upload_content', 'status']
        })
        if (getAllContent) {
            return res.status(200).send({ code: 200, message: "Fetch Data Pending Task Successfully", result: getAllContent })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Video list ///////////////

exports.get_by_id_Video_list = async (req, res) => {
    try {
        const contentID = parseInt(req.params.content_id);
        const getAllContent = await newContentDetails.findAll({ where: { content_type: "video", status: "ACTIVE", content_id: contentID},
            attributes: ['content_id', 'segment', 'category', 'content_type', 'upload_content', 'status']
        })
        if (getAllContent) {
            return res.status(200).send({ code: 200, message: "Fetch Data Pending Task Successfully", result: getAllContent })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};