const financialYearController = require("../Controller/financialYearController");

module.exports = app => {
    app.post("/api/v1/createFinancialYear", financialYearController.createFinancialYear);
    app.put("/api/v1/updateFinancialYear/:financialYear_id", financialYearController.updateFinancialYear);
    app.get("/api/v1/getFinancialYearById/:financialYear_id", financialYearController.getFinancialYearById);
    app.get("/api/v1/getAllFinancialYear", financialYearController.getAllFinancialYear);
    app.delete("/api/v1/deleteFinancialYear/:financialYear_id", financialYearController.deteleFinancialYear);
    app.put("/api/v1/FinancialYearStatus/:financialYear_id", financialYearController.FinancialYearStatus);
}