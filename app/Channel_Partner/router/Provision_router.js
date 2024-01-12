const createProvisionController = require('../Controller/Provision_Controller')

module.exports = app => {
    app.post('/api/v1/create_Provision/:id', createProvisionController.create_Provision);
    app.put('/api/v1/send_To_RBH_And_Verified_Provision_Details/:id', createProvisionController.send_To_RBH_And_Verified_Provision_Details);
    app.get('/api/v1/get_All_RBH_Provision_List/:employee_id', createProvisionController.get_All_RBH_Provision_List);
    app.get('/api/v1/get_ById_RBH_Provision_List/:id', createProvisionController.get_ById_RBH_Provision_List);
    app.patch('/api/v1/Verify_provision_Details_list/:id', createProvisionController.Verifing_provisionDetails);
    app.get('/api/v1/get_All_Created_Provision_List/:employee_id', createProvisionController.get_All_Created_Provision_List);
    app.get('/api/v1/get_ById_Created_Provision_List/:id', createProvisionController.get_ById_Created_Provision_List);
    app.put('/api/v1/provision_RBH_Approval/:id', createProvisionController.provision_RBH_Approval);
    app.get('/api/v1/get_All_CP_Payment_List', createProvisionController.get_All_CP_Payment_List);
    app.get('/api/v1/get_All_CP_Payment_List_BYID/:id',createProvisionController.get_All_CP_Payment_List_BYID);
    app.get('/api/v1/get_All_SP_Employee_List', createProvisionController.get_All_SP_Employee_List);
    app.get('/api/v1/get_All_CP_Registration_Approver_List', createProvisionController.get_All_CP_Registration_Approver_List);
    app.get('/api/v1/get_Last_Created_Provision_On_Provision_Details/:lead_genration_id', createProvisionController.get_Last_Created_Provision_On_Provision_Details);
}