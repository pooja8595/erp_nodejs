const controller = require("../../controllers/announcement/announce.controller");
const { attachedDocument } = require("../../middleware/attach_file")
// expense_request.single("attach_approval"), travelcontroller.ExpenseRequest);

module.exports = app => {
    app.post("/api/v1/create_annouce_mail", attachedDocument.single("attach_file"), controller.createAnnounceMail)
    app.post("/api/v1/create_annouce_draft", attachedDocument.single("attach_file"), controller.createAnnounceDraft)
    app.get("/api/v1/announce_list", controller.announceList)
    app.get("/api/v1/announce_details/:id", controller.announcementDetails)
    app.put("/api/v1/announce_update/:id",  attachedDocument.single("attach_file"), controller.announcementUpdate)
    app.put("/api/v1/announce_delete/:id", controller.announcementDelete)
    app.put("/api/v1/announce_draft_update/:id",  attachedDocument.single("attach_file"), controller.announcementDraftUpdate)
    app.post("/api/v1/bulkAnnounceMail/:departmentName", controller.bulkAnnounceMail)
    app.get("/api/v1/getuser_email/:departmentName", controller.getuser_email)
};
