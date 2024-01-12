const db=require("../../../models/index")
const amc_description_model=db.description_model

exports.create_description=async(req,res)=>{
    try{
        const amc_description=req.body.amc_description;
        const amc_decription_data=await amc_description_model.create({amc_description})
        return res.status(200).send({code:200,message:"description Created",data:amc_decription_data})
    }
    catch(error){
        console.error(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_by_id_amc_description=async(req,res)=>{
    try{
        const amc_agreement_id=req.params.id
        const amc_description_data=await amc_description_model.findOne({where:{amc_agreement_id:amc_agreement_id}})
        if(amc_description_data){
            return res.status(200).send({code:200,message:"Description Found",data:amc_description_data})
        }
        else{
            return res.status(404).send({code:404,message:"No description found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_all_amc_descriptions = async (req,res)=>{
    try{
        const amc_description_data=await amc_description_model.findAll({where:{status:"ACTIVE"}})
        return res.status(200).send({code:200,message:"Description found",data:amc_description_data})
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.update_amc_description=async(req,res)=>{
    try{
        const amc_description_id=req.params.id
        const {amc_description,status}=req.body
        const amc_description_data=await amc_description_model.findOne({where:{amc_description_id:amc_description_id}})
        if(amc_description_data){
            const update_amc_description_data=await amc_description_model.update({amc_description,status},{where:{amc_description_id:amc_description_id}})
            return res.status(200).send({code:200,message:"amc_description_updated"})
        }
        else{
            return res.status(404).send({code:404,message:"No description Found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server"})
    }
}

exports.Inactive_amc_description=async(req,res)=>{
    try{
        const amc_description_id=req.params.id
        const amc_description=req.body.amc_description
        const amc_description_data=await amc_description_model.findOne({where:{amc_description_id:amc_description_id}})
        if(amc_description_data){
            const update_amc_description_data=await amc_description_model.update({status:"INACTIVE"},{where:{amc_description_id:amc_description_id}})
            return res.status(200).send({code:200,message:"amc_description_updated"})
        }
        else{
            return res.status(404).send({code:404,message:"No description Found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server"})
    }
}

