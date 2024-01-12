const moment = require("moment");
const db = require("../../models/index");
const candidateProfileDetails = db.candidateProfile;
const candidates = db.candidateVerification;
const transport=require("../../services/nodemailer")
const User=db.user
const { Op} = require("sequelize");
// const baseUrl = "http://localhost:5000/"
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
/////////////// Create Candidate Verification ///////////////

// exports.createCandidates = async (req, res) => {
//   try {
//     const { candidate_id, candidate_name, email, mobile_no, precious_job_status, email_verification, phone_verification,
//       precious_job_status_verification } = req.body;
//     const getData = await candidateProfileDetails.findOne({ where: { candidate_id: req.body.candidate_id } });
//     const response = await candidates.create({
//       candidate_id,
//       candidate_name,
//       email,
//       mobile_no,
//       precious_job_status,
//       email_verification,
//       phone_verification,
//       precious_job_status_verification,
//       spoc_name: getData.spoc_name,
//       candidateOnboard:true
//     });
//     if(email_verification=="false"){
//     let info = await transport.mailsend({
//       from: 'dqsindia.erp@gmail.com',
//       to: `${getData.email}`,
//       // cc: cc_email,
//       // bcc: bcc_email,
//       subject: "Background Verification of  onBoarding Proccess",
//       html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
//       <br>
//       kindly provide us following Information like <strong>Email address</strong> 
//       Kindly contact to  our Hiring team
//       Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
//     })
//   }
//   else if(phone_verification=="false"){
//     let info = await transport.mailsend({
//       from: 'dqsindia.erp@gmail.com',
//       to: `${getData.email}`,
//       // cc: cc_email,
//       // bcc: bcc_email,
//       subject: "Background Verification of  onBoarding Proccess",
//       html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
//       <br>
//       kindly provide us following Information like : <strong>Phone Number</strong> 
//       Kindly contact to  our Hiring team
//       Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
//     })
//   }
//   else if(precious_job_status.precious_job_status_verification=="false"){
//     let info = await transport.mailsend({
//       from: 'dqsindia.erp@gmail.com',
//       to: `${getData.email}`,
//       // cc: cc_email,
//       // bcc: bcc_email,
//       subject: "Background Verification of  onBoarding Proccess",
//       html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
//       <br>
//       kindly provide us following Information like <strong>Previous Job Details</strong> 
//       Kindly contact to  our Hiring team
//       Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
//     })
//   }
//   else if(email_verification=="false" && phone_verification=="false"){
//     let info = await transport.mailsend({
//       from: 'dqsindia.erp@gmail.com',
//       to: `${getData.email}`,
//       // cc: cc_email,
//       // bcc: bcc_email,
//       subject: "Background Verification of  onBoarding Proccess",
//       html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
//       <br>
//       kindly provide us following Information like <strong>Email , Phone Number</strong> 
//       Kindly contact to  our Hiring team 
//       Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
//     })
//   }
//   else{
//     let info = await transport.mailsend({
//       from: 'dqsindia.erp@gmail.com',
//       to: `${getData.email}`,
//       // cc: cc_email,
//       // bcc: bcc_email,
//       subject: "Background Verification of  onBoarding Proccess",
//       html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
//       <br>
//       kindly provide us following Information like <strong>Email,Phone Number,Previous Job Details</strong> 
//       <br> Kindly contact to  our Hiring team   
//       Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
//     })
//   }
//     return res.status(200).send({ code: 200, message: "Candidate Verification Created Successfully!", data: response });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ code: 500, message: "Server Error" });
//   };
// };
exports.createCandidates = async (req, res) => {
  console.log("====>",req.body)
  try {
    const { candidate_id, candidate_name, email, mobile_no, precious_job_status, email_verification, phone_verification,
      precious_job_status_verification } = req.body;
    const getData = await candidateProfileDetails.findOne({ where: { candidate_id: req.body.candidate_id } });
      const background_data=await candidates.findOne({where:{candidate_id:candidate_id}})
      if(background_data){
        return res.status(404).send({code:404,message:"candidate Background Verification Already Done"})
      }
    else if(!background_data){
    var response = await candidates.create({
      candidate_id,
      candidate_name,
      email,
      mobile_no,
      precious_job_status,
      email_verification,
      phone_verification,
      precious_job_status_verification,
      spoc_name: getData.spoc_name,
      candidateOnboard:true
    });
  }
    if(!email_verification){
    await transport.mailsend({
      from: 'dqsindia.erp@gmail.com',
      to: `${getData.email}`,
      // cc: cc_email,
      // bcc: bcc_email,
      subject: "Background Verification of  onBoarding Proccess",
      html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
      <br>
      kindly provide us following Information like <strong>Email address</strong> 
      Kindly contact to  our Hiring team
      Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
    })
  }
  else if(!phone_verification){
  await transport.mailsend({
      from: 'dqsindia.erp@gmail.com',
      to: `${getData.email}`,
      // cc: cc_email,
      // bcc: bcc_email,
      subject: "Background Verification of  onBoarding Proccess",
      html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
      <br>
      kindly provide us following Information like : <strong>Phone Number</strong> 
      Kindly contact to  our Hiring team
      Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
    })
  }
  else if(!precious_job_status.precious_job_status_verification){
   await transport.mailsend({
      from: 'dqsindia.erp@gmail.com',
      to: `${getData.email}`,
      // cc: cc_email,
      // bcc: bcc_email,
      subject: "Background Verification of  onBoarding Proccess",
      html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
      <br>
      kindly provide us following Information like <strong>Previous Job Details</strong> 
      Kindly contact to  our Hiring team
      Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
    })
  }
  else if(email_verification=="false" && phone_verification=="false"){
     await transport.mailsend({
      from: 'dqsindia.erp@gmail.com',
      to: `${getData.email}`,
      // cc: cc_email,
      // bcc: bcc_email,
      subject: "Background Verification of  onBoarding Proccess",
      html: `<p><strong>Hi ${candidate_name}</strong> <br> we  are regret to inform you that you are not able to clear the background verification process
      <br>
      kindly provide us following Information like <strong>Email , Phone Number</strong> 
      Kindly contact to  our Hiring team 
      Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
    })
  }
  else{
   await transport.mailsend({
      from: 'dqsindia.erp@gmail.com',
      to: `${getData.email}`,
      // cc: cc_email,
      // bcc: bcc_email,
      subject: "Background Verification of  onBoarding Proccess",
      html: `<p><strong>Hi ${candidate_name}</strong> <br> we are pleased to inform you that you have cleared the background Verification !
      <br>
      kindly provide us following Information like <strong>Email,Phone Number,Previous Job Details</strong> 
      <br> Kindly contact to  our Hiring team   
      Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
    })
  }
    return res.status(200).send({ code: 200, message: "Candidate Verification Created Successfully!", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};
/////////////// Update Pdf Candidate Verification ///////////////

exports.updatePdfCandidates = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const editData = await candidates.findOne({ where: { candidate_id: candidateId } });
    if (editData) {
      if (req.file) {
        var pdf = req.file.path
      } else {
        var pdf = ""
      }
      const updateData = await candidates.update({
        others_documents: baseUrl+pdf
      }, { where: { candidate_id: candidateId } });
      return res.status(200).send({ code: 200, message: "Candidate Verification Updated Successfully", data: updateData });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// all Candidate List Verification ///////////////

exports.allCandidatesList = async (req, res) => {
  try {
    const Data = await candidateProfileDetails.findOne({ attributes: ['job_applied', 'spoc_name', 'application_date']})
    const getAllData = await candidates.findAll({
      where: { candidateOnboard: true },
      include: [{
        model: candidateProfileDetails,
        attributes: ['job_applied', 'spoc_name','application_date']
      }]
    })
    if (getAllData) {
      var array = [];
      for (var i = 0; i < getAllData.length; i++) {
        const job_applied = getAllData[i].candidate_profile.job_applied
        const spoc_name = getAllData[i].candidate_profile.spoc_name
        const application_date = getAllData[i].candidate_profile.application_date

        var obj = {
          "candidtaes_v_Id": getAllData[i].candidtaes_v_Id,
          "candidate_id": getAllData[i].candidate_id,
          "candidate_name": getAllData[i].candidate_name,
          "email": getAllData[i].email,
          "mobile_no": getAllData[i].mobile_no,
          "phone_verification": getAllData[i].phone_verification,
          "precious_job_status": getAllData[i].precious_job_status,
          "others_documents": getAllData[i].others_documents,
          "email_verification": getAllData[i].email_verification,
          "precious_job_status_verification": getAllData[i].precious_job_status_verification,
          "status": getAllData[i].status,
          "candidateOnboard":getAllData[i].candidateOnboard,
          "job_applied": job_applied,
          "spoc_name": spoc_name,
          "application_date":application_date
        }
        array.push(obj);
      }
      return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: array });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.get_all_candidate=async(req,res)=>{
  try{

  }
  catch(error){
    console.log(error);
    return res.status(500).send({ code: 500, message: "Interal Server Error" });
  }
}
exports.allCandidatesList_candidateOnboard = async (req, res) => {
  try {
    const Data = await candidateProfileDetails.findOne({attributes: ['job_applied', 'spoc_name', 'application_date'] })
    const getAllData = await candidates.findAll({
      where: { candidateOnboard: true },
      include: [{
        model: candidateProfileDetails,
        attributes: ['job_applied', 'spoc_name','application_date']
      }]
    })
    if (getAllData) {
      var array = [];
      for (var i = 0; i < getAllData.length; i++) {
        const job_applied = getAllData[i].candidate_profile.job_applied
        const spoc_name = getAllData[i].candidate_profile.spoc_name
        const application_date = getAllData[i].candidate_profile.application_date

        var obj = {
          "candidtaes_v_Id": getAllData[i].candidtaes_v_Id,
          "candidate_id": getAllData[i].candidate_id,
          "candidate_name": getAllData[i].candidate_name,
          "email": getAllData[i].email,
          "mobile_no": getAllData[i].mobile_no,
          "phone_verification": getAllData[i].phone_verification,
          "precious_job_status": getAllData[i].precious_job_status,
          "others_documents": getAllData[i].others_documents,
          "email_verification": getAllData[i].email_verification,
          "precious_job_status_verification": getAllData[i].precious_job_status_verification,
          "status": getAllData[i].status,
          "candidateOnboard":getAllData[i].candidateOnboard,
          "job_applied": job_applied,
          "spoc_name": spoc_name,
          "application_date":application_date
        }
        array.push(obj);
      }
      array.sort((a,b)=>{
        return b.candidate_id-a.candidate_id;
      })
      return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: array });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.truecandidates = async (req, res) => {
  try {
      const candidateVerificationId = parseInt(req.params.candidtaes_v_Id);
      const candidatesMaster = await candidates.findOne({ where: { candidtaes_v_Id: candidateVerificationId } });
      if (candidatesMaster) {
          const candidatesData = await candidates.update({ candidateOnboard: true , status: "Verify"  }, { where: { candidtaes_v_Id: candidateVerificationId } });
          return res.status(200).send({ code: 200, message: "candidateOnboard is true Successfully!", data: candidatesData });
      } else {
          return res.status(403).send({ code: 403, message: "Record Not Found" });
      }
  } catch (error) {
      console.log(error)
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Get By Candidate Verification ///////////////

exports.getByCandidate = async (req, res) => {
  try {
    const candidateVerificationId = req.params.id;
    const getAllData = await candidates.findAll({
      where: { candidtaes_v_Id: candidateVerificationId },
      include: [{
        model: db.candidateProfile,
        attributes: ['job_applied', 'spoc_name']
      }]
    })
    if (getAllData) {
      var array = [];
      for (var i = 0; i < getAllData.length; i++) {
        const job_applied = getAllData[i].candidate_profile.job_applied
        const spoc_name = getAllData[i].candidate_profile.spoc_name
        const application_date = getAllData[i].application_date
        var obj = {
          "candidtaes_v_Id": getAllData[i].candidtaes_v_Id,
          "candidate_id": getAllData[i].candidate_id,
          "candidate_name": getAllData[i].candidate_name,
          "email": getAllData[i].email,
          "mobile_no": getAllData[i].mobile_no,
          "phone_verification": getAllData[i].phone_verification,
          "precious_job_status": getAllData[i].precious_job_status,
          "others_documents": getAllData[i].others_documents,
          "email_verification": getAllData[i].email_verification,
          "precious_job_status_verification": getAllData[i].precious_job_status_verification,
          "status": getAllData[i].status,
          "candidateOnboard":getAllData[i].candidateOnboard,
          "job_applied": job_applied,
          "spoc_name": spoc_name,
          "application_date":application_date
        }
        array.push(obj);
      }
      const data = array.find(e => e.candidtaes_v_Id === parseInt(req.params.id));
      return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: data });
    } else {
      return res.status(403).send({ code: 403, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

/////////////// Get Dropdown Candidate ///////////////

exports.getdropdownCandidate = async (req, res) => {
  try {
      const getAllData = await candidateProfileDetails.findAll({
          where: { requisition_status: "Approved" },  
        include: [{
              model: candidates,
              attributes: ["candidtaes_v_Id", "candidate_id",],
          }],
      });
      let filterData = []
      for (let i = 0; i < getAllData.length; i++) {
        let candiateInfo= getAllData[i].candidates_verifications.length ? getAllData[i].candidates_verifications[0].candidate_id: ""

          if (getAllData[i].candidate_id !==candiateInfo ) {
              filterData.push(getAllData[i])
          }
      }
      return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: filterData })

  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};


exports.get_all_approved_candidate=async(req,res)=>{
// console.log("=======>",formattedFutureDateTime);
  try{
    const candidate_data=await candidateProfileDetails.findAll({where:{final_interview_status:"Shortlisted"}})
    candidate_data.sort((a,b)=>{
      return b.candidate_id-a.candidate_id
    })
    return res.status(200).send({code:200,message:"data fetched successfully",data:candidate_data})
  }
  catch(error){
    console.log(error);
    return res.status(500).send({ code: 500, message: " Internal Server Error"})
  }
}

exports.final_backgrond_verify=async(req,res)=>{
  try{
    const candidate_id=req.params.id
    const employee_id=req.body.employee_id;
    const role_verify=await User.findOne({where:{employee_id:employee_id}})
    // console.log("++",role_verify)
    if(role_verify.role_master_id==45){
    const find_candidate=await candidateProfileDetails.findOne({where:{candidate_id:candidate_id}})
    if(find_candidate){
      const candidate_data=await candidateProfileDetails.findOne({where:{[Op.and]: [
        { candidate_id:candidate_id},
        { background_verification_status: "Background Verification Ok" }
      ]}})
      if(candidate_data){
        return res.status(405).send({code:405,message:`${find_candidate.condidate_name} has already Onbaorded`})
      }
      else{
      const background_okay=await candidateProfileDetails.update({
        background_verification_status:"Background Verification Ok",
      },{where:{candidate_id:candidate_id}})
      const verification_status=await candidates.update({candidateOnboard:"false"},{where:{candidate_id:candidate_id}})
      return res.status(200).send({code:200,message:`${find_candidate.condidate_name} has successfully  Onboarded`})
    }
  }
    else{
      return res.status(403).send({code:403,message:"No candidate Found"})
    }
  }
  else{
    return res.status(404).send({code:404,message:"Your Role is not HR_Admin"})
  }
  }
  catch(error){
    console.log(error);
    return res.status(500).send({ code: 500, message: " Internal server Error"})
  }
}


exports.get_all_background_verified_employee=async(req,res)=>{
  try{
    // console.log("------",moment().format())
    const employee_id=req.params.id
    const verify_role=await User.findOne({where:{employee_id:employee_id}})
    
    if(verify_role.role_master_id==45){
      const verified_data=await candidateProfileDetails.findAll({where:{background_verification_status:"Background Verification Ok"}})
      verified_data.sort((a,b)=>{
        return b.candidate_id-a.candidate_id
      })
      if(verified_data){
      return res.status(200).send({code:200,messaeg:"Verified data found",data:verified_data})
    }
    else{
      return res.status(403).send({code:403,send:"No Verified data found"})
    }
  }
    else{
      return res.status(404).send({code:404,send:"Your Role is not HR_Admin"})
    }
  }
  catch(error){
    console.log(error);
    return res.status(500).send({ code: 500, message: "Internal Server Error"})
  }
}

exports.send_LIO_to_candidate=async(req,res)=>{
  try{
    console.log("+++++++",req.body) 
    console.log("====>",req.file)
    const candidate_id=req.params.id
    let emp_document=req.file.path==undefined?" " : req.file.path
    const {employee_id,cc_email,bcc_email,subject,text}=req.body
    const verify_role=await User.findOne({where:{employee_id:employee_id}})
    if(verify_role.role_master_id==45){
      const candidate_data=await candidateProfileDetails.findOne({where:{candidate_id:candidate_id}})
      // console.log("=====>",candidate_data.employee_id)
      if(candidate_data){
        const update_candidate_data=await candidateProfileDetails.update({send_loi_status:"LOI Sended"},{where:{candidate_id:candidate_id}})

        let info = await transport.mailsend({
          from: 'dqsindia.erp@gmail.com',
          to: `${candidate_data.email}`,
          cc: cc_email,
          bcc: bcc_email,
          subject: "Welcome to onBoarding Proccess",
          html: `<p><strong>Hi ${candidate_data.condidate_name}</strong> <br>Please find your form to fill the information 
          Your <strong>Official Email Id is dqsindia.erp@gmail.com</strong> </p>`,
          attachments: [{
            filename: `${req.file.originalname}`,
            path: `${baseUrl}${emp_document}`,
            // contentType: `${req.file.mimetype}`
          }],
        })
        return res.status(200).send({code:200,message:"LOI sended"})
      }
      else{
        return res.status(403).send({code:403, message:"No such candidate Found"})
      }
    }
    else{
      return res.status(404).send({code:404, message:"Your role is not Hr_Admin"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(500).send({code:500,message: "Internal Server Error"})
  }
}

exports.get_All_LOI_sended=async(req,res)=>{
  try{
    const employee_id=req.params.id
    const verify_data=await User.findOne({where:{ employee_id: employee_id}})
    if(verify_data.role_master_id==45){
      const profle_data=await candidateProfileDetails.findAll({where:{send_loi_status:"LOI Sended"}})
      if(profle_data){
        profle_data.sort((a,b)=>{
          return b.candidate_id-a.candidate_id
        })
      return res.status(200).send({code:200,message:"LOI Sended Data",data:profle_data})
    }
    else{
      return res.status(403).send({code:403,message:"No candidate Data"})
    }
  }
    else{
      return res.status(404).send({code:404,message:"Your role is not Hr_Admin"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(500).send({code:500,message: "Internal Server Error"})
  }
}


exports.get_candidate_by_id=async(req,res)=>{
  try{
    const candidate_id=req.params.id
    const candidate_data = await candidateProfileDetails.findOne({where:{candidate_id:candidate_id}})
    if(candidate_data){
      return res.status(200).send({code:200,message:"data fetched successfully",data:candidate_data})
    }
    else{
      return res.status(404).send({code:404,message:"No data found"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(500).send({code:500,message: "Internal Server Error"})
  }
}


exports.filled_new_employee_data=async(req,res)=>{
  try{
    console.log("====>",req.body)
    const candidate_id=req.params.id
    const {employee_id,web_url}=req.body
    const verified_data=await User.findOne({where:{employee_id:employee_id}})
    if(verified_data.role_master_id==45){
      const candidate_data=await candidateProfileDetails.findOne({where:{candidate_id:candidate_id}})
      if(candidate_data){
        const update_candidate_data=await candidateProfileDetails.update({send_loi_status:"Form submitted"},{where:{candidate_id:candidate_id}})

        // const currentDateTime = moment();
        // const futureDateTime = currentDateTime.add(48, 'hours');
        // const formattedFutureDateTime = futureDateTime.format('MMMM Do YYYY, h:mm:ss a');
        
        let info = await transport.mailsend({
          from: 'dqsindia.erp@gmail.com',
          to: candidate_data.email,

          cc: "",
          bcc: "",
          subject: "Welcome to onBoarding Proccess",
          html: `<p><strong>Hi ${candidate_data.condidate_name}</strong> <br>Please find your form to fill the information  <a href=${web_url}>Click Here</a>
          Your <strong>Official Email Id is</strong></p>`
        })
        return res.status(200).send({code:200,message:"Employement form sended"})
      }
      else{
        return res.status(403).send({code:403,message:"No data found "})
      }
    }
  }
  catch(error){
    console.log(error)
    return res.status(403).send({code:403,message:"Internal Server Error"})
  }
}

exports.final_form_submit=async(req,res)=>{
  try{
    const employee_id=req.params.id
    const final_form_submit=req.body.final_form_submit
    const employee_data=await User.findOne({where:{ employee_id: employee_id}})
    if(employee_data){
      const update_status=await User.update({final_form_submit:final_form_submit},{where:{employee_id: employee_id}})
    }
  }
  catch(error){
    console.log(error)
    return res.status(403).send({code:403,message:"Internal Server Error"})
  }
}