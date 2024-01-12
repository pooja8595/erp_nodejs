const upcommingCourse = require("../controllers/upcomming_course.controllers");

module.exports = app => {
    app.post("/api/v1/create_Upcomming_Course", upcommingCourse.create_Upcomming_Course);
    app.put("/api/v1/edit_Upcomming_Course/:id", upcommingCourse.edit_Upcomming_Course);
    app.get("/api/v1/getById_Upcomming_Course/:id", upcommingCourse.getById_Upcomming_Course);
    app.get("/api/v1/getAll_Upcomming_Course", upcommingCourse.getAll_Upcomming_Course);
    app.delete("/api/v1/delete_Upcomming_Course/:id", upcommingCourse.delete_Upcomming_Course);
};