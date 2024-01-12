const authorController = require("../controllers/author.controller");
const { upload } = require("../../../middleware/new_author_doc");

module.exports = app => {
    app.post("/api/v1/createAuthor", upload.single('upload_trainer_document'), authorController.createAuthor);
    app.put("/api/v1/editAuthor/:employee_id", upload.single('upload_trainer_document'), authorController.editAuthor);
    app.get("/api/v1/getByIdAuthor/:id", authorController.getByIdAuthor);
    app.get("/api/v1/getAllAuthor", authorController.getAllAuthor);
    app.get("/api/v1/user_Name_List", authorController.user_Name_List);
    app.get("/api/v1/get_ById_user/:id", authorController.get_ById_user);
    app.get("/api/v1/get_All_Categoryies", authorController.get_All_Categoryies);
    app.get("/api/v1/get_All_region_List", authorController.get_All_region_List);
    app.get("/api/v1/getAll_course_author", authorController.getAll_course_author);
    app.put("/api/v1/deleteAuthor/:id", authorController.deleteAuthor);
    app.post("/api/v1/LMS_notification", authorController.LMS_notification);
    app.get("/api/v1/getLMS_notification/:id", authorController.getLMS_notification);
    app.get("/api/v1/get_notification_count/:id", authorController.get_notification_count);
    app.put("/api/v1/edit_LMS_notification/:id", authorController.edit_LMS_notification);
    app.put("/api/v1/delete_LMS_notification", authorController.delete_LMS_notification);
}