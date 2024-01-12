const db = require("../../models/index");
const User = db.user;
const timeSheetDetails = db.timeSheet
const op = db.sequelize.op;

/////////////// Create Time Sheet ///////////////

exports.createTimeSheet = async (req, res) => {
  try {
    const { employee_id, employee_name, manager_name, contact_no, email, time_off_request, time_off_taken, time_off_request_reason, remark, other_reason, date_off_request } = req.body
    const grievance_data = await timeSheetDetails.findOne({ where: { employee_id: employee_id } });
    const response = await timeSheetDetails.create({
      employee_id,
      employee_name,
      manager_name,
      contact_no,
      email,
      time_off_request,
      time_off_taken,
      time_off_request_reason,
      date_off_request,
      other_reason,
      remark,
    });
    return res.status(200).send({ code: 200, message: "Created Successfully!", data: response })
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Edit Time Sheet ///////////////

exports.editTimeSheet = async (req, res) => {
  try {
    const timeSheetkId = req.params.id;
    const { employee_name, manager_name, contact_no, email, time_off_request, time_off_taken, time_off_request_reason, remark, other_reason, date_off_request, approve_status, status } = req.body
    const editData = await timeSheetDetails.findOne({ where: { employee_id: timeSheetkId } });
    if (editData) {
      const updateData = await timeSheetDetails.update(
        {
          employee_name,
          manager_name,
          contact_no,
          email,
          time_off_request,
          time_off_taken,
          time_off_request_reason,
          remark,
          other_reason,
          date_off_request,
          approve_status,
          status
        }, { where: { employee_id: timeSheetkId } }
      );
      return res.status(200).send({ code: 200, message: "Time Sheet Updated Successfully", data: updateData });
    } else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Get All Time Sheet ///////////////

exports.getAllTimeSheet = async (req, res) => {
  try {
    const getAllData = await timeSheetDetails.findAll({ where: { status: "ACTIVE" } })
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

/////////////// GetById Time Sheet ///////////////

exports.getByIdTimeSheet = async (req, res) => {
  try {
    const timeSheetkId = req.params.id;
    const getData = await timeSheetDetails.findOne({ where: { timesheet_id: timeSheetkId, status: "ACTIVE" } });
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

exports.deleteTimeSheet = async (req, res) => {
  try {
    const timeSheetkId = req.params.id;
    const dltpincode = await timeSheetDetails.findOne({ where: { timesheet_id: timeSheetkId } });
    if (dltpincode) {
      const deleteData = await timeSheetDetails.update({ status: "INACTIVE" }, { where: { timesheet_id: timeSheetkId } });
      return res.status(200).send({ code: 200, message: "pincode Data is Deleted Successfully!", data: deleteData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};