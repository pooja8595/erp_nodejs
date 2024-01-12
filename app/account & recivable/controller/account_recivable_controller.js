const { where } = require("sequelize");
const db = require("../../models/index");
// const { calculate_billing_site } = require("../../Lead_Managment/controllers/leadManagment.controller");
const make_invoice_Details = db.make_invoice
const inlineInvoice = db.inlineInvoice
const quotation = db.quotation
const leadmanagmentdata = db.LeadManagment
const mandays = db.Mandays
const workdays = db.Mandays
const Op = db.Sequelize.Op;
const Manual_invoice_model = db.Manual_Invoice
/////////////// Create invoice ///////////////

exports.create_manul_invoice = async (req, res) => {
    try {
        const { client_name,
            br_number,
            ICTDate,
            associatedCompany,
            audit_start_date,
            audit_end_date,
            state,
            city,
            creditDays,
            email,
            firstName,
            gst_number,
            wo_verifyOn,
            wo_verifyBy,
            wo_verification_status,
            export_charges,
            customer_type,
            child_name,
            product,
            discription,
            currency,
            total_amount,
            sac_code,
            additonal_charges,
            gst,
            expo_charges,
            lead_genrate_id,
            site_audit,
            associated_company,
            br_number1,
            expo_value,
            mobilePhonenumber,
            gstNumber,
            first_name,
            tableRows,
            jobTitle,
            streetAddress,
            addressLine2,
            status,

        } = req.body;

        if (req.body.customer_type == "New User") {
           

            const response = await make_invoice_Details.create({
                client_name,
                br_number,
                ICTDate,
                associatedCompany,
                audit_start_date,
                audit_end_date,
                state,
                city,
                creditDays,
                email,
                firstName,
                gst_number,
                wo_verifyOn,
                wo_verifyBy,
                wo_verification_status,
                export_charges,
                customer_type,
                child_name,
                product,
                discription,
                currency,
                total_amount,
                sac_code,
                additonal_charges,
                gst,
                expo_charges,
                site_audit,
                associated_company,
                br_number1,
                expo_value,
                mobilePhonenumber,
                gstNumber,
                first_name,
                tableRows,
                jobTitle,
                streetAddress,
                addressLine2,
                lead_genrate_id,
                status,
            });
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });

        }
        else if (req.body.customer_type != "New User") {
            const make_invoiceDetailsData = await leadmanagmentdata.findOne({
                where: { br_number: req.body.br_number }
            });

          

            const response = await make_invoice_Details.create({
                br_number,
                client_name,
                ICTDate,
                associatedCompany,
                audit_start_date,
                audit_end_date,
                state,
                city,
                creditDays,
                email,
                firstName,
                gst_number,
                wo_verifyOn,
                wo_verifyBy,
                wo_verification_status,
                export_charges,
                customer_type,
                child_name,
                product,
                discription,
                lead_genrate_id,
                currency,
                total_amount,
                sac_code,
                additonal_charges,
                gst,
                expo_charges,
                site_audit,
                associated_company,
                br_number1,
                expo_value,
                mobilePhonenumber,
                gstNumber,
                first_name,
                tableRows,
                jobTitle,
                streetAddress,
                addressLine2,
                status,
            });
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit invoice ///////////////

exports.edit_invoice = async (req, res) => {
    try {
        const make_invoice_id = req.params.id;
        const editData = await make_invoice_Details.findOne({ where: { make_invoice_id: make_invoice_id } });
        if (editData) {
            const updateData = await make_invoice_Details.update(req.body, { where: { make_invoice_id: make_invoice_id } });
            return res.status(200).send({ code: 200, message: "Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById invoice ///////////////

exports.invoice_getById = async (req, res) => {
    try {
        const BRnumber = req.params.br_number;
        const getData = await make_invoice_Details.findOne({ where: { br_number: BRnumber } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// get Invoice Detail ///////////////

exports.getinvoice_detail = async (req, res) => {
    try {
        // const lead_generation = req.params.id;
        const lead_generation = parseInt(req.params.lead_generation);
        const getAllData = await leadmanagmentdata.findOne({
            where: { lead_genration_id: lead_generation },
            include: [{
                model: mandays,
                attributes: ["mandays_id", "br_number", "lead_genration_id", "stage", "noOfMandays", "perioed", "createdAt"],
                where: { br_number: req.body.br_number },
            }],
            order: [[{ model: mandays, }, 'createdAt', 'DESC']],
        });
        if (getAllData) {
            let price;
            if (getAllData.agreed_slab_a == "Yes") {
                price = getAllData.slab_quote
            }
            else if (getAllData.agreed_slab_a = "No") {
                price = getAllData.agreed_slab_b
            }
            let mainarr = [];
            let invoiceData;
            for (var i = 0; i < getAllData.workdays.length; i++) {

                let quantity = getAllData.workdays[i].noOfMandays ? getAllData.workdays[i].noOfMandays : 0;

                invoiceData = await inlineInvoice.findAll()
                // if(invoiceData){
                //     await inlineInvoice.update({
                //         lineItem_status: invoiceData.lineItem_status,
                //         item_description: invoiceData.item_description,
                //     },{ where: {invoice_inline_id: getAllData.workdays[i].invoice_inline_id}})
                // }else{
                let invoicelength = invoiceData.length += i + 1
                let newobj = {
                    "item_description": `Syatem Analysis / Stage ${getAllData.workdays ? getAllData.workdays[i].stage : 0}`,
                    "quantity": quantity,
                    "unit": getAllData.workdays[i].perioed,
                    "unitPrice": price,
                    "netAmount": price * quantity,
                    "lineItem": getAllData.workdays[i].perioed,
                    "br_number": getAllData.br_number,
                    "invoice_inline_id": invoicelength,
                    "lineItem_status": invoiceData[i].lineItem_status
                }
                await inlineInvoice.create(newobj)
                // }

                // let invoicelength=invoiceData.length +=i+1
                // let newobj={
                //     // "s.no": workdays[0].,
                //     "item_description":  `Syatem Analysis / Stage ${getAllData.workdays? getAllData.workdays[i].stage: 0}`,
                //     "quantity": quantity,
                //     "unit":   getAllData.workdays[i].perioed,
                //     "unitPrice": price,
                //     "netAmount": price * quantity,
                //     "lineItem": getAllData.workdays[i].perioed,
                //     "br_number":  getAllData.br_number,
                //     "invoice_inline_id": invoicelength,
                //     "lineItem_status":  "invoiceData[i].lineItem_status"
                // }
                // invoiceData= await inlineInvoice.findAll({
                //     where: {lead_genrate_id: lead_generation}
                // })

                // if(!invoiceData){
                //     await inlineInvoice.create(newobj)
                // }

                // mainarr.push(newobj)
            }

            invoiceData = await inlineInvoice.findAll()
            if (invoiceData) {
                invoiceData.map((item) => {
                    if (item.lineItem_status == '1') {
                        item.lineItem_status = true
                    } else {
                        item.lineItem_status = false
                    }
                })
            }

            let finalinvoice = [...invoiceData, ...mainarr]
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: finalinvoice });
        } else {
            return res.status(404).send({ code: 404, message: "Data not found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getinvoice_detail_status = async (req, res) => {
    try {
        const br_number = req.params.br_number;
        const getinvoice_detaildata = await inlineInvoice.findAll({
            where: { lineItem_status: "true" }
        });


        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getinvoice_detaildata });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getinvoice_detail_list = async (req, res) => {
    try {
        const br_number = req.params.br_number;
        const getinvoice_detaildata = await inlineInvoice.findAll({
            where: { br_number: br_number }
        });

        await getinvoice_detaildata.map((item) => {
            if (item.lineItem_status == "true") {
                item.lineItem_status = true
            } else {
                item.lineItem_status = false
            }
        })



        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getinvoice_detaildata });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getByIdinvoice_detail_status = async (req, res) => {
    try {
        const br_number = req.params.br_number;
        const getinvoice_detaildata = await inlineInvoice.findAll({
            where: { lineItem_status: true, br_number: br_number }
        });

        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getinvoice_detaildata });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.createInlineInvoice = async (req, res) => {
    try {
        const { item_description, lead_generation, quantity, lineItem_status, unit, unitPrice, br_number, lineItem } = req.body;

        const br_dataExits = await leadmanagmentdata.findOne({
            where: { br_number: br_number }
        });

        let br_dataExitsdata = br_dataExits ? br_dataExits.br_number : null
        if (br_dataExitsdata !== null) {
            const response = await inlineInvoice.create({
                item_description,
                lead_genrate_id: lead_generation,
                quantity,
                unit,
                unitPrice,
                br_number: br_dataExits.br_number,
                lineItem,
                lineItem_status: lineItem_status ? lineItem_status : false,
                netAmount: unitPrice * quantity,
                inlineInvoice
            });
            return res.status(200).send({ code: 200, message: "create Data Successfully", data: response });
        }
        else {
            return res.status(500).send({ code: 500, message: "Br Not found", data: br_dataExits });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.updateInlineInvoiceStatus = async (req, res) => {
    try {
        const br_number = req.params.br_number;
        const editData = await inlineInvoice.findOne({ where: { br_number: br_number } });
        if (editData) {
            let update_status;
            for (var i = 0; i < req.body.length; i++) {
                update_status = req.body[i].lineItem_status
                if (update_status == 1) {
                    update_status = "true"
                } else {
                    update_status = "false"
                }
                await inlineInvoice.update({
                    lineItem_status: update_status,
                    invoice_inline_id: req.body[i].invoice_inline_id,
                    item_description: req.body[i].item_description,
                    quantity: req.body[i].quantity,
                    unitPrice: req.body[i].unitPrice,
                }, { where: { br_number: br_number, invoice_inline_id: req.body[i].invoice_inline_id } });
            }

            let invoiceData = await inlineInvoice.findAll()



            return res.status(200).send({ code: 200, message: "Updated SuccessFully" });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


////////////// Get All BR ///////////////

exports.getAllBR_invoice = async (req, res) => {
    try {
        let arr = []
        let Ans_Arr = []
        const getAllData = await inlineInvoice.findAll()
        for (let i = 0; i < getAllData.length; i++) {
            arr.push(getAllData[i].br_number)
        }
        const new_data = new Set(arr)
        let new_brNumber = [...new_data]
        let total_Br = 0;
        let invoice_Num = []

        for (let j = 0; j < new_brNumber.length; j++) {

            const Br_Data = await inlineInvoice.findOne({ where: { br_number: new_brNumber[j] } })
            const Br_Data2 = await inlineInvoice.findAll({ where: { br_number: new_brNumber[j] } })
            const Br_Data3 = await leadmanagmentdata.findAll({ where: { br_number: new_brNumber[j] } })

            for (let i = 0; i < Br_Data2.length; i++) {
                invoice_Num.push(Br_Data2[i].invoice_inline_id)
            }
            if (Br_Data.br_number == new_brNumber[j]) {

                // Invoice_num.push(Br_Data2[j].invoice_inline_id)

                total_Br += Br_Data.netAmount;
                const obj = {
                    "Invoice_Number": invoice_Num,
                    "item_description": Br_Data.item_description,
                    "Br_Number": new_brNumber[j],
                    "Net_amount": total_Br,
                    "Unit": Br_Data.unit,
                    "statusInvoice": "Send Finance",
                    "br_Basedata": Br_Data3
                }
                Ans_Arr.push(obj)
            }
        }
        if (Ans_Arr) {
            return res.status(200).send({ code: 200, message: "Fetch All Brand Data Successfully", data: Ans_Arr });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



/////////////// Get ById InlineInvoice ///////////////

exports.get_ById_InlineInvoice = async (req, res) => {
    try {
        const br_number = req.params.br_number;

        const getData = await inlineInvoice.findOne({ where: { br_number: br_number } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Inline Invoice data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All invoice ///////////////

exports.getAll_invoice = async (req, res) => {
    try {
        const getAllData = await make_invoice_Details.findAll({
            // lead_generation: req.params.lead_generation
        });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Brand Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete invoice ///////////////

exports.delete_invoice = async (req, res) => {
    try {
        const make_invoice_id = req.params.id;
        const getData = await make_invoice_Details.findOne({ where: { make_invoice_id: make_invoice_id } });
        if (getData) {
            const updated = await make_invoice_Details.update({ status: "INACTIVE" }, { where: { make_invoice_id: make_invoice_id } });
            return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 403, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



exports.updateQuotationInvoiceStatus = async (req, res) => {
    try {
        const br_number = req.params.br_number;
        const bodyData = req.body.length

        if (bodyData) {
            for (var i = 0; i < req.body.length; i++) {
                const quotationData = await quotation.findOne({
                    where: {
                        br_number: br_number,
                        quotation_id: req.body[i].quotation_id,
                    }
                })
                if (quotationData) {
                    await quotation.update({
                        item_description: req.body[i].item_description,
                        lineItem_status: req.body[i].lineItem_status,
                        quotation_id: req.body[i].quotation_id,
                        quantity: req.body[i].quantity,
                        unitPrice: req.body[i].unitPrice,
                    }, { where: { br_number: quotationData.br_number, quotation_id: req.body[i].quotation_id } });
                }
            }
            return res.status(200).send({ code: 200, message: "Updated SuccessFully" });
        }
        else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getQuotationDetail = async (req, res) => {
    try {
        // const lead_generation = req.params.id;
        const lead_generation = parseInt(req.params.lead_generation);
        const br_number = req.body.br_number
        const getAllData = await leadmanagmentdata.findOne({
            where: { lead_genration_id: lead_generation, br_number: br_number },
            include: [{
                model: mandays,
                attributes: ["mandays_id", "br_number", "lead_genration_id", "stage", "noOfMandays", "perioed", "createdAt"],
                where: { br_number: br_number },
            }],
            order: [[{ model: mandays, }, 'createdAt', 'DESC']],
        });
        if (getAllData) {
            let price;
            if (getAllData.agreed_slab_b) {
                price = getAllData.agreed_slab_b
            }
            else {
                price = getAllData.agreed_slab_a
            }
            let mainarr = [];
            for (var i = 0; i < getAllData.workdays.length; i++) {

                let quantity = getAllData.workdays[i].noOfMandays ? getAllData.workdays[i].noOfMandays : 0;
                let newobj = {
                    // "s.no": workdays[0].,
                    "item_description": `Syatem Analysis / Stage ${getAllData.workdays ? getAllData.workdays[i].stage : 0}`,
                    "quantity": quantity,
                    "unit": "Mandays",
                    "unitPrice": price,
                    "netAmount": price * quantity,
                    "lineItem": getAllData.workdays[i].perioed,
                    "br_number": getAllData.br_number,
                    "lineItem_status": false,
                    "lead_generation_id": getAllData.lead_generation_id,
                }
                mainarr.push(newobj)
            }

            const invoiceData = await quotation.findAll({
                where: { lead_genrate_id: lead_generation }
            })

            invoiceData.map((item) => {
                if (item.lineItem_status == '1') {
                    item.lineItem_status = true
                } else {
                    item.lineItem_status = false
                }
            })
            let finalinvoice = [...invoiceData, ...mainarr]

            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: finalinvoice });
        } else {
            return res.status(404).send({ code: 404, message: "Data not found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



exports.getQuotationStatus = async (req, res) => {
    try {
        const br_number = req.params.br_number;
        const getinvoice_detaildata = await quotation.findAll({
            where: { lineItem_status: true, br_number: br_number }
        });

        getinvoice_detaildata.map((item) => {
            if (item.lineItem_status == '1') {
                item.lineItem_status = true
            } else {
                item.lineItem_status = false
            }
        })

        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getinvoice_detaildata });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



exports.createNewQuation = async (req, res) => {
    try {
        const { item_description, lead_generation, quantity, unit, unitPrice, br_number, lineItem_status, lineItem } = req.body;

        const br_dataExits = await leadmanagmentdata.findOne({
            where: { br_number: br_number }
        });

        let br_dataExitsdata = br_dataExits ? br_dataExits.br_number : null
        if (br_dataExitsdata !== null) {
            const response = await quotation.create({
                item_description,
                lead_genrate_id: lead_generation,
                quantity,
                unit: unit ? unit : "Mandays",
                unitPrice,
                br_number: br_dataExits.br_number,
                lineItem,
                lineItem_status: lineItem_status ? lineItem_status : "false",
                netAmount: unitPrice * quantity,
            });
            return res.status(200).send({ code: 200, message: "create Data Successfully", data: response });
        }
        else {
            return res.status(500).send({ code: 500, message: "Br Not found", data: br_dataExits });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////// get all  data //////////////////////////////////
exports.getAllData = async (req, res) => {
    try {
        const AllData = await inlineInvoice.findAll();

        for (let i = 0; i < AllData.length; i++) {
            const br_number = AllData[i].br_number;

            let getData = await inlineInvoice.findAll({ where: { br_number: br_number } })
            // let 
            return res.status(200).send({ code: 200, message: "create Data Successfully", data: getData });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get ById BR invoice ///////////////

// exports.get_ById_InlineInvoice = async (req, res) => {
//     try {
//         const BRnumber = req.params.br_number;
//         const taskOrder  = await db.TaskOrder.findAll({where:{br_number:BRnumber}})
//         var allTastOrders = taskOrder[0].TaskOrder_No
//         const getData = await inlineInvoice.findOne({ where: { br_number: BRnumber } });
//         var Obj ={
//             "getData":getData,
//             "taskOrder":allTastOrders

//         }
//         if (getData) {
//             return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: Obj });
//         } else {
//             return res.status(404).send({ code: 404, message: "Record Not Found" });
//         };
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };

////////////////////Update_On_Behalf_of_BR_Number//////////////////////
exports.Update_invoice_data = async (req, res) => {
    try {
        const Br_Number = req.params.br_number
        const { status, totleNetAmount } = req.body
        const Data = await inlineInvoice.findOne({ where: { br_number: Br_Number } })
        if (Data) {
            const updateData = await inlineInvoice.update({ status, totleNetAmount }, { where: { br_number: Br_Number } })
            res.status(200).send({ code: 200, message: "Status updated Successfully!!!!", data: updateData })
        }
        else {
            res.status(404).send({ code: 404, message: "No Br_Number found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

////////////////////All_Data_Rejected//////////////////////
exports.Rejected_data = async (req, res) => {
    try {
        let Arr_ans = []
        let br_Arr = [];
        Ans_Arr = []
        const Status_data = await inlineInvoice.findAll({ where: { status: "Reject" } })
        for (let i = 0; i < Status_data.length; i++) {
            br_Arr.push(Status_data[i].br_number)
        }

        let New_Br = new Set(br_Arr)
        let Br_Number = [...New_Br]
        let total_netAmount = 0;
        let obj = {
            "br_number": "",
            "NetAmount": "",
            "status": ""
        }
        for (let j = 0; j < Br_Number.length; j++) {
            const New_data = await inlineInvoice.findAll({ where: { br_number: Br_Number[j] } })

            if (New_data[j].br_number == Br_Number[j]) {
                total_netAmount += New_data[j].netAmount
                obj = {
                    "br_number": New_data[j].br_number,
                    "NetAmount": total_netAmount += New_data[j].netAmount,
                    "status": New_data[j].status
                }
                Arr_ans.push(obj)
            }
        }
        if (Status_data) {
            res.status(200).send({ code: 200, message: "Data Fetched Successfully!!!!", data: Arr_ans })
        }
        else {
            res.status(404).send({ code: 404, message: "No Rejected Status Found!!" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

////////////////////All_Data_Approved//////////////////////
exports.Approved_data = async (req, res) => {
    try {
        let Arr_ans = []
        let br_Arr = [];
        Ans_Arr = []
        const Status_data = await inlineInvoice.findAll({ where: { status: "Approved" } })
        for (let i = 0; i < Status_data.length; i++) {
            br_Arr.push(Status_data[i].br_number)
        }

        let New_Br = new Set(br_Arr)
        let Br_Number = [...New_Br]
        let total_netAmount = 0;
        let obj = {
            "br_number": "",
            "NetAmount": "",
            "status": ""
        }
        for (let j = 0; j < Br_Number.length; j++) {
            const New_data = await inlineInvoice.findAll({ where: { br_number: Br_Number[j] } })

            // const Br_Data3= await leadmanagmentdata.findAll({where: {br_number: new_brNumber[j] }})
            //    

            if (New_data[0].br_number == Br_Number[j]) {
                total_netAmount += New_data[0].netAmount
                obj = {
                    "br_number": New_data[0].br_number,
                    "NetAmount": total_netAmount += New_data[0].netAmount,
                    "status": New_data[0].status,
                    // "data": Br_Data3
                }
                Arr_ans.push(obj)
            }
        }
        if (Status_data) {
            res.status(200).send({ code: 200, message: "Data Fetched Successfully!!!!", data: Arr_ans })
        }
        else {
            res.status(404).send({ code: 404, message: "No Rejected Status Found!!" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}