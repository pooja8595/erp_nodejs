const previous_goalController = require("../controller/previous_goal.controller");


module.exports = app => {
    app.post("/api/v1/create_previous_goal", previous_goalController.create_previous_goal );
    app.put("/api/v1/edit_previous_goal/:id", previous_goalController.edit_previous_goal);
    app.get("/api/v1/get_ById_previous_goal/:id", previous_goalController.get_ById_previous_goal);
    app.get("/api/v1/getAll_previous_goal", previous_goalController.getAll_previous_goal);
    app.delete("/api/v1/delete_previous_goal/:id", previous_goalController.delete_previous_goal);
    app.get("/api/v1/get_ByEMPId_previous_goal/:id", previous_goalController.get_ByEMPId_previous_goal);
}