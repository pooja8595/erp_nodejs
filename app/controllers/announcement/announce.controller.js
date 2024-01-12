var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const baseUrl = "https://emerp.elitetraveltech.in/"
// const baseUrl = "http://localhost:5000/"
const baseUrl = "https://emerp.elitetraveltech.in/";

const db = require('../../models')
const userRegister = db.user
const transport = require("../../services/nodemailer");
const Announcement = db.announcement;
const Op = db.Sequelize.Op;
fs = require('fs'),
// path = require('path');

exports.bulkAnnounceMail = async (req, res) => {
  let department = req.params.departmentName
  let {
    employee_id,
    to_email,
    cc_email,
    bcc_email,
    subject,
    message} =req.body;
  try {
    const getAllData = await userRegister.findAll({ where: { department:department } });
    if (getAllData) {
      var array = [];
      for (let i = 0; i < getAllData.length; i++) {
        let useremail = getAllData[i].personal_email
        array.push(useremail)
      }
      console.log("array", array)

      let mail_data = await Announcement.create({
        employee_id,
        to_email,
        cc_email, 
        bcc_email,
        subject,
        text: message,
      })

      let info = await transport.mailsend({
        from: process.env.EMAIL_FROM,
        to: array,
        cc: "",
        bcc: "",
        subject: subject,
        html:
          `<p> Your Text: <strong> ${message} </strong> </p>`,
      });
      if (info) {
        email_status=mail_data.dataValues["email_status"] = "send"
      }
      await Announcement.update({
          email_status:  email_status, // 12344,
        },
        { where: { email_id: mail_data.email_id } }
      );
      return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: mail_data })
    } else {
      return res.status(400).send({ code: 400, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  };
};


exports.createAnnounceMail = async (req, res) => {
  let department = req.params.departmentName

  let {
    employee_id,
    to_email,
    cc_email,
    bcc_email,
    subject,
    text,
    message
  } = req.body;
  let attach_file;
  attach_file = req.file == undefined ? "" : attach_file = req.file.path;

  // if (!to_email.match(mailformat)) {
  //   return res.send(
  //     (message = "Invalid Format"),
  //     (statusCode = 400)
  //   );
  // }


  try {
    if (!to_email || !employee_id) {
      return res.status(400).send({
        message: "employee_id or to_email can not be empty!"
      });
    }

    //USER EXITS
    //   const userExits= await Announcement.findOne({
    //     where: {id: to_email}
    //   })
    //   if(userExits){
    //     return res.status(403).send({
    //       message: "Employment Type Already Exits!"
    //     })
    //   }

    let all_bcc = "";
    let all_mail = "";
    let all_cc = "";
    console.log("to_email", to_email)
    if (to_email) {
      to_email= JSON.parse(to_email)
      //all to mailer
      to_email.map((item) => {
        all_mail += `${item}, `
        console.log("all_mail", all_mail)
        return all_mail
      })
    }

    else if (cc_email) {
      //all cc mailer
      cc_email.map((item) => {
        all_cc += `${item},`
        return all_cc
      })
    }

    else if (bcc_email) {
      //all bcc mailer
      bcc_email.map((item) => {
        all_bcc += `${item},`
        return all_bcc
      })
    }


  // let {subject, message} =req.body;
    // const getAllData = await userRegister.findAll({ where: { department:department } });
    // if (getAllData.length>0) {
    //   var array = [];
    //   for (let i = 0; i < getAllData.length; i++) {
    //     let useremail = getAllData[i].personal_email
    //     array.push(useremail)
    //   }
    //   let info = await transport.mailsend({
    //     from: process.env.EMAIL_FROM,
    //     to: array,
    //     subject: `${subject}`,
    //     html: `<p> ${message} </p>`
    //   });
    //   return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: info })
    // }else{
       // Save employData in the database
        const mail_data = await Announcement.create({
          employee_id,
          to_email,
          cc_email,
          bcc_email,
          subject,
          text,
          attach_file 
        })
        console.log("mail_data", JSON.stringify(mail_data) )
        // attach_file= attach_file.slice(12)
        let mainfile= `${baseUrl}${attach_file}`
        attach_status = req.file == undefined ? false : attach_status= true
        //mail send
      let info = await transport.mailsend({
        from: 'dqsindia.erp@gmail.com',
        to: all_mail,
        cc: all_cc,
        bcc: all_bcc,
        subject: subject,
        html:
          `<p> Your Text: <strong> ${text} </strong> </p>`,
        // attachments: [{
        //     filename: `${baseUrl}${attach_file}`,
        //     path: `${baseUrl}${attach_file}`
        // }]
        attachments: [{
          filename: `${baseUrl}${attach_file}`,
          path: `${baseUrl}${attach_file}`,
          contentType: 'application/pdf'
        }],
      }, mail_data);
      console.log("aijajkhan", attach_status)
      if (info) {
        mail_data.dataValues["email_status"] = "send"
        mail_data.dataValues["attach_status"] =attach_status
      }
      res.status(200).send({
        message: "Email data send success!", data: mail_data.dataValues
      });
    // }
  }
  catch (err) {
    console.log("message", err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the employData."
    });
  }
}


exports.getuser_email = async (req, res) => {
  let department=req.params.departmentName
  try{
      const getAllData = await userRegister.findAll({ where: { department:department } });
      if (getAllData.length>0) {
        var array = [];
        for (let i = 0; i < getAllData.length; i++) {
          let useremail = getAllData[i].personal_email
          array.push(useremail)
        }
        return res.status(200).send({
          message: "Email data send success!", data: array
        });
      }else{
        return res.status(200).send({
          message: "Email not found data!", data: array
        });
      }
  }
  catch(err){
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the employData."
    });
  }
}



//data save draft
exports.createAnnounceDraft = async (req, res) => {
  const {
    employee_id,
    to_email,
    cc_email,
    bcc_email,
    subject,
    text,
  } = req.body;
  let attach_file;
  attach_file = req.file == undefined ? "" : attach_file = req.file.path;
  try {
    // if (!to_email.match(mailformat)) {
    //   return res.send(
    //     (message = "Please Email Should be valid Format..."),
    //     (statusCode = 400)
    //   );
    // }
    if (!to_email || !employee_id) {
      return res.status(400).send({
        message: "employee_id or to_email can not be empty!"
      });
    }


    //USER EXITS
    //   const userExits= await Announcement.findOne({
    //     where: {id: to_email}
    //   })
    //   if(userExits){
    //     return res.status(403).send({
    //       message: "Employment Type Already Exits!"
    //     })
    //   }


    let all_bcc = "";
    let all_mail = "";
    let all_cc = "";
    console.log("to_email", to_email)
    if (to_email) {
      //all to mailer
      to_email.map((item) => {
        all_mail += `${item}, `
        console.log("all_mail", all_mail)
        return all_mail
      })
    }

    else if (cc_email) {
      //all cc mailer
      cc_email.map((item) => {
        all_cc += `${item},`
        return all_cc
      })
    }

    else if (bcc_email) {
      //all bcc mailer
      bcc_email.map((item) => {
        all_bcc += `${item},`
        return all_bcc
      })
    }



    // Save draft employData in the database
    const draft_data = await Announcement.create({
      employee_id,
      to_email: to_email,
      cc_email: cc_email,
      bcc_email: bcc_email,
      subject,
      text,
      attach_file
    })
    return res.status(200).send({
      message: "create successfully!", data: draft_data.dataValues
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the employData."
    });
  }
}





//get all email list
exports.announceList = async (req, res) => {
  try {
    const emailData = await Announcement.findAll({
      where: { status: 'ACTIVE' }
    })
    if (emailData) {
      emailData.sort().reverse()
      console.log("emailDatas", emailData)
      res.status(200).send({ message: "get all emailData list", data: emailData })
    }else{
      res.status(204).send({ message: "data not found", data: emailData })    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}

// get detail of email
exports.announcementDetails = async (req, res) => {
  const emailId = req.params.id
  try {
    let userInfo;
    const emailData = await Announcement.findOne({
      where: { email_id: emailId, status: 'ACTIVE' }
    })

    if (emailData) {
      to_email = JSON.parse(emailData.dataValues.to_email)
      cc_email = JSON.parse(emailData.dataValues.cc_email)
      bcc_email = JSON.parse(emailData.dataValues.bcc_email)


      // let userdat
      console.log("userData", emailData)
      userInfo = {
        email_id: emailData.email_id,
        employee_id: emailData.employee_id,
        cc_email: cc_email,
        bcc_email: bcc_email,
        to_email: to_email,
        subject: emailData.subject,
        text: emailData.text,
        email_status: emailData.email_status,
        status: emailData.status,
        createdAt: emailData.createdAt,
        updatedAt: emailData.updatedAt
      }
    }

    if (emailData) {
      res.status(200).send({ message: "achivedata details successfully.", data: userInfo })
    } else {
      res.status(200).send({ message: "not data found", data: userInfo })
    }
  } catch (err) {
    res.status(400).send({ message: "error", error: err.message })
  }
}

exports.announcementUpdate = async (req, res) => {

  const emailId = parseInt(req.params.id);
  console.log(emailId, "emailId");
  let {
    to_email,
    cc_email,
    bcc_email,
    subject,
    text,
  } = req.body
  let attach_file;
  attach_file = req.file == undefined ? "" : attach_file = req.file.path;

  let all_bcc;
  let all_mail;
  let all_cc;
  

  if (to_email) {
    // const noSpecialChars = str.replace(/[^a-zA-Z0-9 ]/g, '');
  //  const all_mail = to_email.replace(/[^a-zA-Z0-9]/g, " ")
  //   console.log(all_mail,"all_mail")
  //  console.log("hello world");
  
    // to_email= JSON.parse(to_email)

  //   console.log("to_email", to_email)
    //all to mailer
   const emailData = to_email
    console.log(emailData,"latest code")
    emailData.map((item) => {
      all_mail += `${item},`
      return all_mail
    })
  }

  else if (cc_email) {
    //all cc mailer
    cc_email.map((item) => {
      all_cc += `${item},`
      return all_cc
    })
  }

  else if (bcc_email) {
    //all bcc mailer
    bcc_email.map((index) => {
      all_bcc += `${index},`
      return all_bcc
    })
  }

  try {
    const emailDetails = await Announcement.update({
      to_email,
      cc_email,
      bcc_email,
      subject,
      text,
      attach_file
    }, {
      where: { email_id: emailId, email_status: "draft", status: "ACTIVE" }
    }
    );

    console.log("all_mail", all_mail)
    console.log("cc_email", cc_email)
    console.log("bcc_email", bcc_email)
    console.log("to_email", to_email)


    //mail send
    let info = await transport.mailsend({
      from: process.env.EMAIL_FROM,
      to: to_email,
      cc: cc_email,
      bcc: bcc_email,
      subject: subject,
      html:
        `<p> Your Text: <strong> ${text} </strong> </p>`,
      attachments: [{
        filename: `${baseUrl}${attach_file}`,
        path: `${baseUrl}${attach_file}`
    }]
    }, emailId);
    console.log("emailDetails", emailDetails)

    if (emailDetails) {
      return res.status(200).send({
        status: 200,
        message: "Data Update Successfully",
        data: emailDetails,
      });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Unable to update data",
      errors: error,
      status: 400,
    });
  }
};



exports.announcementDraftUpdate = async (req, res) => {

  const emailId = parseInt(req.params.id);
  console.log(emailId, "emailId");
  const {
    to_email,
    cc_email,
    bcc_email,
    subject,
    text,
  } = req.body
    ;
    let attach_file;
    attach_file = req.file == undefined ? "" : attach_file = req.file.path;
  try {
    const emailDetails = await Announcement.update({
      to_email,
      cc_email,
      bcc_email,
      subject,
      text,
      attach_file
    }, {
      where: { email_id: emailId, email_status: "draft", status: "ACTIVE" }
    }
    );

    if (emailDetails) {
      return res.status(200).send({
        status: 200,
        message: "Draft Data Update Successfully",
        data: emailDetails,
      });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Unable to update data",
      errors: error,
      status: 400,
    });
  }
};


//delete announcement
exports.announcementDelete = async (req, res) => {
  const emailId = req.params.id;
  console.log("empId", emailId)
  try {
    const emailDetails = await Announcement.findOne({
      where: { email_id: emailId }
    })
    if (emailDetails) {
      const employeeData = await Announcement.update({ status: "INACTIVE" }, {
        where: { email_id: emailId }
      })
      return res.status(200).send({
        message: "Announcement data is deleted successfully!"
      });
    } else {
      return res.status(500).send({ message: "Invalid empId..." })
    }
  }
  catch (err) {
    return res.status(400).send({
      message: "Could not delete EmployeePreviousEmployer with id=" + err.message
    })
  }
}