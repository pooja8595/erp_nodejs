module.exports = app => {
    const Custom_AssesmenController = require("../controller/custom_assessment");

    app.post("/api/v1/createCustom_Assesment", Custom_AssesmenController.createCustom_Assesment);
    app.get("/api/v1/getAllCustom_Assesment", Custom_AssesmenController.getAllCustom_Assesment);
    app.get("/api/v1/getByIdCustom_Assesment/:custom_assesment_id", Custom_AssesmenController.getByIdCustom_Assesment);
    app.put("/api/v1/deleteCustom_Assesment/:custom_assesment_id", Custom_AssesmenController.deleteCustom_Assesment);
    app.put("/api/v1/editCustom_Assesment/:custom_assesment_id", Custom_AssesmenController.editCustom_Assesment);
    app.get("/api/v1/getAllAnswer_custom_assesmentChild", Custom_AssesmenController.getAllAnswer_custom_assesmentChild);
}