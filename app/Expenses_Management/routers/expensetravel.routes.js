const travelcontroller = require("../controllers/expence_travelController");
const expenseController = require("../controllers/expense_detailControl");
const myexpenseController = require("../controllers/myexpense_controller");
const TravelTicketController = require("../controllers/travel_ticket");
const { expense_request } = require("../../middleware/expense_request_doc")
const {upload} = require ('../../middleware/attach_ticket_invoice')

module.exports = function(app) {

  //travel expenses
  app.post("/api/v1/createtravelRequest", expense_request.single("expense_approval"), travelcontroller.ExpenseRequest);
  app.post("/api/v1/createexpensechild", travelcontroller.Expensechild);
  app.put("/api/v1/update_ExpenseRequest/:id",travelcontroller.update_ExpenseRequest);
  app.get("/api/v1/travelrequestlist", travelcontroller.travelRequestlist);
  app.get("/api/v1/getbytravelrequest/:expense_id", travelcontroller.getbyTravelRequest);
  app.get("/api/v1/travelrequestdraftlist", travelcontroller.travelRequestDraftList);


  app.get("/api/v1/getExpenseAll_User/:id", travelcontroller.getExpenseAll_User);
  app.get("/api/v1/getExpenseAll_Agent/:id", travelcontroller.getExpenseAll_Agent);
  app.get("/api/v1/getExpenseAll_Manager/:id", travelcontroller.getExpenseAll_Manager);
  // getAllCancelTicket
  app.get("/api/v1/getAllCancelTicket/:id", travelcontroller.getAllCancelTicket);

  app.get("/api/v1/getbyTravelRequestchild/:expense_id", travelcontroller.getbyTravelRequestchild);
  app.get("/api/v1/getbyTravelRequestchild_details/:expense_id/:expensechildId", travelcontroller.getbyTravelRequestchildDetails);
  app.put("/api/v1/update_Onboarding_Travel_Request/:id", expense_request.single("upload_onbording"), travelcontroller.update_Onboarding_Travel_Request);
  app.get("/api/v1/getOnboarding_Travel_RequestByexpense_id/:expense_id",  travelcontroller.getOnboarding_Travel_RequestByexpense_id);


  app.put("/api/v1/updatetravelrequest/:expense_id", upload.fields([{ name: 'attach_ticket', maxCount: 1 }, {name: 'attach_approval'}]) , travelcontroller.updateTravelRequest);
  app.put("/api/v1/updatetravelrequest_new/:expense_id", travelcontroller.updateTravelRequestNew);


  //expense details
  app.post("/api/v1/createexpensedetails", expense_request.single("attachedBill"), expenseController.CreateExpenseDetail);
  app.get("/api/v1/expensedetailslist", expenseController.ExpenseDetaillist);
  app.get("/api/v1/getbyexpensedetails/:expense_id", expenseController.getbyExpenseDetail);
  app.get("/api/v1/getbyexpensedetailsbyid/:expense_id", expenseController.getbyExpenseDetailId);
  app.put("/api/v1/updateexpensedetails/:expense_id", expense_request.single("attach_bill"), expenseController.updateExpenseDetail);
  app.post("/api/v1/createexpensedetailsShallocopy", expense_request.single("attach_bill"), expenseController.createExpenseDetailsShallocopy);
  app.put("/api/v1/edit_exp_detail_verifier/:exp_detail_id",expenseController.edit_exp_detail_verifier);
  app.post("/api/v1/createmyexpenses", expense_request.single("attach_bill"), myexpenseController.CreateMyExpense);
  app.get("/api/v1/myExpenselist_lastone", myexpenseController.myExpenselist_lastone);
  app.get("/api/v1/myexpenseslist/:role_id", myexpenseController.myExpenselist);
  app.get("/api/v1/myexpensesdraft", myexpenseController.myExpenseDraftlist);
  app.post("/api/v1/myexpenseslist_date_filter/:role_id", myexpenseController.myExpenselistDateFilter);
  app.get("/api/v1/getbymyexpenses/:myexpense_id",  myexpenseController.getbyMyExpenses);
  app.put("/api/v1/updatemyexpenses/:myexpense_id", expense_request.single("attach_bill"), myexpenseController.updateMyExpenses);
  app.get("/api/v1/getmyexpensespending", myexpenseController.getAllMyexpensesPending);
  app.get("/api/v1/getmyexpensesrejected", myexpenseController.getAllMyexpensesRejected);
  app.get("/api/v1/getmyexpensesapproved", myexpenseController.getAllMyexpensesApproved);
  app.get("/api/v1/getallmyexpensespaid", myexpenseController.getAllMyexpensesPaid);
  app.get("/api/v1/getAllMyexpenses_Paid_withupdate", myexpenseController.getAllMyexpenses_Paid_withupdate);  
  app.get("/api/v1/getallmyexpensesmanageapproval", myexpenseController.getAllMyexpensesManageApproval);
  app.get("/api/v1/getAllMyexpensesProcessing", myexpenseController.getAllMyexpensesProcessing);
  app.get("/api/v1/getmyexpensesconfirmticket", myexpenseController.getAllMyexpensesConfirmTicket);
  app.get("/api/v1/getallbyidMyExpenses/:myexpense_id", myexpenseController.getallbyidMyExpenses);
  app.get("/api/v1/myExpenselistProcessing", myexpenseController.myExpenselistProcessing);
  app.get("/api/v1/myExpenselistPosted", myexpenseController.myExpenselistPosted);
  app.get("/api/v1/myExpenselistOpen", myexpenseController.myExpenselistOpen);
  app.get("/api/v1/getAllMyexpensesPaid_BYEXPID/:myexpense_id", myexpenseController.getAllMyexpensesPaid_BYEXPID);
  app.delete("/api/v1/delete_exp_detail/:exp_detail_id",expenseController.delete_exp_detail);
  app.get("/api/v1/myExpenselistdraft", myexpenseController.myExpenselistdraft);


  //travel_ticket
   app.post("/api/v1/createtravelticket",  TravelTicketController.CreateTravelTicket);
   app.get("/api/v1/travelticketlist/:employee_id/:expenseId", TravelTicketController.TravelTicketlist);
   app.get("/api/v1/travelticketlist_info/:employee_id/:expenseId/:ticketId", TravelTicketController.TravelTicketlistInfo);
   app.get("/api/v1/travelticketlist_detail/:employee_id", TravelTicketController.TravelTicketlistDetail);
   app.get("/api/v1/TravelTicketlistDetail_Inactive/:employee_id", TravelTicketController.TravelTicketlistDetail_Inactive);
   app.get("/api/v1/TravelTicketlistDetail_active/:employee_id", TravelTicketController.TravelTicketlistDetail_active);
   app.put("/api/v1/update_expense_status_TravelTicket/:ticket_id", TravelTicketController.update_expense_status_TravelTicket);     
   app.get("/api/v1/TravelTicketlistBYEMP_TCKT/:employee_id", TravelTicketController.TravelTicketlistBYEMP_TCKT);
   app.get("/api/v1/getbytravelticket",  TravelTicketController.getbyTravelTicket);
   app.get("/api/v1/getbyTravelTicketcancel",  TravelTicketController.getbyTravelTicketcancel);
   app.get("/api/v1/travelticketlist_status/:employee_id/:expenseId", TravelTicketController.TravelTicketlistStatus);
   app.get("/api/v1/travelticketcancellist_status/:select_agent/:expenseId", TravelTicketController.TravelTicketlistCancelStatus);
   app.get("/api/v1/TravelTicketlistbyidfile/:employee_id/:expenseId", TravelTicketController.TravelTicketlistbyidfile);
   app.get("/api/v1/travelticketcancellist/:select_agent/:expenseId", TravelTicketController.travelticketcancellist);
   app.get("/api/v1/travelticketcancellist_data/:select_agent/:expenseId", TravelTicketController.travelticketcancellist_copy_data);

   //downoad routes for api 

   app.get("/api/v1/download_Document_attach_invoice/:fileName", TravelTicketController.download_Document_attach_invoice)
   app.get("/api/v1/download_Document_Invoice/:fileName", TravelTicketController.download_Document_Invoice)
   app.get("/api/v1/download_Document_upload_onbording/:fileName", TravelTicketController.download_Document_upload_onbording)
    
  //  getbyTravelTicketcancel
   app.put("/api/v1/updatetravelticketdetails/:ticket_id",  TravelTicketController.updatetravelticketdetails);
   app.put("/api/v1/updatetravelticketdetails_status/:userId/:ticket_id",  TravelTicketController.updatetravelticketdetailsStatus);
   app.get("/api/v1/getbytravelticketbyid/:ticket_id",TravelTicketController.getbyTravelTicketId)
   app.get("/api/v1/getbytravelticketcancelledbyid/:ticket_id",TravelTicketController.getbytravelticketcancelledbyid)
   app.put("/api/v1/updatetravelticket/:ticket_id",  upload.fields([{ name: 'attach_ticket', maxCount: 1 }, { name: 'attach_invoice', maxCount: 1 }]),  TravelTicketController.updateTravelTicket);
   app.put("/api/v1/updatestatustravelticket/:ticket_id",  upload.fields([{ name: 'attach_ticket', maxCount: 1 }, { name: 'attach_invoice', maxCount: 1 }]),  TravelTicketController.updatestatustravelticket);
   app.post("/api/v1/createtravelticketcopy",  TravelTicketController.CreateTravelTicketCopy);

  }




