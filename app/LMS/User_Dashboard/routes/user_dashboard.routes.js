const courseController = require("../controller/user_dashboard.controller");


module.exports = app => {
    app.get("/api/v1/getAllCourse", courseController.getAllCourse);
    app.get("/api/v1/getByIdCourse/:employee_id", courseController.getByIdCourse);
    app.get("/api/v1/getById_Course_Name/:id", courseController.getById_Course_Name);
    app.get("/api/v1/getAll_Course_Pending_Task", courseController.getAll_Course_Pending_Task);
    app.get("/api/v1/get_All_Video_list", courseController.get_All_Video_list);
    app.get("/api/v1/get_by_id_Video_list/:content_id", courseController.get_by_id_Video_list);
}