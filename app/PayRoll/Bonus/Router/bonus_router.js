const bonusController = require('../Controller/bonus_controller')

module.exports = app => {
    app.post('/api/v1/create_employee_bonus', bonusController.Create_Bonus)
    app.get('/api/v1/get_Employee_bonus/:id', bonusController.Get_Bonus_byid)
    app.get('/api/v1/get_Emp_bonus', bonusController.Get_all_Bonus)
    app.put('/api/v1/update_employee_bonus/:id', bonusController.update_Bonus_byid)
    app.delete('/api/v1/delete_Bonus/:id', bonusController.Delete_Bonus)
    app.delete('/api/v1/remove_Bonus/:id', bonusController.Remove_Bonus)
    app.get('/api/v1/get_Bonus_DetailbyDates', bonusController.Get_Bonus_byDate)
    app.get('/api/v1/get_bonus_by_date', bonusController.Get_emp_bydate)
}