const ExpenceTravel = require("../../models/index");
const ExpenceDetails = ExpenceTravel.expensedetails
const ExpenceDetailsCopy = ExpenceTravel.expensedetailscopy
const CurrencyTable= ExpenceTravel.Currency_Convert
// const baseUrl = "https://emerp.elitetraveltech.in/"
const baseUrl = "https://emerp.elitetraveltech.in/";
const Op = require('sequelize').Op;


exports.CreateExpenseDetail = async (req , res) =>{
let attachedBill;
attachedBill = req.file == undefined ? null : attachedBill = req.file.filename;
    try {
      const {
          myexpense_id,
          expensefor,
          billAmount,
          dateOfExpenses,
          status,
          expense_location,
          quotation_currency,
          quantity,
          exr,
          finalAmount,
          verifier_status_name,
          verifier_comment,
          exp_start_date,
      } = req.body;
      console.log("req.body", req.body)
      let info=baseUrl+ attachedBill

      const currencyData=await CurrencyTable.findOne({ where: {
        Currency_Convert_id: quotation_currency
      }})
      
      console.log("currencyData", currencyData)
      // let indianRupees=  parseFloat(currencyData.rate) * parseInt(billAmount)
      if(currencyData){
        const response = await ExpenceDetails.create({
          expensefor,
          myexpense_id,
          billAmount:  billAmount,
          dateOfExpenses,
          status: "ACTIVE",
          expense_location,
          quotation_currency: currencyData.Currency_Convert_id,
          attachedBill: attachedBill==null? attachedBill:  info,
          quantity,
          exr,
          finalAmount,
          verifier_status_name,
          verifier_comment,
          exp_start_date,
          Currency_Type: currencyData.Currency_Type
          // indianAmount:  parseFloat(currencyData.rate) * parseInt(billAmount)
      });
      return res
        .status(200)
        .send({ code: 200, message: "Created Successfully!", data: response });
      // }
    }else{
      return res
        .status(404)
        .send({ code: 404, message: "Currency Not found", data: currencyData });
    }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ code: 500, message: "Server Error please check" });
    }
};


exports.createExpenseDetailsShallocopy = async (req , res) =>{
  let attach_bill;
  attach_bill = req.file == undefined ? "" : attach_bill = req.file.path;
      try {
        const {
            expensefor,
            billAmount,
            dateOfExpenses,
            status,
            quotation_currency
        } = req.body;
        console.log("req.body", req.body)
          const response = await ExpenceDetailsCopy.create({
              expensefor,
              billAmount,
              dateOfExpenses,
              status,
              quotation_currency,
              attachedBill:  baseUrl + attach_bill,
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


exports.ExpenseDetaillist = async (req, res) => {
  try {
    const getAllData = await ExpenceDetails.findAll({
      // where:{ status:"ACTIVE"}
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

exports.getbyExpenseDetail = async (req, res) => {
  try {
    const expense_id = parseInt(req.params.expense_id);
    const Data = await ExpenceDetails.findAll({
      // where: { myexpense_id: expense_id },
      where: {
        [Op.and]: [
           { status: "ACTIVE" },
          { myexpense_id: expense_id }
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
// getbyExpenseDetailId

exports.getbyExpenseDetailId = async (req, res) => {
  try {
    const expense_id = parseInt(req.params.expense_id);
    const Data = await ExpenceDetails.findOne({
      where: { exp_detail_id: expense_id },
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

exports.updateExpenseDetail = async (req, res)=>{
  const {
    expensefor,
        billAmount,
        dateOfExpenses,
        status,
        verifier_status_name,
        verifier_comment,
        quotation_currency,
        exp_start_date,
        expense_location,
        finalAmount,
        exr,
        quantity,
        Currency_Type
  }= req.body
  var attach_bill = req.file == undefined ? "" : attach_bill = req.file.path;

  try{
    const traveldata = await ExpenceDetails.findOne({ where: { exp_detail_id:  parseInt(req.params.expense_id)  } });
    console.log("traveldata", traveldata)
    if(traveldata){
      const response = await ExpenceDetails.update({
        expensefor,
        billAmount,
        dateOfExpenses,
        attachedBill: baseUrl +attach_bill ,
        status,
        verifier_status_name,
        verifier_comment,
        quotation_currency,
        exp_start_date,
        expense_location,
        finalAmount,
        exr,
        quantity,
        Currency_Type
      }, {where: { exp_detail_id: parseInt(req.params.expense_id)}}  );
      return res
        .status(200)
        .send({ code: 200, message: "Update data Successfully!", data: response });
    }else{
      return res
      .status(204)
        .send({ code: 200, message: "expense id not found!", data: response });
    }
  }
  catch (error) {
  console.log(error);
  return res
  .status(500)
  .send({ code: 500, message: "Server Error please check" });
  }
}

exports.edit_exp_detail_verifier = async (req, res) => {
  try {
      const exp_detailId = parseInt(req.params.exp_detail_id);
      const {verifier_status_name,verifier_comment } = req.body;
      const editData = await ExpenceDetails.findOne({ where: { exp_detail_id: exp_detailId } });
      if (editData) {
          const updateData = await ExpenceDetails.update({
            verifier_status_name,
            verifier_comment
          },
              { where: { exp_detail_id: exp_detailId } });

          return res.status(200).send({ code: 200, message: "ExpenceDetails Updated SuccessFully", data: updateData });
      } else {
          return res.status(404).send({ code: 404, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
}; 


exports.delete_exp_detail = async (req, res) => {
  try {
      const exp_detailId = parseInt(req.params.exp_detail_id);
      const editData = await ExpenceDetails.findOne({ where: { exp_detail_id: exp_detailId } });
      if (editData) {
          const updateData = await ExpenceDetails.update({
            status: "INACTIVE"
          },
            { where: { exp_detail_id: exp_detailId } });
          return res.status(200).send({ code: 200, message: "ExpenceDetails Delete SuccessFully", data: updateData });
      } else {
          return res.status(404).send({ code: 404, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
}; 
