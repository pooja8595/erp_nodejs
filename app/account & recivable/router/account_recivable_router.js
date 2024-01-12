const make_invoice_controller = require("../controller/account_recivable_controller");

module.exports = app => {
    app.post("/api/v1/create_manul_invoice", make_invoice_controller.create_manul_invoice);
    app.put("/api/v1/edit_invoice/:id", make_invoice_controller.edit_invoice);
    app.get("/api/v1/invoice_getById/:br_number", make_invoice_controller.invoice_getById);
    app.get("/api/v1/getAll_invoice", make_invoice_controller.getAll_invoice);
    app.put("/api/v1/delete_invoice/:id", make_invoice_controller.delete_invoice);
    app.get("/api/v1/getAllBR_invoice", make_invoice_controller.getAllBR_invoice);
    
    app.get("/api/v1/get_ById_InlineInvoice/:br_number", make_invoice_controller.get_ById_InlineInvoice);
    
    // app.get("/api/v1/get_ById_InlineInvoice/:id",make_invoice_controller.get_ById_InlineInvoice);

    app.post("/api/v1/getinvoice_detail/:lead_generation", make_invoice_controller.getinvoice_detail);
    app.post("/api/v1/createinlineinvoice", make_invoice_controller.createInlineInvoice);
    app.put("/api/v1/updateinlineinvoicestatus/:br_number", make_invoice_controller.updateInlineInvoiceStatus);
    app.get("/api/v1/getinvoice_detail_status", make_invoice_controller.getinvoice_detail_status);
    app.get("/api/v1/getinvoice_detail_list/:br_number", make_invoice_controller.getinvoice_detail_list);

    app.get("/api/v1/getbyinvoice_detail_status/:br_number", make_invoice_controller.getByIdinvoice_detail_status);

    //quotation update
    app.post("/api/v1/get_quotation_detail/:lead_generation", make_invoice_controller.getQuotationDetail);
    app.post("/api/v1/create_new_quation", make_invoice_controller.createNewQuation);
    app.put("/api/v1/update_quation_status/:br_number", make_invoice_controller.updateQuotationInvoiceStatus);
    app.get("/api/v1/get_quation_status/:br_number", make_invoice_controller.getQuotationStatus);
    
    app.get("/api/v1/getAllData", make_invoice_controller.getAllData);



    app.patch("/api/v1/Update_Inline_Invoice/:br_number",make_invoice_controller.Update_invoice_data)
    app.get("/api/v1/Get_All_Rejected_Data",make_invoice_controller.Rejected_data)
    app.get("/api/v1/Get_All_Accepted_Data",make_invoice_controller.Approved_data)
} 