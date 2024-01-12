const newUserController = require("../controllers/new_user.controller");
const { upload } = require("../../../middleware/new_user_doc");

module.exports = app => {
    app.post("/api/v1/create_New_User", newUserController.create_New_User);
    app.get("/api/v1/userAllData", newUserController.userAllData);
    app.get("/api/v1/get_All_Role", newUserController.get_All_Role);
    app.get("/api/v1/getById_New_User/:id", newUserController.getById_New_User);
    app.get("/api/v1/getAll_New_User", newUserController.getAll_New_User);
    app.put("/api/v1/delete_New_User/:id", newUserController.delete_New_User)
    app.post("/api/v1/uploadCsv", upload.single("file"), newUserController.uploadCsv)
    app.get("/api/v1/downloadDocument_NewUser/:fileName", newUserController.downloadDocument_NewUser);
}