const manager_reviewController = require("../controller/manager_review.controller");


module.exports = app => {
    app.post("/api/v1/create_manager_review", manager_reviewController.create_manager_review );
    app.put("/api/v1/edit_manager_review/:id", manager_reviewController.edit_manager_review);
    app.get("/api/v1/get_ById_manager_review/:id", manager_reviewController.get_ById_manager_review);
    app.delete("/api/v1/delete_manager_review/:id", manager_reviewController.delete_manager_review);
    app.get("/api/v1/getAll_Pending_manager_review", manager_reviewController.getAll_Pending_manager_review);
    app.get("/api/v1/getAll_Reviewed_manager_review", manager_reviewController.getAll_Reviewed_manager_review);
    app.get("/api/v1/calculate_rating_manager/:id", manager_reviewController.calculate_rating_manager);
    app.put("/api/v1/editbyEMP_ID_manager_review/:id", manager_reviewController.editbyEMP_ID_manager_review);
}