const db = require("../../models/index");
const Sequelize = require('sequelize')
const financialYear = db.tbl_financialYear;

//============= Create Financial Year ==============//

exports.createFinancialYear = async (req, res) => {
    try {
        const {
            financialYearValue,
        } = req.body
        const createData = await financialYear.create({
            financialYearValue,
        })
        return res.status(200).send({
            code: 200, message: "Financial Year Create Successfully",
            data: createData
        })
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" })
    }
}

//=============== Update Financial Year ===============//

exports.updateFinancialYear = async (req, res) => {
    try {
        const id = req.params.financialYear_id
        const {
            financialYearValue,
        } = req.body
        const editData = await financialYear.findOne({
            where: {
                FinancialYear_id: id,
                isDeleted: false
            }
        })
        if (editData) {
            const updateData = await financialYear.update({
                financialYearValue,
            },
                {
                    where: {
                        FinancialYear_id: id
                    }
                })
            return res.status(200).send({
                code: 200,
                message: "Financial Year Updated Successfully",
                data: updateData
            })
        } else {
            return res.status(422).json({ code: 422, message: "Invalid Data" })
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ code: 500, message: error.message || "Server Error" })
    }
}

//================= Get All Financial Year ==================//

exports.getAllFinancialYear = async (req, res) => {
    try {
        const allData = await financialYear.findAll({
            where: {
                isDeleted: false,
            }
        })
        return res.status(200).send({
            code: 200,
            message: "All Financial Year Fetched Successfully!",
            data: allData
        })
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" })
    }
}

//================== Get Financial Year By Id ==================//

exports.getFinancialYearById = async (req, res) => {
    try {
        const id = req.params.financialYear_id
        const data = await financialYear.findOne({
            where: {
                FinancialYear_id: id,
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

//================= Delete Financial Year ===================//

exports.deteleFinancialYear = async (req, res) => {
    try {
        const id = req.params.financialYear_id
        const getAsset = await financialYear.findOne({
            where: {
                FinancialYear_id: id,
                isDeleted: false
            }
        })
        if (getAsset) {
            const updateAsset = await financialYear.update({
                isDeleted: true
            },
                {
                    where: {
                        financialYear_id: id
                    }
                }
            )
            return res.status(200).send({
                code: 200,
                message: "Financial Year Deleted Successfully",
                data: updateAsset
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

//============= Update Status of Financial Year ==============//

exports.FinancialYearStatus = async (req, res) => {
    try {
        const id = req.params.financialYear_id;
        const { status } = req.body;
        const getData = await financialYear.findOne({
            where: {
                FinancialYear_id: id,
                isDeleted: false
            }
        });
        if (getData) {
            const updated = await financialYear.update(
                {
                    status
                },
                {
                    where: {
                        financialYear_id: id
                    }
                }
            );
            return res.status(200).send({
                code: 200,
                message: "Financial Year Status Change Successfully!",
                data: updated
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};