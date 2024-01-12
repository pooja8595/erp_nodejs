const config = require("../config/db.config.js");
const Sequelize = require("sequelize");


const {fieldType,productName,crmModule} = require("../CRM/MasterData/models/index");
const createLead = require('../CRM/CreateLead/model/createLead');
const createDescription = require('../CRM/CreateLead/model/description.js');
const {leadFormSetup,fieldValue} = require('../CRM/LeadFormSetup/model/index.js')
const leadSummary = require('../CRM/LeadSummary/model/leadSummary.js');
const assignUser= require('../CRM/AssignUser/model/assignUser.js');
const assignEmployee = require('../CRM/AssignUser/model/assignEmployee.js');
const proposalData = require('../CRM/CreateProposal/model/createProposal.js');
const proposalList = require('../CRM/CreateProposal/model/proposalList.js');
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.models = {
  fieldType:fieldType(sequelize,Sequelize),
  leadFormSetup: leadFormSetup(sequelize, Sequelize),
  productName: productName(sequelize,Sequelize),
  createLead:createLead(sequelize,Sequelize),
  crmModule:crmModule(sequelize,Sequelize),
  fieldValue: fieldValue(sequelize,Sequelize),
  createDescription: createDescription(sequelize,Sequelize),
  leadSummary: leadSummary(sequelize,Sequelize),
  assignUser: assignUser(sequelize,Sequelize),
  assignEmployee: assignEmployee(sequelize,Sequelize),
  proposalData: proposalData(sequelize,Sequelize),
  proposalList: proposalList(sequelize,Sequelize),
};


db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role/role.model")(sequelize, Sequelize);
db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.countryss = require('../location_mapping/country/model/country.model')(sequelize, Sequelize);
db.employmenttype = require("./employment.model")(sequelize, Sequelize);
db.sbu = require("./sbu.model")(sequelize, Sequelize);
db.rolemaster = require("./rolemaster.model")(sequelize, Sequelize);
db.grade = require("./grade.model")(sequelize, Sequelize);
db.statesmaster = require("./statesmaster.model")(sequelize, Sequelize);
db.states = require('../location_mapping/states/models/states_models')(sequelize, Sequelize);
db.city = require('../location_mapping/city/models/city_models')(sequelize, Sequelize);
db.pincode = require('../location_mapping/pincode/models/pincode_models')(sequelize, Sequelize);
db.officeLocation = require("./officeLocation.model.js")(sequelize, Sequelize);
db.segment = require("../master/segment/model/segment.model.js")(sequelize, Sequelize);
db.maritalStatus = require("./maritalStatus.model.js")(sequelize, Sequelize);
db.salaryDetails = require("./salaryDetails.model.js")(sequelize, Sequelize);
db.empFamilyDetails = require("./employee_family_detail.model.js")(sequelize, Sequelize);
db.prevEmpDetail = require("./previous_employer_details.model.js")(sequelize, Sequelize);
db.empBankDetail = require('./empBankDetails.model.js')(sequelize, Sequelize);
db.empDocumentDetail = require('./empDocumentDetails.model.js')(sequelize, Sequelize);
db.empDocumentsChild = require('./emp_AddDocumentDetails.model')(sequelize, Sequelize);
db.grievance = require("./grievance.model")(sequelize, Sequelize);
db.helpDesk = require("./helpdesk.model")(sequelize, Sequelize);
db.complaint = require("./complaint.model")(sequelize, Sequelize);
db.leaveTypes = require("./leaveTypes.model")(sequelize, Sequelize);
db.leaveTypesMaster = require("./leaveMaster.model")(sequelize, Sequelize);
db.employeeResignation = require("./employeeResignation.model")(sequelize, Sequelize);
db.jobDescription = require("./postVacancy.model")(sequelize, Sequelize);
db.candidateProfile = require("./candidateProfile.model")(sequelize, Sequelize);
db.candidateVerification = require('./candidateVerification/candidateVerification.model')(sequelize, Sequelize);
db.leaveShow = require("./leaveShow")(sequelize, Sequelize);
db.timeSheet = require('./timeSheet/timeSheet.model.js')(sequelize, Sequelize);
db.achievement = require('./achievement/achievement.model')(sequelize, Sequelize);
db.announcement = require('./announcement/announce.model')(sequelize, Sequelize);
db.jobTitles = require("./jobTitles.model.js")(sequelize, Sequelize);
db.verticals = require("./verticals.model.js")(sequelize, Sequelize);
db.tableName = require("./testTable.model.js")(sequelize, Sequelize);
db.bankName = require("./bankName.model")(sequelize, Sequelize);
db.scheduleFixedInterview = require("./scheduleFixedInterview")(sequelize, Sequelize);
db.ZohoToken = require("../Zoho/models/zohoModel.js")(sequelize, Sequelize);
db.zohoSecretKey = require("../Zoho/models/zohoSecretModel.js")(sequelize, Sequelize);
db.expenseInvoiceZoho = require("../Zoho/models/expenseInvoiceZoho.js")(sequelize, Sequelize);
db.lms_notification_history = require('../LMS/Author/models/lms_notification_history.model.js')(sequelize, Sequelize);
db.tableName = require("./testTable.model.js")(sequelize, Sequelize);
db.myPendingTask = require("../My_Pending_Task/models/my_pending_task.model")(sequelize, Sequelize);
db.documentMaster = require("../document_master/documentmaster.model.js")(sequelize, Sequelize);
db.sales_request = require("../sales_request/model/sales_request_model")(sequelize, Sequelize);
db.notification_sales_request = require("../sales_request/model/notification_sales_model")(sequelize, Sequelize);
db.role_master = require("../role_back/role_master/model/roleMaster.model")(sequelize, Sequelize);
db.menu_master = require("../role_back/menu_master/model/menuMaster.model")(sequelize, Sequelize);
db.role_menu_access = require("../role_back/role_menu_access/model/roleMenuAccess.model")(sequelize, Sequelize);
db.role_module_master = require("../role_back/role_module_master/model/role_module_master.model.js")(sequelize, Sequelize);
db.submenu_master = require("../role_back/submenu_master/model/submenuMaster.model")(sequelize, Sequelize);
db.department = require('../master/department/model/department')(sequelize, Sequelize);
db.designation = require('../master/designation/model/designation')(sequelize, Sequelize);
db.stage = require("../Stage/models/stage.models")(sequelize, Sequelize);
db.multipleSite = require("../Multiple_Site/models/multipleSite.models")(sequelize, Sequelize);
db.new_region = require("../master/new_region/model/new_region.model.js")(sequelize, Sequelize);
db.new_spa = require("../master/new_spa/model/new_spa.model.js")(sequelize, Sequelize);
db.new_regional_business_head = require("../master/new_regional_business_head/model/new_regional_business_head.model.js")(sequelize, Sequelize);
db.customer_type = require("../master/customer_type/model/customer_type.model.js")(sequelize, Sequelize);
db.traning_name = require("../master/traning_name/model/traning_name.model.js")(sequelize, Sequelize);
db.expenseforCopy = require("../master/expenseforCopy/model/expenseforCopy.model.js")(sequelize, Sequelize);
db.director = require("../master/director/model/director.model.js")(sequelize, Sequelize);
// product to price mappings

db.verifier_status = require("../master/verifier_status/model/verifier_status.model.js")(sequelize, Sequelize);
db.author = require("../LMS/Author/models/author.models")(sequelize, Sequelize);
db.newUser = require("../LMS/New_User/models/new_user.model")(sequelize, Sequelize);
db.newTraning = require("../LMS/New_Traning/models/new_traning.model")(sequelize, Sequelize);
db.newRequestCourse = require("../LMS/New_Traning/models/requested_course_model.js")(sequelize, Sequelize);
db.addUser = require("../LMS/add_new_user/model/add_user_model")(sequelize, Sequelize);
db.questionaries = require("../LMS/custom_assessment_mcq/model/questionaries_model")(sequelize, Sequelize);
db.addUserCourse = require("../LMS/add_new_user/model/add_User_Course.model")(sequelize, Sequelize);
db.option = require("../LMS/custom_assessment_mcq/model/options_model.js")(sequelize, Sequelize);
db.newAssesment = require("../LMS/New_Assesment/models/new_assesment_model")(sequelize, Sequelize);
db.custom_assesment = require("../LMS/custom_assessment/model/custom_assessment")(sequelize, Sequelize);
db.answer_custom_assesment = require("../LMS/answer_custom_assessment/model/answer_custom_assessment")(sequelize, Sequelize);
db.newContent = require("../LMS/New_Content/models/new_content.model")(sequelize, Sequelize);
db.newContent2 = require("../LMS/New_Content/models/new_content2.model.js")(sequelize, Sequelize);
db.custom_assesment_mcq = require("../LMS/custom_assessment_mcq/model/custom_assessment_mcq")(sequelize, Sequelize);
db.upcomming_course = require("../LMS/Upcomming_Course/models/upcomming_course.models")(sequelize, Sequelize);
db.newUserTraning = require("../LMS/New_Traning/models/new_traning")(sequelize, Sequelize);
db.itTicketing = require("../IT_ticketing/model/IT_ticketingModel")(sequelize, Sequelize);
db.itTicketing_pending_task = require("../IT_ticketing/model/it_ticketing_pending_task")(sequelize, Sequelize);
db.dqsgroupMaster = require('../DQS_Group_Master/model/DQS_Group_Master.model')(sequelize, Sequelize);
db.myPendingTaskDetails = require('../LMS/My_Pending_Task/models/my_pending_task_model.js')(sequelize, Sequelize);
db.expenserequest = require('../Expenses_Management/models/expense_travel.js')(sequelize, Sequelize);
db.expensedetails = require('../Expenses_Management/models/expense_details.js')(sequelize, Sequelize);
db.expensedetailscopy = require('../Expenses_Management/models/expense_details_copy.js')(sequelize, Sequelize);
db.myexpenses = require('../Expenses_Management/models/my_expenses.js')(sequelize, Sequelize);
db.travelticket = require('../Expenses_Management/models/travel_ticket.js')(sequelize, Sequelize);
db.expensechild = require("../Expenses_Management/models/expensechild.js")(sequelize, Sequelize);
db.travelticketcopy = require('../Expenses_Management/models/travelticket_copy.js')(sequelize, Sequelize);
db.no_of_attempt = require('../LMS/New_Traning/models/no_of_attempt.js')(sequelize, Sequelize);
db.lms_number_of_attemptData = require('../LMS/custom_assessment_mcq/model/questions_number_of_attemptData.js')(sequelize, Sequelize);
db.lms_optons_attemptData = require('../LMS/custom_assessment_mcq/model/options_number_of_attemptData.js')(sequelize, Sequelize);
db.lms_course_Re_assign = require('../LMS/custom_assessment_mcq/model/lms_course_Re-assign.js')(sequelize, Sequelize)
db.vendorManagement = require('../Purchase_And_Inventory/Vendor_Management/model/vendor_management.model.js')(sequelize, Sequelize);
db.bankDetails = require('../Purchase_And_Inventory/Vendor_Management/model/bank_Details.model.js')(sequelize, Sequelize);
db.dcoumentDetail = require('../Purchase_And_Inventory/Vendor_Management/model/document.model.js')(sequelize, Sequelize);
db.districtDetails = require('../Purchase_And_Inventory/Master_Vendor_management/District/model/district.model.js')(sequelize, Sequelize);
db.leavePolicyDetail = require('../Leave_Master/Leave_Master/model/leave_master.model.js')(sequelize, Sequelize);
db.holidayDetail = require('../Leave_Master/Holiday/model/holiday.model.js')(sequelize, Sequelize);
db.attendanceCalendarDetail = require('../Leave_Master/Attendance_Calendar/model/attendance_calendar.model.js')(sequelize, Sequelize);
db.channelPartner = require('../Channel_Partner/model/channel_partner_model.js')(sequelize, Sequelize);
db.Document_Channel_Partner = require('../Channel_Partner/model/document_channelpartner.js')(sequelize, Sequelize);
db.other_docs = require('../Channel_Partner/model/other_doc_model.js')(sequelize, Sequelize);
db.Create_Provision = require('../Channel_Partner/model/create_provision_model.js')(sequelize, Sequelize);
db.make_invoice = require("../account & recivable/model/account_recivable_model.js")(sequelize, Sequelize);
db.inlineInvoice = require('../account & recivable/model/invoice_inline.model.js')(sequelize, Sequelize);
db.quotation = require('../account & recivable/model/quotation.model.js')(sequelize, Sequelize);
db.procurement = require("../Purchase_And_Inventory/procurement management/model/procurement management_model.js")(sequelize, Sequelize);
db.procurement_product = require("../Purchase_And_Inventory/procurement management/model/procurement_product.js")(sequelize, Sequelize);
db.procurement_Approved_level = require("../Purchase_And_Inventory/procurement management/model/procurement_Approved_level_model.js")(sequelize, Sequelize);
db.vendor_product_details = require("../Purchase_And_Inventory/procurement management/model/vendor_product_details.js")(sequelize, Sequelize);
db.certificateDataDetail = require("../Certificate_Data/model/certificate_data.model.js")(sequelize, Sequelize);
db.Currency_Convert = require('../Currency_Convert/Model/model.js')(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize);
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize);
db.screenOnOffDetail = require("../Leave_Master/Attendance_Calendar/model/screen_on_off.model.js")(sequelize, Sequelize);
db.advancePaymentDetail = require('../PayRoll/Advance_Payment/Model/advance_payment_model.js')(sequelize, Sequelize);
db.bonusDetail = require('../PayRoll/Bonus/Model/bonus_model.js')(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize);
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize);
db.screenOnOffDetail = require("../Leave_Master/Attendance_Calendar/model/screen_on_off.model.js")(sequelize, Sequelize);
db.Sal_structure = require("../PayRoll/Salary_Structure/Model/Sal_Structure_model.js")(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize);
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize);
db.screenOnOffDetail = require("../Leave_Master/Attendance_Calendar/model/screen_on_off.model.js")(sequelize, Sequelize);
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize)
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize)
db.screenOnOffDetail = require("../Leave_Master/Attendance_Calendar/model/screen_on_off.model.js")(sequelize, Sequelize)
// db.Sal_structure = require("../PayRoll/Salary_Structure/Model/Sal_Structure_model.js")(sequelize, Sequelize)
db.Advance_Payment_Data = require('../PayRoll/Advance_Payment/Model/advance_payment_model.js')(sequelize, Sequelize)
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize)
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize)
db.screenOnOffDetail = require("../Leave_Master/Attendance_Calendar/model/screen_on_off.model.js")(sequelize, Sequelize)
db.PF_Data = require("../PayRoll/Providend_Fund/PF_Model/PF_model.js")(sequelize, Sequelize)
db.ESI_Data = require("../PayRoll/ESI/ESI_Model/Esi_Model.js")(sequelize, Sequelize)
db.screenOnOffDetail = require("../Leave_Master/Attendance_Calendar/model/screen_on_off.model.js")(sequelize, Sequelize)
db.expense_invoice = require("../account payable/Expense invoice/model/expense_invoice_model.js")(sequelize, Sequelize);
db.vendor_invoice = require("../account payable/vendor invoice/model/vendor_invoice_model.js")(sequelize, Sequelize);
db.auditor_invoice = require("../account payable/auditor invoice/model/auditor_invoice_model.js")(sequelize, Sequelize);
db.provisionDetail = require('../Channel_Partner/model/provision_details.model.js')(sequelize, Sequelize)
db.initiate_performance_appraisal = require('../PMS/Initiate Performance Appraisal/model/initiate_performance_appraisal.model.js')(sequelize, Sequelize)
db.provisionRbhApproval = require('../Channel_Partner/model/provision_RBH_Approval.model.js')(sequelize, Sequelize)
db.Courier_Inward = require('../Admin_Support/Courier_Inward/model/Courier_Inward.model.js')(sequelize, Sequelize)
db.Courier_Contains = require('../Admin_Support/Courier_Contains/model/Courier_Contains.model.js')(sequelize, Sequelize)
db.Courier_Service_name = require("../Admin_Support/Courier_Service_name/model/Courier_Service_name.model.js")(sequelize, Sequelize)
db.channelPartnerProvisionPaymentDetail = require('../Channel_Partner/model/cp_provision_payment.model.js')(sequelize, Sequelize)
db.AMC_Agreement = require('../Admin_Support/AMC_Agreement/model/AMC_Agreement.model.js')(sequelize, Sequelize)
/////
db.Onboarding_data=require("../candidate_onboarding/onboarding_model.js")(sequelize,Sequelize)
db.read_write_access = require('../role_back/role_menu_access/model/read_write_access.js')(sequelize, Sequelize)
db.key_performance_indicator = require('../PMS/Key Performance Indicator/model/key_performance_indicator..model.js')(sequelize, Sequelize)
db.previous_goal = require('../PMS/previous_goal/model/previous_goal.model.js')(sequelize, Sequelize)
db.new_goal = require('../PMS/new_goal/model/new_goal.model.js')(sequelize, Sequelize)
db.self_appraisal = require('../PMS/Self Appraisal/model/self_appraisal.model.js')(sequelize, Sequelize)
db.manager_review = require('../PMS/Manager Review/model/manager_review.model.js')(sequelize, Sequelize)
db.head_review = require('../PMS/Head Review/model/head_review.model.js')(sequelize, Sequelize)
db.hr_review = require('../PMS/Hr Review/model/hr_review.model.js')(sequelize, Sequelize)
db.AMC_AgreementOtherDoc = require('../Admin_Support/AMC_Agreement/model/AMC_Other_document.model.js')(sequelize, Sequelize)
db.Courier_Outward = require('../Admin_Support/Courier_Outward/model/Courier_Outward.model.js')(sequelize, Sequelize)
db.Rental_Aggrement = require('../Admin_Support/Rental_Aggrement/model/Rental_Aggrement..model.js')(sequelize, Sequelize)
db.house_Agreement = require('../Admin_Support/Security_Agreement/model/house_Agreement.model.js')(sequelize, Sequelize)
db.Policy = require('../Admin_Support/Policy/model/Policy.model.js')(sequelize, Sequelize)
db.Insurance = require('../Admin_Support/Insurance/model/Insurance.model.js')(sequelize, Sequelize)
db.Events = require('../Admin_Support/Event/model/Event.model.js')(sequelize, Sequelize)
db.AMC_AgreementOtherDoc = require('../Admin_Support/AMC_Agreement/model/AMC_Other_document.model.js')(sequelize, Sequelize)
db.Complaints_Remote = require('../Admin_Support/Complaints_Remote/model/Complaints_Remote.model.js')(sequelize, Sequelize)
db.Facility_Remote = require('../Admin_Support/Facility_Remote/model/Facility_Remote.model.js')(sequelize, Sequelize)
db.Rental_documentDoc = require('../Admin_Support/Rental_Aggrement/model/Rental_document.model.js')(sequelize, Sequelize)
db.house_Agreement_doc = require('../Admin_Support/Security_Agreement/model/house_Agreement_doc.js')(sequelize, Sequelize)
db.Insurance_doc = require('../Admin_Support/Insurance/model/Insurance_doc.js')(sequelize, Sequelize)
db.forex_currency = require('../Admin_Support/forex_currency/model/forex_currency_model.js')(sequelize, Sequelize)
db.po_details = require('../Purchase_And_Inventory/procurement management/model/po_data.js')(sequelize, Sequelize)
db.lms_author_notification = require('../LMS/Author/models/author_notification.js')(sequelize, Sequelize)
db.cp_notification = require('../Channel_Partner/model/CP_notification.js')(sequelize, Sequelize)
// Program_Estimate
db.auditor_booking = require("../sales_request/model/auditor_booking_model.js")(sequelize, Sequelize)
db.Manual_Invoice=require("../Zoho/models/Create_Manual_Invoice.js")(sequelize, Sequelize)

// db.updateDocument = require("../Lead_Managment/models/upload_document.js")(sequelize, Sequelize)
db.Language_Master=require("../language_master/language_model.js")(sequelize, Sequelize)
db.description_model=require("../Admin_Support/Description_master_amc/model/description_model.js")(sequelize, Sequelize)
db.amc_notification=require("../Admin_Support/AMC_notification/Model/notification_model.js")(sequelize, Sequelize)
db.hrms_notification_data=require("../HRMS_notification/model/hrms_notification.js")(sequelize, Sequelize)
db.Onboarding_document_data=require("../candidate_onboarding/onboardng_document_details.js")(sequelize, Sequelize)
db.emp_sign_data=require("../employee_signature/emp_sign_model.js")(sequelize, Sequelize)
db.expense_master=require("../master/expense/model/expense_master.js")(sequelize, Sequelize)

db.employee_salary=require("../PayRoll/employees_Salary/employee_Salary_model.js")(sequelize, Sequelize)

// Master APIs
db.tbl_branch=require("../master/branch/models/branch.models.js")(sequelize, Sequelize)
db.company=require("../master/companySetup/models/company_model.js")(sequelize, Sequelize)
db.plantmaster=require("../master/plant/models/plantmodel.js")(sequelize, Sequelize)
db.asset=require("../master/assetcategory/model/assetmodel.js")(sequelize, Sequelize)
db.ServicesCategory=require("../master/servicecategory/model/servicesmodel.js")(sequelize, Sequelize)
db.itemSpecification=require("../master/Itemmaster/model/itemSpecificationModel.js")(sequelize, Sequelize)
db.ItemMaster=require("../master/Itemmaster/model/Itemmodel.js")(sequelize, Sequelize)
db.uomdetails =require("../master/UOM/model/uom.model.js")(sequelize,Sequelize)
db.Work_Flow = require("../Admin_Support/workflow/models/workflow.model.js")(sequelize,Sequelize)
db.workStation = require('../master/workstation/model/workStation.js')(sequelize,Sequelize)
db.UploadDoc = require('../master/workstation/model/UploadDocument.js')(sequelize,Sequelize)
db.ItemMaster=require("../master/Itemmaster/model/Itemmodel.js")(sequelize, Sequelize);
db.uomdetails =require("../master/UOM/model/uom.model.js")(sequelize,Sequelize);
db.Service_master = require("../master/servicemaster/models/servicemastermodels.js")(sequelize,Sequelize);
db.shift = require("../master/Shift/model/shiftmodel.js")(sequelize,Sequelize);
db.product_master = require("../master/product/model/productmodel.js")(sequelize,Sequelize);
db.workflowmap = require("../Admin_Support/workflow/models/workflow_map.model.js")(sequelize,Sequelize)
db.tbl_budget = require("../Budget/model/bugetModel.js")(sequelize,Sequelize)
db.tbl_budgetMapping = require("../Budget/model/budgetMappingModel.js")(sequelize,Sequelize)
db.tbl_financialYear = require("../FinancialYear/Model/financialYearModel.js")(sequelize,Sequelize)
/////////////////////////////////////////////// Relation ///////////////////////////////////////////////

// db.LeadManagment2.belongsTo(db.LeadManagment, {
//   through: "LeadManagment",
//   foreignKey: "lead_genration_id"
// });
db.emp_sign_data.hasMany(db.user,{
  throgh:"registered_users",
  foreignKey:"employee_id"
});


db.documentMaster.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.custom_assesment_mcq.belongsTo(db.newAssesment, {
  throgh: "new_assesment",
  foreignKey: "assesment_id"
});

db.custom_assesment.belongsTo(db.newAssesment, {
  throgh: "new_assesment",
  foreignKey: "assesment_id"
});

db.answer_custom_assesment.belongsTo(db.custom_assesment, {
  throgh: "custom_assesment",
  foreignKey: "custom_assesment_id"
});

db.custom_assesment.hasMany(db.answer_custom_assesment, {
  throgh: "answer_custom_assesment",
  foreignKey: "custom_assesment_id"
});

db.menu_master.hasMany(db.submenu_master, {
  throgh: "submenu_masters",
  foreignKey: "menu_master_id",
  otherKey: "menu_master_details_id"
});


db.submenu_master.belongsTo(db.menu_master, {
  through: "menu_masters",
  foreignKey: 'submenu_master_id',
  otherKey: "submenu_master_details_id"
});


db.expenserequest.hasMany(db.expensechild, {
  throgh: "expensechild",
  foreignKey: "expense_id",
  otherKey: " expensechildId"
});

db.submenu_master.belongsTo(db.menu_master, {
  through: "menu_masters",
  foreignKey: 'submenu_master_id',
  otherKey: "submenu_master_details_id"
});

db.role_menu_access.belongsTo(db.role_master, {
  through: "role_masters",
  foreignKey: 'role_master_id',
});

db.role_menu_access.belongsTo(db.user, {
  through: "registered_users",
  foreignKey: 'employee_id',
});

db.user.hasMany(db.role_menu_access, {
  throgh: "role_menu_accesses",
  foreignKey: "employee_id"
});

db.role_menu_access.belongsTo(db.role_module_master, {
  through: "role_module_masters",
  foreignKey: 'role_module_master_id',
});

db.role_menu_access.belongsTo(db.menu_master, {
  through: "menu_masters",
  foreignKey: 'menu_master_id',
});

db.role_menu_access.belongsTo(db.submenu_master, {
  through: "submenu_masters",
  foreignKey: 'submenu_master_id',
});

db.role_menu_access.belongsTo(db.role_master, {
  through: "role_masters",
  foreignKey: "role_master_id",
  otherKey: "role_master_details_id"
});

db.candidateProfile.hasMany(db.scheduleFixedInterview, {
  throgh: "schedule_fixed_interview",
  foreignKey: "candidate_id"
});

db.user.hasMany(db.empFamilyDetails, {
  throgh: "employee_family_details",
  foreignKey: "employee_id",
  otherKey: "empFamilyDetailId"
});

db.user.hasMany(db.prevEmpDetail, {
  throgh: "prev_emp_details",
  foreignKey: "employee_id",
  otherKey: "prevEmpDetailId"
});

db.user.hasMany(db.empBankDetail, {
  throgh: "emp_bank_details",
  foreignKey: 'employee_id',
});

db.states.belongsTo(db.countryss, {
  throgh: "countryss",
  foreignKey: "countryss_id"
});

db.city.belongsTo(db.states, {
  throgh: "states",
  foreignKey: "states_id"
});

db.pincode.belongsTo(db.city, {
  throgh: "city",
  foreignKey: "city_id"
});


db.new_region.belongsTo(db.segment, {
  throgh: "segment",
  foreignKey: "segment_id"
});

db.segment.hasMany(db.new_region, {
  throgh: "new_region",
  foreignKey: "segment_id"
});

db.new_spa.belongsTo(db.segment, {
  throgh: "segment",
  foreignKey: "segment_id"
});

db.segment.hasMany(db.new_spa, {
  throgh: "new_spa",
  foreignKey: "segment_id"
});


db.candidateProfile.hasMany(db.candidateVerification, {
  throgh: "candidates_verification",
  foreignKey: "candidate_id"
});

db.candidateVerification.belongsTo(db.candidateProfile, {
  throgh: "candidate_profile",
  foreignKey: "candidate_id"
});



// db.newTraning.hasMany(db.branch, {
//   throgh: "branch",
//   foreignKey: "branch_id"
// });

db.author.hasMany(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});


db.user.hasMany(db.helpDesk, {
  throgh: "helpDesk",
  foreignKey: "employee_id"
});

db.helpDesk.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.complaint, {
  throgh: "complaint",
  foreignKey: "employee_id"
});

db.complaint.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.grievance, {
  throgh: "grievanve",
  foreignKey: "employee_id"
});

db.grievance.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.employeeResignation.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.role_master.belongsTo(db.user, {
  throgh: "role_master",
  foreignKey: "role_master_id"
});

db.leaveTypesMaster.hasMany(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id",
});


db.user.hasMany(db.role_master, {
  throgh: "role_master",
  foreignKey: "role_master_id"
});


db.newTraning.hasMany(db.author, {
  throgh: "new_author",
  foreignKey: "author_trainer_id"
});

db.newTraning.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.belongsTo(db.newTraning, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.addUser.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.myPendingTaskDetails.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.myPendingTaskDetails.belongsTo(db.newTraning, {
  throgh: "new_traning",
  foreignKey: "author_course_id"
});

db.questionaries.belongsTo(db.newContent, {
  throgh: "new_contents",
  foreignKey: "content_id"
});

db.option.belongsTo(db.newContent, {
  throgh: "new_contents",
  foreignKey: "content_id"
});

db.questionaries.belongsTo(db.option, {
  throgh: "option",
  foreignKey: "questionaries_id"
});

db.addUser.belongsTo(db.newTraning, {
  throgh: "new_traning",
  foreignKey: "traning_id"
});

db.newTraning.hasMany(db.addUser, {
  throgh: "add_new_user",
  foreignKey: "traning_id"
});

db.newContent.belongsTo(db.newTraning, {
  throgh: "new_traning",
  foreignKey: "traning_id"
});

db.newTraning.hasMany(db.newContent, {
  throgh: "new_contents",
  foreignKey: "traning_id"
});

db.newContent2.belongsTo(db.newContent, {
  throgh: "new_contents",
  foreignKey: "content_id"
});
db.newContent.hasMany(db.newContent2, {
  throgh: "new_content2s",
  foreignKey: "content_id"
});

db.newContent2.belongsTo(db.newTraning, {
  throgh: "new_traning",
  foreignKey: "traning_id"
});

db.newTraning.hasMany(db.newContent2, {
  throgh: "new_content2s",
  foreignKey: "traning_id"
});


db.newContent2.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});
db.user.hasMany(db.newContent2, {
  throgh: "new_content2s",
  foreignKey: "employee_id"
});


db.newContent.belongsTo(db.newRequestCourse, {
  throgh: "new_request_course",
  foreignKey: "traning_id"
});

db.newRequestCourse.hasMany(db.newContent, {
  throgh: "new_contents",
  foreignKey: "traning_id"
});

db.user.hasMany(db.newRequestCourse, {
  throgh: "new_request_course",
  foreignKey: "employee_id"
});

db.newRequestCourse.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.myexpenses.belongsTo(db.expenserequest, {
  through: "travel_request",
  otherKey: "myexpenseId"
});

db.myexpenses.hasMany(db.expensedetails, {
  throgh: "expenses_detail",
  foreignKey: "myexpense_id",
  otherKey: " expensedetailsId"
});

db.newContent.belongsTo(db.newRequestCourse, {
  throgh: "new_request_course",
  foreignKey: "traning_id"
});

db.newRequestCourse.hasMany(db.newContent, {
  throgh: "new_contents",
  foreignKey: "traning_id"
});

db.addUser.belongsTo(db.newTraning, {
  throgh: "new_traning",
  foreignKey: "traning_id"
});

db.newTraning.hasMany(db.addUser, {
  throgh: "add_new_user",
  foreignKey: "traning_id"
});

db.new_regional_business_head.belongsTo(db.new_region, {
  throgh: "new_region",
  foreignKey: "new_region_id"
});

db.new_region.hasMany(db.new_regional_business_head, {
  throgh: "new_regional_business_head",
  foreignKey: "new_region_id"
});

db.new_regional_business_head.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.new_regional_business_head, {
  throgh: "new_regional_business_head",
  foreignKey: "employee_id"
});

db.bankDetails.belongsTo(db.vendorManagement, {
  throgh: "vendor_management",
  foreignKey: "vendor_management_id"
});

db.vendorManagement.hasMany(db.bankDetails, {
  throgh: "vendor_management_bank_details",
  foreignKey: "vendor_management_id"
});

db.dcoumentDetail.belongsTo(db.vendorManagement, {
  throgh: "vendor_management",
  foreignKey: "vendor_management_id"
});

db.vendorManagement.hasMany(db.dcoumentDetail, {
  throgh: "vendor_management_document",
  foreignKey: "vendor_management_id"
});

db.Document_Channel_Partner.belongsTo(db.channelPartner, {
  throgh: "channel_partner",
  foreignKey: "channel_partner_id"
});

db.channelPartner.hasMany(db.Create_Provision, {
  throgh: "channel_partner",
  foreignKey: "channel_partner_id"
});

db.channelPartner.belongsTo(db.Create_Provision, {
  throgh: "channel_partner",
  foreignKey: "channel_partner_id"
});

db.channelPartner.hasMany(db.Document_Channel_Partner, {
  throgh: "channel_partner",
  foreignKey: "channel_partner_id"
});

db.procurement_product.belongsTo(db.procurement, {
  throgh: "procurement_product_request",
  foreignKey: "procurement_id"
});


db.ESI_Data.belongsTo(db.user, {
  through: "esi_data",
  foreignKey: "employee_id"
});

db.PF_Data.belongsTo(db.user, {
  through: "providend_funds",
  foreignKey: "employee_id"
});

db.attendanceCalendarDetail.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id",
});

db.user.hasMany(db.attendanceCalendarDetail, {
  throgh: "attendance_calender",
  foreignKey: "employee_id",
});

db.user.hasMany(db.leavePolicyDetail, {
  throgh: "leave_Policy_Detail",
  foreignKey: 'employee_id',
});

db.leavePolicyDetail.belongsTo(db.attendanceCalendarDetail, {
  throgh: "attendance_calender",
  foreignKey: "attendance_calender_id",
});

db.attendanceCalendarDetail.hasMany(db.leavePolicyDetail, {
  throgh: "leave_Policy_Detail",
  foreignKey: "attendance_calender_id",
});

db.attendanceCalendarDetail.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.attendanceCalendarDetail, {
  throgh: "attendance_calender",
  foreignKey: "employee_id"
});

db.screenOnOffDetail.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.screenOnOffDetail, {
  throgh: "screen_on_off",
  foreignKey: "employee_id"
});

db.holidayDetail.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.holidayDetail, {
  throgh: "holiday",
  foreignKey: "employee_id"
});

db.holidayDetail.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.holidayDetail, {
  throgh: "holiday",
  foreignKey: "employee_id"
});


db.advancePaymentDetail.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.advancePaymentDetail, {
  throgh: "advance_payment",
  foreignKey: "employee_id"
});

db.initiate_performance_appraisal.belongsTo(db.employmenttype, {
  throgh: "employmenttype",
  foreignKey: "emptype_id"
});

db.employmenttype.hasMany(db.initiate_performance_appraisal, {
  throgh: "initiate_performance_appraisal",
  foreignKey: "emptype_id"
});
db.AMC_AgreementOtherDoc.belongsTo(db.AMC_Agreement, {
  throgh: "AMC_Agreement",
  foreignKey: "amc_agreement_id"
});

db.AMC_Agreement.hasMany(db.AMC_AgreementOtherDoc, {
  throgh: "AMC_Agreement_other_doc",
  foreignKey: "amc_agreement_id"
});

db.Rental_documentDoc.belongsTo(db.Rental_Aggrement), {
  throgh: "Rental_Aggrement",
  foreignKey: "rental_aggrement_id"
}
db.Rental_Aggrement.hasMany(db.Rental_documentDoc), {
  throgh: "Rental_document",
  foreignKey: "rental_aggrement_id"
}

db.key_performance_indicator.belongsTo(db.designation, {
  throgh: "designation",
  foreignKey: "designation_id"
});

db.designation.hasMany(db.key_performance_indicator, {
  throgh: "key_performance_indicator",
  foreignKey: "designation_id"
});

db.self_appraisal.belongsTo(db.key_performance_indicator, {
  throgh: "key_performance_indicator",
  foreignKey: "key_performance_indicator_id"
});

db.key_performance_indicator.hasMany(db.self_appraisal, {
  throgh: "self_appraisal",
  foreignKey: "key_performance_indicator_id"
});

db.self_appraisal.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.self_appraisal, {
  throgh: "self_appraisal",
  foreignKey: "employee_id"
});

db.self_appraisal.belongsTo(db.initiate_performance_appraisal, {
  throgh: "initiate_performance_appraisal",
  foreignKey: "initiate_performance_appraisal_id"
});

db.initiate_performance_appraisal.hasMany(db.self_appraisal, {
  throgh: "self_appraisal",
  foreignKey: "initiate_performance_appraisal_id"
});


db.previous_goal.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.previous_goal, {
  throgh: "previous_goal",
  foreignKey: "employee_id"
});

db.new_goal.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.new_goal, {
  throgh: "new_goal",
  foreignKey: "employee_id"
});

db.new_goal.belongsTo(db.initiate_performance_appraisal, {
  throgh: "initiate_performance_appraisal",
  foreignKey: "initiate_performance_appraisal_id"
});

db.initiate_performance_appraisal.hasMany(db.new_goal, {
  throgh: "new_goal",
  foreignKey: "initiate_performance_appraisal_id"
});
db.manager_review.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.manager_review, {
  throgh: "manager_review",
  foreignKey: "employee_id"
});

db.head_review.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.head_review, {
  throgh: "head_review",
  foreignKey: "employee_id"
});

db.hr_review.belongsTo(db.user, {
  throgh: "registered_users",
  foreignKey: "employee_id"
});

db.user.hasMany(db.hr_review, {
  throgh: "hr_review",
  foreignKey: "employee_id"
});

db.AMC_AgreementOtherDoc.belongsTo(db.AMC_Agreement, {
  throgh: "AMC_Agreement",
  foreignKey: "amc_agreement_id"
});

db.AMC_Agreement.hasMany(db.AMC_AgreementOtherDoc, {
  throgh: "AMC_Agreement_other_doc",
  foreignKey: "amc_agreement_id"
});

db.Rental_documentDoc.belongsTo(db.Rental_Aggrement, {
  throgh: "Rental_Aggrement",
  foreignKey: "rental_aggrement_id"
});

db.Rental_Aggrement.hasMany(db.Rental_documentDoc, {
  throgh: "Rental_document",
  foreignKey: "rental_aggrement_id"
});

db.house_Agreement_doc.belongsTo(db.house_Agreement, {
  throgh: "house_Agreement",
  foreignKey: "security_agreement_id"
});

db.house_Agreement.hasMany(db.house_Agreement_doc, {
  throgh: "house_Agreement_doc",
  foreignKey: "security_agreement_id"
});

db.Insurance_doc.belongsTo(db.Insurance, {
  throgh: "Insurance",
  foreignKey: "insurance_id"
});

db.Insurance.hasMany(db.Insurance_doc, {
  throgh: "Insurance_doc",
  foreignKey: "insurance_id" 
});

// db.Work_Flow.belongsTo(db.ItemMaster, {
//   throgh: "ItemMaster",
//   as: "itemmaster",
//   foreignKey: "workflow_category"
// });

// db.Work_Flow.belongsTo(db.Service_master, {
//   throgh: "tbl_servicemaster",
//   as: "servicemaster",
//   foreignKey: "workflow_category"
// });

// db.Work_Flow.belongsTo(db.documentMaster, {
//   throgh: "document_master",
//   foreignKey: "workflow_department"
// });


// db.workflowmap.belongsTo(db.Work_Flow, {
//   throgh: "workFlow",
//   foreignKey: "workflowId"
// });

// db.workflowmap.belongsTo(db.role_master, {
//   throgh: "role_master",
//   foreignKey: "workflow_roleId"
// });

// db.workflowmap.belongsTo(db.user, {
//   throgh: "registered_users",
//   foreignKey: "workflow_employeeId"
// });

// db.ItemMaster.hasMany(db.Work_Flow, {
//   throgh: "workFlow",
//   foreignKey: "workflow_category"
// });


db.models.fieldType.hasMany(db.models.leadFormSetup, { foreignKey: "field_type_id" });
db.models.leadFormSetup.hasOne(db.models.fieldValue, { foreignKey: "lead_form_id" });
db.models.productName.hasMany(db.models.createLead, { foreignKey: "product_id" });
db.countryss.hasOne(db.tbl_branch,{foreignKey:'country_id'})
db.states.hasOne(db.tbl_branch,{foreignKey:'state_id'})
db.city.hasOne(db.tbl_branch,{foreignKey:'city_id'})
db.countryss.hasOne(db.plantmaster,{foreignKey:'country_id'})
db.states.hasOne(db.plantmaster,{foreignKey:'state_id'})
db.city.hasOne(db.plantmaster,{foreignKey:'city_id'})
db.uomdetails.hasOne(db.ItemMaster,{foreignKey:'uom_id'})
db.ItemMaster.belongsTo(db.uomdetails, { foreignKey: 'uom_id' });
db.ItemMaster.hasMany(db.itemSpecification, { foreignKey: 'item_id' });
db.asset.hasOne(db.ItemMaster,{foreignKey:'asset_id'})
db.ItemMaster.belongsTo(db.asset, { foreignKey: 'asset_id' });
db.workStation.hasMany(db.UploadDoc, { foreignKey: "work_station_id" });
db.uomdetails.hasOne(db.workStation, { foreignKey: "uom_id" });
db.user.hasOne(db.models.createLead, { foreignKey: "user_id" });
db.models.createLead.hasOne(db.models.createDescription,{foreignKey : 'create_lead_id'})
db.ServicesCategory.hasOne(db.Service_master,{foreignKey : 'service_category_id'})
db.uomdetails.hasOne(db.product_master,{foreignKey : 'uom_id'})
db.product_master.belongsTo(db.uomdetails,{foreignKey : 'uom_id'})
db.Service_master.belongsTo(db.ServicesCategory,{foreignKey : 'service_category_id'})
db.models.createLead.hasOne(db.models.leadSummary,{foreignKey:'create_lead_id'})
db.user.hasOne(db.models.leadSummary,{foreignKey:'assign_id'})
db.user.hasOne(db.models.assignUser,{foreignKey:'employee_id'});
db.role_master.hasOne(db.models.assignUser,{foreignKey:'role_id'});
db.tbl_branch.hasOne(db.models.assignUser,{foreignKey:'branch_id'});
db.tbl_branch.hasOne(db.role_master,{foreignKey:'branch_id'})
db.tbl_branch.hasOne(db.user,{foreignKey:'branch_id'})
db.models.assignUser.hasOne(db.models.assignEmployee,{foreignKey:'assign_user_id'});
db.user.hasOne(db.models.assignEmployee,{foreignKey:'assign_id'});
db.department.hasOne(db.tbl_budget,{foreignKey:'department_id'})
db.user.hasOne(db.tbl_budget,{foreignKey:"employee_id"})
db.tbl_budget.hasOne(db.tbl_budgetMapping,{foreignKey:"budget_id"})
db.tbl_financialYear.hasOne(db.tbl_budget,{foreignKey:"financialYear_id"})
db.models.createLead.hasOne(db.models.proposalData,{foreignKey:"create_lead_id"});
db.models.proposalData.hasOne(db.models.proposalList,{foreignKey:"proposal_id"});
db.uomdetails.hasOne(db.models.proposalList,{foreignKey:"uom_id"});
db.product_master.hasOne(db.models.proposalList,{foreignKey:"product_master_id"});
// proposalData
module.exports = db;