const initiate_performance_appraisalController = require("../controller/initiate_performance_appraisal.controller");


module.exports = app => {
    app.post("/api/v1/create_initiate_performance_appraisal", initiate_performance_appraisalController.create_initiate_performance_appraisal );
    app.put("/api/v1/edit_initiate_performance_appraisal/:id", initiate_performance_appraisalController.edit_initiate_performance_appraisal);
    app.get("/api/v1/get_ById_initiate_performance_appraisal/:id", initiate_performance_appraisalController.get_ById_initiate_performance_appraisal);
    app.get("/api/v1/getAll_initiate_performance_appraisal", initiate_performance_appraisalController.getAll_initiate_performance_appraisal);
    app.get("/api/v1/getAll_ongoing_initiate_performance_appraisal", initiate_performance_appraisalController.getAll_ongoing_initiate_performance_appraisal);
    app.get("/api/v1/getAll_completed_initiate_performance_appraisal", initiate_performance_appraisalController.getAll_completed_initiate_performance_appraisal);
    app.delete("/api/v1/delete_initiate_performance_appraisal/:id", initiate_performance_appraisalController.delete_initiate_performance_appraisal)
}