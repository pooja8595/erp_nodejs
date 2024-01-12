const { now } = require("moment");
const db = require("../models/index");
const hrms_notification_model=db.hrms_notification_data
const User = db.user
const candidateProfileDetails = db.candidateProfile;
const fixedInterviewDetails = db.scheduleFixedInterview;
const jobsdata = db.jobs
const jobtype = db.jobTypes
const postVacancyDetails = db.jobDescription;
const Op = require('sequelize').Op;
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
const lms_notification_model=db.lms_author_notification

const transport=require("../services/nodemailer")
/////////////// Create Condidate ///////////////

exports.createCondidate = async (req, res) => {
    try {
        const { condidate_name, email, mobile, assigned_hiring_manager, assigned_hiring_manager_id, job_title, application_date,
            mode_of_interview, interviewer_name, interview_date, round_level, status, interviewStatus, schedule_interview_date,
            schedule_interview_time, job_applied, fixed_interview_date, fixed_interview_time, } = req.body;
        if (req.file) {
            var image = req.file.path
        } else {
            var image = ""
        }
        const getData = await jobsdata.findOne({ where: { job_title: req.body.job_applied } });
        const jobtype_id = getData.FK_job_type_id
        const data121 = await jobtype.findAll({ where: { id: jobtype_id } })
        const job_type1 = data121[0].job_type
        const candidateData = await candidateProfileDetails.findOne({ where: { email: email } });
        const candidateData2 = await candidateProfileDetails.findOne({ where: { mobile: mobile } });

        const user_data=await User.findOne({where:{employee_id:assigned_hiring_manager_id}})
        const employee_id=user_data.employee_id
        const emp_name=user_data.first_name
        const employee_official_email=user_data.employee_official_email;
        const role=user_data.user_role;
        const role_id=user_data.role_master_id;
        if (candidateData) {
            return res.status(403).send({ code: 403, message: "Email is Already Exits!" });
        }
        if (candidateData2) {
            return res.status(402).send({ code: 402, message: "Mobile Number is Already Exits!" });
        }else {
            const round_data=await postVacancyDetails.findOne({where:{job_id:req.body.job_id}})
            const response = await candidateProfileDetails.create({
                condidate_name,
                email,
                mobile,
                upload_resume: baseUrl + image,
                assigned_hiring_manager,
                assigned_hiring_manager_id,
                job_title,
                job_role: getData.job_role,
                application_date: Date.now(),
                department: getData.department,
                job_type: job_type1,
                exprience: getData.experience,
                address: getData.location,
                spoc_name: getData.spoc_name,
                mode_of_interview,
                interviewer_name,
                interview_date,
                interview_level: round_data.Interview_level,
                // round_level:round_data.interview_level,
                status,
                job_applied,
                interviewStatus,
                schedule_interview_date,
                schedule_interview_time,
                fixed_interview_date,
                fixed_interview_time,
            });
            info = await transport.mailsend({
                from: "dqsindia.erp@gmail.com",
                to: employee_official_email,
                subject: `Assigning As Hiring manager`,
                html: `<p><strong>Hi &nbsp; ${emp_name} </strong> <br>  
                        You are assign as an Hiring manager for ${condidate_name}
                        <br></br><br></br><br></br><br></br>
                        Thanks Regards<br></br>
                        DQS Team
                </p>`,
              });
              
            const remark=`Hi ${assigned_hiring_manager} You has been as assign manager of ${condidate_name}`
            await lms_notification_model.create({employee_id,
                emp_name,
                employee_official_email,
                role,
                role_id,
                remark,
                type:"HRMS"
            })
            return res.status(200).send({ code: 200, message: "Candidate Created Successfully!", data: response })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Condidate ///////////////

exports.editCondidate = async (req, res) => {
    try {
        const condidateId = req.params.id;
        const { condidate_name, email, mobile, assigned_hiring_manager, assigned_hiring_manager_id, job_title,
            job_role, application_date, department, job_type, exprience, address, spoc_name, mode_of_interview,
            interviewer_name, interview_date, round_level, status, status1, interviewStatus, requisition_status, schedule_interview_date,
            schedule_interview_time, job_applied, fixed_interview_date, fixed_interview_time } = req.body;
        if (req.file) {
            var image = req.file.path
        } else {
            var image = ""
        }
        const editData = await candidateProfileDetails.findOne({ where: { candidate_id: condidateId } });
        if (editData) {
            const updateData = await candidateProfileDetails.update(
                {
                    condidate_name,
                    email,
                    mobile,
                    upload_resume: baseUrl + image,
                    assigned_hiring_manager,
                    assigned_hiring_manager_id,
                    job_title,
                    job_role,
                    application_date,
                    department,
                    job_type,
                    exprience,
                    address,
                    spoc_name,
                    mode_of_interview,
                    interviewer_name,
                    interview_date,
                    round_level,
                    status,
                    status1,
                    job_applied,
                    interviewStatus,
                    requisition_status,
                    schedule_interview_date,
                    schedule_interview_time,
                    fixed_interview_date,
                    fixed_interview_time
                },
                { where: { candidate_id: condidateId } }
            );
            return res.status(200).send({ code: 200, message: "Candidate Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Candidate List ///////////////

exports.candidate_list = async (req, res) => {
    try {
        const getData = await candidateProfileDetails.findAll()
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

/////////////// Edit Status ///////////////

exports.editStatus = async (req, res) => {
    try {
        const condidateId = req.params.id;
        const { status,email_status } = req.body;
        const editData = await candidateProfileDetails.findOne({ where: { candidate_id: condidateId } });
        if (editData) {
            const updateData = await candidateProfileDetails.update(
                {
                    status
                },
                { where: { candidate_id: condidateId } }
            );
            let info = await transport.mailsend({
                from: 'dqsindia.erp@gmail.com',
                to: editData.email,
                cc: "",
                bcc: "",
                subject: "Interview Result Update!!!!!!!!",
                html: `<p><strong>Hi ${editData.condidate_name}</strong> <br>After Reviewing your Profile we are pleased to inform you that your have ${email_status} for the further rounds of interview 
                Your <strong> For further mail kindly connected to us!!!!!!</strong></p>`
            });
            return res.status(200).send({ code: 200, message: `Hi ${editData.condidate_name} has been Reviewed by ${editData.assigned_hiring_manager} Go and fixed the interview`, data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Condidate ///////////////

exports.candidateProfileList = async (req, res) => {
    try {

        const hiring_manager_id = req.params.id
        let getalldata2=await User.findOne({where:{employee_id:hiring_manager_id}})
        if(getalldata2.role_master_id==45){
            let Shortlisted_data=await candidateProfileDetails.findAll({where:{[Op.and]: [
                { status: { [Op.ne]: "Shortlisted" }}],}})

                Shortlisted_data.sort((a, b) =>{
                    return b.candidate_id-a.candidate_id
                })
                return res.status(200).send({code:200,message:"Data Fetched",data:Shortlisted_data})
        }
        else if(getalldata2.role_master_id==18){
            let getAllData = await candidateProfileDetails.findAll({
                where: {
                    [Op.and]: [
                       { status: { [Op.ne]: "Shortlisted" }},
                      { assigned_hiring_manager_id: hiring_manager_id ,}
                    ]
                  },
            });
            getAllData.sort((a, b) =>{
                return b.candidate_id-a.candidate_id
            })
            return res.status(200).send({code:200,mesasge:"Data Fetched",data:getAllData})
        }else{
            return res.status(404).send({code:404,mesasge:"No Candidate has been assigned to this heiring manager",})

        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Shortlisted ///////////////

exports.candidateProfileShortlisted = async (req, res) => {
    try {
        const getAllData = await candidateProfileDetails.findAll({
            where: { status: "Shortlisted" },
        });
        getAllData.sort((a,b)=>{
            return b.candidate_id-a.candidate_id
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: getAllData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Hr Dashboard List ///////////////

exports.hrDashboardList = async (req, res) => {
    try {
        let Arr=[]
        const getAllData = await candidateProfileDetails.findAll({
            attributes: ['candidate_id', 'condidate_name', ['job_applied', 'job_title'], 'status', ['createdAt', 'application_date']]
        })
        for(let i=0;i<getAllData.length;i++) {
            var getalldata2=await fixedInterviewDetails.findAll({where:{candidate_id:getAllData[i].candidate_id}})
            // const data=getAllData
            getalldata2.sort((a,b)=>{
                return b.round_level-a.round_level
            })
            Arr.push(...getalldata2)
            
        }
        
       
        getAllData.sort((a,b)=>{
            return b.candidate_id-a.candidate_id;
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: getAllData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Condidate ///////////////

exports.getByIdCandidate = async (req, res) => {
    try {
        const condidateId = req.params.id;
        let getData = await candidateProfileDetails.findOne({ where: { candidate_id: condidateId } });
        if(getData){
            const job_details=await postVacancyDetails.findOne({where:{job_title_id:getData.job_applied}})
        getData.dataValues.job_id=job_details.job_id
        return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: getData })
        }
         else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, mesasge: "Server Error" });
    };
};

/////////////// Get ById Candidate Profile ///////////////

exports.getByIdCandidateProfile = async (req, res) => {
    try {
        const condidateId = req.params.id;
        const getData = await candidateProfileDetails.findOne({
            where: { candidate_id: condidateId },
            attributes: ['interviewer_name', 'mode_of_interview', 'interview_date', 'time', 'status', 'condidate_name', 'application_date']
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: getData })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, mesasge: "Server Error" });
    };
};

/////////////// Get ById Pending Task ///////////////

exports.getByIdPendingTask = async (req, res) => {
    try {
        const assigned_hiring_manager_id = req.params.id
        const getData = await candidateProfileDetails.findAll({
            where: { status: "Not Reviewed", assigned_hiring_manager_id: assigned_hiring_manager_id },
            attributes: ['candidate_id', 'condidate_name', 'email', 'mobile', 'status', 'upload_resume', 'assigned_hiring_manager', 'assigned_hiring_manager_id']
        })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Pending Task Successfully", result: getData })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Pending Task ///////////////

exports.getAllPendingTask = async (req, res) => {
    try {
        const getAllData = await candidateProfileDetails.findAll({
            where: { status: "Not Reviewed" },
            attributes: ['candidate_id', 'condidate_name', 'email', 'mobile', 'status', 'upload_resume', 'assigned_hiring_manager']
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Pending Task Successfully", result: getAllData })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Hr Dashboard ///////////////

exports.singleCandidate_HrDashboard = async (req, res) => {
    try {
        const hrDashboardId = req.params.id
        const getData = await candidateProfileDetails.findAll({
            where: { candidate_id: hrDashboardId },
            attributes: ['candidate_id', 'condidate_name', 'job_title', 'status', 'application_date', 'upload_resume', 'job_applied', 'assigned_hiring_manager', 'address', 'department', 'email',
                'job_role', 'job_type', 'mobile', 'requisition_status', 'round_level', 'spoc_name', 'final_interview_status', 'schedule_interview_date', 'schedule_interview_time', 'interviewer_name',
                'mode_of_interview', 'createdAt'],
            include: [{
                model: fixedInterviewDetails,
                attributes: ["interview_id", "candidate_id", "interviewer_name", "mode_of_interview", "round_level", "schedule_interview_date", "schedule_interview_time", "remark", "action", "final_shortlisted"],
            }]
        })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Single Candidate Hr Dashboard Successfully", result: getData })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

/////////////// Get All Interviewer List ///////////////

exports.interviewerList = async (req, res) => {
    try {
        const getData = await User.findAll();
        if (getData) {
            var array = [];
            for (var i = 0; i < getData.length; i++) {
                const first_name = getData[i].first_name
                const last_name = getData[i].last_name
                var obj = {
                    "employee_id": getData[i].employee_id,
                    "fullName": first_name + " " + last_name,
                    "employee_code":getData[i].employee_code
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
};

/////////////// Download Document Master ///////////////

exports.downloadDocumentMaster = (req, res) => {
    const fileName = req.params.fileName;
    res.download("documents/" + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

/////////////// Get All Job Title ///////////////

exports.get_All_job_title = async (req, res) => {
    try {
        const getData = await jobsdata.findAll({
            attributes: ["id", "job_title", "spoc_name"],
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, mesasge: "Server Error" });
    };
};


//////////////////// get emp by emp_id//////////////////

exports.get_emp_by_emp_id = async (req, res) => {
    try {
        const hiring_manager_id = req.params.id;
        const Alldata = await candidateProfileDetails.findAll({ where: { assigned_hiring_manager_id: hiring_manager_id, status: "Not Reviewed" } });
        if (Alldata) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: Alldata })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, mesasge: "Server Error" });
    }
};

//////////////////// Candidate Final Shortlisted //////////////////

exports.candidate_Final_Shortlisted = async (req, res) => {
    try {
        const getAllData = await fixedInterviewDetails.findAll({ where: { final_shortlisted: true } });
        let array = []
        for (let i = 0; i < getAllData.length; i++) {
            const candidateId = getAllData[i].candidate_id;
            const getData = await candidateProfileDetails.sequelize.query(`SELECT condidate_name FROM candidate_profiles where candidate_id =${candidateId}`, {
                type: candidateProfileDetails.sequelize.QueryTypes.SELECT
            });
            const obj = {
                candidate_id: getAllData[i].candidate_id,
                condidate_name: getData[0].condidate_name
            }
            array.push(obj)
        }
        array.sort().reverse()
        if (array) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: array });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, mesasge: "Server Error" });
    }
}