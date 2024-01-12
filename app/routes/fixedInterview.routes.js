const fixedInterviewController = require("../controllers/fixedInterview.controller");

module.exports = app => {
    app.get("/api/v1/getAllfixedInterview", fixedInterviewController.getAllfixedInterview);
    app.get("/api/v1/getAll_short_listed_data",fixedInterviewController.final_short_listed)
    app.get("/api/v1/getAllCandidate", fixedInterviewController.getAllCandidate);
    app.put("/api/v1/editFixedInterview/:id", fixedInterviewController.editFixedInterview);
    app.put("/api/v1/FixingInterview/:id",fixedInterviewController.fixingInterview)
    app.get("/api/v1/getByIdFixedInterview/:id", fixedInterviewController.getByIdFixedInterview);
    app.delete("/api/v1/delete_fixed_interview/:id", fixedInterviewController.delete_fixed_interview);

}