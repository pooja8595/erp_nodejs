const hr_reviewController = require("../controller/hr_review.controller");


module.exports = app => {
    app.post("/api/v1/create_hr_review", hr_reviewController.create_hr_review );
    app.put("/api/v1/edit_hr_review/:id", hr_reviewController.edit_hr_review);
    app.get("/api/v1/get_ById_hr_review/:id", hr_reviewController.get_ById_hr_review);
    app.delete("/api/v1/delete_hr_review/:id", hr_reviewController.delete_hr_review);
    app.get("/api/v1/getAll_Pending_hr_review", hr_reviewController.getAll_Pending_hr_review);
    app.get("/api/v1/getAll_Reviewed_hr_review", hr_reviewController.getAll_Reviewed_hr_review);
    app.get("/api/v1/getAll_hr_review", hr_reviewController.getAll_hr_review);
    app.get("/api/v1/get_ByempId_hr_review/:id", hr_reviewController.get_ByempId_hr_review);
    app.get("/api/v1/calculate_rating_hr/:id", hr_reviewController.calculate_rating_hr);
}