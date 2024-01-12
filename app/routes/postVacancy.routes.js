const jobDescriptionController = require("../controllers/postVacancy.controller");

module.exports = app => {
    app.post("/api/v1/createPostVancay", jobDescriptionController.createPostVancay);
    app.put("/api/v1/editPostVancay/:id", jobDescriptionController.editPostVancay);
    app.get("/api/v1/getAllPostVancay", jobDescriptionController.getAllPostVancay);
    app.get("/api/v1/get_All_Post_Vancay", jobDescriptionController.get_All_Post_Vancay);
    app.get("/api/v1/getByIdPostVancay/:id", jobDescriptionController.getByIdPostVancay);
    app.delete("/api/v1/deletePostVancay/:id", jobDescriptionController.deletePostVancay);
}