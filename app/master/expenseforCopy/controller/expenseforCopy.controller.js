const db = require("../../../models/index");

const expenseforCopyDetails = db.expenseforCopy
const Op = db.Sequelize.Op;

/////////////// Create expenseforCopy ///////////////

exports.create_expenseforCopy = async (req, res) => {
    try {
        const { expenseforCopy_name } = req.body;
        const data = await expenseforCopyDetails.findOne({where: {expenseforCopy_name: expenseforCopy_name}})
        if(data){
            return res.status(400).send({code: 400, message:"expenseforCopy_name is already Exits!"})
        } else{
        const response = await expenseforCopyDetails.create({
            expenseforCopy_name,
        
        });
        return res.status(200).send({ code: 200, message: "expenseforCopy Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit expenseforCopy ///////////////

exports.edit_expenseforCopy = async (req, res) => {
    try {
        const expenseforCopyId = req.params.id;
        const { expenseforCopy_name, status, isChecked } = req.body;
        const editData = await expenseforCopyDetails.findOne({ where: { expenseforCopy_id: expenseforCopyId } });
        if (editData) {
            const updateData = await expenseforCopyDetails.update({
                expenseforCopy_name,
                status,
                isChecked
            },
                { where: { expenseforCopy_id: expenseforCopyId } });

            return res.status(200).send({ code: 200, message: "expenseforCopy Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById expenseforCopy ///////////////

exports.getAll_expenseforCopy = async (req, res) => {
    try {
        const getAllData = await expenseforCopyDetails.findAll()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All expenseforCopy Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById expenseforCopy ///////////////

exports.get_ById_expenseforCopy = async (req, res) => {
    try {
        const expenseforCopyId = req.params.id;
        const getData = await expenseforCopyDetails.findOne({ where: { expenseforCopy_id: expenseforCopyId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete expenseforCopy ///////////////

exports.delete_expenseforCopy = async (req, res) => {
    try {
        const expenseforCopyId = req.params.id;
        const getData = await expenseforCopyDetails.findOne({ where: { expenseforCopy_id: expenseforCopyId } });
        if (getData) {
            const updated = await expenseforCopyDetails.update({ status: "INACTIVE" }, { where: { expenseforCopy_id: expenseforCopyId } });
            return res.status(200).send({ code: 200, message: "expenseforCopy Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};