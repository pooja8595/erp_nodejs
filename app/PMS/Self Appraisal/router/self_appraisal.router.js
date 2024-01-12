const self_appraisalController = require("../controller/self_appraisal.controller");


module.exports = app => {
    app.post("/api/v1/create_self_appraisal", self_appraisalController.create_self_appraisal );
    app.put("/api/v1/edit_self_appraisal/:id", self_appraisalController.edit_self_appraisal);
    app.get("/api/v1/get_ById_self_appraisal/:id", self_appraisalController.get_ById_self_appraisal);
    app.get("/api/v1/getAll_self_appraisal", self_appraisalController.getAll_self_appraisal);
    app.delete("/api/v1/delete_self_appraisal/:id", self_appraisalController.delete_self_appraisal)
    app.get("/api/v1/get_ByEMPId_self_appraisal/:id", self_appraisalController.get_ByEMPId_self_appraisal);
    app.get("/api/v1/getAll_self_appraisal_hr", self_appraisalController.getAll_self_appraisal_hr);
}