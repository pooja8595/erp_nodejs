const manual_invoice_controller = require('../controllers/manual_invoice_controller');

module.exports = app => {
    app.post("/api/v1/create_manual_invoice",manual_invoice_controller.create_manual_invoice)
    app.get("/api/v1/get_manaual_invoice_byId/:id",manual_invoice_controller.get_manual_Invoice_by_id)
    app.get("/api/v1/get_all_manual_invoice_data",manual_invoice_controller.get_all_manaual_invoice)
    app.patch("/api/v1/create_item_details/:id",manual_invoice_controller.create_item_details)
    app.patch("/api/v1/approve_manual_invoice/:id",manual_invoice_controller.approve_manual_invoice)
    app.patch("/api/v1/rejecte_manual_invoice/:id",manual_invoice_controller.Reject_manual_invoice)
    app.delete("/api/v1/delete_item_details/:id",manual_invoice_controller.delete_manual_invoice)
    app.get("/api/v1/get_all_Invoice_data",manual_invoice_controller.get_all_invoice_data)
    app.get("/api/v1/get_all_pendings_data",manual_invoice_controller.pending_status)
    app.get("/api/v1/get_all_approve_data",manual_invoice_controller.approve_status)
    app.get("/api/v1/manual_invoice_rejected_data",manual_invoice_controller.rejected_status)
    app.get("/api/v1/get_alldata_zoho_invoice/:id",manual_invoice_controller.get_all_zoho_invoice_data)
    app.delete("/api/v1/parmanent_delete_item_details/:id",manual_invoice_controller.hard_delete_manual_invoice)
}
