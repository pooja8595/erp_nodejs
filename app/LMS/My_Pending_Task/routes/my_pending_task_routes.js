const myPendingTaskController = require("../controller/my_pending_task_controller");

module.exports = app => {
    app.post('/api/v1/create_New_Pending_Course/:id', myPendingTaskController.create_New_Pending_Course);
    app.put('/api/v1/edit_Pending_Status/:id', myPendingTaskController.edit_Pending_Status);
    app.get('/api/v1/get_ById_Requested/:id', myPendingTaskController.get_ById_Requested);
    app.get('/api/v1/get_by_id_pending_task_list/:id', myPendingTaskController.get_by_id_pending_task_list);
}