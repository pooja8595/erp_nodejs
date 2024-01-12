const { re } = require('mathjs');
const db = require('../models/index');
const language_model=db.Language_Master

exports.create_new_language=async(req,res)=>{
    try{
        const language_name=req.body.language_name
        const language_data=await language_model.create({language_name})
        return res.status(200).send({code:200,message:"language created successfully",data:language_data})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_language_byid=async(req,res)=>{
    try{
        const language_id=req.params.id
        const language_data=await language_model.findOne({where:{language_id:language_id}})
        if(language_data){
            return res.status(200).send({code:200,message:"Language Fetched",data:language_data})
        }
        else{
            return res.status(404).send({code:404,message:"No data found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}
exports.get_all_languages=async(req,res)=>{
    try{
        const language_data=await language_model.findAll({where:{status:"ACTIVE"}})
        if(language_data){
        return res.status(200).send({code:200,message:"Data fetched successfully",data:language_data})
        }
        else{
            return res.status(404).send({code:404,message:"No data found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal server Error"})
    }
}
exports.update_language =async(req,res)=>{
    try{
        const language_id =req.params.id
        const language_name=req.body.language_name
        const status=req.body.status
        const language_data=await language_model.findOne({where:{language_id:language_id}})
        if(language_data){
            const update_language=await language_model.update({language_name,status},{where:{language_id:language_id}})
            return res.status(200).send({code:200,message:"language updated successfully"})
        }
        else{
            return res.status(404).send({code:404, message:"No language found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal server error"})
    }
}

exports.delete_language =async(req,res)=>{
    try{
        const language_id =req.params.id
        const language_name=req.body.language_name
        const language_data=await language_model.findOne({where:{language_id:language_id}})
        if(language_data){
            const update_language=await language_model.update({status:"INACTIVE"},{where:{language_id:language_id}})
            return res.status(200).send({code:200,message:"language updated successfully"})
        }
        else{
            return res.status(404).send({code:404, message:"No language found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal server error"})
    }
}