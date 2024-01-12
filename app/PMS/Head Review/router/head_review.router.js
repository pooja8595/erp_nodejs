const head_reviewController = require("../controller/head_review.controller");


module.exports = app => {
    app.post("/api/v1/create_head_review", head_reviewController.create_head_review );
    app.put("/api/v1/edit_head_review/:id", head_reviewController.edit_head_review);
    app.get("/api/v1/get_ById_head_review/:id", head_reviewController.get_ById_head_review);
    app.delete("/api/v1/delete_head_review/:id", head_reviewController.delete_head_review);
    app.get("/api/v1/getAll_Pending_head_review", head_reviewController.getAll_Pending_head_review);
    app.get("/api/v1/getAll_Reviewed_head_review", head_reviewController.getAll_Reviewed_head_review);
    app.get("/api/v1/calculate_rating_head/:id", head_reviewController.calculate_rating_head);
    app.put("/api/v1/editbyEMP_ID_head_review/:id", head_reviewController.editbyEMP_ID_head_review);
    app.get("/api/v1/getAll_head_review", head_reviewController.getAll_head_review);
    app.get("/api/v1/getbyid_emp_comment/:id", head_reviewController.getbyid_emp_comment);
}