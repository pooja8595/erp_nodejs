const db = require("../models/index")
const User = db.user
const employeeResignationDetails = db.employeeResignation
const op = db.sequelize.op
const { Op } = require("sequelize");


/////////////// Create Employee Resignation ///////////////

exports.createEmployeeResignation = async (req, res) => {
    try {
        const { employee_name, department, joining_date, job_location, years_of_service, manager, resign_date, reason, employee_id } = req.body;
        const response = await employeeResignationDetails.create({
            employee_name,
            department,
            joining_date,
            job_location,
            years_of_service,
            manager,
            resign_date,
            reason,
            employee_id
        });
        return res.status(200).send({ code: 200, message: "Created Successfully", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Employee Resignation ///////////////

exports.editEmployeeResignation = async (req, res) => {
    try {
        const resignationId = req.params.id;
        const helpData = await employeeResignationDetails.findOne({ where: { employee_resignation_id: resignationId } });
        if (helpData) {
            const updateData = await employeeResignationDetails.update(req.body, { where: { employee_resignation_id: resignationId } });
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ALL Employee Resignation ///////////////

exports.getAllEmployeeResignation = async (req, res) => {
    try {
        const getAllData = await employeeResignationDetails.findAll({ where: {
            [Op.or]: [
              { status: "ACTIVE" },
              { status: "APPROVED" },
              { status :"DENIED"   },
            ]
          },
            include: [{
                model: User,
                attributes: ["employee_id", "first_name", "department", "date_of_joining", "working_physical_location", "reporting_manager"]
            }]
        })
        if (getAllData) {
            getAllData.sort().reverse()
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetById Employee Resignation ///////////////

exports.getByIdEmployeeResignation = async (req, res) => {
    try {
        const resignationId = req.params.id;
        const getData = await employeeResignationDetails.findOne({ where: { employee_resignation_id: resignationId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Employee Resignation ///////////////

exports.deleteEmployeeResignation = async (req, res) => {
    try {
        const resignationId = req.params.id;
        const dltData = await employeeResignationDetails.findOne({ where: { employee_resignation_id: resignationId } });
        if (dltData) {
            const deleteData = await employeeResignationDetails.update({ status: "INACTIVE" }, { where: { employee_resignation_id: resignationId } });
            return res.status(200).send({ code: 200, message: "Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Recorb Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////update status //////////////////


exports.Change_Resignation_status = async (req, res) => {
    try {
        const resignationId = req.params.id;
        const {status} = req.body;
        const getData = await employeeResignationDetails.findOne({ where: { employee_resignation_id: resignationId } });
        if (getData) {
            const getData = await employeeResignationDetails.update({
                status
            }, {where: { employee_resignation_id: resignationId }} );
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Recorb Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};