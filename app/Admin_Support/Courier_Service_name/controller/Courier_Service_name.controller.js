const db = require("../../../models/index");
const Courier_Service_nameDetails = db.Courier_Service_name;
const Op = db.Sequelize.Op;

/////////////// Create Courier_Service_name///////////////

exports.create_Courier_Service_name = async (req, res) => {
    try {
        const { courier_Service_name} = req.body;
        const response = await Courier_Service_nameDetails.create({
            courier_Service_name
        });
        return res.status(200).send({ code: 200, message: "Courier Service Name Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Courier_Service_name ///////////////

exports.edit_Courier_Service_name = async (req, res) => {
    try {
        Courier_ServiceId = req.params.id;
        const {courier_Service_name,status} = req.body;
   
        const editData = await Courier_Service_nameDetails.findOne({ where: { courier_Service_id: Courier_ServiceId } });
        if (editData) {
            const updateData = await Courier_Service_nameDetails.update(
                {
                    courier_Service_name,
                    status
                },
                { where: { courier_Service_id: Courier_ServiceId  } }
            );
            return res.status(200).send({ code: 200, message: "Courier Service Name Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Courier_Service_name ///////////////

exports.get_ById_Courier_Service_name = async (req, res) => {
    try {
        Courier_ServiceId = req.params.id;
        const getData = await Courier_Service_nameDetails.findOne({ where: { Courier_Service_id:  Courier_ServiceId}});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Courier Service Name data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Courier_Service_name///////////////

exports.get_All_Courier_Service_name = async (req, res) => {
    try {
        const getData = await Courier_Service_nameDetails.findAll({ where: { status: "ACTIVE" } 
    });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All CCourier Service Name Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Courier_Service_name///////////////

exports.delete_Courier_Service_name = async (req, res) => {
    try {
        Courier_ServiceId = req.params.id;
        const deleteData = await Courier_Service_nameDetails.findOne({ where: { Courier_Service_id: Courier_ServiceId } });
        if (deleteData) {
            const dltData = await Courier_Service_nameDetails.update({ status: "INACTIVE" }, { where: { Courier_Service_id:  Courier_ServiceId} });
            return res.status(200).send({ code: 200, message: "Courier Service name Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};