const db = require("../../../models/index");
const upcommingCourseDetails = db.upcomming_course
const op = db.Sequelize.Op

/////////////// Create Upcomming Course ///////////////

exports.create_Upcomming_Course = async (req, res) => {
    try {
        const { title, date, duration, color } = req.body;
        const response = await upcommingCourseDetails.create({
            title,
            date,
            color,
            duration
        })
        return res.status(200).send({ code: 200, message: "Created Successfully", result: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Update Upcomming Course ///////////////

exports.edit_Upcomming_Course = async (req, res) => {
    try {
        const upcommingCourseId = req.params.id;
        const body = req.body;
        const editData = await upcommingCourseDetails.findOne({ where: { id: upcommingCourseId } });
        if (editData) {
            const updateData = await upcommingCourseDetails.update(body, { where: { id: upcommingCourseId } });
            return res.status(200).send({ code: 200, message: "Updated Successfully", result: updateData })
        } else {
            return res.status(404).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Upcomming Course ///////////////

exports.getById_Upcomming_Course = async (req, res) => {
    try {
        const upcommingCourseId = req.params.id;
        const getData = await upcommingCourseDetails.findOne({ where: { id: upcommingCourseId } });
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

/////////////// Get All Upcomming Course ///////////////

exports.getAll_Upcomming_Course = async (req, res) => {
    try {
        const getData = await upcommingCourseDetails.findAll({ where: { status: "ACTIVE" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Upcomming Course ///////////////

exports.delete_Upcomming_Course = async (req, res) => {
    try {
        // const { status } = req.body;
        const upcommingCourseId = req.params.id;
        const dltData = await upcommingCourseDetails.findOne({ where: { id: upcommingCourseId } });
        if (dltData) {
            const updateData = await upcommingCourseDetails.update({ status: "INACTIVE" }, { where: { id: upcommingCourseId } })
            return res.status(200).send({ code: 200, message: "Deleted Successfully", result: updateData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}; 