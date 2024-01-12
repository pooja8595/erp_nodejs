const db = require("../../../models/index");
exports.createShift = async (req, res) => {
    try {
        const {
            shift_name, shift_from_time, shift_to_time, working_hour, description
        } = req.body;
        if (!shift_name || !shift_from_time || !shift_to_time || !working_hour) {
            return res.status(400).send({ code: 400, message: "Body is required" });
        } else {
            const response = await db.shift.create({
                shift_name, shift_from_time, shift_to_time, working_hour, description
            });
            return res.status(200).send({ code: 200, message: "Shift Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    };
}
exports.getAllShift = async (req, res) => {
    try {
        const { id } = req.params;
        let getAllData;

        if (id) {
            getAllData = await db.shift.findOne({ where: { id: id, isDeleted: false } });

            if (!getAllData) {
                return res.status(404).send({
                    code: 404,
                    message: "Shift not found for the provided ID",
                });
            }
        } else {
            getAllData = await db.shift.findAll({ where: { isDeleted: false } });

            if (getAllData.length === 0) {
                return res.status(404).send({
                    code: 404,
                    message: "No shift data found",
                });
            }
        }

        return res.status(200).send({
            code: 200,
            message: "Get shift data successfully",
            data: getAllData,
        });
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({
            code: 500,
            message: "Internal Server Error",
        });
    }
};


exports.updateShift = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ code: 400, message: "ID is required for update" });
        }

        const { shift_name, shift_from_time, shift_to_time, working_hour, description } = req.body;
        if (!shift_name || !shift_from_time || !shift_to_time || !working_hour) {
            return res.status(400).send({ code: 400, message: "Body is required" });
        }else{
            const getAllData = await db.shift.findOne({ where: { id: id, status: "ACTIVE" } });
    
            if (getAllData) {
                await db.shift.update({
                    shift_name, shift_from_time, shift_to_time, working_hour, description
                },
                {
                    where: { id: id }
                });
    
                return res.status(200).send({
                    code: 200,
                    message: "Shift updated successfully!",
                });
            } else {
                return res.status(404).send({ code: 404, message: "ID not found" });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};
exports.deleteShift = async (req, res) => {
    try {
        const id = req.params.id
        // if(!id){
        const getAllData = await db.shift.findOne({ where: { id: id } });
        if (getAllData) {
            await db.shift.update({  isDeleted: true }, { where: { id: id } });
            return res.status(200).send({ code: 200, message: "shift is Deleted Successfully!" });
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

exports.shiftStatus = async (req, res) => {
    try {
        const id  = req.params.id;
        const { status } = req.body;
        if (status === undefined) {
            return res.status(400).send({
                code: 400,
                message: "Bad Request: 'status' property is missing in the request body",
            });
        }
        const getData = await db.shift.findOne({
            where: {
                id: id ,
                isDeleted: false
            }
        });
        if (getData) {
            await db.shift.update(
                {
                    status
                },
                {
                    where: {
                        id: id 
                    }
                }
            );
            return res.status(200).send({
                code: 200,
                message: "Shift Status Change Successfully!",
                // data: updated
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};



