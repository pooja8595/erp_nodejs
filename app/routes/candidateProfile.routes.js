module.exports = app => {
    const condidateController = require("../controllers/candidateProfile.controller");
    const { upload } = require("../middleware/candidate_profile_doc");
    const { authJwt } = require("../middleware");


    app.post("/api/v1/createCondidate",upload.single('upload_resume'), condidateController.createCondidate);
    app.patch("/api/v1/editCondidate/:id",upload.single('upload_resume'), condidateController.editCondidate);
    app.get("/api/v1/candidate_list", condidateController.candidate_list);
    app.put("/api/v1/editStatus/:id", condidateController.editStatus);
    app.get("/api/v1/candidateProfileList/:id", condidateController.candidateProfileList);
    app.get("/api/v1/candidateProfileShortlisted", condidateController.candidateProfileShortlisted);
    app.get("/api/v1/hrDashboardList", condidateController.hrDashboardList);
    app.get("/api/v1/getByIdCandidate/:id", condidateController.getByIdCandidate);
    app.get("/api/v1/getByIdCandidateProfile/:id", condidateController.getByIdCandidateProfile);
    app.get("/api/v1/getByIdPendingTask/:id", condidateController.getByIdPendingTask);
    app.get("/api/v1/getAllPendingTask", condidateController.getAllPendingTask);
    app.get("/api/v1/singleCandidate_HrDashboard/:id", condidateController.singleCandidate_HrDashboard);
    app.get("/api/v1/interviewerList", condidateController.interviewerList);
    app.get("/api/v1/downloadDocumentMaster/:fileName", condidateController.downloadDocumentMaster);
    app.get("/api/v1/get_All_job_title", condidateController.get_All_job_title);
    app.get("/api/v1/get_emp_by_emp_id/:id", condidateController.get_emp_by_emp_id);
    app.get("/api/v1/candidate_Final_Shortlisted", condidateController.candidate_Final_Shortlisted);
}