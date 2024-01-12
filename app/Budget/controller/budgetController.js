const db = require("../../models/index");
const budget = db.tbl_budget;
const budgetMapping = db.tbl_budgetMapping;
const RegisterEmployee = db.user;


exports.createBudget = async (req, res) => {
    try {
        const {
            financialYear_id, department_id, type, budgetAllocatedDate, amount, employee_id
        } = req.body;
        let budget_id;
        let allocated;
        let AllocatedBy;
        let createData;

        const findEmp = await RegisterEmployee.findOne({
            where: {
                employee_id: req.body.employee_id
            }
        });
        if (findEmp) {
            const fullName = findEmp.first_name + " " + findEmp.last_name;
            allocated = fullName;
            AllocatedBy = fullName;
        } else {
            return res.status(404).send({
                code: 404,
                message: "Employee Not Found"
            });
        }
        const findData = await budget.findOne({
            where: {
                department_id,
                type,
                financialYear_id
            }
        });
        // if(findData){
        //     return res.status(403).send({ code: 403, message: "Budget is Already Exits!" });
        // }
        if (!findData) {
            createData = await budget.create({
                financialYear_id, department_id, type, budgetAllocated: allocated,
                amount, employee_id
            });
            budget_id = createData.dataValues.budget_id;
        } else {
            const currentAmount = findData.amount;
            const updatedAmount = currentAmount + amount;
            const updateData = await budget.update({
                type, employee_id, budgetAllocated: allocated,
                remainingAmount: updatedAmount,
                // remainingAmount, 
                amount: updatedAmount
            }, {
                where: {
                    budget_id: findData.budget_id
                }
            });
            budget_id = findData.budget_id;
            createMap = await budgetMapping.create({
                budget_id: findData.budget_id, amount,
                budgetAllocatedBy: AllocatedBy, budgetAllocatedDate,
            });
        }
        return res.status(200).send({
            code: 200,
            message: "Budget Create Successfully",
            data: createData,
        });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

exports.getAllBudget = async (req, res) => {
    try {
        const allData = await budget.findAll({
            include: [{
                model: budgetMapping,
                attributes: [
                    "budget_id",
                    "amount",
                    "budgetAllocatedBy",
                    "budgetAllocatedDate"
                ]
            }],
            where: {
                isDeleted: false,
            }
        })
        return res.status(200).send({
            code: 200,
            message: "All Budget Fetched Successfully!",
            data: allData
        })
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" })
    }
}

exports.getBudgetById = async (req, res) => {
    try {
        const id = req.params.budget_id
        const data = await budget.findOne({
            include: [{
                model: budgetMapping,
                attributes: [
                    "budget_id",
                    "amount",
                    "budgetAllocatedBy",
                    "budgetAllocatedDate"
                ]
            }],
            where: {
                budget_id: id,
                isDeleted: false
            }
        })
        if (data) {
            return res.status(200).send({
                code: 200, message: "Data Fetch Successfully",
                data: data
            })
        } else {
            return res.status(404).send({ code: 404, message: "No Record Found" })
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" })
    }
}

exports.BudgetStatus = async (req, res) => {
    try {
        const id = req.params.budget_id;
        const { status } = req.body;
        const getData = await budget.findOne({
            where: {
                budget_id: id,
                isDeleted: false
            }
        });
        if (getData) {
            const updated = await budget.update(
                {
                    status
                },
                {
                    where: {
                        budget_id: id
                    }
                }
            );
            return res.status(200).send({
                code: 200,
                message: "Budget Status Change Successfully!",
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const id = req.params.budget_id;
        const {
            financialYear_id, department_id, type, budgetAllocated, extendedValue,
            budgetAllocatedBy, budgetAllocatedDate, amount, employee_id
        } = req.body;
        const editData = await budget.findOne({
            where: {
                budget_id: id,
                isDeleted: false
            }
        });
        if (editData) {
            const updateData = await budget.update({
                financialYear_id, department_id, type, budgetAllocated, extendedValue,
                budgetAllocatedBy, budgetAllocatedDate, amount, employee_id
            },
                {
                    where: {
                        budget_id: id
                    }
                });
            const createMap = await budgetMapping.update({
                amount,
                budgetAllocatedBy,
                budgetAllocatedDate
            },
                {
                    where: {
                        budget_id: id
                    }
                });
            return res.status(200).send({
                code: 200,
                message: "Budget Updated Successfully",
            });
        } else {
            return res.status(404).send({
                code: 404,
                message: "Budget not found"
            });
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ code: 500, message: error.message || "Server Error" });
    }
};

exports.deteleBudget = async (req, res) => {
    try {
        const id = req.params.budget_id
        const getAsset = await budget.findOne({
            where: {
                budget_id: id,
                isDeleted: false
            }
        })
        if (getAsset) {
            const updateAsset = await budget.update({
                isDeleted: true
            },
                {
                    where: {
                        budget_id: id
                    }
                }
            )
            return res.status(200).send({
                code: 200,
                message: "Budget Deleted Successfully",

            })
        } else {
            return res.status(404).send({
                code: 404, message: "No Record Found"
            })
        }
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ code: 500, message: error.message || "Internal Server Error" })
    }
}
