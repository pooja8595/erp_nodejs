module.exports = app => {
    const answer_Custom_AssesmenController = require("../controller/answer_custom_assessment");

    app.post("/api/v1/createAnswer_custom_assesment", answer_Custom_AssesmenController.createAnswer_custom_assesment);
    app.get("/api/v1/getAllAnswer_custom_assesment", answer_Custom_AssesmenController.getAllAnswer_custom_assesment);
    app.get("/api/v1/getByIdAnswer_custom_assesment/:answer_custom_assesment_id", answer_Custom_AssesmenController.getByIdAnswer_custom_assesment);
    app.put("/api/v1/deleteAnswer_custom_assesment/:answer_custom_assesment_id", answer_Custom_AssesmenController.deleteAnswer_custom_assesment);
    app.put("/api/v1/editAnswer_custom_assesment/:answer_custom_assesment_id", answer_Custom_AssesmenController.editAnswer_custom_assesment);
}