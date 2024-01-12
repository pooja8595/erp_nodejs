const db= require("../../../models/index");
const uom_details = db.uomdetails;

/////////Create UOM /////////////////

exports.create_uom =async(req, res) =>{
    try {
        const {uom_name, uom_description }= req.body;
        const uomdata = await uom_details.findOne({ where: { uom_name : uom_name } });
        if(uomdata){
            return res.status(403).send({ code: 403, message: "UOM Name is Already Exits!" });
        }
        const uomAlldata = await uom_details.create({
            uom_name, uom_description
        });
        return res.status(200).send({ code: 200, message: "Created Successfully", data: uomAlldata });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

exports.getAllUOM = async (req, res) => {
    try {
        const getAllData = await uom_details.findAll({ order:[['uom_id','DESC']] ,where: { isDeleted: false }, })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All UOM Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

exports.getByIdUOM = async (req, res) => {
    try {
        const uom_Id = req.params.id
        const getAllData = await uom_details.findOne({ where: { uom_id: uom_Id ,isDeleted: false } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch UOM Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

exports.edituom= async (req, res) => {
    try {
        const uom_ID = parseInt(req.params.id);
        const uomdata = await uom_details.findOne({ where: { uom_id: uom_ID } });
        if (uomdata) {
             await uom_details.update(req.body, { where: { uom_id: uom_ID } });
            return res.status(200).send({ code: 200, message: "Data is Updated Successfully!", });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

exports.deleteUOM = async (req, res) => {
    try {
        const uom_ID = parseInt(req.params.id);
        const uomData = await uom_details.findOne({ where: { uom_id: uom_ID } });
        if (uomData) {
            await uom_details.update({ isDeleted: true }, { where: { uom_id: uom_ID } });
            return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!", });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}
exports.UOMStatus = async (req, res) => {
    try {
        const uom_ID = req.params.id;
        const { status } = req.body;

        // Check if status property exists in the request body
        if (status === undefined) {
            return res.status(400).send({
                code: 400,
                message: "Bad Request: 'status' property is missing in the request body",
            });
        }

        console.log(status);
        const getData = await uom_details.findOne({
            where: {
                uom_id: uom_ID,
                isDeleted: false,
            },
        });
        if (getData) {
            await uom_details.update(
                {
                    status,
                },
                {
                    where: {
                        uom_id: uom_ID,
                    },
                }
            );
            return res.status(200).send({
                code: 200,
                message: "uom details Status Change Successfully!",
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

