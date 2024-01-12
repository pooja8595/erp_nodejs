const grievanceController = require("../controllers/grievance.controller");

module.exports = app => {
    app.post("/api/v1/createGrievance", grievanceController.createGrievance);
    app.put("/api/v1/editGrievance/:id", grievanceController.editGrievance);
    app.get("/api/v1/grievancyGetById/:id", grievanceController.getGrievancyById);
    app.get("/api/v1/grievancyList", grievanceController.getAllGrievancy);
    app.delete("/api/v1/grievancyDelete/:id", grievanceController.deleteGrievancy)
}