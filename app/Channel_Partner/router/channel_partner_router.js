const channelPartnerController = require("../Controller/channel_controler")

module.exports = app => {
    app.post("/api/v1/create_Channel_Partner", channelPartnerController.create_Channel_Partner);
    app.put("/api/v1/update_Channel_PartnersId/:id", channelPartnerController.update_Channel_Partner)
    app.get("/api/v1/Read_Channel_Partners/:id", channelPartnerController.read_Channel_Partner);
    app.get("/api/v1/Get_All_Cp_registration_Approver", channelPartnerController.get_All_Channel_Partner_Registration_Approver)
    app.get("/api/v1/Get_All_States_CP", channelPartnerController.getstatesbycountryid)
    app.get("/api/v1/Get_All_Cp_source", channelPartnerController.get_All_Channel_Partner_Source)
    app.get("/api/v1/Get_All_Contact_source", channelPartnerController.get_All_Contact_Source)
    app.get("/api/v1/Read_Channel_PartnersId/:id", channelPartnerController.read_Channel_Partner_ById)
    app.get("/api/v1/read_Channel_Partner_ByIdApproved", channelPartnerController.read_Channel_Partner_ByIdApproved)
    app.delete("/api/v1/Delete_Channel_PartnersId/:id", channelPartnerController.delete_Channel_Partner)
    app.delete("/api/v1/ParmanentDelete_Channel_PartnersId/:id", channelPartnerController.parmanent_Delete_Channel_Partner)
    app.post("/api/v1/get_Single_Provision_Details/:id", channelPartnerController.get_Single_Provision_Details)
    app.get("/api/v1/get_All_Provision_Details_List/:employee_id", channelPartnerController.get_All_Provision_Details_List)
    app.get("/api/v1/get_All_Channel_Partner_Name", channelPartnerController.get_All_Channel_Partner_Name)
    app.get('/api/v1/CP_Agreed_Percentage/:id', channelPartnerController.get_agreed_rate_by_cp_id)
    app.get('/api/v1/CP_provision_Details_list/:id', channelPartnerController.CP_provision_Details_list)
    app.get('/api/v1/Created_CP_Provision_Details_List/:id', channelPartnerController.Created_CP_Provision_Details_List)
    app.get('/api/v1/update_Created_CP_Provision_list', channelPartnerController.update_Created_CP_Provision_list)
    app.get('/api/v1/CP_provision_Details_Approval_List/:id', channelPartnerController.CP_provision_Details_Approval_List)
    app.patch("/api/v1/verify/:id", channelPartnerController.Verify_CP)
    app.get("/api/v1/downloadChannel_partner_Docs/:fileName", channelPartnerController.downloadChannel_partner_Docs)
}