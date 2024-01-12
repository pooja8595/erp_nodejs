const db = require("../models/index");
const Grade= db.grade;
const Op = db.Sequelize.Op;


exports.createGrade= async (req, res)=>{
    const {grade_name}= req.body;
    try{
      if (!grade_name) {
        return res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      //grade_name Exits
      const userExits= await Grade.findOne({
        where: {grade_name: grade_name}
      })
      if(userExits){
        return res.status(403).send({
          message: "Grade Already Exits!"
        })
      }

      // Save gradeData in the database
      const gradeData= await Grade.create({
        grade_name,
        
      })
      return res.status(200).send({
        message: "create successfully!", data: gradeData
      })
    }
    catch(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the gradeData."
      });
    }
}


exports.gradeList= async (req,res)=>{
  try{
    const gradeData= await Grade.findAll({
      where: {status : 'ACTIVE'},
      attributes: ['grade_id','grade_name','status'], 
    })
    if(gradeData){
      res.status(200).send({message: "get all gradeData list", data: gradeData})
    }
  }catch(err){
    console.log(err.message)
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.gradeDetails= async (req, res)=>{
  const grade_id= parseInt(req.params.grade_id);
  try{
    const gradeData= await Grade.findAll({ 
      where: {grade_id: grade_id},
      attributes: ['grade_id','grade_name','status'],
    })
    if(gradeData){
      res.status(200).send({message: "gradeData details successfully.", data: gradeData})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.gradeUpdate= async (req, res)=>{
  const roleId= parseInt(req.params.garde_id);
  try{
    const gradeDetails= await Grade.findOne({where:  {grade_id: roleId}})
    if(gradeDetails){
      const gradeData= await Grade.update(req.body, {
        where: {grade_id: roleId}
      })
      return res.status(200).send({message: "Grade updated successfully.", data: gradeData})
    }
    else{
      return res.status(500).send({message: "Invalid gradeId Id..."})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.gradeDeleted = async (req, res) => {
  const gradeId = parseInt(req.params.grade_id);
  try{
    const gradeDetails= await Grade.findOne({where:  {grade_id: gradeId}})
    if(gradeDetails){
      const gradeData= await Grade.update( {status: "INACTIVE" }, { 
        where: { grade_id: gradeId }
      })
      return res.status(200).send({
        message: "Grade data is deleted successfully!"
      });
    }else{
      return res.status(500).send({message: "Invalid gradeId..."})
    }
  }
  catch(err){
    return res.status(400).send({
      message: "Could not delete gradeData with id=" + err.message
    })
  }
}