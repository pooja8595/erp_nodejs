const new_goalController = require("../controller/new_goal.controller");


module.exports = app => {
    app.post("/api/v1/create_new_goal", new_goalController.create_new_goal );
    app.put("/api/v1/edit_new_goal/:id", new_goalController.edit_new_goal);
    app.get("/api/v1/get_ById_new_goal/:id", new_goalController.get_ById_new_goal);
    app.get("/api/v1/getAll_new_goal", new_goalController.getAll_new_goal);
    app.delete("/api/v1/delete_new_goal/:id", new_goalController.delete_new_goal);
    app.get("/api/v1/get_ByEMPId_new_goal/:id", new_goalController.get_ByEMPId_new_goal);
    app.post("/api/v1/create_ByEMPId_new_goal/:id", new_goalController.create_ByEMPId_new_goal);
    app.get("/api/v1/get_ByEMPId_NEWLIST_goal/:id", new_goalController.get_ByEMPId_NEWLIST_goal);
    app.get("/api/v1/get_ByEMPId_PREVIOUSLIST_goal/:id", new_goalController.get_ByEMPId_PREVIOUSLIST_goal);

}