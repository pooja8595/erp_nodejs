const addUser = require("../controller/add_user_controller");

module.exports = app => {
    app.post('/api/v1/create_add_user', addUser.create_add_user);
    app.get('/api/v1/getBy_user_id/:id', addUser.getBy_user_id);
    app.get('/api/v1/getBy_user_traning_id/:id', addUser.getBy_user_traning_id);
    app.put('/api/v1/edit_add_user/:id', addUser.edit_add_user);
    app.get('/api/v1/getBy_data_emp_id/:id', addUser.getBy_data_emp_id);
    app.get('/api/v1/getBy_course_emp_id/:id', addUser.getBy_course_emp_id);
    

    
    ///////////////////////////////////sinkesh code///////////////////////////////////////////////////////

    app.post('/api/v1/assign_course_to_user', addUser.assign_course_to_user);
    app.put('/api/v1/edit_add_user_course/:id', addUser.edit_add_user_course);
    app.get('/api/v1/get_All_User_Course/:id', addUser.get_All_User_Course);
    app.get('/api/v1/get_All_Assigned_Course/:id', addUser.get_All_Assigned_Course);
    app.get('/api/v1/get_all_user_request_Course/:id', addUser.get_all_user_request_Course);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

};