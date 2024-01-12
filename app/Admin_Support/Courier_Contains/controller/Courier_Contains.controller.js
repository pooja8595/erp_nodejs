const db = require("../../../models/index");
const courier_containsDetails = db.Courier_Contains;
const Op = db.Sequelize.Op;

/////////////// Create Courier_Contains///////////////

exports.create_Courier_Contains = async (req, res) => {
    try {
        const { courier_contains_name} = req.body;
        const response = await courier_containsDetails.create({
            courier_contains_name
        });
        return res.status(200).send({ code: 200, message: "Courier Contains Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Courier_Contains ///////////////+
exports.edit_Courier_Contains = async (req, res) => {
    try {
        const courierContainId = req.params.id;
        const {courier_contains_name,status } = req.body;
   
        const editData = await courier_containsDetails.findOne({ where: { courier_contains_id: courierContainId } });
        if (editData) {
            const updateData = await courier_containsDetails.update(
                {
                    courier_contains_name,
                    status
                },
                { where: {courier_contains_id: courierContainId  } }
            );
            return res.status(200).send({ code: 200, message: "Courier ContainsUpdated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Courier_Contains ///////////////

exports.get_ById_Courier_Contains = async (req, res) => {
    try {
        const courierContainId = req.params.id;
        const getData = await courier_containsDetails.findOne({ where: { courier_contains_id: courierContainId }});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Courier Contains data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Courier_Contains///////////////

exports.get_All_Courier_Contains = async (req, res) => {
    try {
        const getData = await courier_containsDetails.findAll({ where: { status: "ACTIVE" } 
    });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Courier Contains Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Courier_Contains ///////////////

exports.delete_Courier_Contains = async (req, res) => {
    try {
        const courierContainId = req.params.id;
        const deleteData = await courier_containsDetails.findOne({ where: { courier_contains_id: courierContainId  } });
        if (deleteData) {
            const dltData = await courier_containsDetails.update({ status: "INACTIVE" }, { where: {courier_contains_id: courierContainId } });
            return res.status(200).send({ code: 200, message: "Courier Contains Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};