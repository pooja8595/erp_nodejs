const ExpenceTravel = require("../../models/index");
const MyExpenses = ExpenceTravel.myexpenses
const { Op } = require("sequelize");
const travelticket_copy = ExpenceTravel.travelticketcopy
const ExpenceDetailsCopy = ExpenceTravel.expensedetailscopy
const LeadManagment = ExpenceTravel.LeadManagment
const ExpenceDetails = ExpenceTravel.expensedetails
const TravelTicket = ExpenceTravel.travelticket
const TaskOrderDetails = ExpenceTravel.TaskOrder
const moment =require("moment")

const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/"

exports.CreateMyExpense = async (req, res) => {
  console.log(req.body.ticketArr, "arrr");
  const a = req.body.ticketArr
  // var ticketArr = a?.slice(1, -1).split(',').map(Number);
  // console.log(ticketArr);



  var AllData = await MyExpenses.sequelize.query(
    `SELECT * FROM myexpenses ORDER BY myexpense_id DESC LIMIT 1`, {
    type: MyExpenses.sequelize.QueryTypes.SELECT
  })

  await ExpenceDetailsCopy.destroy({
    where: {},
    truncate: true
  })

  await travelticket_copy.destroy({
    where: {},
    truncate: true
  })
  // await ExpenceDetailsCopy.sequelize.query(
  //   `TRUNCATE TABLE expenses_detail_copy`,{
  //     type: ExpenceDetailsCopy.sequelize.QueryTypes.SELECT
  // })

  // await ExpenceDetailsCopy.sequelize.query(
  //   `TRUNCATE TABLE travel_ticket_copy`,{
  //     type: ExpenceDetailsCopy.sequelize.QueryTypes.SELECT
  // })

  // await ExpenceDetailsCopy.sequelize.query(
  //   ` TABLE expenses_detail_copies`,{
  //     type: ExpenceDetailsCopy.sequelize.QueryTypes.SELECT
  // })

  // await travelticket_copy.sequelize.query(
  //   `TRUNCATE TABLE travel_ticket_copies`,{
  //     type: travelticket_copy.sequelize.QueryTypes.SELECT
  // })

  // await ExpenceDetailsCopy.findAll()


  let expense_report_no;
  // // if(AllData.length<=0){
  // //   expense_report_no=100;


  expense_report_no = AllData.length == 0 || undefined ? expense_report_no = 100 : AllData[0].
    expense_report_no + 1
    let attach_bill;
    attach_bill = req.file == undefined ? null : attach_bill = req.file.filename;
  try {
    const {
      expense_type,
      expense_name,
      expense_desc,
      expense_advance,
      task_order,
      travel_ticket,
      expense_requestId,
      travelRequestExpenseId,
      expensesDetailExpDetails,
      expense_details,
      expenseApproval,
      status,
      leadId,
      role_id,
      ticketArr
    } = req.body;

    let response;
    let info=baseUrl+ attach_bill


    response = await MyExpenses.create({
      leadId,
      expense_type,
      expense_name,
      expense_desc,
      expense_advance,
      expense_requestId,
      task_order,
      travel_ticket,
      expense_details,
      travelRequestExpenseId,
      expensesDetailExpDetails,
      status,
      expenseApproval,
      expense_report_no: expense_report_no,
      attach_bill: attach_bill==null? attach_bill:  info,
      ticket_id: ticketArr,
      role_id
    });

    console.log("ticketArr", ticketArr)

    if(response.ticketArr){
      ticketArr.map(async (item) => {
        await TravelTicket.update({ myexpense_status: "ACTIVE" }, { where: { ticket_id: item } });
        console.log(response, "response")
      })
    }
   
    // let AllData1 = await MyExpenses.sequelize.query(
    //   `SELECT * FROM myexpenses ORDER BY myexpense_id DESC LIMIT 1`,{
    //     type: MyExpenses.sequelize.QueryTypes.SELECT
    // })
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

exports.myExpenselist_lastone = async (req, res) => {
  try {
    let getAllData = await MyExpenses.sequelize.query(
      `SELECT * FROM myexpenses ORDER BY expense_report_no DESC LIMIT 1`, {
      type: MyExpenses.sequelize.QueryTypes.SELECT
    })
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

exports.myExpenselist = async (req, res) => {
  let role_id=req.params.role_id;
  try {
    if(role_id==1){
      getAllData = await MyExpenses.findAll({});
    }else {
      getAllData = await MyExpenses.findAll({
        where:{ role_id: role_id}
      });
    }
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


exports.myExpenseDraftlist = async (req, res) => {
  let role_id=req.params.role_id;
  try {
    const getAllData = await MyExpenses.findAll({
      where:{ status: "Draft"}
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


exports.myExpenselistDateFilter = async (req, res) => {
  let role_id=req.params.role_id;
  let start_date=req.body.start_date;
  let end_date=req.body.end_date;

  try {
    const getAllData = await MyExpenses.findAll({
      where:{ role_id: role_id}
    });

    const filteredDates =await getAllData.filter((item) => {
      let exitsDay = moment(item.createdAt).format("YYYY-MM-DD");
      return (start_date <= exitsDay && exitsDay <= end_date) 
    });

    if (filteredDates) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: filteredDates,
      });
    } else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.getbyMyExpenses = async (req, res) => {
  try {
    const myexpense_id = parseInt(req.params.myexpense_id);
    console.log(myexpense_id, "myexpense_id")
    const Data = await MyExpenses.findOne({
      where: { myexpense_id: myexpense_id },
    });
    

    const Data2 = await LeadManagment.findOne({
      where: { lead_genration_id: Data.leadId },
    });
    console.log("data2", Data2);

    const taskorderdata= await TaskOrderDetails.findOne({
      where: { lead_genration_id: Data.leadId },
    })


    if(taskorderdata){
      Data2.taskOrder_no=taskorderdata.TaskOrder_No || 0
      Data2.travel_type=taskorderdata.travel_type || 0
    }


    console.log("Data2", Data2);
    let maindata;
    if (Data2) {
      maindata = {
        ...Data2.dataValues, ...Data.dataValues
      }
    }
    else if (!Data2) {
      maindata = {
        ...Data.dataValues,
      }
    }
    console.log("maindata", maindata)

    if (maindata) {
      return res
        .status(200)
        .send({ code: 200, message: "Fetch Data Successfully", data: maindata });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: error.message || "Server Error" });
  }
};

exports.updateMyExpenses = async (req, res) => {
  const {
    expense_report_no,
    expense_type,
    expense_name,
    expense_desc,
    expense_advance,
    task_order,
    taskOrdersNum,
    travel_ticket,
    travel_remarks,
    expense_details,
    date_posted,
    remarks_posted,
    status,
    brNumber,
    expenseApproval,
    ManageApproval,
    ticket_id,
    finalAmount
  } = req.body
  console.log(req.body, "bodyrrr")
  var attach_approval = req.file == undefined ? "" : attach_approval = req.file.path;

  try {
    const traveldata = await MyExpenses.findOne({ where: { myexpense_id: parseInt(req.params.myexpense_id) } });
    console.log("traveldata", traveldata)
    if (traveldata) {
      const response = await MyExpenses.update({
        expense_report_no,
        expense_type,
        expense_name,
        expense_desc,
        expense_advance,
        task_order,
        taskOrdersNum,
        travel_ticket,
        travel_remarks,
        expense_details,
        date_posted,
        remarks_posted,
        status,
        expenseApproval,
        ManageApproval,
        ticket_id,
        brNumber,
        finalAmount: finalAmount || 5000,
        attach_bill: baseUrl + attach_approval
      }, { where: { myexpense_id: parseInt(req.params.myexpense_id) } });

      // ticket_id.map( async (item)=> {
      //   await TravelTicket.update({ myexpense_status: "Paid" }, { where: { ticket_id: item } });

      //   console.log(response ,"response")

      // });

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

exports.getAllMyexpenses_Paid_withupdate = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Paid" }
    });
    if (getAllData) {
      for (var i of getAllData) {
        i.ticket_id.map(async (item) => {
          await TravelTicket.update({ myexpense_status: "Paid" }, { where: { ticket_id: item } });
        });
      }
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

exports.getAllMyexpensesPending = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Pending" }
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


exports.getAllMyexpensesRejected = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: {
        [Op.or]: [{ status: "Rejected" }, { status: "Approved" }]
      }
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



exports.getAllMyexpensesApproved = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Approved" }
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


exports.getAllMyexpensesPaid = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Paid" }
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


exports.getAllMyexpensesManageApproval = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Processing" }
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


exports.getAllMyexpensesProcessing = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Processing" }
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


exports.getAllMyexpensesConfirmTicket = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Confirm Ticket" }
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

exports.getallbyidMyExpenses = async (req, res) => {
  try {
 

    const myexpense_id = parseInt(req.params.myexpense_id);
    console.log(myexpense_id, "myexpense_id")
    const getAllData = await MyExpenses.findOne({
      attributes: ['attach_bill'],
      where: { myexpense_id: myexpense_id },
      include: [{
        model: ExpenceDetails,
        attributes: ['attachedBill'],
        where: {},
      }],
    });

    if (getAllData) {
      let array = [];
      for (var i = 0; i < getAllData.expenses_details.length; i++) {
        var expenses_detailsName = getAllData.expenses_details[i].attachedBill;
        var obj = {
          "attach_bill": getAllData.attach_bill,
          "attachedBill": expenses_detailsName,
        }
        array.push(obj);
      }
      return res.status(200).send({ code: 200, message: "Fetch All new_spa Data Successfully", data: array });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};



exports.myExpenselistProcessing = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: ["Processing","ManageApproval"] }
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

exports.myExpenselistOpen = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Open" }
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

exports.myExpenselistPosted = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Posted" }
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

exports.getAllMyexpensesPaid_BYEXPID = async (req, res) => {
  try {
    const myexpense_id = parseInt(req.params.myexpense_id);
    console.log(myexpense_id, "myexpense_id")
    const getAllData = await MyExpenses.findAll({
      where: { status: "Paid", myexpense_id: myexpense_id }
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


exports.myExpenselistdraft = async (req, res) => {
  try {
    const getAllData = await MyExpenses.findAll({
      where: { status: "Expense Draft" }
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