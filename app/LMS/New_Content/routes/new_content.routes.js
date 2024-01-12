const newContentController = require("../controllers/new_content.controller");
const { upload } = require("../../../middleware/new_content_doc")

module.exports = app => {
    app.post("/api/v1/create_New_Content", upload.fields([{ name: 'upload_assessment', maxCount: 1 }, { name: 'upload_content', maxCount: 1 }]), newContentController.create_New_Content);
    app.put("/api/v1/edit_New_Content/:id", upload.fields([{ name: 'upload_assessment', maxCount: 1 }, { name: 'upload_content', maxCount: 1 }]), newContentController.edit_New_Content);
    app.get("/api/v1/get_All_New_Content", newContentController.get_All_New_Content);
    app.get("/api/v1/get_ById_Content/:id", newContentController.get_ById_Content);
    app.delete("/api/v1/deleteContent/:id", newContentController.deleteContent);
    app.post("/api/v1/contentUploadCsv", upload.single("file"), newContentController.contentUploadCsv);
    app.get("/api/v1/downloadDocument_NewContent/:fileName", newContentController.downloadDocument_NewContent);

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// ADD CONTENT TO COURSE ////////////////////////////////////

    app.post("/api/v1/create_Content_Course", upload.fields([{ name: 'upload_material', maxCount: 1 }, { name: 'upload_course_video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), newContentController.create_Content_Course);
    app.get("/api/v1/get_cource_id_newContent/:id", newContentController.get_cource_id_newContent);
    app.delete("/api/v1/delete_newContent/:id", newContentController.delete_newContent);
    app.put("/api/v1/editcontent_status/:id", newContentController.editcontent_status);
    app.put("/api/v1/editcontent/:id", upload.fields([{ name: 'upload_material', maxCount: 1 }, { name: 'upload_course_video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), newContentController.editcontent);
    app.put("/api/v1/edit_single_Content/:id", newContentController.edit_single_Content);
    app.get("/api/v1/getContentBY_contentID/:id", newContentController.getContentBY_contentID);
}