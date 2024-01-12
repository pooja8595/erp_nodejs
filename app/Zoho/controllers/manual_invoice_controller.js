const { re, typeOf } = require("mathjs");
const db = require("../../models/index");
const Manual_invoice_model=db.Manual_Invoice
const lead_data=db.LeadManagment
const inlineInvoice=db.inlineInvoice
const leadmanagmentdata=db.LeadManagment
const zoho_Model=db.expense_zoho_data
const math=require('mathjs')
exports.create_manual_invoice=async(req,res)=>{
    try{
        const {client_name,br_number,email,child_name,product,discription,currency,total_amount,export_charges,expo_charges,gst,sac_code,wo_verifyOn,wo_verifyBy,wo_verification_status,firstName,audit_start_date,audit_end_date,ICTDate,associatedCompany,jobTitle,city,state,mobilePhonenumber,streetAddress,addressLine2,creditDays,manual_invoice_status}=req.body
        var check_Br=await lead_data.findOne({where:{br_number:br_number}})
        
        var invoice_data=await Manual_invoice_model.findOne({where:{br_number:br_number}})
        let work_oder_number=Math.floor((Math.random()*10000)+1);
         if(check_Br==null && invoice_data==null) {
            const Manual_Invoice_Data = await Manual_invoice_model.create({
                client_name,br_number,email,child_name,product,work_oder_number,discription,currency,total_amount,export_charges,expo_charges,gst,sac_code,wo_verifyOn,wo_verifyBy,wo_verification_status,firstName,audit_start_date,audit_end_date,ICTDate,associatedCompany,jobTitle,city,state,mobilePhonenumber,streetAddress,addressLine2,creditDays,manual_invoice_status
            })
             return res.status(200).send({code:200, message:"Manual Invoice Created",data:Manual_Invoice_Data})
        }
        else {
            return res.status(403).send({code:403, message:"Invalid Br_Number"})
        }
        
    }
    catch(error){
        console.log(error);
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_manual_Invoice_by_id =async(req,res)=>{
    try{
        const invoice_id=req.params.id
        const Invoice_data=await Manual_invoice_model.findOne({where:{Manual_Invoice_id:invoice_id}})
        
        if(Invoice_data){
            return res.status(200).send({code:200,message:"Data Fetched successfully",data:Invoice_data})
        }
        else{
            return res.status(404).send({code:404,message:"No Invoice Found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_all_manaual_invoice=async(req,res)=>{
    try{
        const Invoice_data=await Manual_invoice_model.findAll()
        res.status(200).send({code:200,message:"Invoice data fetched successfully",data:Invoice_data})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.create_item_details=async (req,res)=>{
    try{
        const {item_details}=req.body
        const item_id=req.params.id
        const Item_data=await Manual_invoice_model.findOne({where:{Manual_Invoice_id:item_id}})
        if(Item_data){
            const update_item=await Manual_invoice_model.update({
                item_details
            },{where:{Manual_Invoice_id:item_id}})
            return res.status(200).send({code:200,message:"item_created successfully",data:update_item})
        }
        else{
            res.status(404).send({code:404,message:"No item found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server"})
    }
}

exports.delete_manual_invoice=async(req,res)=>{
    try{
        const item_id=req.params.id;
        const item_data=await Manual_invoice_model.findOne({where:{Manual_Invoice_id:item_id}})
        if(item_data){
            const deleted_data=await Manual_invoice_model.update({where:{status:"INACTIVE"}},{where:{Manual_Invoice_id:item_id}})
            res.status(200).send({code:200,message:"Invoice deleted"})
        }
        else{
            res.status(404).send({code:404,message:"No Invoice Found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server"})
    }
}


exports.hard_delete_manual_invoice=async(req,res)=>{
    try{
        const item_id=req.params.id;
        const item_data=await Manual_invoice_model.findOne({where:{Manual_Invoice_id:item_id}})
        if(item_data){
            const Delete_data=await Manual_invoice_model.destroy({where:{Manual_Invoice_id:item_id}})
            return res.status(200).send({code:200,message:"Invoice deleted"})
        }
        else{
            return res.status(404).send({code:404, message:"Invoice not found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server"})
    }
}
exports.get_all_invoice_data = async (req, res) => {
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
            const invoice_data = await Manual_invoice_model.findAll({ where: { manual_invoice_status: "pending" } })
            for (let i = 0; i < invoice_data.length; i++) {
                for (let j = 0; j < invoice_data[i].item_details.length; j++) {
                    obj1 = {
                        "br_number": invoice_data[i].dataValues.br_number,
                        "item_description": invoice_data[i].dataValues.item_details[j].item_discription,
                        "quantity": invoice_data[i].dataValues.item_details[j].quantity,
                        "unit": invoice_data[i].dataValues.item_details[j].unit,
                        "unitPrice": invoice_data[i].dataValues.item_details[j].unitPrice,
                        "net_amount":invoice_data[i].dataValues.item_details[j].net_amount,
                    }
                    Ans_Arr.push(obj1)
                }
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

exports.pending_status=async(req,res)=>{
    try{
        const pending_status = await Manual_invoice_model.findAll({where:{manual_invoice_status:"pending"}})
        
        if(pending_status){
            return res.status(200).send({code:200,message:"Data fetched successfully",data:pending_status})
        }
        else{
            return res.status(404).send({code:404,message:"No Pending Data "})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message: "INTERNAL ERROR" });
    }
}


exports.approve_status=async(req,res)=>{
    try{
        const pending_status = await Manual_invoice_model.findAll({where:{manual_invoice_status:"Approved"}})
        if(pending_status){
            return res.status(200).send({code:200,message:"Data fetched successfully",data:pending_status})
        }
        else{
            return res.status(404).send({code:404,message:"No Pending Data "})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message: "INTERNAL ERROR" });
    }
}

exports.rejected_status=async(req,res)=>{
    try{
        // var pending_status = await Manual_invoice_model.findAll({where:{manual_invoice_status:"Reject"}})
        let AllData = await Manual_invoice_model.sequelize.query(
            `SELECT * FROM manual_invoice_data where manual_invoice_status="Reject" `, {
            type: Manual_invoice_model.sequelize.QueryTypes.SELECT
          })
        if(AllData){
            return res.status(200).send({code:200,message:"Data fetched successfully",data:AllData})
        }
        else{
            return res.status(404).send({code:404,message:"No Pending Data "})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message: "INTERNAL ERROR" });
    }
}

exports.approve_manual_invoice=async(req,res)=>{
    try{
        const invoice_id = req.params.id;
        const invoice_data = await Manual_invoice_model.findOne({where:{Manual_Invoice_id:invoice_id}})
        if(invoice_data){
            const update_invoice_data=await Manual_invoice_model.update({manual_invoice_status:"Approved"},
                {where:{Manual_Invoice_id:invoice_id}})
                return res.status(200).send({code:200,message:"approved Successfully",data:update_invoice_data})
        }
        else{
            return res.status(404).send({code:404,message:"No Invoice found"})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message:"INTERNAL ERROR" });
    }
}

exports.Reject_manual_invoice=async(req,res)=>{
    try{
        const invoice_id = req.params.id;
        const invoice_data = await Manual_invoice_model.findOne({where:{Manual_Invoice_id:invoice_id}})
        if(invoice_data){
            const update_invoice_data=await Manual_invoice_model.update({
                manual_invoice_status:"Reject",
                reson:req.body.reason},
                {where:{Manual_Invoice_id:invoice_id}})
                return res.status(200).send({code:200,message:"Rejected Successfully",data:update_invoice_data})
        }
        else{
            return res.status(404).send({code:404,message:"No Invoice found"})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message:"INTERNAL ERROR" });
    }
}

exports.get_all_zoho_invoice_data=async(req,res)=>{
    try{
        const zoho_id=req.params.id;
        const zoho_data=await zoho_Model.findOne({where:{expense_zoho_data_id:zoho_id}})
        const expense_data=await Manual_invoice_model.findOne({where:{Manual_Invoice_id:zoho_data.dataValues.manual_invoice_id}})

        let obj={...expense_data.dataValues,...zoho_data.dataValues}
        obj.email=expense_data.dataValues.email
        if(expense_data && zoho_data){
            return res.status(200).send({code:200,message:"Invoice_data",data:obj})
        }
        else{
            return res.status(404).send({code:404,message:"No Br_Number_found"})
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message:"INTERNAL ERROR" });
    }
}