const db = require("../../../models/index");
// const stageDetails = db.stage;
const Designation= db.designation
const op = db.sequelize.op;

exports.createDesignation = async (req, res) => {
    try {
        const { designation_name } = req.body;
        const departmentdata = await Designation.findOne({ where: { designation_name: designation_name } });   
        if (departmentdata) {
            return res.status(403).send({ code: 403, message: "designation_name Name is Already Exits!" });
        }            
        const response = await Designation.create({
            designation_name
        });
        return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllDesignation = async (req, res) => {
    try {
        const getAllData = await Designation.findAll({
            where: { status: "ACTIVE" },
            attributes: ['designation_id','designation_name','status'],
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

///////////// GetById Stage ///////////////

exports.getByIdDesignation = async (req, res) => {
    try {
        const designation_id = parseInt(req.params.designation_id);
        const getData = await Designation.findOne({ where: { designation_id: designation_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Stage ///////////////

exports.deleteDesignation = async (req, res) => {
    try {
        const designation_id = parseInt(req.params.designation_id);
        const dltStage = await Designation.findOne({ where: { designation_id: designation_id } });
        if (dltStage) {
            const deleteData = await Designation.update({ status: "INACTIVE" }, { where: { designation_id: designation_id } });
            return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.editDesignation = async (req, res) => {
    try {
        const designation_id = parseInt(req.params.designation_id);
        const dltStage = await Designation.findOne({ where: { designation_id: designation_id } });
        if (dltStage) {
            const deleteData = await Designation.update(req.body, { where: { designation_id: designation_id } });
            return res.status(200).send({ code: 200, message: "Data is Update Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};