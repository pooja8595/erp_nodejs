const db = require("../../../models/index");
const advancePaymentDetails = db.advancePaymentDetail;
const userDetails = db.user;

/////////////// Create Advance Payment ///////////////

exports.create_Advance_Payment = async (req, res) => {
    try {
        const { employee_id, advance_amount, created_by, department, employee_name, employee_code, installment_start_date,
            installment_duration, installment_data, description } = req.body;
        if (employee_id) {
            const employeeData = await userDetails.findOne({ where: { employee_id: employee_id } })
            if (employeeData) {
                const response = await advancePaymentDetails.create({
                    employee_id,
                    advance_amount,
                    created_by,
                    department,
                    employee_name,
                    employee_code,
                    installment_start_date,
                    installment_duration,
                    installment_data,
                    description
                });
                return res.status(200).send({ code: 200, message: "Advance Payment Created Successfully!", data: response });
            } else {
                return res.status(405).send({ code: 405, message: `Employee Id is not available for ${employee_id}` });
            }
        } else {
            return res.status(400).send({ code: 400, message: "Employee Id is Required" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Advance Payment ///////////////

exports.edit_Advance_Payment = async (req, res) => {
    try {
        const advancePaymentId = req.params.id;
        const { employee_id, advance_amount, created_by, department, employee_name, employee_code, installment_start_date,
            installment_duration, installment_data, description } = req.body;
        const findData = await advancePaymentDetails.findOne({ where: { advance_payment_id: advancePaymentId } })
        if (findData) {
            const updateData = await advancePaymentDetails.update(
                {
                    employee_id,
                    advance_amount,
                    created_by,
                    department,
                    employee_name,
                    employee_code,
                    installment_start_date,
                    installment_duration,
                    installment_data,
                    description
                },
                { where: { advance_payment_id: advancePaymentId } }
            )
            return res.status(200).send({ code: 200, message: "Advance Payment Update Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Installment Status ///////////////

exports.edit_Installment_Status = async (req, res) => {
    try {
        const advancePaymentId = req.params.id;
        const getData = await advancePaymentDetails.findOne({ where: { advance_payment_id: advancePaymentId } })
        let ind = req.body.index;
        let updateVal = "PAID";
        let modifyed;
        const updatePaymentDue = (index, value) => {
            getData.installment_data[index].installment_status = value;
            modifyed = getData.installment_data
        }
        updatePaymentDue(ind, updateVal)
        const updateData = await advancePaymentDetails.update({
            installment_data: modifyed
        }, { where: { advance_payment_id: advancePaymentId } })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Installment Status Data Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Advance Payment ///////////////

exports.get_ById_Advance_Payment = async (req, res) => {
    try {
        const advancePaymentId = req.params.id;
        const getData = await advancePaymentDetails.findOne({ where: { advance_payment_id: advancePaymentId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Advance Payment Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Advance Payment ///////////////

exports.get_All_Advance_Payment = async (req, res) => {
    try {
        const getData = await advancePaymentDetails.findAll({ where: { status: "ACTIVE" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Advance Payment Data Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Install Advance Payment ///////////////

exports.get_All_Install_Advance_Payment = async (req, res) => {
    try {
        const getAllData = await advancePaymentDetails.findAll()
        let array = []
        for (let i = 0; i < getAllData.length; i++) {
            for (let j = 0; j < getAllData[i].installment_data.length; j++) {
                var obj = {
                    "advance_payment_id": getAllData[i].advance_payment_id,
                    "employee_id": getAllData[i].employee_id,
                    "advance_amount": getAllData[i].advance_amount,
                    "created_by": getAllData[i].created_by,
                    "department": getAllData[i].department,
                    "employee_name": getAllData[i].employee_name,
                    "employee_code": getAllData[i].employee_code,
                    "installment_start_date": getAllData[i].installment_start_date,
                    "installment_duration": getAllData[i].installment_duration,
                    "installment_data": getAllData[i].installment_data[j].month,
                    "installment_status": getAllData[i].installment_data[j].installment_status,
                    "installment": getAllData[i].installment_data[j].installment,
                    "remaining": "",
                    "description": getAllData[i].description,
                    "status": getAllData[i].status,
                    "createdAt": getAllData[i].createdAt,
                    "updatedAt": getAllData[i].updatedAt
                }
                if (getAllData[i].installment_data[j].month == req.body.month) {
                    array.push(obj)
                }
            }
        }
        
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Install Advance Payment Data Successfully!", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Advance Payment ///////////////

exports.delete_Advance_Payment = async (req, res) => {
    try {
        const advancePaymentId = req.params.id;
        const getData = await advancePaymentDetails.findOne({ where: { advance_payment_id: advancePaymentId } });
        if (getData) {
            const updated = await advancePaymentDetails.update({ status: "INACTIVE" }, { where: { advance_payment_id: advancePaymentId } });
            return res.status(200).send({ code: 200, message: "Advance Payment Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};