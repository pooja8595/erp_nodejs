const ExpenceTravel = require("../../models/index");
const ExpenceTravelModule = ExpenceTravel.expenserequest
const Expensechild = ExpenceTravel.expensechild
const { Op } = require("sequelize");
const TravelTicket= ExpenceTravel.travelticket

// const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/"
const baseUrl = "https://emerp.elitetraveltech.in/";

// exports.ExpenseRequest = async (req , res) =>{
//   let attach_approval;
//   attach_approval = req.file == undefined ? "" : attach_approval = req.file.path;
//   console.log(req.file,"file")

//   let AllData = await ExpenceTravelModule.sequelize.query(
//     `SELECT * FROM travel_requests ORDER BY expense_id DESC LIMIT 1`,{
//       type: ExpenceTravelModule.sequelize.QueryTypes.SELECT
//     }
//     )
//   console.log("AllData...", AllData)

//   let travel_id;
//   if(AllData.length<=0){
//     travel_id=100
//   }else{
//     travel_id=AllData[0].travel_id
//     travel_id==null ?travel_id =100 : travel_id+=1
//   }


//     try {
//       const {
//         travel_type,
//         expense_name,
//         travel_desc,
//         travel_approval,
//         task_order,
//         travel_ticket,
//         traveler_name,
//         dateOf_travel,
//         modeOf_travel,
//         travel_form,
//         travel_to,
//         remarks,
//         time_travel,
//         status,
//         travel_time
//       } = req.body;
//       console.log("attach_approval", attach_approval)
//         const response = await ExpenceTravelModule.create({
//           travel_type,
//           expense_name,
//           travel_desc,
//           travel_approval,
//           task_order,
//           travel_ticket,
//           traveler_name,
//           dateOf_travel,
//           modeOf_travel,
//           travel_form,
//           travel_to,
//           remarks,
//           status,
//           time_travel,
//           travel_time,
//           travel_id: travel_id,
//           expense_approval:  baseUrl + attach_approval,
//         });
//         return res
//           .status(200)
//           .send({ code: 200, message: "Created Successfully!", data: response });
//         // }
//     } catch (error) {
//       console.log(error);
//       return res
//         .status(500)
//         .send({ code: 500, message: "Server Error please check" });
//     }
// };

exports.ExpenseRequest = async (req, res) => {
  let attach_approval;
  attach_approval = req.file == undefined ? "" : attach_approval = req.file.path;
  console.log(req.file, "file")

  let AllData = await ExpenceTravelModule.sequelize.query(
    `SELECT * FROM travel_requests ORDER BY expense_id DESC LIMIT 1`, {
    type: ExpenceTravelModule.sequelize.QueryTypes.SELECT
  })
  console.log("AllData...", AllData)

  let travel_id;
  if (AllData.length <= 0) {
    travel_id = 100
  } else {
    travel_id = AllData[0].travel_id
    travel_id == null ? travel_id = 100 : travel_id += 1
  }
  try {
    const {
      travel_type,
      expense_name,
      travel_desc,
      travel_approval,
      task_order,
      travel_ticket,
      select_agent,
      empId,
      // traveler_name,
      // dateOf_travel,
      // modeOf_travel,
      // travel_form,
      // travel_to,
      // remarks,
      // time_travel,
      status,
      travel_time,
      ticketType,
      taskLeadId
      // expense_status
    } = req.body;
    console.log("attach_approval", attach_approval)
    const response = await ExpenceTravelModule.create({
      travel_type,
      expense_name,
      travel_desc,
      travel_approval,
      task_order,
      travel_ticket,
      select_agent,
      empId,
      // traveler_name,
      // dateOf_travel,
      // modeOf_travel,
      // travel_form,
      // travel_to,
      // remarks,
      status,
      // time_travel,
      travel_time,
      ticketType,
      travel_id: travel_id,
      expense_approval: baseUrl + attach_approval,
      taskLeadId
      // expense_status
    });
    return res
      .status(200)
      .send({ code: 200, message: "Created Successfully!", data: response });
    // }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, message: "Server Error please check" });
  }
};


exports.Expensechild = async (req, res) => {

  try {
    const {
      expense_id,
      traveler_name,
      dateOf_travel,
      modeOf_travel,
      travel_form,
      travel_to,
      time_travel,
      ticketType,
      remarks,
      taskLeadId,
    } = req.body;

    const response = await Expensechild.create({
      expense_id,
      traveler_name,
      dateOf_travel,
      modeOf_travel,
      travel_form,
      travel_to,
      time_travel,
      ticketType,
      remarks,
      taskLeadId
    });
    return res
      .status(200)
      .send({ code: 200, message: "Created Successfully!", data: response });
    // }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, message: "Server Error please check" });
  }
};
// --------------------------------------------------------------------------------------------------------------

exports.update_ExpenseRequest = async (req, res) => {
  try {
    const travelId = req.params.id;
    const {
      traveler_name,
      dateOf_travel,
      modeOf_travel,
      travel_form,
      travel_to,
      remarks,
      time_travel,
      ticketType,
      taskLeadId
    } = req.body;
    const editData = await ExpenceTravelModule.findOne({ where: { travel_id: travelId } });
    if (editData) {
      const updateData = await ExpenceTravelModule.update({
        traveler_name,
        dateOf_travel,
        modeOf_travel,
        travel_form,
        travel_to,
        ticketType,
        remarks,
        time_travel,
        taskLeadId
      },
        { where: { travel_id: travelId } });

      return res.status(200).send({ code: 200, message: "expense Updated SuccessFully", data: updateData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.getExpenseAll_User = async (req, res) => {
  try {
    const empId = req.params.id;
    const getAllData = await ExpenceTravelModule.findAll({
      where: {
        [Op.or]: [
          { status: "Suggested" },
          { status: "Booked Tickets" },
          { status: "Confirm cancel Ticket" },
        ],
        empId: empId,
      },
      include: [{
        model: Expensechild,
        attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
      }],
    });

    if (getAllData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: getAllData,
      });
    } else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


// exports.getExpenseAll_User = async (req, res) => {
//   try {
//     const manageId = req.params.id;
//     const candidateId = req.params.id;

//     const getAllData = await ExpenceTravelModule.findAll({
//       where: {
//         [Op.or]: [
//           { status: "Suggested" },
//           { status: "Booked Tickets" },
//           { status: "Confirm cancel Ticket" },
//         ],
//         empId: empId,
//         manageId
//       },
//       include: [{
//         model: Expensechild,
//         attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
//       }],
//     });

//     if (getAllData) {
//       return res.status(200).send({
//         code: 200,
//         message: "Fetch All Data Successfully",
//         result: getAllData,
//       });
//     } else {
//       return res.status(400).send({ code: 400, message: "Record Not Found" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// };

// exports.getExpenseAll_Agent = async (req, res) => {
//   try {
//     const select_agent = req.params 
//     console.log(select_agent);
//     const getAllData = await ExpenceTravelModule.findAll({
//       where: {
//         [Op.or]: [
//           { status: "Submitted" },
//           { status: "Confirmed" },
//           { status: "Cancel Request Approved" },
//           { status: "Confirm Cancel Ticket" },
//           { statusInvoice: "Update Invoice" },
//         ],
//         agentId: agentId, // Add a filter for the selected agent here
//       },
//       include: [{
//         model: Expensechild,
//         attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
//       }],
//     });

//     if (getAllData) {
//       return res.status(200).send({
//         code: 200,
//         message: "Fetch All Data Successfully",
//         result: getAllData,
//       });
//     } else {
//       return res.status(400).send({ code: 400, message: "Record Not Found" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// };

exports.getExpenseAll_Agent = async (req, res) => {
  try {
    const agentId = req.params.id; // Assuming agentId is the property that contains the agent's information
    console.log(agentId);
    
    // Modify the query to include a filter for the selected agent
    const getAllData = await ExpenceTravelModule.findAll({
      where: {
        [Op.or]: [
          { status: "Submitted" },
          { status: "Confirmed" },
          { status: "Cancel Request Approved" },
          { status: "Confirm Cancel Ticket" },
          { statusInvoice: "Update Invoice" },
        ],
        select_agent: agentId, // Add a filter for the selected agent here
      },
      include: [{
        model: Expensechild,
        attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
      }],
    });

    if (getAllData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch Data for Agent Successfully",
        result: getAllData,
      });
    } else {
      return res.status(200).send({ code: 400, message: "No Records Found for Agent" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.getExpenseAll_Manager = async (req, res) => {
  try {
   var empId = req.params.id;
    const getAllData = await ExpenceTravelModule.findAll({

      where: {
        [Op.or]: [
          { status: "Cancel Request" },
          { status: "Confirm Cancel Ticket" }
        ],
        empId:empId

      },
      include: [{
        model: Expensechild,
        attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
      }],
    });

    if (getAllData.length > 0) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: getAllData,
      });
    } 
    if(getAllData.length == 0){

      let getAllData = await ExpenceTravelModule.findAll({

        where: {
          [Op.or]: [
            { status: "Cancel Request" },
            { status: "Confirm Cancel Ticket" }
          ],
          reporting_manager_id:empId
  
        },
        include: [{
          model: Expensechild,
          attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
        }],
      });
      // return res.status(200).send({
      //   code: 200,
      //   message: "Fetch All Data Successfully",
      //   result: getAllData,
      // });

      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: getAllData,
      });
  
    }
    
    else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports. getAllCancelTicket = async (req, res) => {
  try {
   var empId = req.params.id;
    const getAllData = await ExpenceTravelModule.findAll({
      where: {
        [Op.and]: [
          { empId: empId },
          { status: "Cancel Request Approved" }
        ],
      },
      include: [{
        model: Expensechild,
        attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
      }],
    });

    if (getAllData.length > 0) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: getAllData,
      });
    } 
    
    if(getAllData.length == 0){
      let getAllData = await ExpenceTravelModule.findAll({
        where: {
          [Op.and]: [
            { reporting_manager_id: empId },
            { status: "Cancel Request Approved" }
          ],
        },
        include: [{
          model: Expensechild,
          attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
        }],
      });
      // return res.status(200).send({
      //   code: 200,
      //   message: "Fetch All Data Successfully",
      //   result: getAllData,
      // });

      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: getAllData,
      });
  
    }
    else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.travelRequestlist = async (req, res) => {
  try {
    const getAllData = await ExpenceTravelModule.findAll({
      attributes: ["expense_id", "travel_id", "travel_type", "travel_desc", "travel_approval", "expense_approval", "task_order", "travel_ticket", "dateOf_travel", "status"],

      include: [{
        model: Expensechild,
        attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],

      }],
      // where:{ status:"ACTIVE"}
    });
    let newData = []

    console.log(getAllData, "data124")
    for (j = 0; j < getAllData.length; j++) {
      for (i = 0; i < getAllData[j].expensechildren.length; i++) {
        let nameall = []
        for (k = 0; k < getAllData[j].expensechildren.length; k++) {
          traveler_name = {
            "traveler_name": getAllData[j].expensechildren[k].traveler_name,
          }
          nameall.push(traveler_name)

          obj = {
            "expense_id": getAllData[j].expense_id,
            "travel_id": getAllData[j].travel_id,
            "travel_type": getAllData[j].travel_type,
            "travel_desc": getAllData[j].travel_approval,
            "expense_approval": getAllData[j].expense_approval,
            "task_order": getAllData[j].task_order,
            "travel_ticket": getAllData[j].travel_ticket,
            "dateOf_travel": getAllData[j].dateOf_travel,
            "status": getAllData[j].status,
            "dateOf_travel": getAllData[j].expensechildren[i].dateOf_travel,
            "modeOf_travel": getAllData[j].expensechildren[i].modeOf_travel,
            "travel_form": getAllData[j].expensechildren[i].travel_form,
            "travel_to": getAllData[j].expensechildren[i].travel_to,
            "time_travel": getAllData[j].expensechildren[i].time_travel,
            "ticketType": getAllData[j].expensechildren[i].ticketType,
            "remarks": getAllData[j].expensechildren[i].remarks,
          }

          newData.push(obj)
        }
      }
    }
    if (newData) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: getAllData,
      });
    } else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.getbyTravelRequest = async (req, res) => {
  try {
    const expense_id = parseInt(req.params.expense_id);
    const Data = await ExpenceTravelModule.findOne({
      where: { expense_id: expense_id },
    });
    if (Data) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: Data });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.getbyTravelRequestchild = async (req, res) => {
  try {
    const expense_id = parseInt(req.params.expense_id);

    const Data = await ExpenceTravelModule.findOne({
      attributes: ["expense_id", "travel_id", "travel_type", "travel_desc", "travel_approval", "expense_approval", "task_order", "travel_ticket", "dateOf_travel", "status"],
      where: { expense_id: expense_id },
      include: [{
        model: Expensechild,
        attributes: ["expensechildId", "dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks"],
      }],
    });
    const newData = []

    for (i = 0; i < Data.expensechildren.length; i++) {

      obj = {
        "expensechildId": Data.expensechildId,
        "expense_id": Data.expense_id,
        "travel_id": Data.travel_id,
        "travel_type": Data.travel_type,
        "travel_desc": Data.travel_approval,
        "expense_approval": Data.expense_approval,
        "task_order": Data.task_order,
        "travel_ticket": Data.travel_ticket,
        "dateOf_travel": Data.dateOf_travel,
        "status": Data.status,
        "expensechildId": Data.expensechildren[i].expensechildId,
        "traveler_name": Data.expensechildren[i].traveler_name,
        "dateOf_travel": Data.expensechildren[i].dateOf_travel,
        "modeOf_travel": Data.expensechildren[i].modeOf_travel,
        "travel_form": Data.expensechildren[i].travel_form,
        "travel_to": Data.expensechildren[i].travel_to,
        "time_travel": Data.expensechildren[i].time_travel,
        "ticketType": Data.expensechildren[i].ticketType,
        "remarks": Data.expensechildren[i].remarks,
      }
      newData.push(obj)
    }
    if (Data) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: newData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.getbyTravelRequestchildDetails = async (req, res) => {
  try {
    const expense_id = parseInt(req.params.expense_id);
    const expensechildId = parseInt(req.params.expensechildId);

    const Data = await ExpenceTravelModule.findOne({
      attributes: ["expense_id", "travel_id", "travel_type", "travel_desc", "travel_approval", "expense_approval", "task_order", "travel_ticket", "dateOf_travel", "status"],
      where: { expense_id: expense_id },
      include: [{
        model: Expensechild,
        where: { expensechildId: expensechildId },
        attributes: ["dateOf_travel", "traveler_name", "modeOf_travel", "travel_form", "travel_to", "time_travel", "ticketType", "remarks", "expensechildId"],
      }],
    });
    console.log("+++", Data)
    const newData = []

    for (i = 0; i < Data.expensechildren.length; i++) {

      obj = {
        "expensechildId": Data.expensechildren[i].expensechildId,
        "expense_id": Data.expense_id,
        "travel_id": Data.travel_id,
        "travel_type": Data.travel_type,
        "travel_desc": Data.travel_approval,
        "expense_approval": Data.expense_approval,
        "task_order": Data.task_order,
        "travel_ticket": Data.travel_ticket,
        "dateOf_travel": Data.dateOf_travel,
        "status": Data.status,
        "traveler_name": Data.expensechildren[i].traveler_name,
        "dateOf_travel": Data.expensechildren[i].dateOf_travel,
        "modeOf_travel": Data.expensechildren[i].modeOf_travel,
        "travel_form": Data.expensechildren[i].travel_form,
        "travel_to": Data.expensechildren[i].travel_to,
        "time_travel": Data.expensechildren[i].time_travel,
        "ticketType": Data.expensechildren[i].ticketType,
        "remarks": Data.expensechildren[i].remarks,
      }
      newData.push(obj)
    }
    if (Data) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: newData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};



exports.updateTravelRequest = async (req, res) => {
  const {
    travel_type,
    expense_name,
    travel_desc,
    travel_approval,
    task_order,
    travel_ticket,
    traveler_name,
    dateOf_travel,
    modeOf_travel,
    travel_form,
    travel_to,
    remarks,
    flight_no,
    travel_date,
    travel_amount,
    mode_of_travel,
    travel_time,
    status,
    attach_remarks,
    time_travel,
    statusInvoice,
    reporting_manager_id,
    reporting_manager_name,
    ticket_id,
    expenseId,
    employee_id
  } = req.body
  var attach_approval = req.files == undefined ? "" : attach_approval = req.files.attach_approval;
  console.log("attach_approval", attach_approval)
  console.log("req.files", req.files)
  console.log("req.file", req.file)

  try {
    const traveldata = await ExpenceTravelModule.findOne({ where: { expense_id: parseInt(req.params.expense_id) } });
    console.log("traveldata", traveldata)

    if(ticket_id && status== "Cancel Request"){
      await TravelTicket.update({
        employee_id: reporting_manager_id,
        expenseId:expenseId,
      }, { where: { ticket_id: ticket_id } });
    }

    if (req.body.status == "Booked Ticket") {
      let infomation = baseUrl + attach_approval
      console.log("infomation", infomation)
      const response = await ExpenceTravelModule.update({
        status,
        attach_ticket: baseUrl + attach_ticket,
        attach_invoice: baseUrl + attach_invoice,
        expense_approval: baseUrl + attach_approval,
        travel_time,
        statusInvoice,
        attach_remarks,

      }, { where: { expense_id: parseInt(req.params.expense_id) } });
      console.log("response", response)


      return res
        .status(200)
        .send({ code: 200, message: "Update Successfully!", data: response });
    }

    else if (traveldata) {
      const response = await ExpenceTravelModule.update({
        travel_id: traveldata.travel_id,
        travel_type,
        expense_name,
        travel_desc,
        travel_approval,
        task_order,
        travel_ticket,
        traveler_name,
        dateOf_travel,
        modeOf_travel,
        travel_form,
        travel_to,
        remarks,
        expense_approval: baseUrl + attach_approval,
        flight_no,
        travel_date,
        travel_amount,
        mode_of_travel,
        travel_time,
        status,
        time_travel,
        reporting_manager_id,
        reporting_manager_name,
        empId: employee_id
      }, { where: { expense_id: parseInt(req.params.expense_id) } });
      return res
        .status(200)
        .send({ code: 200, message: "Created Successfully!", data: response });
    } else {
      return res
        .status(204)
        .send({ code: 200, message: "lead_genration_id not found!", data: response });
    }
  }
  catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, message: "Server Error please check" });
  }
}


exports.updateTravelRequestNew = async (req, res) => {
  const {
    travel_id,
    travel_type,
    expense_name,
    travel_desc,
    travel_approval,
    task_order,
    travel_ticket,
    traveler_name,
    dateOf_travel,
    modeOf_travel,
    travel_form,
    travel_to,
    remarks,
    flight_no,
    travel_date,
    travel_amount,
    mode_of_travel,
    travel_time,
    status,
    attach_remarks
  } = req.body

  try {
    const traveldata = await ExpenceTravelModule.findOne({ where: { expense_id: parseInt(req.params.expense_id) } });
    console.log("traveldata", traveldata)

    if (traveldata) {
      const response = await ExpenceTravelModule.update({
        travel_id,
        travel_type,
        expense_name,
        travel_desc,
        travel_approval,
        task_order,
        travel_ticket,
        traveler_name,
        dateOf_travel,
        modeOf_travel,
        travel_form,
        travel_to,
        remarks,
        attach_remarks,
        flight_no,
        travel_date,
        travel_amount,
        mode_of_travel,
        travel_time,
        status
      }, { where: { expense_id: parseInt(req.params.expense_id) } });
      return res
        .status(200)
        .send({ code: 200, message: "update Successfully!", data: response });
    } else {
      return res
        .status(204)
        .send({ code: 200, message: "lead_genration_id not found!", data: response });
    }
  }
  catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, message: "Server Error please check" });
  }
}


// exports.UploadCertificat = async (req ,res) =>{

// var upload_certificate = req.file == undefined ? "" : upload_certificate = req.file.path;
//   try {
//     const {
//       select_customer,
//       select_program,
//       choose_logo,
//       scope,
//       valid_until,
//       lead_genration_id,
//       status,
//          } = req.body;
//  const response = await UploadCertificat.create({
//         select_customer,
//         select_program,
//         choose_logo,
//         scope,
//         valid_until,
//         lead_genration_id,
//         upload_certificate: baseUrl + upload_certificate,
//         status,

//       });
//       return res
//         .status(200)
//         .send({ code: 200, message: "Created Successfully!", data: response });

//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ code: 500, message: "Server Error please check" });
//   }
// };

exports.getcertificateByleadId = async (req, res) => {
  try {
    const lead_genration_id = parseInt(req.params.employee_id);
    const Data = await UploadCertificat.findAll({
      where: { lead_genration_id: lead_genration_id },
    });
    if (Data) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: Data });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};



//   exports.editInterCompany = async (req, res) => {
//     const interConpanyId = parseInt(req.params.interConpanyId);
//     var uploadPoFile = req.file == undefined ? "" : uploadPoFile = req.file.path;

//     const {
//       name_legal_status,
//       site_s_list_add,
//       ref_no_s,
//       parent_ref,
//       headcounts,
//       local_contact_person,
//       standard_s,
//       scope,
//       accreditation,
//       dqs_contact_person,
//       email1,
//       phone1,
//       due_date,
//       expiry_date_of_certi,
//       planned_dates,
//       type_assessment,
//       Frequency_audit_cycle,
//       manifacturing_site,
//       remote_location,
//       part_sampling_procedure,
//       corporate_scheme,
//       design_function,
//       detailed_calculation,
//       audit_language,
//       no_audit_days,
//       certi_req,
//       current_certi,
//       email2,
//       phone2,
//       status,
//       local_contact_person_phone,
//       local_contact_person_email,
//       sampling_last_audit_date,
//       business_sector,
//       branch_office_status,
//       tentative_remarks
//     } = req.body;

//  if(req.body.status =="PO Received"){
//     var fixcode = "5030";
//     var val = Math.floor(1000 + Math.random() * 9000);
//     var br_number =fixcode+val;
//     console.log(br_number,"ber_number1")
//  }

//     try {
//         const dltStage = await interCompanyModule.findOne({ where: { intercompany_id: interConpanyId } });
//         if (dltStage) {
//           const editData = await interCompanyModule.update({
//             name_legal_status,
//               site_s_list_add,
//               ref_no_s,
//               parent_ref,
//               headcounts,
//               local_contact_person,
//               standard_s,
//               scope,
//               accreditation,
//               dqs_contact_person,
//               email1,
//               phone1,
//               due_date,
//               expiry_date_of_certi,
//               planned_dates,
//               type_assessment,
//               Frequency_audit_cycle,
//               manifacturing_site,
//               remote_location,
//               part_sampling_procedure,
//               corporate_scheme,
//               design_function,
//               detailed_calculation,
//               audit_language,
//               no_audit_days,
//               certi_req,
//               current_certi,
//               email2,
//               phone2,
//               status,
//               local_contact_person_phone,
//               local_contact_person_email,
//               sampling_last_audit_date,
//               business_sector,
//               branch_office_status,
//               br_number:br_number || " ",
//               tentative_remarks,
//               uploadPoFile:  baseUrl + uploadPoFile
//             },{
//               where: { intercompany_id: interConpanyId } 
//             }
//           );
//           return res.status(200).send({ code: 200, message: "Data is Update Successfully!", data: editData });
//         } 


//         else {
//             return res.status(403).send({ code: 403, message: "Record Not Found" });
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
//   };

// exports.responstOfficeRequestCreate = async (req , res) =>{
//   try {
//     const {
//       rqst_for,
//       name_id_of_auditor,
//       fyi_only,
//       standard_s, 
//       fluent_lang_skill_req, 
//       select_rqst_auditor,
//       select_rqst_auditor_2,
//       auditor_type,
//       ea_code,
//       select_dates,
//       select_date_2,
//       status,
//       auditor_type_2,
//     } = req.body;

//           const response = await responstOfficeRequest.create({
//         rqst_for ,
//         name_id_of_auditor,
//         fyi_only,
//         standard_s, 
//         fluent_lang_skill_req, 
//         select_rqst_auditor,
//         select_rqst_auditor_2,
//         auditor_type,
//         ea_code,
//         select_dates,
//         select_date_2,
//         status,
//         auditor_type_2,
//       });
//       return res
//         .status(200)
//         .send({ code: 200, message: "Created Successfully!", data: response });
//     // }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .send({ code: 500, message: "Server Error please check" });
//   }
// };

// exports.responstOfficeRequestUpdate = async (req, res) => {
//   let resoffice_Id = parseInt(req.params.resoffice_Id);
//   console.log("resOfficeId", resoffice_Id)

//   try {
//       const dltStage = await responstOfficeRequest.findOne({ where: { resoffice_Id: resoffice_Id } });
//       if (dltStage) {
//           const editData = await responstOfficeRequest.update(req.body, { where: { resoffice_Id: resoffice_Id } });
//           return res.status(200).send({ code: 200, message: "Data is Update Successfully!", data: editData });
//       } else {
//           return res.status(403).send({ code: 403, message: "Record Not Found" });
//       }
//   } catch (error) {
//       console.log(error)
//       return res.status(500).send({ code: 500, message: "Server Error" });
//   };
// };

// exports.getauditortable = async (req, res)=>{
//   try{
//     const leaddata = await auditTableData.findOne({ where: { auditorId: parseInt(req.params.auditorId) } });
//     let arr=[];
//     if(leaddata){
//       let date1 = new Date(leaddata.audit_start_date);
//       const date2 = new Date(leaddata.audit_end_date);
//       const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
//       date2.setSeconds(date2.getSeconds() + 10);
//       const diffTime = Math.abs(date2 - date1);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//       for (var i=0; i<diffDays; i++){
//         var nextDay = new Date(date1);
//         nextDay.setDate(date1.getDate() + i);
//         console.log("nextDay", nextDay)
//         day=weekday[nextDay.getDay()]
//         let obj={
//           date: nextDay,
//           day: day,
//           block_release: leaddata.block_release,
//           duration: leaddata.duration,
//           standard_name: leaddata.standard_name,
//           lead_auditor_name: leaddata.lead_auditor_name,
//           co_auditor_name: leaddata.co_auditor_name
//         }
//         arr.push(obj)
//         console.log("arr", arr)
//       }
//     }
//     return res.send({
//       data: arr,
//       message: "get all data"
//     })
//   }
//   catch (error) {
//   console.log(error);
//   return res
//   .status(500)
//   .send({ code: 500, message: "Server Error please check" });
//   }
// }

exports.getapprover_name_l1 = async (req, res) => {
  console.log("elon.....", req.query)

  const userId = parseInt(req.query.userId);
  const assignById = parseInt(req.query.approver_name_l1Id);

  let globalId;

  globalId = userId ? userId : assignById
  
  try {
    const Data = await lead_managment.findAll({
      where: {

        [Op.or]: [
          { userId: globalId, status: "Sent L1" },
          { assignById: globalId},
        ]
      }
    });
    if (Data) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: Data });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.update_Onboarding_Travel_Request = async (req, res) => {
  try {
    const expense_Id = req.params.id;

    let upload_onbording;
    upload_onbording = req.file == undefined ? "" : upload_onbording = req.file.path;
    console.log(req.file, "file");


    const editData = await ExpenceTravelModule.findOne({ where: { expense_id: expense_Id } });
    if (editData) {
      const updateData = await ExpenceTravelModule.update({
        upload_onbording: baseUrl + upload_onbording,

      },
        { where: { expense_id: expense_Id } });

      return res.status(200).send({ code: 200, message: "Onboarding_Travel_Request Updated SuccessFully", data: updateData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.getOnboarding_Travel_RequestByexpense_id = async (req, res) => {
  try {
    const expense_id = parseInt(req.params.expense_id);
    const Data = await ExpenceTravelModule.findAll({
      where: { expense_id: expense_id },
    });
    if (Data) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: Data });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

// exports.downloadDocument_Onboarding = (req, res) => {
//   const fileName = req.params.fileName;
//   let filePath = path.join(__dirname, '../../../audit_qualification_doc/');
//   res.download(filePath + fileName, (err) => {
//       if (err) {
//           res.status(500).send({
//               message: "Could not download the file. " + err,
//           });
//       }
//   });
// };




exports.travelRequestDraftList = async (req, res) => {
  try {
    const Data = await ExpenceTravelModule.findAll({
      where: {status: "Draft" },
    });
    if (Data) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: Data });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};