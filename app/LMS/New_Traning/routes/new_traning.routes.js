const newTraningController = require("../controllers/new_traning.controller");
const { upload } = require("../../../middleware/new_traning_doc");

module.exports = app => {
    app.post("/api/v1/create_New_Traning", upload.fields([{ name: 'upload_material', maxCount: 1 }, { name: 'bulk_upload_user', maxCount: 1 }]), newTraningController.create_New_Traning);
    app.put("/api/v1/edit_New_Traning/:id", upload.fields([{ name: 'upload_material', maxCount: 1 }, { name: 'bulk_upload_user', maxCount: 1 }]), newTraningController.edit_New_Traning);
    app.get("/api/v1/get_All_New_User", newTraningController.get_All_New_User);
    app.get("/api/v1/get_All_User", newTraningController.get_All_User);
    app.get("/api/v1/get_All_New_Author", newTraningController.get_All_New_Author);
    app.get("/api/v1/get_All_Branch", newTraningController.get_All_Branch);
    app.get("/api/v1/get_All_Category", newTraningController.get_All_Category);
    app.get("/api/v1/region_List", newTraningController.region_List);
    app.get("/api/v1/user_Traning_uploadCsv", upload.single("file"), newTraningController.user_Traning_uploadCsv)
    app.get("/api/v1/get_ById_New_Traning/:id", newTraningController.get_ById_New_Traning);
    app.get("/api/v1/get_All_New_Traning", newTraningController.get_All_New_Traning);
    app.put("/api/v1/cancel_Traning/:id", newTraningController.cancel_Traning);
    app.put("/api/v1/status_Closed_Traning/:id", newTraningController.status_Closed_Traning);
    app.put("/api/v1/reschedule_Traning_Update/:id", newTraningController.reschedule_Traning_Update);
    app.get("/api/v1/traning_Reschedule", newTraningController.traning_Reschedule);
    app.get("/api/v1/export_File", newTraningController.export_File);
    app.get("/api/v1/downloadDocument_NewTraning/:fileName", newTraningController.downloadDocument_NewTraning);

    //////////////////////////////////////////// Admin APIs Routes ////////////////////////////////////////////

    app.get("/api/v1/get_All_Content_Learning", newTraningController.get_All_Content_Learning);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////Create NEW Course//////////////////////////////////////////// 

    app.post('/api/v1/CreateNewCourse', upload.fields([{ name: 'course_thumbnail', maxCount: 1 }]), newTraningController.CreateNewCourse);
    app.get('/api/v1/getAllCource', newTraningController.getAllCource);
    app.get('/api/v1/getbyempidAllCource/:employee_id', newTraningController.getbyempidAllCource);
    app.get('/api/v1/getByIdCourse/:id', newTraningController.getByIdCourse);
    app.put('/api/v1/editCourse/:id', upload.fields([{ name: 'course_thumbnail', maxCount: 1 }]), newTraningController.editCourse);

    ////////////////////////// add new user///////////////////////////////

    app.get('/api/v1/getAllData_category/:department', newTraningController.getAllData_category);
    app.get('/api/v1/getAll_category', newTraningController.getAll_category);
    app.put('/api/v1/edit_Assign_Course/:id', newTraningController.edit_Assign_Course);
    app.get('/api/v1/getAll_user', newTraningController.getAll_user);
    app.post('/api/v1/getBy_content_traning_id', newTraningController.getBy_content_traning_id);

    //////////////////////////// course requested by user/////////////////////////////

    app.get('/api/v1/getAll_requested_pending_course/:id', newTraningController.getAll_requested_pending_course);
    app.put('/api/v1/edit_Status_Course/:id', newTraningController.edit_Status_Course);
    app.put('/api/v1/edit_user_status/:id', newTraningController.edit_user_status);
    app.get('/api/v1/getBy_emp_Id_Course/:id', newTraningController.getBy_emp_Id_Course);
    app.get('/api/v1/get_By_Approved_Course/:id', newTraningController.get_By_Approved_Course);
    app.get('/api/v1/get_By_Request_Course/:id', newTraningController.get_By_Request_Course);
    app.get('/api/v1/get_By_Ap_rej_Course/:id', newTraningController.get_By_Ap_rej_Course);
    app.put('/api/v1/course_expire', newTraningController.course_expire);

    ///////////////////////////////////// Dashboard api's ///////////////////////////////
    app.get('/api/v1/ByAuther_getAll_empResult/:id', newTraningController.ByAuther_getAll_empResult);
    app.get('/api/v1/no_of_attend_and_no_of_assined_course/:id', newTraningController.no_of_attend_and_no_of_assined_course);
    app.get('/api/v1/no_of_attendes_count/:id', newTraningController.no_of_attendes_count);
    app.get('/api/v1/no_of_assined_for_admin', newTraningController.no_of_assined_for_admin);
    app.get('/api/v1/getAll_empResult_admin', newTraningController.getAll_empResult_admin);
    app.get('/api/v1/no_of_attendes_count_admin', newTraningController.no_of_attendes_count_admin);
    app.get('/api/v1/getAll_empResult_user/:id', newTraningController.getAll_empResult_user);
    app.get('/api/v1/no_of_assined_course_user/:id', newTraningController.no_of_assined_course_user);
    app.get('/api/v1/no_of_attendes_count_user/:id', newTraningController.no_of_attendes_count_user);


    app.get('/api/v1/req_data_listby_auth_co_id/:id', newTraningController.req_data_listby_auth_co_id);
    app.get('/api/v1/editCheck_content2/:id', newTraningController.editCheck_content2);
    app.get('/api/v1/Check_find_emp_id/:id', newTraningController.Check_find_emp_id);


}