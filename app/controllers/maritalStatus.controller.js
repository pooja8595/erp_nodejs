const db = require("../models");
const {check} = require('express-validator');
const config = require("../config/auth.config");
const transport = require('../services/nodemailer');
const { where } = require("sequelize");
const { user } = require("../models");

const maritalStatus = db.maritalStatus;


exports.maritalStatusdata = async (req, res) => {
    const {name,gender,status}=req.body;
      

    //  if{}
      if (!req.body.name) {
        res.status(400).send({
          message: "City Name can not be empty!"
        });
        // return;
      }
   
      let test = await maritalStatus.findOne({
        where: {
          name:name,
        },
      })
      if(test){
        return res.status(404).send({
               status:"404",
            message: "Name Already exists!",
          });
      }
     
      if(!req.body.gender=="male"||"female"){ 
        res.status(404).send({
        mesage:"please enter valid data"
        })
      }
      else{
        res.status(200).send({ 
          status: "success", 
          message: "Data Saved",
          data: data
        });
      }

      let data= await maritalStatus.create({
        name:name,
        gender:gender,
        status:status
       });

  
      try {
        res
          .status(200)
         .send({ status: "success", message: "Data Saved",data});
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "Data Not Saved" });
      }
}
  
    exports.maritalStatusdatatest = async (req, res) => {
      //   const id=req.params.id;
        const data = await maritalStatus.findAll();
     //  ({ where:{id:req.params.id} });
     if(!data){
        return res.status(404).send({
        status: 404,
        message: 'No data found'
     });
     }
     try {
      res
        .status(200)
        .send({ status: "success", message: "Data find Successfully",data });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Register" });
    }
    }
////////// const data=await WebGLShaderPrecisionFormat
    // const data=await prisma.


    exports.maritalStatusdatatestById = async (req, res) => {
        const id=req.params.id;
        const data = await maritalStatus.findAll({
          where:{id:req.params.id}
        })
        console.log(data);
      if(!data){
        return res.status(200).send({
        status: 404,
        message: 'No data found'
      });
      }
      try {
      res
        .status(200)
        .send({ status: "success", message: "Data find Successfully",data });
      } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Register" });
      }
      }


      exports.maritalStatusTestdataInactive = async (req, res) => {
        const id = req.params.id;
        // console.log("gradeId", gradeId)
        try{
          const data= await maritalStatus.findOne({where:  {id:id}})
          if(data){
            const data= await maritalStatus.update( {status: "INACTIVE" }, { 
              where: { id: id }
            })
            return res.status(200).send({
              message: "data is deleted successfully!"
            });
          }else{
            return res.status(500).send({message: "Invalid id..."})
          }
        }
        catch(err){
          return res.status(400).send({
            message: "Could not delete gradeData with id=" + err.message
          })
        }
      }


exports.updatemaritalStatus= async (req, res)=>{
    const id= req.params.id
    try{
      const userDetails= await maritalStatus.findOne({where:  {id:id}})
      if(userDetails){
        const userDetailsData= await maritalStatus.update(req.body, {
          where: {id: parseInt(req.params.id)}
        })
        return res.status(200).send({message: "Data Update Successfully.", data:userDetailsData})
      }
      else{
        return res.status(500).send({message: "Unable to update data"})
      }
    }catch(err){
      res.status(400).send({message: "error", error: err.message})
    }
  }