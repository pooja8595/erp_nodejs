const advancedPaymentController = require('../Controller/advance_payment_controller')
// const { upload } = require('../../../middleware/Advanced_Payment_doc')

module.exports = app => {
    app.post('/api/v1/create_Advance_Payment', advancedPaymentController.create_Advance_Payment)
    app.put('/api/v1/edit_Advance_Payment/:id',  advancedPaymentController.edit_Advance_Payment)
    app.put('/api/v1/edit_Installment_Status/:id',  advancedPaymentController.edit_Installment_Status)
    app.get('/api/v1/get_ById_Advance_Payment/:id',  advancedPaymentController.get_ById_Advance_Payment)
    app.get('/api/v1/get_All_Advance_Payment',  advancedPaymentController.get_All_Advance_Payment)
    app.get('/api/v1/get_All_Install_Advance_Payment',  advancedPaymentController.get_All_Install_Advance_Payment)
    app.delete('/api/v1/delete_Advance_Payment/:id',  advancedPaymentController.delete_Advance_Payment)
}