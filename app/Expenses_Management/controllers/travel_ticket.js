const ExpenceTravel = require("../../models/index");
const TravelTicket = ExpenceTravel.travelticket
const TravelTicketCopy = ExpenceTravel.travelticketcopy
const Expenserequest= ExpenceTravel.expenserequest
const UserInfo = ExpenceTravel.user
const Currency_Conversion=ExpenceTravel.Currency_Convert;
const { Op } = require("sequelize");
// const baseUrl = "https://emerp.elitetraveltech.in/"
const baseUrl = "https://emerp.elitetraveltech.in/";
const MyExpenses = ExpenceTravel.myexpenses
const path = require("path");
const expensetravelRoutes = require("../routers/expensetravel.routes");
const CurrencyTable= ExpenceTravel.Currency_Convert


exports.CreateTravelTicket = async (req , res) =>{
    try {
      const {
        flight_no,
        travel_date,
        travel_amount,
        mode_of_travel,
        travel_time,
        travel_status,
        status,
        employee_id,
        sugested_employee_id,
        flight_name,
        departure,
        ticketTypeDetails,
        myexpense_status,
        arrival,
        quotation_currency,
        expenseId,
        finalAmount,
        exr,
        arrivalTime,
        time,
      } = req.body;

      const employeeInfoExits = await UserInfo.findAll({
        where: { employee_id: employee_id } ,
      });
      console.log("employeeInfoExits", employeeInfoExits)


      // const currencyData=await CurrencyTable.findOne({ where: {
      //   Currency_Convert_id: quotation_currency
      // }})



      if(employeeInfoExits){
        // const TravelTicketExits = await TravelTicket.findOne({
        //   where: { flight_no: flight_no  } ,
        // });
        // if (TravelTicketExits) {
        //   return res.status(403).send({
        //     message: "expense travel Id already exist Already Exits!",
        //   });
        // } else {
          const responsedata = await TravelTicket.create({
              flight_no,
              travel_date,
              travel_amount,
              mode_of_travel,
              travel_time,
              travel_status,
              flight_name,
              departure,
              arrival,
              quotation_currency,
              ticketTypeDetails,
              status: status? status: "ACTIVE",
              employee_id,
              sugested_employee_id,
              expenseId,
              myexpense_status,
              finalAmount,
              exr,
              arrivalTime,
              time
          });
          return res
            .status(200)
            .send({ code: 200, message: "Created Successfully!", data: responsedata });
          // }
      }else{
        return res
          .status(500)
          .send({ code: 500, message: "Employeee Not Found!", data: employeeInfoExits });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ code: 500, message: "Server Error please check" });
    }
};

///////// //Get Download Document Attach Invoice///////////////

exports.download_Document_attach_invoice = (req, res) => {
  const fileName = req.params.fileName;
  let filePath = path.join(__dirname, '../../../attach_ticket_invoice/');
  return res.download(filePath + fileName, (err) => {
    if (err) {
      return res.status(500).send({ message: "Could not download the file. " + err });
    }
  });
};

/////////////////Get Download Document Invoice////////////////
exports.download_Document_Invoice = (req, res) => {
  const fileName = req.params.fileName;
  let filePath = path.join(__dirname, '../../../attach_ticket_invoice/');
  return res.download(filePath + fileName, (err) => {
    if (err) {
      return res.status(500).send({ message: "Could not download the file. " + err });
    }
  });
};

/////////////////Get DownLoad Document Upload Onbording///////////////
exports.download_Document_upload_onbording = (req, res) => {
  const fileName = req.params.fileName;
  let filePath = path.join(__dirname, '../../../attach_ticket_invoice/');
  return res.download(filePath + fileName, (err) => {
    if (err) {
      return res.status(500).send({ message: "Could not download the file. " + err });
    }
  });
};




exports.TravelTicketlist = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var expenseId = req.params.expenseId;
    var employee_id = req.params.employee_id;
    if(employee_id){
    
    var getAllData = await TravelTicket.findAll({
      where:{ employee_id: employee_id, expenseId: expenseId  }
    });


    var mainarr=[];
    for (var item of getAllData){
      let quotationId= item.quotation_currency
      const quotation_data= await Currency_Conversion.findOne({where: {Currency_Convert_id: parseInt(quotationId)}})
      let mainobj={...quotation_data.dataValues, ...item.dataValues}
      mainarr.push(mainobj)
      console.log(mainarr)
    }
    if(mainarr.length>0){
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: mainarr,
      });
    }
    if(mainarr.length ==0 ){
      var getAllData = await TravelTicket.findAll({
        where:{ sugested_employee_id: employee_id, expenseId: expenseId  }
      });
  
  
      let mainarr=[];
      for (var item of getAllData){
        let quotationId= item.quotation_currency
        const quotation_data= await Currency_Conversion.findOne({where: {Currency_Convert_id: parseInt(quotationId)}})
        let mainobj={...quotation_data.dataValues, ...item.dataValues}
        mainarr.push(mainobj)
      }
  
      if (mainarr.length>0) {
        return res.status(200).send({
          code: 200,
          message: "Fetch All Data Successfully",
          result: mainarr,
        });
      } else {
        return res.status(400).send({ code: 400, message: "Record Not Found" });
      }
    }
    if (mainarr.length>0) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: mainarr,
      });
    } else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  }
  
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


exports.TravelTicketlistInfo = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var expenseId = req.params.expenseId;
    var employee_id = req.params.employee_id;
    var ticketId= req.params.ticketId
    
    const getAllData = await TravelTicket.findAll({
      where:{ employee_id: employee_id, expenseId: expenseId, ticket_id: ticketId }
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


exports.TravelTicketlistDetail = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var employee_id = req.params.employee_id;
    
    const getAllData = await TravelTicket.findAll({
      where:{ employee_id: employee_id, travel_status: "Confirmed" ,},
      include: [     
        {
            model: MyExpenses,
            where: { status: { [Op.ne]: "Paid" } }
        },
      ],
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

exports.TravelTicketlistDetail_Inactive = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var employee_id = req.params.employee_id;
    
    const getAllData = await TravelTicket.findAll({
      where:{ employee_id: employee_id, travel_status: "Confirmed" , myexpense_status: "INACTIVE"},
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

exports.TravelTicketlistDetail_active = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var employee_id = req.params.employee_id;
    
    const getAllData = await TravelTicket.findAll({
      where:{ employee_id: employee_id, travel_status: "Confirmed" , myexpense_status: "ACTIVE"},
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

exports.TravelTicketlistStatus = async (req, res) => {
  try {
    var expenseId = req.params.expenseId;
    var employee_id = req.params.employee_id;
    
    const getAllData = await TravelTicket.findAll({
      where: {
        employee_id: employee_id, expenseId: expenseId,
        [Op.or]: [
          { travel_status: "Confirmed" },
          { travel_status: "Cancel" }
        ]
      }
    });
    if (getAllData.length>0) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All Data Successfully",
        result: getAllData,
      });
    }
      else if(getAllData.length ==0){
        const getAllData = await TravelTicket.findAll({
          where: {
            sugested_employee_id: employee_id, expenseId: expenseId,
            [Op.or]: [
              { travel_status: "Confirmed" },
              { travel_status: "Cancel" }
            ]
          }
        });
        return res.status(200).send({
          code: 200,
          message: "Fetch All Data Successfully",
          result: getAllData,
        });
      }
    // }
     else {
      return res.status(400).send({ code: 400, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.TravelTicketlistCancelStatus = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var expenseId = parseInt(req.params.expenseId);
    var select_agent = parseInt(req.params.select_agent);
    
    const getAllData = await TravelTicket.findAll({
      where:{ select_agent: select_agent, expenseId: expenseId, travel_status: "Cancel" }
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


exports.travelticketcancellist = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var expenseId = req.params.expenseId;
    var select_agent = req.params.select_agent;
    
    const getAllData = await Expenserequest.findAll({
      where:{ select_agent: select_agent, expense_id: expenseId, status: "Cancel Request Approved" }
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

exports.travelticketcancellist_copy_data = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var expenseId = req.params.expenseId;
    var select_agent = req.params.select_agent;
    
    const getAllData = await TravelTicket.findAll({
      where:{ select_agent: select_agent, expenseId: expenseId, travel_status: "Cancel" }
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


exports.TravelTicketlistbyidfile = async (req, res) => {
  try {
    console.log("kkkk",req.body)
    var expenseId = req.params.expenseId;
    var employee_id = req.params.employee_id;
    
    const getAllData = await TravelTicket.findAll({
      where:{ employee_id: employee_id, expenseId: expenseId, },
      attributes: ['ticket_id','attach_ticket'],
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



exports.getbyTravelTicket = async (req, res) => {
  try {
    // const ticket_id = parseInt(req.params.ticket_id);
    const Data = await TravelTicket.findAll({
      where: {travel_status: "Confirmed",  },
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
exports.getbyTravelTicketcancel = async (req, res) => {
  try {
    // const ticket_id = parseInt(req.params.ticket_id);
    const Data = await TravelTicket.findAll({
      where: {travel_status: "Cancel",  },
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


exports.updatetravelticketdetails = async (req, res) => {
  try {
      const ticket_id = req.params.ticket_id;
      const {expenseId, travel_status,select_agent}=req.body;
      console.log("req.body", req.body)

      const editData = await TravelTicket.findOne({ where: { ticket_id: ticket_id } });
      if (editData) {
          const updateData = await TravelTicket.update({
            expenseId:expenseId,
            travel_status: travel_status,
            select_agent: select_agent
          }, { where: { ticket_id: ticket_id } });
          return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
      } else {
          return res.status(403).send({ code: 403, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.updatetravelticketdetailsStatus = async (req, res) => {
  try {
      const ticket_id = req.params.ticket_id;
      const userId= req.params.userId;
      const editData = await TravelTicket.findOne({ where: { ticket_id: ticket_id, employee_id: userId } });
      if (editData) {
          const updateData = await TravelTicket.update(req.body, { where: { ticket_id: ticket_id, employee_id: userId } });
          return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
      } else {
          return res.status(403).send({ code: 403, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};


exports.getbyTravelTicketId = async (req, res) => {
  try {
    const ticket_id = parseInt(req.params.ticket_id);
    const Data =await TravelTicket.findAll({ 
      
      where: {travel_status: "Confirmed", ticket_id:ticket_id },
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


exports.getbytravelticketcancelledbyid = async (req, res) => {
  try {
    const ticket_id = parseInt(req.params.ticket_id);
    const Data = await TravelTicket.findAll({ 
      where: {travel_status: "Cancel", ticket_id:ticket_id },
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

exports.updateTravelTicket = async (req, res)=>{
  const {
    flight_no,
    travel_date,
    travel_amount,
    mode_of_travel,
    travel_time,
    travel_status,
    status,
    attach_remarks, 
  }= req.body

  var attach_ticket;
  console.log("mmmmmm", req.files)
  console.log("nnnn", req.file)
  
  req.files == undefined ? "" : attach_ticket = req.files.attach_ticket[0].path;

  var attach_invoice;
  req.files == undefined ? "" : attach_invoice = req.files.attach_invoice[0].path;

  try{
    const traveldata = await TravelTicket.findOne({ where: { ticket_id:  parseInt(req.params.ticket_id)  } });
    console.log("traveldata", traveldata)
    console.log("req.body.travel_status", req.body.travel_status)

    if(req.body.travel_status=="Booked_Ticket"){
      const response=  await TravelTicket.update({
          travel_status,
          attach_ticket :  baseUrl + attach_ticket,
          attach_invoice : baseUrl+ attach_invoice,
          attach_remarks
    }, {where: { ticket_id: parseInt(req.params.ticket_id)}}  );
      console.log("response", response)
      return res
        .status(200)
        .send({ code: 200, message: "Update Successfully!", data: response });
    }
    
    else if(traveldata){
      const response = await TravelTicket.update({
            flight_no,
            travel_date,
            travel_amount,
            mode_of_travel,
            travel_time,
            travel_status,
            status,
      }, {where: { ticket_id: parseInt(req.params.ticket_id)}}  );
      console.log("response", response)
      return res
        .status(200)
        .send({ code: 200, message: "Update Successfully!", data: response });
    }else{
      return res
      .status(404).send({message: "data not found!", data: traveldata });
    }
  }
  catch (error) {
    console.log(error);
  return res
  .status(500)
  .send({ code: 500, message: "Server Error please check" });
  }
}



exports.updatestatustravelticket = async (req, res)=>{
    const {
      flight_no,
      travel_date,
      travel_amount,
      mode_of_travel,
      travel_time,
      travel_status,
      status,
      attach_remarks,
      mangement_fee,
    }= req.body
    
    var attach_ticket1=req.files.attach_ticket == undefined ? null : attach_ticket1 = req.files.attach_ticket[0].path;
    var attach_invoice1=  req.files.attach_invoice == undefined ? null : attach_invoice1 = req.files.attach_invoice[0].path;
  
  
    try{
      const traveldata = await TravelTicket.findOne({ where: { ticket_id:  parseInt(req.params.ticket_id)  } });
      console.log("traveldata", traveldata)

    if(traveldata){
      let info=baseUrl+ attach_ticket1
      let info2=baseUrl+ attach_invoice1

      if(req.body.status=="Booked_Ticket"){
        const response = await TravelTicket.update({
            status,
            attach_ticket : attach_ticket1==null? attach_ticket1:  info,
            attach_invoice : attach_invoice1==null? attach_invoice1:  info2,
            attach_remarks,
            mangement_fee
      }, {where: { ticket_id: parseInt(req.params.ticket_id)}}  );
      return res
      .status(200)
      .send({ code: 200, message: "Update Successfully!", data: response });
      }

      
        const responsedata = await TravelTicket.update({
              flight_no,
              travel_date,
              travel_amount,
              mode_of_travel,
              travel_time,
              travel_status,
              status,
              attach_ticket :attach_ticket1==null? attach_ticket1:  info,
              attach_invoice :attach_invoice1==null? attach_invoice1:  info2,
              attach_remarks,
              mangement_fee
        }, {where: { ticket_id: parseInt(req.params.ticket_id)}}  );
        return res
          .status(200)
          .send({ code: 200, message: "Update Successfully!", data: responsedata });
      }
      else{
        return res
        .status(204)
        .send({ code: 200, message: "lead_genration_id not found!", data: traveldata });
      }
    }
    catch (error) {
    console.log(error);
    return res
    .status(500)
    .send({ code: 500, message: "Server Error please check" });
    }
}


exports.CreateTravelTicketCopy = async (req , res) =>{
  try {
    const {
      flight_no,
      travel_date,
      travel_amount,
      mode_of_travel,
      travel_time,
      travel_status,
      status,
      employee_id,
      flight_name,
      departure,
      arrival,
      quotation_currency
    } = req.body;

    const employeeInfoExits = await UserInfo.findAll({
      where: { employee_id: employee_id } ,
    });

    console.log("employeeInfoExits", employeeInfoExits)


    if(employeeInfoExits){
      // const TravelTicketExits = await TravelTicketCopy.findOne({
      //   where: { flight_no: flight_no  } ,
      // });
      // if (TravelTicketExits) {
      //   return res.status(403).send({
      //     message: "expense travel Id already exist Already Exits!",
      //   });
      // } else {
        const responsedata = await TravelTicketCopy.create({
            flight_no,
            travel_date,
            travel_amount,
            mode_of_travel,
            travel_time,
            travel_status,
            flight_name,
            departure,
            arrival,
            quotation_currency,
            status: status? status: "ACTIVE",
            employee_id
        });

        return res
          .status(200)
          .send({ code: 200, message: "Created Successfully!", data: responsedata });
        // }
    }else{
      return res
        .status(500)
        .send({ code: 500, message: "Employeee Not Found!", data: employeeInfoExits });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ code: 500, message: "Server Error please check" });
  }
};

exports.TravelTicketlistBYEMP_TCKT = async (req, res) => {
  try {
    console.log("kkkk",req.body)

    var employee_id = req.params.employee_id;
    
    const getAllData = await TravelTicketCopy.findAll({
      where:{employee_id: employee_id, }
    });

    await TravelTicket.destroy({
      where: {},
      truncate: true
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

exports.update_expense_status_TravelTicket = async (req, res) => {
  try {
      const ticket_Id = parseInt(req.params.ticket_id);
      const getData = await TravelTicket.findOne({ where: { ticket_id: ticket_Id } });
      if (getData) {
          const updated = await TravelTicket.update(req.body, { where: { ticket_id: ticket_Id } });
          return res.status(200).send({ code: 200, message: "expense status is active successfully!", data: updated });
      } else {
          return res.status(404).send({ code: 404, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};