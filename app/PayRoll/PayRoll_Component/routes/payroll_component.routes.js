const PayRollController = require("../controller/payroll_component.controller");

module.exports = app => {
    app.post("/api/v1/create_Component_Type", PayRollController.create_Component_Type);
    app.put("/api/v1/edit_Component_Type/:id", PayRollController.edit_Component_Type);
    app.get("/api/v1/get_All_Component_Type", PayRollController.get_All_Component_Type);
    app.get("/api/v1/get_ById_Component_Type/:id", PayRollController.get_ById_Component_Type);
    app.patch("/api/v1/update_Component_Type/:id", PayRollController.update_status)
    app.patch("/api/v1/update_formula_status/:id", PayRollController.Update_Formula_status)
    app.delete("/api/v1/delete_Component_Type/:id", PayRollController.delete_Component_Type);
    
    app.get("/api/v1/Get_All_Data", PayRollController.Get_All_Data);
    app.get("/api/v1/getbyGet_All_CTC/:employee_id", PayRollController.getbyGet_All_CTC)
    app.patch("/api/v1/updateGet_All_CTC/:employee_id", PayRollController.updateByAllCTC)
    app.get("/api/v1/Get_All_Data", PayRollController.Get_All_Data);
    app.get("/api/v1/get_All_Emp_Details", PayRollController.get_All_Emp_List)
    // ************************************************************************
    app.get("/api/v1/Salary_Calculate", PayRollController.salaryCalculate)     //All Employee Salary permonth
    app.get("/api/v1/Salary_Calculate_by_employee_id/:id", PayRollController.get_employee_salary_byid) //get_employee_salary_by_id
    app.get("/api/v1/salary_calculate_by_id/:id/:date",PayRollController.salaryCalculate_byid) // Employee salary By employee id includeing Bonus
    app.get("/api/v1/get_salarys_calculate_by_month/:date",PayRollController.get_emp_salary_by_month) // get employee salary by month including(Bonus,attendence)
    // *****************************************************************
    app.get("/api/v1/get_ById_Monthly_Data", PayRollController.get_ById_Monthly_Data)
    app.get("/api/v1/salary_calculate", PayRollController.salaryCalculate)
    app.get("/api/v1/bonus/:date", PayRollController.get_bonus)
}