const employeeProbationController = require("../controllers/employeeResignation.controller");

module.exports = app => {
    app.post("/api/v1/createEmployeeResignation", employeeProbationController.createEmployeeResignation);
    app.put("/api/v1/editEmployeeResignation/:id", employeeProbationController.editEmployeeResignation);
    app.get("/api/v1/getAllEmployeeResignation", employeeProbationController.getAllEmployeeResignation);
    app.get("/api/v1/getByIdEmployeeResignation/:id", employeeProbationController.getByIdEmployeeResignation);
    app.delete("/api/v1/deleteEmployeeResignation/:id", employeeProbationController.deleteEmployeeResignation);
    app.put("/api/v1/Change_Resignation_status/:id", employeeProbationController.Change_Resignation_status);
}