module.exports = app => {
    const Custom_Assesment_mcqController = require("../controller/custom_assessment_mcq");

    app.post("/api/v1/create_mcqCustom_Assesment", Custom_Assesment_mcqController.create_mcqCustom_Assesment);
    app.put("/api/v1/edit_mcqCustom_Assesment/:assesment_id", Custom_Assesment_mcqController.edit_mcqCustom_Assesment);
    app.get("/api/v1/getAll_mcqCustom_Assesment", Custom_Assesment_mcqController.getAll_mcqCustom_Assesment);
    app.get("/api/v1/getById_mcqCustom_Assesment/:assesment_id", Custom_Assesment_mcqController.getById_mcqCustom_Assesment);
    // app.put("/api/v1/deleteCustom_Assesment/:custom_assesment_id", Custom_AssesmenController.deleteCustom_Assesment);  
    // app.put("/api/v1/editCustom_Assesment/:custom_assesment_id", Custom_AssesmenController.editCustom_Assesment);
    // app.get("/api/v1/getAllAnswer_custom_assesmentChild", Custom_AssesmenController.getAllAnswer_custom_assesmentChild);
    app.post("/api/v1/create_mcq_QUES", Custom_Assesment_mcqController.create_mcq_QUES);
    app.put("/api/v1/edit_subjectiveCustom_Assesment/:assesment_id", Custom_Assesment_mcqController.edit_subjectiveCustom_Assesment);
    app.get("/api/v1/getById_subjectiveCustom_Assesment/:assesment_id", Custom_Assesment_mcqController.getById_subjectiveCustom_Assesment);


///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/v1/create_questionaries", Custom_Assesment_mcqController.create_questionaries);
app.get("/api/v1/get_questions_By_content_id/:id", Custom_Assesment_mcqController.get_questions_By_content_id);
app.get("/api/v1/get_questions_By_contentID/:id", Custom_Assesment_mcqController.get_questions_By_contentID);
app.put("/api/v1/editquestionaries", Custom_Assesment_mcqController.editquestionaries);
app.put("/api/v1/edit_questionaries/:id", Custom_Assesment_mcqController.edit_questionaries);
app.delete("/api/v1/delete_questionaries/:id", Custom_Assesment_mcqController.delete_questionaries);
app.get("/api/v1/questions_result/:id", Custom_Assesment_mcqController.questions_result);
// app.get("/api/v1/option_reset/:id", Custom_Assesment_mcqController.option_reset);
app.get("/api/v1/AssignedUser_list/:id", Custom_Assesment_mcqController.AssignedUser_list);
app.post("/api/v1/update_isAssesment_submited", Custom_Assesment_mcqController.update_isAssesment_submited);
app.post("/api/v1/RE_Assigned/:id", Custom_Assesment_mcqController.RE_Assigned);
app.post("/api/v1/update_current_attempt_count", Custom_Assesment_mcqController.update_current_attempt_count);
app.get("/api/v1/getAll_list_re_assigned/:id", Custom_Assesment_mcqController.getAll_list_re_assigned);
app.post("/api/v1/getAll_status_compare_update", Custom_Assesment_mcqController.getAll_status_compare_update);

app.post("/api/v1/AssignedUser_list_traning_author",Custom_Assesment_mcqController.AssignedUser_list_traning_author);
app.get("/api/v1/AssignedUser_list_byreportmanger/:id", Custom_Assesment_mcqController.AssignedUser_list_byreportmanger);
app.get("/api/v1/AssignedUser_list_course_id/:id", Custom_Assesment_mcqController.AssignedUser_list_course_id);
}
