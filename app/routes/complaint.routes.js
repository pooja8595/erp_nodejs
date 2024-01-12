const complaintController = require("../controllers/complaint.controller");

module.exports = app => {
    app.post("/api/v1/createComplaint", complaintController.createComplaint)
    app.put("/api/v1/editComplaint/:id", complaintController.editComplaint)
    app.get("/api/v1/getByIdComplaint/:id", complaintController.getByIdComplaint)
    app.get("/api/v1/getAllComplaint", complaintController.getAllComplaint)
    app.delete("/api/v1/deleteComplaint/:id", complaintController.deleteComplaint)
}