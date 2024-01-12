const { where } = require("sequelize");
const db = require("../../../models/index");
const componentTypeDetails = db.componentTypeDetail;
const salary_structureDetail = db.salary_structureDetails;
const advancePaymentDetails = db.advancePaymentDetail;
const attendanceCalendarDetails = db.attendanceCalendarDetail;
const bonusDetails = db.bonusDetail
const leaveApplyDetails = db.leaveApplyDetail;
const leavePolicyDetails = db.leavePolicyDetail;
const leaveTypesDetails = db.leaveTypes;
const userDetials = db.user
const Leave_Apply=db.leaveApplyDetail
const employees_salary=db.employee_salary
const math = require('mathjs')
const moment =require('moment')
// const math = require('mathjs');
// const leave_applyModel = require("../../../Leave_Master/Leave_Apply/model/leave_apply.model");

/////////////// Create Component Type ///////////////

exports.create_Component_Type = async (req, res) => {
    try {
        const { component_name, record_add_By } = req.body;
        const totalData = await componentTypeDetails.findAll();
        const component_code = `DQS${Number(totalData.length) + 1}`;
        const response = await componentTypeDetails.create({
            component_name,
            component_code,
            record_add_By
        });
        return res.status(200).send({ code: 200, message: "Component Type Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Component Type ///////////////

exports.edit_Component_Type = async (req, res) => {
    try {
        const componentTypeId = req.params.id;
        const { component_code, component_name, component_notes, record_add_By, record_add_date } = req.body;
        const editData = await componentTypeDetails.findOne({ where: { component_type_id: componentTypeId } });
        if (editData) {
            const updateData = await componentTypeDetails.update({
                component_name,
                component_code,
                record_add_By,
            }, { where: { component_type_id: componentTypeId } });
            return res.status(200).send({ code: 200, message: "Component Type Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Component Type ///////////////

exports.get_All_Component_Type = async (req, res) => {
    try {
        const getAllData = await componentTypeDetails.findAll({ where: { component_status: "ACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All Component Type Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Component Type ///////////////

exports.get_ById_Component_Type = async (req, res) => {
    try {
        const componentTypeId = req.params.id;
        const getData = await componentTypeDetails.findOne({ where: { component_type_id: componentTypeId } });
        return res.status(200).send({ code: 200, message: "Fetch Component Type Data Successfully!", data: getData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Component Type ///////////////

exports.delete_Component_Type = async (req, res) => {
    try {
        const componentTypeId = req.params.id;
        const getData = await componentTypeDetails.findOne({ where: { component_type_id: componentTypeId } });
        if (getData) {
            const updated = await componentTypeDetails.update({ component_status: "INACTIVE" }, { where: { component_type_id: componentTypeId } });
            return res.status(200).send({ code: 200, message: "Component Type Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Uppdate Status ///////////////

exports.update_status = async (req, res) => {
    try {
        const component_type_id = req.params.id;
        const getData = await componentTypeDetails.findOne({ where: { component_type_id: component_type_id } })
        if (getData) {
            const update_status = await componentTypeDetails.update({ component_status: "ACTIVE" }, { where: { component_type_id: component_type_id } })
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: update_status });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

/////////////// Update Formula Status ///////////////

exports.Update_Formula_status = async (req, res) => {
    try {
        const component_type_id = req.params.id
        const formula = req.body.formula
        const formula_status = req.body.formula_status
        const getData = await componentTypeDetails.findOne({ where: { component_type_id: component_type_id } })
        if (getData) {
            const update_status = await componentTypeDetails.update({
                formula: formula,
                Formula_status: formula_status
            }, { where: { component_type_id: component_type_id } })
            return res.status(200).send({ code: 200, message: "updated Successfully", data: update_status })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Emp List ///////////////

exports.get_All_Emp_List = async (req, res) => {
    try {
        const getAllData = await userDetials.findAll({
            attributes: ['employee_id', 'employee_code', 'first_name', 'last_name', 'designation', 'department', 'reporting_manager_id',
                'reporting_manager', 'personal_email', 'mobile_number', 'date_of_joining', 'pan_number', 'adhar_number']
        })
        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully!", data: getAllData });
    } catch (error) {
        console.log(error);
        res.status(500).send({ code: 500, message: "Server Error" })
    }
}

exports.Get_All_Data = async (req, res) => {
    try {
        const employeeData = await userDetials.findAll({
            attributes: ["employee_id", "first_name", "last_name", "tatal_ctc", "fixed_ctc", "variable_ctc", "reporting_manager_id", "reporting_manager"]
        });
        const componentData = await componentTypeDetails.findAll({
            attributes: ["formula", "record_add_By", "Formula_status", "component_code", "component_name", "component_type_id", "value"]
        });
        let mainArr = [];
        var mainData = [];

        for (let i = 0; i < employeeData.length; i++) {
            for (let j = 0; j < componentData.length; j++) {

                let fixed_ctc;
                let dqsarr = [];
                let formullamount = componentData[j].formula;
                formullamount.filter((item) => {
                    if (typeof (item) == "string") {
                        let itemdata = item.startsWith("DQS")
                        if (itemdata == true) {
                            dqsarr.push(item)
                        }
                    }
                })
                if (dqsarr.length > 1) {
                    for (let k = 0; k < dqsarr.length; k++) {
                        let fixdata = dqsarr[k]
                        const formuladata = await salary_structureDetail.findOne({ where: { compoentCode: fixdata } })
                        let Arr;
                        if (formuladata) {
                            fixed_ctc = formuladata.amount
                            let data = formullamount.indexOf(fixdata);
                            formullamount[data] = fixed_ctc;

                            Arr = formullamount
                        } else {
                            fixed_ctc = fixdata
                            componentData[componentData.length - 1] = componentData[k]
                            continue
                        }
                    }
                }
                const fixed_ctcData = componentData[j].formula[0];
                let fixdata = componentData[j].formula[0];
                if (fixdata == "fixed_ctc") {
                    fixed_ctc = employeeData[i].fixed_ctc
                }
                else if (fixdata == "variable_ctc") {
                    fixed_ctc = employeeData[i].variable_ctc
                }
                else if (typeof (fixdata) == "string") {
                    if (fixdata.startsWith("DQS")) {
                        const formuladata = await salary_structureDetail.findOne({
                            where: { compoentCode: fixdata },
                        })
                        if (formuladata) {
                            fixed_ctc = formuladata.amount
                        } else {
                            fixed_ctc = fixdata
                            componentData[componentData.length - 1] = componentData[j]
                            continue
                        }
                    } else {
                        fixed_ctc = fixdata
                    }
                } else {
                    fixed_ctc = fixdata
                }

                let indexData = formullamount.indexOf(fixdata);
                formullamount[indexData] = fixed_ctc;
                let Arr = formullamount
                let ele = Arr.toString().replaceAll(',', ' ')
                let amount = math.evaluate(ele)
                let componentId = componentData[j].component_type_id
                const salaryExitsdata = await salary_structureDetail.findOne({
                    where: {
                        compoentCode: componentData[j].component_code,
                        emp_id: employeeData[i].employee_id,
                    }
                })
                if (salaryExitsdata) {
                    await salary_structureDetail.update({
                        emp_id: salaryExitsdata.employee_id,
                        amount: amount,
                        componentTypeid: componentId,
                        compoentCode: componentData[j].component_code
                    }, { where: { emp_id: salaryExitsdata.emp_id, compoentCode: componentData[j].component_code } })
                    mainArr.push(salaryExitsdata)
                } else {
                    const All_Data = await salary_structureDetail.create({
                        emp_id: employeeData[i].employee_id,
                        amount: amount,
                        componentTypeid: componentId,
                        compoentCode: componentData[j].component_code
                    })
                    mainArr.push(All_Data)
                }
            }
            let obj = {
                employee_id: employeeData[i].employee_id,
                first_name: employeeData[i].first_name,
                last_name: employeeData[i].last_name,
                tatal_ctc: employeeData[i].tatal_ctc,
                fixed_ctc: employeeData[i].fixed_ctc,
                variable_ctc: employeeData[i].variable_ctc,
                componentCalculations: mainArr
            }
            // formullamount[indexData]=""
            mainArr = []
            mainData.push(obj)
        }
        // const maindata = await salary_structureDetail.findAll()
        if (mainData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully!", data: mainData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All CTC ///////////////
exports.Get_All_CTC = async (req, res) => {
    try {
        if(req.body.month==undefined &&    req.body.year==undefined){
        let whereCond = {}
        if(req.query.emp_id){
            whereCond = { employee_id: req.query.emp_id }
        }
        const [employeeData, componentData] = await Promise.all([
            userDetials.findAll({
                attributes: [
                    'employee_id',
                    'first_name',
                    'last_name',
                    'tatal_ctc',
                    'fixed_ctc',
                    'variable_ctc'
                ],
                where: whereCond
            }),
            componentTypeDetails.findAll({
                attributes: ['formula', 'component_code', 'component_type_id', 'component_name'],
                where: { component_status: 'ACTIVE' }
            })
        ]);

        const mainData = [];

        const emp_bonus = await bonusDetails.findAll({attributes:['add_multiplr_user','bonus_amount','bonus_date']})
        const AllempBonusData = []
        for(j in emp_bonus){
            if(emp_bonus[j] && emp_bonus[j].add_multiplr_user && emp_bonus[j].add_multiplr_user.length > 0){
                const bonusDate = emp_bonus[j].bonus_date.split('-')
                for(var i in emp_bonus[j].add_multiplr_user){
                    if(bonusDate[1][1] == req.query.month){
                        AllempBonusData.push({emp_id:emp_bonus[j].add_multiplr_user[i].employee_id,bonus:emp_bonus[j].bonus_amount})
                    }
                    
                }
            }
        }
        for (const employee of employeeData) {
            const employeeId = employee.employee_id;
            const advance_payment = await advancePaymentDetails.findOne({ where: { employee_id: employeeId } });
            const leave_applies = await leaveApplyDetails.findAll({ attributes: ['start_date', 'end_date', 'leave_count'], where: { employee_id: employeeId } });
            
            
            // return
            const componentCalculations = [];
            let fixed_ctc = (employee.fixed_ctc == null) ? 0 : employee.fixed_ctc;

            const componentAmounts = {}; // Dictionary to store calculated amounts for each component code

            for (const component of componentData) {
                const formula = component.formula;
                const formulaValues = formula.map(element => {
                    if (element.startsWith('DQS')) {
                        const componentCode = element; // Assuming component codes are like DQS1, DQS2, ...
                        return componentAmounts[componentCode] || 0; // Use calculated amount or 0 if not calculated yet
                    } else if (element === 'fixed_ctc') {
                        return fixed_ctc;
                    } else {
                        return element;
                    }
                });

                const formulaString = formulaValues.join(' ');
                const sanitizedFormula = formulaString.replace(/\s+/g, ''); // Remove all spaces
                const calculatedAmount = math.evaluate(sanitizedFormula);

                // Store calculated amount in the dictionary
                componentAmounts[component.component_code] = calculatedAmount;

                componentCalculations.push({
                    component_code: component.component_code,
                    formula:component.formula,
                    amount: calculatedAmount,
                    amount: calculatedAmount/12,
                    componentCode: component.component_name
                });
                let pfCalculation = 0
                if(component.component_name == 'Basic Salary'){
                    if(calculatedAmount/12 <= 15000){
                        pfCalculation = (calculatedAmount/12)*0.12
                    }else{
                        pfCalculation = 1800
                    }
                    componentCalculations.push({
                        amount: pfCalculation,
                        componentCode: 'Pf'
                    });
                }
                
            }

            let basicSalary = componentCalculations[0].amount;

            if (advance_payment && advance_payment.installment_data) {
                // Iterate through the salary details array
                for (const detail of advance_payment.installment_data) {
                    if (detail.status === 'PAID') {
                        basicSalary -= detail.installment; // Subtract the installment from the basic salary
                    }
                }
            }

            
            
            const totalCTC = employee.tatal_ctc;
            
            const yearQueryParam = req.query.year;
            const monthQueryParam = req.query.month;

            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();

            const year = yearQueryParam ? parseInt(yearQueryParam) : currentYear;
            const month = monthQueryParam ? parseInt(monthQueryParam) - 1 : currentMonth;


            let monthlyCTCAfterLeaves = calculateMonthlyCTCAfterLeaves(totalCTC, leave_applies, year, month);
            const targetEmployee = AllempBonusData.find(employee => employee.emp_id === employeeId);
            if(targetEmployee && targetEmployee.bonus){
                monthlyCTCAfterLeaves+=targetEmployee.bonus
            }
            
            mainData.push({
                employee_id: employeeId,
                firstName: employee.first_name,
                lastName: employee.last_name,
                totalCTC: monthlyCTCAfterLeaves,
                fixed_ctc: employee.fixed_ctc,
                variable_ctc: employee.variable_ctc,
                componentCalculations: componentCalculations
            });
        }


        if (mainData.length > 0) {
            return res.status(200).send({ code: 200, message: 'Fetch All Data Successfully!', data: mainData });
        } 
    }
    else if(req.body.month !==undefined && req.body.year !==undefined){ 
        let month=parseInt(req.body.month)
        let year=parseInt(req.body.year)
        let Total_Days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
        const employe_id_data=await userDetials.findAll({where:{status:"ACTIVE"},
        attributes:['employee_id']})
        let Arr=[]
        let start_date=(req.body.year +"-" +req.body.month+"-"+`1`)
        let End_Date=(req.body.year +"-" +req.body.month+"-"+`31`)
        for(let i=0;i<employe_id_data.length;i++){

            let data={
                "employee_id":employe_id_data[i],
                "":""
            }
        }
        res.status(200).send({code:200, message: "Total CTC by Month",data:employe_id_data})
    }
        else {
            return res.status(404).send({ code: 404, message: 'Record Not Found' });
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: 'Server Error' });
    }
};

function calculateMonthlyCTCAfterLeaves(totalCTC, leaves, year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthlySalary = totalCTC / 12;
    const dailySalary = monthlySalary / daysInMonth;

    let leaveCountInMonth = 0;
    for (const leave of leaves) {
        const startDate = new Date(leave.start_date);
        const endDate = new Date(leave.end_date);

        if (
            startDate.getFullYear() === year &&
            startDate.getMonth() === month &&
            endDate.getFullYear() === year &&
            endDate.getMonth() === month
        ) {
            leaveCountInMonth += leave.leave_count;
        }
    }
    const workDays = daysInMonth - leaveCountInMonth;
    const monthlyCTCAfterLeaves = workDays * dailySalary;

    return monthlyCTCAfterLeaves;
}

exports.get_ById_Monthly_Data = async (req, res) => {
    try {
        const employeeId = req.params.employee_id;
        const getData = await userDetials.findAll()
        const getAllData = await leaveApplyDetails.findAll({ where: { leave_apply_status: "APPROVED" } });
        const calculateEmpLeaves = (leaveData) => {
            let totalLeave = 0;
            let leaveOfEL = 0;
            let empData = {}
            for (let lv of leaveData) {
                for (let user of getData) {
                    if (lv.employee_id === user.employee_id) {
                        totalLeave += lv.leave_count
                        if (lv.leave_type === "EL") {
                            leaveOfEL = lv.total_days / 12
                        }
                        empData.employee_id = lv.employee_id,
                            empData.first_name = user.first_name,
                            empData.last_name = user.last_name,
                            empData.date_of_joining = user.date_of_joining,
                            empData.designation = user.designation,
                            empData.total_leave = totalLeave,
                            empData.paid_leave = leaveOfEL,
                            empData.unpaid_leave = totalLeave - leaveOfEL,
                            empData.present_day = 30 - totalLeave,
                            empData.absent_day = totalLeave - leaveOfEL
                    }
                }
                return empData
            }
        }
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: calculateEmpLeaves(getAllData) })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getbyGet_All_CTC = async (req, res) => {
    try {
        let employee_id = parseInt(req.params.employee_id)
        const employeeData = await leaveApplyDetails.findOne({
            where: { employee_id: employee_id },
        });

        const componentData = await componentTypeDetails.findAll({
            attributes: ["formula", "record_add_By", "Formula_status", "component_code", "component_name", "component_type_id", "value"]
        });
        let mainArr = [];
        let mainData = [];

        for (let j = 0; j < componentData.length; j++) {

            let fixed_ctc;
            let dqsarr = [];
            let formullamount = componentData[j].formula;
            formullamount.filter((item) => {
                if (typeof (item) == "string") {
                    let itemdata = item.startsWith("DQS")
                    if (itemdata == true) {
                        dqsarr.push(item)
                    }
                }
            })
            if (dqsarr.length > 1) {
                for (let k = 0; k < dqsarr.length; k++) {
                    let fixdata = dqsarr[k]
                    const formuladata = await salary_structureDetail.findOne({ where: { compoentCode: fixdata } })
                    let Arr;
                    if (formuladata) {
                        fixed_ctc = formuladata.amount
                        let data = formullamount.indexOf(fixdata);
                        formullamount[data] = fixed_ctc;
                        Arr = formullamount
                    } else {
                        fixed_ctc = fixdata
                        componentData[componentData.length - 1] = componentData[k]
                        continue
                    }
                }
            }
            let fixdata = componentData[j].formula[0];
            if (fixdata == "fixed_ctc") {
                fixed_ctc = employeeData.fixed_ctc
            }
            else if (fixdata == "variable_ctc") {
                fixed_ctc = employeeData.variable_ctc
            }
            else if (typeof (fixdata) == "string") {
                if (fixdata.startsWith("DQS")) {
                    const formuladata = await salary_structureDetail.findOne({
                        where: { compoentCode: fixdata },
                    })
                    if (formuladata) {
                        fixed_ctc = formuladata.amount
                    } else {
                        fixed_ctc = fixdata
                        componentData[componentData.length - 1] = componentData[j]
                        continue
                    }
                } else {
                    fixed_ctc = fixdata
                }
            } else {
                fixed_ctc = fixdata
            }

            let indexData = formullamount.indexOf(fixdata);
            formullamount[indexData] = fixed_ctc;
            let Arr = formullamount
            let ele = Arr.toString().replaceAll(',', ' ')
            let amount = math.evaluate(ele)
            let componentId = componentData[j].component_type_id
            const salaryExitsdata = await salary_structureDetail.findOne({
                where: {
                    compoentCode: componentData[j].component_code,
                    emp_id: employeeData.employee_id,
                }
            })
            if (salaryExitsdata) {
                await salary_structureDetail.update({
                    emp_id: salaryExitsdata.emp_id,
                    amount: amount,
                    componentTypeid: componentId,
                    compoentCode: componentData[j].component_code
                }, { where: { emp_id: salaryExitsdata.emp_id, compoentCode: componentData[j].component_code } })
                mainArr.push(salaryExitsdata)
            } else {
                const All_Data = await salary_structureDetail.create({
                    emp_id: employeeData.employee_id,
                    amount: amount,
                    componentTypeid: componentId,
                    compoentCode: componentData[j].component_code
                })
                mainArr.push(All_Data)
            }
        }
        let obj = {
            employee_id: employeeData.employee_id,
            first_name: employeeData.first_name,
            last_name: employeeData.last_name,
            tatal_ctc: employeeData.tatal_ctc,
            fixed_ctc: employeeData.fixed_ctc,
            variable_ctc: employeeData.variable_ctc,

            total_leave: employeeData.totalLeave,
            designation: employeeData.designation,
            total_leave: employeeData.totalLeave,
            paid_leave: leaveOfEL,
            unpaid_leave: totalLeave - leaveOfEL,
            present_day: 30 - totalLeave,
            absent_day: totalLeave - leaveOfEL,
            componentCalculations: mainArr
        }
        mainData.push(obj)
        if (mainData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully!", data: mainData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



exports.updateByAllCTC = async (req, res) => {
    try {
        const employee_id = parseInt(req.params.employee_id);
        let data = req.body.data;

        for (let i = 0; i < data.componentData.length; i++) {
            const getData = await salary_structureDetail.findOne({
                where: {
                    emp_id: employee_id,
                    componentTypeid: data.componentData[i].component_type_id,
                }
            })
            if (getData) {
                await salary_structureDetail.update({
                    amount: data.componentData[i].amount
                }, {
                    where: {
                        componentTypeid: data.componentData[i].component_type_id,
                        emp_id: data.employee_id,
                    }
                })
            }
        }
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


exports.salaryCalculate=async(req,res)=>{
    try {
        if(req.body.month==undefined && req.body.year==undefined){
        let whereCond = {}
        if(req.query.emp_id){
            whereCond = { employee_id: req.query.emp_id }
        }
        const [employeeData, componentData] = await Promise.all([
            userDetials.findAll({
                attributes: [
                    'employee_id',
                    'first_name',
                    'last_name',
                    'tatal_ctc',
                    'fixed_ctc',
                    'variable_ctc'
                ],
                where: whereCond
            }),
            componentTypeDetails.findAll({
                attributes: ['formula', 'component_code', 'component_type_id', 'component_name'],
                where: { component_status: 'ACTIVE' }
            })
        ]);

        const mainData = [];

        const emp_bonus = await bonusDetails.findAll({attributes:['add_multiplr_user','bonus_amount','bonus_date']})
        const AllempBonusData = []
        for(j in emp_bonus){
            if(emp_bonus[j] && emp_bonus[j].add_multiplr_user && emp_bonus[j].add_multiplr_user.length > 0){
                const bonusDate = emp_bonus[j].bonus_date.split('-')
                for(var i in emp_bonus[j].add_multiplr_user){
                    if(bonusDate[1][1] == req.query.month){
                        AllempBonusData.push({emp_id:emp_bonus[j].add_multiplr_user[i].employee_id,bonus:emp_bonus[j].bonus_amount})
                    }
                    
                }
            }
        }
        // return
        for (const employee of employeeData) {
            const employeeId = employee.employee_id;
            const advance_payment = await advancePaymentDetails.findOne({ where: { employee_id: employeeId } });
            const leave_applies = await leaveApplyDetails.findAll({ attributes: ['start_date', 'end_date', 'leave_count'], where: { employee_id: employeeId } });
            
            
            // return
            const componentCalculations = [];
            let fixed_ctc = (employee.fixed_ctc == null) ? 0 : employee.fixed_ctc;

            const componentAmounts = {}; // Dictionary to store calculated amounts for each component code

            for (const component of componentData) {
                const formula = component.formula;
                const formulaValues = formula.map(element => {
                    if (element.startsWith('DQS')) {
                        const componentCode = element; // Assuming component codes are like DQS1, DQS2, ...
                        return componentAmounts[componentCode] || 0; // Use calculated amount or 0 if not calculated yet
                    } else if (element === 'fixed_ctc') {
                        return fixed_ctc;
                    } else {
                        return element;
                    }
                });

                const formulaString = formulaValues.join(' ');
                const sanitizedFormula = formulaString.replace(/\s+/g, ''); // Remove all spaces
                const calculatedAmount = math.evaluate(sanitizedFormula);

                // Store calculated amount in the dictionary
                componentAmounts[component.component_code] = calculatedAmount;

                componentCalculations.push({
                    component_code: component.component_code,
                    formula:component.formula,
                    amount: calculatedAmount,
                    amount: calculatedAmount/12,
                    componentCode: component.component_name
                });
                let pfCalculation = 0
                if(component.component_name == 'Basic Salary'){
                    if(calculatedAmount/12 <= 15000){
                        pfCalculation = (calculatedAmount/12)*0.12
                    }else{
                        pfCalculation = 1800
                    }
                    componentCalculations.push({
                        amount: pfCalculation,
                        componentCode: 'Pf'
                    });
                }
                
            }

            let basicSalary = componentCalculations[0].amount;

            if (advance_payment && advance_payment.installment_data) {
                // Iterate through the salary details array
                for (const detail of advance_payment.installment_data) {
                    if (detail.status === 'PAID') {
                        basicSalary -= detail.installment; // Subtract the installment from the basic salary
                    }
                }
            }

            
            
            const totalCTC = employee.tatal_ctc;
            
            const yearQueryParam = req.query.year;
            const monthQueryParam = req.query.month;

            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();

            const year = yearQueryParam ? parseInt(yearQueryParam) : currentYear;
            const month = monthQueryParam ? parseInt(monthQueryParam) - 1 : currentMonth;


            let monthlyCTCAfterLeaves = calculateMonthlyCTCAfterLeaves(totalCTC, leave_applies, year, month);
            const targetEmployee = AllempBonusData.find(employee => employee.emp_id === employeeId);
            if(targetEmployee && targetEmployee.bonus){
                monthlyCTCAfterLeaves+=targetEmployee.bonus
            }
            var bonus_amt=0
            // for(let i=0;i<bonus_amt;i++){
            mainData.push({
                employee_id: employeeId,
                firstName: employee.first_name,
                lastName: employee.last_name,
                totalCTC: monthlyCTCAfterLeaves,
                fixed_ctc: employee.fixed_ctc,
                variable_ctc: employee.variable_ctc,
                componentCalculations: componentCalculations
            });
        }


        if (mainData.length > 0) {
            return res.status(200).send({ code: 200, message: 'Fetch All Data Successfully!', data: mainData });
        } 
    }
    else if(req.body.month !==undefined && req.body.year !==undefined){ 
        let month=parseInt(req.body.month)
        let year=parseInt(req.body.year)
        let Total_Days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
        const employe_id_data=await userDetials.findAll({where:{status:"ACTIVE"},
        attributes:['employee_id']})
        let Arr=[]
        let start_date=(req.body.year +"-" +req.body.month+"-"+`1`)
        let End_Date=(req.body.year +"-" +req.body.month+"-"+`31`)
        for(let i=0;i<employe_id_data.length;i++){

            let data={
                "employee_id":employe_id_data[i],
                "":""
            }
        }
        res.status(200).send({code:200, message: "Total CTC by Month",data:employe_id_data})
    }
        else {
            return res.status(404).send({ code: 404, message: 'Record Not Found' });
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message:"Internal Server"})
    }
}

exports.salaryCalculate_byid=async(req,res)=>{
    try{
        const employee_id=req.params.id
        const filter=req.params.date
        const user_data=await userDetials.findOne({where:{employee_id:employee_id},
            attributes: [
                'employee_id',
                'first_name',
                'last_name',
                'tatal_ctc',
                'fixed_ctc',
                'variable_ctc'
            ],
        })
        const componentData=await componentTypeDetails.findAll({where:{component_status:"ACTIVE"}})
        let bonus_data=await bonusDetails.findOne({where:{bonus_date:filter}})
        var bonus_amt=0;
        if(bonus_data){
            for(let i=0;i<bonus_data.add_multiplr_user.length;i++){
                const emp_bonus_id=parseInt(bonus_data.add_multiplr_user[i].employee_id)
                
                if(emp_bonus_id==employee_id){
                bonus_amt=bonus_data.bonus_amount
                }
                
            } 
        }
        let componentCalculations=[]
        const componentAmounts = {}
            // const employeeId = employee.employee_id;
        let fixed_ctc = (user_data.fixed_ctc == null) ? 0 : user_data.fixed_ctc;
        for (const component of componentData) {
            const formula = component.formula;
            const formulaValues = formula.map(element => {
                if (element.startsWith('DQS')) {
                    const componentCode = element; // Assuming component codes are like DQS1, DQS2, ...
                    return componentAmounts[componentCode] || 0; // Use calculated amount or 0 if not calculated yet
                } else if (element === 'fixed_ctc') {
                    return fixed_ctc;
                } else {
                    return element;
                }
            });

            const formulaString = formulaValues.join(' ');
            const sanitizedFormula = formulaString.replace(/\s+/g, ''); // Remove all spaces
            const calculatedAmount = math.evaluate(sanitizedFormula);

            // Store calculated amount in the dictionary
            componentAmounts[component.component_code] = calculatedAmount;

            componentCalculations.push({
                component_code: component.component_code,
                formula:component.formula,
                amount: calculatedAmount,
                amount: calculatedAmount/12,
                componentCode: component.component_name,
            });
            let pfCalculation = 0
            if(component.component_name == 'Basic Salary'){
                if(calculatedAmount/12 <= 15000){
                    pfCalculation = (calculatedAmount/12)*0.12
                }else{
                    pfCalculation = 1800
                }
                componentCalculations.push({
                    amount: pfCalculation,
                    componentCode: 'Pf'
                });
            }
            
        }
        componentCalculations.push({Bonus_amount:bonus_amt})
        return res.status(200).send({code:200,message:"Employee Data",data:componentCalculations})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code:500, message:"Internal Server"})
    }
}


exports.get_employee_salary_byid=async(req,res)=>{
    try{
        const employee_id=req.params.id
        const user_data=await userDetials.findOne({where:{employee_id:employee_id},
            attributes: [
                'employee_id',
                'first_name',
                'last_name',
                'tatal_ctc',
                'fixed_ctc',
                'variable_ctc'
            ],  
        })
        const componentData=await componentTypeDetails.findAll({where:{component_status:"ACTIVE"}})
      
        let componentCalculations=[]
        const componentAmounts = {}
            // const employeeId = employee.employee_id;
        let fixed_ctc = (user_data.fixed_ctc == null) ? 0 : user_data.fixed_ctc;
        for (const component of componentData) {
            const formula = component.formula;
            const formulaValues = formula.map(element => {
                if (element.startsWith('DQS')) {
                    const componentCode = element; // Assuming component codes are like DQS1, DQS2, ...
                    return componentAmounts[componentCode] || 0; // Use calculated amount or 0 if not calculated yet
                } else if (element === 'fixed_ctc') {
                    return fixed_ctc;
                } else {
                    return element;
                }
            });

            const formulaString = formulaValues.join(' ');
            const sanitizedFormula = formulaString.replace(/\s+/g, ''); // Remove all spaces
            const calculatedAmount = math.evaluate(sanitizedFormula);

            // Store calculated amount in the dictionary
            componentAmounts[component.component_code] = calculatedAmount;

            componentCalculations.push({
                component_code: component.component_code,
                formula:component.formula,
                amount: calculatedAmount,
                amount: calculatedAmount/12,
                componentCode: component.component_name,
            });
            let pfCalculation = 0
            if(component.component_name == 'Basic Salary'){
                if(calculatedAmount/12 <= 15000){
                    pfCalculation = (calculatedAmount/12)*0.12
                }else{
                    pfCalculation = 1800
                }
                componentCalculations.push({
                    amount: pfCalculation,
                    componentCode: 'Pf'
                });
            }
            
        }

        return res.status(200).send({code:200,message:"Employee Data",data:componentCalculations})
    }
    catch(error){
        console.log("Internal Server Error")
    }
}
exports.get_emp_salary_by_month=async(req,res)=>{
    try{
        const month_date=req.params.date;
        let whereCond = {}
        if(req.query.emp_id){
            whereCond = { employee_id: req.query.emp_id }
        }
        const [employeeData, componentData] = await Promise.all([
            userDetials.findAll({
                attributes: [
                    'employee_id',
                    'first_name',
                    'last_name',
                    'tatal_ctc',
                    'fixed_ctc',
                    'variable_ctc'
                ],
                where: whereCond
            }),
            componentTypeDetails.findAll({
                attributes: ['formula', 'component_code', 'component_type_id', 'component_name'],
                where: { component_status: 'ACTIVE' }
            })
        ]);

        const mainData = [];

        const emp_bonus = await bonusDetails.findAll({where:{bonus_date:month_date}},{attributes:['add_multiplr_user','bonus_amount','bonus_date','BonusType']})
        const AllempBonusData = []
        for(j in emp_bonus){
            if(emp_bonus[j] && emp_bonus[j].add_multiplr_user && emp_bonus[j].add_multiplr_user.length > 0){
                const bonusDate = emp_bonus[j].bonus_date.split('-')
                for(var i in emp_bonus[j].add_multiplr_user){
                    if(bonusDate[1][1] == req.query.month){
                        AllempBonusData.push({emp_id:emp_bonus[j].add_multiplr_user[i].employee_id,bonus:emp_bonus[j].bonus_amount})
                    }
                    
                }
            }
        }
        for (const employee of employeeData) {
            const employeeId = employee.employee_id;
            const advance_payment = await advancePaymentDetails.findOne({ where: { employee_id: employeeId } });
            const leave_applies = await leaveApplyDetails.findAll({ attributes: ['start_date', 'end_date', 'leave_count'], where: { employee_id: employeeId } });
            
            
            // return
            const componentCalculations = [];
            let fixed_ctc = (employee.fixed_ctc == null) ? 0 : employee.fixed_ctc;

            const componentAmounts = {}; // Dictionary to store calculated amounts for each component code

            for (const component of componentData) {
                const formula = component.formula;
                const formulaValues = formula.map(element => {
                    if (element.startsWith('DQS')) {
                        const componentCode = element; // Assuming component codes are like DQS1, DQS2, ...
                        return componentAmounts[componentCode] || 0; // Use calculated amount or 0 if not calculated yet
                    } else if (element === 'fixed_ctc') {
                        return fixed_ctc;
                    } else {
                        return element;
                    }
                });

                const formulaString = formulaValues.join(' ');
                const sanitizedFormula = formulaString.replace(/\s+/g, ''); // Remove all spaces
                const calculatedAmount = math.evaluate(sanitizedFormula);

                // Store calculated amount in the dictionary
                componentAmounts[component.component_code] = calculatedAmount;

                componentCalculations.push({
                    component_code: component.component_code,
                    formula:component.formula,
                    amount: calculatedAmount,
                    amount: calculatedAmount/12,
                    componentCode: component.component_name
                });
                let pfCalculation = 0
                if(component.component_name == 'Basic Salary'){
                    if(calculatedAmount/12 <= 15000){
                        pfCalculation = (calculatedAmount/12)*0.12
                    }else{
                        pfCalculation = 1800
                    }
                    componentCalculations.push({
                        amount: pfCalculation,
                        componentCode: 'Pf'
                    });
                }
                
            }

            let basicSalary = componentCalculations[0].amount;

            if (advance_payment && advance_payment.installment_data) {
                // Iterate through the salary details array
                for (const detail of advance_payment.installment_data) {
                    if (detail.status === 'PAID') {
                        basicSalary -= detail.installment; // Subtract the installment from the basic salary
                    }
                }
            }

            
            
            const totalCTC = employee.tatal_ctc;
            
            const yearQueryParam = req.query.year;
            const monthQueryParam = req.query.month;

            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();

            const year = yearQueryParam ? parseInt(yearQueryParam) : currentYear;
            const month = monthQueryParam ? parseInt(monthQueryParam) - 1 : currentMonth;


            let monthlyCTCAfterLeaves = calculateMonthlyCTCAfterLeaves(totalCTC, leave_applies, year, month);
            const targetEmployee = AllempBonusData.find(employee => employee.emp_id === employeeId);
            if(targetEmployee && targetEmployee.bonus){
                monthlyCTCAfterLeaves+=targetEmployee.bonus
            }
            var bonus_amt=0
            // let emp_bonus=await bonusDetails.findAll()
            // for(let i=0;i<bonus_amt;i++){
            mainData.push({
                employee_id: employeeId,
                firstName: employee.first_name,
                lastName: employee.last_name,
                totalCTC: monthlyCTCAfterLeaves,
                fixed_ctc: employee.fixed_ctc,
                variable_ctc: employee.variable_ctc,
                componentCalculations: componentCalculations
            });
            
        }
        if (mainData.length > 0) {
            return res.status(200).send({ code: 200, message: 'Fetch All Data Successfully!', data: mainData });
        } 
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code:500, message:"Internal Server"})
    }
}
exports.get_bonus=async(req,res)=>{
    try{
        const date=req.params.date
        const bonus_data=await bonusDetails.findAll({where:{bonus_date:date}})
        if(bonus_data){
            // for(let i=0;i<bonus_data.length;i++){
            //     for(let j=0;j<bonus_data[i].add_multiplr_user.length;i++){
            //     }
                
            // }
            bonus_data.forEach(i=>{
                i.add_multiplr_user.forEach(j=>{
                })
            })
            return res.status(200).send({ code: 200, message:"bonus",data: bonus_data})
        }
        else{
            return res.status(404).send({ code:404, message:"No Bonus Found On Month"})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code:500, message:"Internal Server"})
    }
}