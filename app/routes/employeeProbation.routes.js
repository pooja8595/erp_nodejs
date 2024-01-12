const employeeProbationController = require("../controllers/empolyeeProbation.controller");

module.exports = app => {
    app.get("/api/v1/employeeProbationList", employeeProbationController.employeeProbationList);
    app.get("/api/v1/getByIdEmployeeProbation/:id", employeeProbationController.getByIdEmployeeProbation);
    app.put("/api/v1/editProbation/:id", employeeProbationController.editProbation);
    app.put("/api/v1/statusProbation/:id", employeeProbationController.statusProbation);
}