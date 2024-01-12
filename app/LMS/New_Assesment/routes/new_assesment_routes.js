const newAssesmentController = require("../controllers/new_assesment.controller");
const { upload } = require("../../../middleware/new_assesment_doc");

module.exports = app => {
    app.post("/api/v1/create_New_Assesment", upload.single("upload_assesment"), newAssesmentController.create_New_Assesment);
    app.put("/api/v1/edit_New_Assessment/:id", upload.single("upload_assesment"), newAssesmentController.edit_New_Assessment);
    app.get("/api/v1/get_All_category", newAssesmentController.get_All_category);
    app.get("/api/v1/get_All_New_Assessment", newAssesmentController.get_All_New_Assessment);
    app.get("/api/v1/get_ById_New_Assessment/:id", newAssesmentController.get_ById_New_Assessment);
    app.delete("/api/v1/delete_Assessment/:id", newAssesmentController.delete_Assessment)
}