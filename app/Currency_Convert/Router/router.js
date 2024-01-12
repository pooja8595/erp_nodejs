const Currency_Controller=require("../Controller/controller")

module.exports = app => {

    app.post('/api/v1/Create_Currency',Currency_Controller.Make_Currency);
    app.get('/api/v1/getAll_Currency',Currency_Controller.getAll_Currency)
    app.get('/api/v1/getbyAll_Currency/:id',Currency_Controller.getByIdAll_Currency)
    app.put('/api/v1/update_Currency/:id',Currency_Controller.Update_Currency)
}