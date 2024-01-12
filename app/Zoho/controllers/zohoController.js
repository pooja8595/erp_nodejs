const db = require("../../models/index");
const ZohoToken = db.ZohoToken
const zohoSecretKey = db.zohoSecretKey
const expenseInvoiceZoho = db.expenseInvoiceZoho
const expense_zoho_data = db.expense_zoho_data
const leadmanagement = db.LeadManagment

const Op = db.Sequelize.Op;
// const axios = require('axios');
const http = require("https");
const { resolve } = require("path");


const clientId = '1000.J440X5SGIGR94VYKQKPO415SV1Q7ON';
const clientSecret = '79c0a3619daa24055247addc3cc4ac3c9239335919';
const redirectUri = 'https://dqs.elitetraveltech.in';
const authorizationCode = `1000.f20a02a84ee9e090308b8632e856c616.89ea08907f87911b8602cb1b9e2b23e3`;

// exports.CreateToken = async (req, res) => {
//   try {
//     // Retrieve Zoho access and refresh tokens
//     const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
//       params: {
//         grant_type: 'authorization_code',
//         client_id: clientId,
//         client_secret: clientSecret,
//         redirect_uri: redirectUri,
//         code: authorizationCode,
//       },
//     });
//     console.log(response, "response")
//     const { access_token, refresh_token, api_domain, token_type, expires_in } = response.data;

//     // Create a new ZohoToken instance
//     const zohoToken = await ZohoToken.create({
//       access_token,
//       refresh_token,
//       api_domain,
//       token_type,
//       expires_in,
//     });
//     return res.status(200).send({ code: 200, message: "Successfully Created...", data: zohoToken.toJSON() });
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "invalid_code" })
//   } finally {
//     console.log("Zoho Tocken Created Successfully")
//   }
// }

// exports.CreateAccessToken = async (req, res) => {
//   try {
//     const getAllData = await ZohoToken.findAll({})
//     console.log(getAllData, "getAllData")
//     let accessToken = getAllData[0].access_token
//     console.log(accessToken, "refreshToken")
//     let refreshToken = getAllData[0].refresh_token
//     console.log(refreshToken, "refreshToken")



//     // Retrieve Zoho access and refresh tokens
//     const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
//       params: {
//         grant_type: 'refresh_token',
//         client_id: clientId,
//         client_secret: clientSecret,
//         refresh_token: refreshToken,
//         redirect_uri: redirectUri,
//         code: authorizationCode,
//       },
//     });
//     console.log(response, "response")
//     const { access_token, api_domain, token_type, expires_in } = response.data;
//     var refreshtokenkey = await zohoSecretKey.findOne({ where: { client_id: clientId } })
//     const tokennew = refreshtokenkey
//     console.log(tokennew, "tokennew")
//     // console.log(refreshtokenkey, "refreshtokenkey")
//     console.log("refreshtokenkey")
//     if (tokennew) {
//       var zohoToken = await zohoSecretKey.update({
//         access_token,
//         api_domain,
//         client_id: clientId,
//         token_type,
//         expires_in,
//       }, { where: { client_id: clientId } });


//     }
//     else if (tokennew == null) {
//       var zohoToken = await zohoSecretKey.create({
//         access_token,
//         api_domain,
//         client_id: clientId,
//         token_type,
//         expires_in,
//       })
//     }
//     return res.status(200).send({ code: 200, message: "Successfully Created...", data: zohoToken });
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "invalid_code" })
//   } finally {
//     console.log("Zoho Refresh Tocken Created Successfully")

//   }
// }



// exports.CreateContact = async (req, res) => {
//   //  console.log(req.body)
//   const { contact_name, company_name, website, customer_id } = req.body
//   var data = await zohoSecretKey.findOne({})
//   var apiKey = data.access_token

//   let obj = {
//     contact_name, company_name, website, customer_id
//   }
//   try {
//     var options = {
//       url: `https://www.zohoapis.com/books/v3/contacts?organization_id=812475416`,
//       method: "post",
//       data: [obj],
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json"
//       },
//     };
//     // console.log(options, "options")
//     var response = await axios.request(options);
//     console.log("response================>", response.data.contacts[0])
//     if (!response.data.contacts[0].contact_id) {
//       return res.status(500).send({ message: 'Data already exists in zoho', code: 400 });
//     }
//     if (response.data.contacts[0].contact_id) {
//       const expenseInvoiceZohodata = await expenseInvoiceZoho.create({
//         contact_id: response.data.contacts[0].contact_id,
//         customer_name: response.data.contacts[0].contact_name,
//         company_name: req.body.company_name,
//         zoho_sync_status: response.data.contacts[0].message,

//         // wo_verified_on,
//         // wo_verify_by,
//         // wo_verification_status,
//         // gst_number,
//         // br_number,
//         // email_copy,
//         // street_address: shipping_address.street2,
//         // address2,
//         // workOrder_no,
//         // audit_start_date,
//         // audit_end_date,
//         // ICT_Date,
//         // Mob_number,
//         // gstNumber,
//         // creditDay,
//         // associated_company,
//         // first_name,
//         // last_name,
//         // company_logo_cost
//       })
//       console.log(response)
//       return res.send({ Data: response.data });

//     } else {
//       return res.send({ Data: response.data });
//     }
//   }
//   catch (error) {
//     return res.status(500).send({ zoho_code: error.response.data.code, code: 500, message: error.response.data.message });
//   }
// }

// exports.expense_zoho = async (req, res) => {
//   console.log("-----",req.body)
//   var data = await zohoSecretKey.findOne({})
//   // console.log("data", data)
//   var apiKey = data.access_token;
//   // console.log(req.body.customer_id)

//   try {
//     var options = {
//       url: `https://www.zohoapis.com/books/v3/invoices?organization_id=812475416`,
//       method: "post",
//       data: [req.body],
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json"
//       },
//     };

//     var response = await axios.request(options);
//     // console.log("==========>",response.data.contacts[0])
//     // if(!response.data.contacts[0].contact_id){
//     //   return res. status(400).send({message:'Data already exists in zoho',code:400});
//     // }
    
//     let maindata = response.data.invoices
//     console.log('kkkkkkkk', maindata[0])

//     const leadmanagementdata = await leadmanagement.findOne({
//       where: { br_number: req.body.br_number }
//     })
   
//     console.log("++++++++++++++++",req.body.category)
//     if(leadmanagementdata){
//       var createData = await expense_zoho_data.create({
//         // wo_verified_on: line_items[0].wo_verified_on,
//         // wo_verify_by: line_items[0].wo_verify_by,
//         // wo_verification_status: line_items[0].wo_verification_status ,
//         // gst_number:line_items[0].gst_number,
//         // br_number:line_items[0].br_number,
//         // workOrder_no:line_items[0].workOrder_no ,
//         // Mob_number: line_items[0].Mob_number,
//         // associated_company: line_items[0].associated_company,
//         // street_address:maindata[0].shipping_address.street ,
//         // address2:maindata[0].billing_address.address ,
//         invoiceId: maindata[0].invoice_id,
//         customer_id: maindata[0].customer_id,
//         email_copy: maindata[0].email,
//         audit_start_date: maindata[0].date,
//         audit_end_date: maindata[0].due_date,
//         ICT_Date: maindata[0].last_reminder_sent_date,
//         creditDay: maindata[0].credits_applied,
//         first_name: maindata[0].line_items[0].name,
//         last_name: maindata[0].line_items[0].account_name,
//         company_logo_cost: maindata[0].line_items[0].cost_amount,
//         payment_terms: maindata[0].payment_terms,
//         br_number: leadmanagement.br_number,
//         category:req.body.category,
//         IRN: leadmanagementdata.lead_genration_id,
//         ack_no: leadmanagementdata.lead_genration_id,
//         ack_date: leadmanagementdata.lead_created_date,
//         duning_details: req.body.duning_details,
//         status: req.body.status,
//         contact_name: req.body.contact_name
//         //expense
//         // expense_report_no: req.body.expense_report_no,
//         // associated_company: req.body.associated_company,
//         // expense_type: req.body.expense_type,
//         // expense_name: req.body.expense_name,
//         // expense_desc: req.body.expense_desc,
//         // finalAmount:  req.body.finalAmount,
//         // task_order: req.body.task_order ,
//         // travel_tickets: req.body.travel_tickets,
//         // expense_requestId: req.body.expense_requestId,
//         // expense_details: req.body.expense_details,
//         // total_amount:req.body.total_amount,

//         // //vendor
//         // vendor_management_id: req.body.vendor_management_id,
//         // vendor_name: req.body.vendor_name,
//         // account_type: req.body.account_type,
//         // bank_account_number: req.body.bank_account_number,
//         // bank_address: req.body.bank_address,
//         // branch:  req.body.branch,
//         // contact_number: req.body.contact_number,

//       });
//       return res.send({ Data: createData, message: "invoice create successfully!" });
//     }
//     else{
//       var createData = await expense_zoho_data.create({
//         // wo_verified_on: line_items[0].wo_verified_on,
//         // wo_verify_by: line_items[0].wo_verify_by,
//         // wo_verification_status: line_items[0].wo_verification_status ,
//         // gst_number:line_items[0].gst_number,
//         // br_number:line_items[0].br_number,
//         // workOrder_no:line_items[0].workOrder_no ,
//         // Mob_number: line_items[0].Mob_number,
//         // associated_company: line_items[0].associated_company,
//         // street_address:maindata[0].shipping_address.street ,
//         // address2:maindata[0].billing_address.address ,
//         invoiceId: maindata[0].invoice_id,
//         customer_id: maindata[0].customer_id,
//         email_copy: maindata[0].email,
//         audit_start_date: maindata[0].date,
//         audit_end_date: maindata[0].due_date,
//         ICT_Date: maindata[0].last_reminder_sent_date,
//         creditDay: maindata[0].credits_applied,
//         first_name: maindata[0].line_items[0].name,
//         last_name: maindata[0].line_items[0].account_name,
//         company_logo_cost: maindata[0].line_items[0].cost_amount,
//         payment_terms: maindata[0].payment_terms,
//         br_number: req.body.br_number,
//         category: req.body.category,
//         IRN: req.body.IRN,
//         ack_no: req.body.ack_no,
//         ack_date: req.body.ack_date,
//         duning_details: req.body.duning_details,
//         status: req.body.status,
//         manual_invoice_id:req.body.manual_invoice_id

//         //expense
//         // expense_report_no: req.body.expense_report_no,
//         // associated_company: req.body.associated_company,
//         // expense_type: req.body.expense_type,
//         // expense_name: req.body.expense_name,
//         // expense_desc: req.body.expense_desc,
//         // finalAmount:  req.body.finalAmount,
//         // task_order: req.body.task_order ,
//         // travel_tickets: req.body.travel_tickets,
//         // expense_requestId: req.body.expense_requestId,
//         // expense_details: req.body.expense_details,
//         // total_amount:req.body.total_amount,

//         // //vendor
//         // vendor_management_id: req.body.vendor_management_id,
//         // vendor_name: req.body.vendor_name,
//         // account_type: req.body.account_type,
//         // bank_account_number: req.body.bank_account_number,
//         // bank_address: req.body.bank_address,
//         // branch:  req.body.branch,
//         // contact_number: req.body.contact_number,

//       });
//       console.log(JSON.stringify(createData))
//       return res.send({ Data: createData, message: "invoice create successfully!" });
//     }
//       // console.log("createData", createData)
      
    
//   }
//   catch (error) {
//     console.log("errror", error)
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }

// exports.getAllExpenseData = async (req, res) => {
//   try {
//     const NewArray = []
//     const data = await expense_zoho_data.findAll({})
//     console.log("data", data)
//     if (data) {
//       // for(var i=0; i<data.length; i++){
//       //   var obj={
//       //     customer_id: data[i].customer_id,
//       //     contact_id: data[i].line_items[0].contact_id,
//       //     contact_name: data[i].line_items[0].contact_name,
//       //     expense_desc : data[i].line_items[0].expense_desc,
//       //     expense_type : data[i].line_items[0].expense_type,
//       //     opening_balance_amount : data[i].line_items[0].opening_balance_amount,
//       //     task_order:data[i].line_items[0].task_order,
//       //   } 
//       //   NewArray.push(obj)
//       // }

//       return res.status(200).send({ code: 200, message: "all data listed successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.getAllExpenseDetails = async (req, res) => {
//   const expense_zoho_data_id = req.params.expense_zoho_data_id
//   try {
//     const data = await expense_zoho_data.findOne({ where: { 
//       expense_zoho_data_id: expense_zoho_data_id ,
//       status: "Invoice"
//     } })
//     console.log("==========>", data)
//     if (data) {
//       return res.status(200).send({ code: 200, message: "all data details successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }



// exports.getallContactList = async (req, res) => {
//   try {
//     const contactdata = await expenseInvoiceZoho.findAll()
//     console.log("contactdata", contactdata)
//     return res.status(200).send({ message: "data get successfully!", data: contactdata })

//   }
//   catch (err) {
//     console.log(err.message)
//     return res.status(403).send({ message: "error ", error: err.message })
//   }
// }



// exports.CustomerDetails = async (req, res) => {
//   let AllData = await expenseInvoiceZoho.sequelize.query(
//     `SELECT * FROM expense_invoice_zohos ORDER BY id DESC LIMIT 1`, {
//     type: expenseInvoiceZoho.sequelize.QueryTypes.SELECT
//   })
//   console.log("AllData...", AllData)
//   return res.send({data: AllData, message: "get all data successfully!"})
// }



// exports.newAllExpenseData = async (req, res) => {
//   try {
//     const data = await expense_zoho_data.findAll({where: { status: "expense"} })
//     console.log("data", data)
//     if (data) {
//       return res.status(200).send({ code: 200, message: "all data listed successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.newExpenseDetails = async (req, res) => {
//   const expense_zoho_data_id = req.params.expense_zoho_data_id
//   try {
//     const data = await expense_zoho_data.findOne({ where: { expense_zoho_data_id: expense_zoho_data_id, status: "expense" } })
//     console.log("data", data)
//     if (data) {
//       return res.status(200).send({ code: 200, message: "all data details successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.createAccount = async (req, res) => {
//   var data = await zohoSecretKey.findOne({})
//   console.log("data", data)
//   var apiKey = data.access_token;
//   console.log(req.body.customer_id)

//   try {
//     var options = {
//       url: `https://www.zohoapis.com/books/v3/chartofaccounts?organization_id=812475416`,
//       method: "post",
//       data: [req.body],
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json"
//       },
//     };
    

//     var response = await axios.request(options);
//     let maindata = response.data.invoices
//     console.log('kkkkkkkk', maindata[0])

//     const leadmanagementdata = await leadmanagement.findOne({
//       where: { br_number: req.body.br_number }
//     })

//     if (leadmanagementdata) {
//       var createData = await expense_zoho_data.create({
//         audit_end_date: maindata[0].due_date,
//         ICT_Date: maindata[0].last_reminder_sent_date,
//         creditDay: maindata[0].credits_applied,
//         first_name: maindata[0].line_items[0].name,
//         last_name: maindata[0].line_items[0].account_name,
//         company_logo_cost: maindata[0].line_items[0].cost_amount,
//         payment_terms: maindata[0].payment_terms,
//         br_number: leadmanagementdata.br_number,
//         category: req.body.category,
//         IRN: leadmanagementdata.lead_genration_id,
//         ack_no: leadmanagementdata.lead_genration_id,
//         ack_date: leadmanagementdata.lead_created_date,
//         duning_details: req.body.duning_details
//       });

//       console.log("createData", createData)
//       return res.send({ Data: createData, message: "invoice create successfully!" });
//     }
//     else{
//       return res.send({ message: "Br not found!" });

//     }
//   }
//   catch (error) {
//     console.log("errror", error)
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }

// exports.newExpenseZoho = async (req, res) => {
//   var data = await zohoSecretKey.findOne({})
//   console.log("data", data)
//   var apiKey = data.access_token;
//   console.log(req.body.customer_id)

//   try {
//     var options = {
//       url: `https://www.zohoapis.com/books/v3/invoices?organization_id=812475416`,
//       method: "post",
//       data: [req.body],
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json"
//       },
//     };

//     var response = await axios.request(options);
//     // if(!response.data.contacts[0].contact_id){
//     //   return res. status(500).send({message:'Data already exists in zoho',code:400});
//     // }

//     let maindata = response.data.invoices
//     console.log('kkkkkkkk', maindata[0])

//     const leadmanagementdata = await leadmanagement.findOne({
//       where: { br_number: req.body.br_number }
//     })

//     if (leadmanagementdata) {
//       var createData = await expense_zoho_data.create({
//         invoiceId: maindata[0].invoice_id,
//         customer_id: maindata[0].customer_id,
//         email_copy: maindata[0].email,
//         audit_start_date: maindata[0].date,
//         audit_end_date: maindata[0].due_date,
//         ICT_Date: maindata[0].last_reminder_sent_date,
//         creditDay: maindata[0].credits_applied,
//         first_name: maindata[0].line_items[0].name,
//         last_name: maindata[0].line_items[0].account_name,
//         company_logo_cost: maindata[0].line_items[0].cost_amount,
//         payment_terms: maindata[0].payment_terms,
//         br_number: leadmanagementdata.br_number,
//         category: req.body.category,
//         IRN: leadmanagementdata.lead_genration_id,
//         ack_no: leadmanagementdata.lead_genration_id,
//         ack_date: leadmanagementdata.lead_created_date,
//         duning_details: req.body.duning_details,
//         status: req.body.status,
//         //expense
//         lead_genration_id: leadmanagementdata.lead_genration_id,
//         expense_report_no: req.body.expense_report_no,
//         associated_company: req.body.associated_company,
//         expense_type: req.body.expense_type,
//         expense_name: req.body.expense_name,
//         expense_desc: req.body.expense_desc,
//         finalAmount:  req.body.finalAmount,
//         task_order: req.body.task_order ,
//         travel_tickets: req.body.travel_tickets,
//         expense_requestId: req.body.expense_requestId,
//         expense_details: req.body.expense_details,
//         total_amount:req.body.total_amount
//       });
//       console.log("createData", createData)
//       return res.send({ Data: createData, message: "invoice create successfully!" });
//     }
//     else{
//       return res.send({ message: "Br not found!" });
//     }
//   }
//   catch (error) {
//     console.log("errror", error)
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }

// //vendor data
// exports.getAllVendorList = async (req, res) => {
//   try {
//     const data = await expense_zoho_data.findAll({where: { status: "vendor"} })
//     console.log("data", data)
//     if (data) {
//       return res.status(200).send({ code: 200, message: "all data listed successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.newVendorDetails = async (req, res) => {
//   const vendor_id = req.params.vendor_id
//   try {
//     const data = await expense_zoho_data.findOne({ where: { expense_zoho_data_id: vendor_id, status: "vendor" } })
//     console.log("data", data)
//     if (data) {
//       return res.status(200).send({ code: 200, message: "all data details successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.createVendor = async (req, res) => {
//   var data = await zohoSecretKey.findOne({})
//   console.log("data", data)
//   var apiKey = data.access_token;
//   console.log(req.body.customer_id)

//   try {
//     var options = {
//       url: `https://www.zohoapis.com/books/v3/invoices?organization_id=812475416`,
//       method: "post",
//       data: [req.body],
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json"
//       },
//     };
//     var response = await axios.request(options);
//     let maindata = response.data.invoices
//     console.log('kkkkkkkk', maindata[0])

//     const leadmanagementdata = await leadmanagement.findOne({
//       where: { br_number: req.body.br_number }
//     })

//     if (leadmanagementdata) {
//       var createData = await expense_zoho_data.create({
//         invoiceId: maindata[0].invoice_id,
//         customer_id: maindata[0].customer_id,
//         email_copy: maindata[0].email,
//         audit_start_date: maindata[0].date,
//         audit_end_date: maindata[0].due_date,
//         ICT_Date: maindata[0].last_reminder_sent_date,
//         creditDay: maindata[0].credits_applied,
//         first_name: maindata[0].line_items[0].name,
//         last_name: maindata[0].line_items[0].account_name,
//         company_logo_cost: maindata[0].line_items[0].cost_amount,
//         payment_terms: maindata[0].payment_terms,
//         br_number: leadmanagementdata.br_number,
//         category: req.body.category,
//         IRN: leadmanagementdata.lead_genration_id,
//         ack_no: leadmanagementdata.lead_genration_id,
//         ack_date: leadmanagementdata.lead_created_date,
//         duning_details: req.body.duning_details,
//         status: req.body.status,
//         //vendor
//         vendor_management_id: req.body.vendor_management_id,
//         vendor_name: req.body.vendor_name,
//         account_type: req.body.account_type,
//         bank_account_number: req.body.bank_account_number,
//         bank_address: req.body.bank_address,
//         branch:  req.body.branch,
//         contact_number: req.body.contact_number,
//       });
//       console.log("createData", createData)
//       return res.send({ Data: createData, message: "invoice create successfully!" });
//     }
//     else{
//       return res.send({ message: "Br not found!" });
//     }
//   }
//   catch (error) {
//     console.log("errror", error)
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.allChanelPartner = async (req, res) => {
//   try {
//     const data = await expense_zoho_data.findAll({where: { status: "channel_partner"} })
//     console.log("data", data)
//     if (data) {
//       return res.status(200).send({ code: 200, message: "all data listed successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.getChanelpartnerDetails = async (req, res) => {
//   const vendor_id = req.params.vendor_id
//   try {
//     const data = await expense_zoho_data.findOne({ where: { expense_zoho_data_id: vendor_id, status: "channel_partner" } })
//     console.log("data", data)
//     if (data) {
//       return res.status(200).send({ code: 200, message: "all data details successfully", data: data })
//     }
//     else {
//       return res.status(404).send({ code: 404, message: "no data listed" })
//     }
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


// exports.createChannelParnerzoho = async (req, res) => {
//   var data = await zohoSecretKey.findOne({})
//   console.log("data", data)
//   var apiKey = data.access_token;
//   console.log(req.body.customer_id)

//   try {
//     var options = {
//       url: `https://www.zohoapis.com/books/v3/invoices?organization_id=812475416`,
//       method: "post",
//       data: [req.body],
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json"
//       },
//     };
//     var response = await axios.request(options);
//     let maindata = response.data.invoices
//     console.log('kkkkkkkk', maindata[0])

//     const leadmanagementdata = await leadmanagement.findOne({
//       where: { br_number: req.body.br_number }
//     })

//     if (leadmanagementdata) {
//       var createData = await expense_zoho_data.create({
//         invoiceId: maindata[0].invoice_id,
//         customer_id: maindata[0].customer_id,
//         email_copy: maindata[0].email,
//         audit_start_date: maindata[0].date,
//         audit_end_date: maindata[0].due_date,
//         ICT_Date: maindata[0].last_reminder_sent_date,
//         creditDay: maindata[0].credits_applied,
//         first_name: maindata[0].line_items[0].name,
//         last_name: maindata[0].line_items[0].account_name,
//         company_logo_cost: maindata[0].line_items[0].cost_amount,
//         payment_terms: maindata[0].payment_terms,
//         br_number: leadmanagementdata.br_number,
//         category: req.body.category,
//         IRN: leadmanagementdata.lead_genration_id,
//         ack_no: leadmanagementdata.lead_genration_id,
//         ack_date: leadmanagementdata.lead_created_date,
//         duning_details: req.body.duning_details,
//         status: req.body.status,

//         //chanel chanel partner
//         cp_name: req.body.cp_name,
//         certificate_type: req.body.certificate_type,
//         s1_wo: req.body.s1_wo,
//         s2_wo: req.body.s2_wo,
//         service_type: req.body.service_type,
//         product: req.body.product,
//         MSME_number: req.body.MSME_number,
//         assessment_fee: req.body.assessment_fee,
//         delivered_month: req.body.delivered_month,
//         SP_name: req.body.SP_name,
//         requested_incentive: req.body.requested_incentive,
//         special_incentive_amount: req.body.special_incentive_amount,
//         agreed_incentive: req.body.agreed_incentive,
//         invoice_number: req.body.invoice_number,
//         invoice_date: req.body.invoice_date,
//         invoice_submitted_by_CP: req.body.invoice_submitted_by_CP,
//         remarks: req.body.remarks,
//         comments: req.body.comments
//       });
//       console.log("createData", createData)
//       return res.send({ Data: createData, message: "invoice create successfully!" });
//     }
//     else{
//       return res.send({ message: "Br not found!" });
//     }
//   }
//   catch (error) {
//     console.log("errror", error)
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   }
// }


