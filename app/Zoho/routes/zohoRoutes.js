const zohoController = require("../controllers/zohoController")

module.exports = app => {
    app.post("/api/v1/createzohotoken", zohoController.CreateToken);
    app.post("/api/v1/zohoall", zohoController.CreateAccessToken);
    app.post("/api/v1/create_contact", zohoController.CreateContact);
    app.get("/api/v1/getall_contact", zohoController.getallContactList);
    app.get("/api/v1/customer_details", zohoController.CustomerDetails);


    //invoice
    app.post('/api/v1/expense_zoho', zohoController.expense_zoho)
    app.get('/api/v1/getAllExpenseData',zohoController.getAllExpenseData)
    app.get('/api/v1/getAllExpense_details/:expense_zoho_data_id',zohoController.getAllExpenseDetails)

    //expense file
    app.post('/api/v1/newexpense_zoho', zohoController.newExpenseZoho)
    app.post('/api/v1/createaccount', zohoController.createAccount)
    app.get('/api/v1/newAllExpenseData',zohoController.newAllExpenseData)
    app.get('/api/v1/newExpenseDetails/:expense_zoho_data_id',zohoController.newExpenseDetails)


    //Vendor file
    app.post('/api/v1/create_vendor', zohoController.createVendor)
    app.get('/api/v1/newAllvendorlist',zohoController.getAllVendorList)
    app.get('/api/v1/newvendordetails/:vendor_id',zohoController.newVendorDetails)


    //channel partner file
    app.post('/api/v1/create_chanelpartner', zohoController.createChannelParnerzoho)
    app.get('/api/v1/all_chanelpartner',zohoController.allChanelPartner)
    app.get('/api/v1/get_chanelpartner_details/:channel_partner_id',zohoController.getChanelpartnerDetails)




};