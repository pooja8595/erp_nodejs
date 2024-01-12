const db = require("../models/index");
const EmploymentType= db.employmenttype;

const Op = db.Sequelize.Op;


exports.createEmployment= async (req, res)=>{
    const {emptype_name, status}= req.body;
    try{
      if (!emptype_name) {
        return res.status(400).send({
          message: "Content can not be empty!"
        });
      }

       //USER EXITS
      const userExits= await EmploymentType.findOne({
        where: {emptype_name: emptype_name}
      })
      if(userExits){
        return res.status(403).send({
          message: "Employment Type Already Exits!"
        })
      }


      // Save employData in the database
      const employData= await EmploymentType.create({
        emptype_name,
        status
      })
      return res.status(200).send({
        message: "create successfully!", data: employData
      })
    }
    catch(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employData."
      });
    }
}


exports.employmentList= async (req,res)=>{
  try{
    const employData= await EmploymentType.findAll({
      where: {status : 'ACTIVE'},
      attributes: ['emptype_id','emptype_name','status'], 
    })
    if(employData){
      res.status(200).send({message: "get all employData list", data: employData})
    }
  }catch(err){
    console.log(err.message)
    res.status(400).send({message: "error", error: err.message})
  }
}

exports.employmentDetails= async (req, res)=>{
  const employId= parseInt(req.params.emptype_id);
  try{
    const employData= await EmploymentType.findAll({ 
      where: {emptype_id: employId}
    })
    if(employData){
      res.status(200).send({message: "get region details success", data: employData})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.employmentUpdate= async (req, res)=>{
  const employId= parseInt(req.params.emptype_id);
  try{
    const employmentDetails= await EmploymentType.findOne({where:  {emptype_id: employId}})
    if(employmentDetails){
      const employData= await EmploymentType.update(req.body, {
        where: {emptype_id: employId}
      })
      return res.status(200).send({message: "Region updated successfully.", data: employData})
    }
    else{
      return res.status(500).send({message: "Invalid Region Id..."})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.employmentDeleted = async (req, res) => {
  const employId = parseInt(req.params.emptype_id);
  try{
    const employmentDetails= await EmploymentType. findOne({where:  {emptype_id: employId}})
    if(employmentDetails){
      const employData= await EmploymentType. update( {status: "INACTIVE" }, { 
        where: { emptype_id: employId }
      })
      return res.status(200).send({
        message: "Region is deleted successfully!"
      });
    }else{
      return res.status(500).send({message: "Invalid Region Id..."})
    }
  }
  catch(err){
    return res.status(400).send({
      message: "Could not delete Region with id=" + err.message
    })
  }
}