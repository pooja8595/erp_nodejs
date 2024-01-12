const documentChannelPartnerController = require("../Controller/document_channel_partner");
const { upload } = require("../../middleware/ChannelPartner");

module.exports = (app) => {
  app.post("/api/v1/Document_ChannelPartner/:id", upload.fields([{ name: "vendor_Reg_Form", maxCount: 1 }, { name: "NDA_WordFormat", maxCount: 1 }, { name: "acceptance_offer", maxCount: 1 }, { name: "agreement", maxCount: 1 }, { name: "vendor_declarations", maxCount: 1 }, { name: "Whistle_Blower_Policy", maxCount: 1 },]), documentChannelPartnerController.Document_Channel_Partner);
  app.patch("/api/v1/Update_Document_ChannelPartnerId/:id", upload.fields([{ name: "vendor_Reg_Form", maxCount: 1 }, { name: "NDA_WordFormat", maxCount: 1 }, { name: "acceptance_offer", maxCount: 1 }, { name: "agreement", maxCount: 1 }, { name: "vendor_declarations", maxCount: 1 }, { name: "Whistle_Blower_Policy", maxCount: 1 },]), documentChannelPartnerController.Update_Document_Channelpartner);
  app.post("/api/v1/Others_Document_ChannelPartner/:id", upload.single("other"), documentChannelPartnerController.createOtherDocuments);
  app.get("/api/v1/Read_Document_ChannelPartner", documentChannelPartnerController.Read_Document_Channelpartner);
  app.get("/api/v1/Read_Document_ChannelPartnerId/:id", documentChannelPartnerController.Read_Document_ChannelpartnerId);
  app.get("/api/v1/Read_Other_DocumentsId/:id", documentChannelPartnerController.Read_Other_Documents)
  app.patch("/api/v1/Update_Other_Document_ChannelPartner/:id", upload.single('other'), documentChannelPartnerController.updateOtherDocuments);
  app.delete("/api/v1/Delete_Document_ChannelPartnerId/:id", documentChannelPartnerController.Delete_Document_ChannelpartnerId);
  app.delete("/api/v1/Parmanent_Delete_Document_ChannelPartner/:id", documentChannelPartnerController.Parmanent_Deleted_Channelpartner_Document);
  app.delete("/api/v1/Delete_Others_Docs/:id", documentChannelPartnerController.Del_Other_Docs)
  app.get("/api/v1/download_CP_Document/:fileName", documentChannelPartnerController.download_CP_Document)
  app.get("/api/v1/dwonload_CP_Document/:fileName", documentChannelPartnerController.download_CP_Document);
};