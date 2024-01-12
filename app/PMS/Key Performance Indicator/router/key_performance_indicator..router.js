const key_performance_indicatorController = require("../controller/key_performance_indicator.controller");


module.exports = app => {
    app.post("/api/v1/create_key_performance_indicator", key_performance_indicatorController.create_key_performance_indicator );
    app.put("/api/v1/edit_key_performance_indicator/:id", key_performance_indicatorController.edit_key_performance_indicator);
    app.get("/api/v1/get_ById_key_performance_indicator/:id", key_performance_indicatorController.get_ById_key_performance_indicator);
    app.get("/api/v1/getAll_key_performance_indicator", key_performance_indicatorController.getAll_key_performance_indicator);
    app.delete("/api/v1/delete_key_performance_indicator/:id", key_performance_indicatorController.delete_key_performance_indicator);
    app.get("/api/v1/getbyid_designation_self_kpi/:id", key_performance_indicatorController.getbyid_designation_self_kpi);
} 