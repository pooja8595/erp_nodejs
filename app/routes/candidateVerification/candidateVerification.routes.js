module.exports = app => {
    const controller = require("../../controllers/candidateVerification/candidateVerification.controller");
    const { upload } = require("../../middleware/uploadDocument.js")
    const {candidate_docs}=require("../../middleware/Onboarding_document")
    app.post("/api/v1/createCandidates", controller.createCandidates);
    app.put("/api/v1/updatePdfCandidates/:id", upload.single("others_documents"), controller.updatePdfCandidates);
    app.get("/api/v1/candidatesList", controller.allCandidatesList);
    app.get("/api/v1/allCandidatesList_candidateOnboard", controller.allCandidatesList_candidateOnboard);
    app.get("/api/v1/getByCandidate/:id", controller.getByCandidate);
    app.put("/api/v1/trueCandidateOnboard/:candidtaes_v_Id", controller.truecandidates);
    app.get("/api/v1/getdropdownCandidate", controller.getdropdownCandidate);
    app.get("/api/v1/get_all_approved_candidates", controller.get_all_approved_candidate)

    /////////////////////////////////Employee_onboarding/////////////////////////////
    app.patch("/api/v1/employee_final_background__verification/:id",controller.final_backgrond_verify)
    app.get("/api/v1/get_all_background_verified_employee/:id",controller.get_all_background_verified_employee)
    app.patch("/api/v1/send_LIO_to_candidate/:id",candidate_docs.single("document"),controller.send_LIO_to_candidate)
    app.get("/api/v1/get_candidate_by_id/:id",controller.get_candidate_by_id)
    app.get("/api/v1/get_all_LOI_sended/:id",controller.get_All_LOI_sended)
    app.patch("/api/v1/send_employee_contact_form/:id",controller.filled_new_employee_data)
    app.patch("/api/v1/final_form_submit/:id",controller.final_form_submit)
    // app.get("/api/v1/employee_")
};
