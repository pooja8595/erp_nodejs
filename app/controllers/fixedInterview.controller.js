const { filter, electronMassDependencies } = require("mathjs");
const db = require("../models/index");
const candidateProfileDetails = db.candidateProfile;
const fixedInterviewDetails = db.scheduleFixedInterview;
const scheduleFixedInterviewDetails = db.scheduleFixedInterview;
const user_model=db.user
const op = db.sequelize.op;
const transport=require("../services/nodemailer")

/////////////// Get All fixed Interview ///////////////

exports.getAllfixedInterview = async (req, res) => {
    try {
        const getAllData = await candidateProfileDetails.findAll({
            include: [{
                model: fixedInterviewDetails,
                attributes: ["interview_id", "candidate_id", "interviewer_name", "mode_of_interview", "round_level", "schedule_interview_date", "schedule_interview_time", "remark", "action", "final_shortlisted"],
            }],
            where: { status: "Shortlisted" }
        });
        let filterData = []
        for (let i = 0; i < getAllData.length; i++) {
            if (getAllData[i].round_level !== null) {
                filterData.push(getAllData[i])
            }
        } 
        filterData.sort((a,b)=>{
            return b.candidate_id-a.candidate_id;
        })
        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: filterData })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
 
/////////////// Get All Candidate ///////////////

exports.getAllCandidate = async (req, res) => {
    try {
        const getAllData = await candidateProfileDetails.findAll();
        if (getAllData) {
            var array = [];
            for (let i = 0; i < getAllData.length; i++) {
                var obj = {
                    "candidate_id": getAllData[i].candidate_id,
                    "condidate_name": getAllData[i].condidate_name
                }
                array.push(obj)
            }
            return res.status(200).send({ code: 200, message: "Fetch All Candidate Name Successfully", result: array })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Fixed Interview ///////////////

exports.editFixedInterview = async (req, res) => {
    try {
        const fixedInterviewkId = req.params.id;
        const { email, mobile, assigned_hiring_manager, round_level, job_title, job_role, address, spoc_name, schedule_interview_date, schedule_interview_time, } = req.body;
        const editData = await candidateProfileDetails.findOne({ where: { candidate_id: fixedInterviewkId } });
        const candidate_name=editData.condidate_name;
        const assigned_hiring_manager_id=editData.assigned_hiring_manager_id
        const profile=editData.job_title;
      
        if (editData) {
            const updateData = await candidateProfileDetails.update(
                {
                    email,
                    mobile,
                    assigned_hiring_manager,
                    round_level,
                    job_title,
                    job_role,
                    address,
                    spoc_name,
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: fixedInterviewkId } });
            const data1 = await candidateProfileDetails.findOne({ where: { candidate_id: fixedInterviewkId } });
            if (data1) {
                let canData = await candidateProfileDetails.update({
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: fixedInterviewkId } });
                canData.slice(0, -5);
                canData.replace("T","")
            }
            const manager_data=await user_model.findOne({where:{employee_id:assigned_hiring_manager_id }})
            const manager_email_id=manager_data.employee_official_email
            let info = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: email,
                cc: "",
                bcc: "",
                subject: "Interview Schdule Details!!!!!!!!",
                html: `<p><strong>Hi ${candidate_name}</strong> <br>Your ${round_level} round Interview has been schduled with ${assigned_hiring_manager} for the
                profile of ${editData.job_title}  
                kindly join the meeting link  at ${schedule_interview_time
                } on ${schedule_interview_date
                }
                Your <strong>Official Email Id is</strong></p>`
            });

            let info2 = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: manager_email_id,
                cc: "",
                bcc: "",
                subject: "Interview Schdule Details!!!!!!!!",
                html: `<p><strong>Hi ${assigned_hiring_manager}</strong> <br>You have to attain interview  with ${candidate_name} for the
                profile of ${editData.profile}  for ${round_level} round
                kindly join the meeting link  at ${schedule_interview_time} on ${schedule_interview_date}
                Your <strong>Official Email Id is</strong></p>`
            });
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Fixed Interview ///////////////

exports.getByIdFixedInterview = async (req, res) => {
    try {
        const fixedInterviewkId = req.params.id;
        const candidateData = await candidateProfileDetails.findOne({
            include: [{
                model: fixedInterviewDetails,
                attributes: ["interview_id", "candidate_id", "interviewer_name", "mode_of_interview", "round_level", "schedule_interview_date", "schedule_interview_time", "remark", "action", "final_shortlisted"]
            }], where: { candidate_id: fixedInterviewkId }
        })
        if (candidateData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: candidateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Fixed Interview ///////////////

exports.delete_fixed_interview = async (req, res) => {
    try {
        const interviewId = req.params.id;
        const body = {
            round_level: null,
            schedule_interview_date: null,
            schedule_interview_time: null
        }
        const { round_level, schedule_interview_date, schedule_interview_time } = body;

        const dltData = await candidateProfileDetails.findOne({ where: { candidate_id: interviewId } });
        if (dltData) {
            const deleteData = await candidateProfileDetails.update({
                fixed_interview_status: "INACTIVE",
                round_level,
                schedule_interview_date,
                schedule_interview_time,
            },
                { where: { candidate_id: interviewId } });
            const data1 = await candidateProfileDetails.findOne({ where: { candidate_id: interviewId } });
            if (data1) {
                const canData = await candidateProfileDetails.update({
                    round_level,
                    schedule_interview_date,
                    schedule_interview_time,
                }, { where: { candidate_id: interviewId } });
            }
            const data2 = await scheduleFixedInterviewDetails.findOne({ where: { candidate_id: interviewId } });
            if (data2) {
                const deleteData1 = await scheduleFixedInterviewDetails.destroy({ where: { candidate_id: interviewId } })
                return res.status(200).send({ code: 200, message: "Fixed Interview Data is Deleted Successfully!", data: deleteData1 });
            }
            return res.status(200).send({ code: 200, message: "Fixed Interview Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Recorb Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.final_short_listed=async(Req,res)=>{
    try{
        const short_listed_data=await candidateProfileDetails.findAll({where:{final_interview_status:"Shortlisted"}})
        if(short_listed_data){
            short_listed_data.reverse()
            return res.status(200).send({code:200,message:"short_listed_data",data:short_listed_data})
        }
        else{
            return res.status(404).send({code:404,message:"No shortlisted data found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
}

exports.fixingInterview=async(req,res)=>{
    try{
        const fixedInterviewkId = req.params.id;
        const { email, mobile, assigned_hiring_manager, round_level, job_title, job_role, address, spoc_name, schedule_interview_date, schedule_interview_time, } = req.body;
        const editData = await candidateProfileDetails.findOne({ where: { candidate_id: fixedInterviewkId } });
        const candidate_name=editData.condidate_name;
        const assigned_hiring_manager_id=editData.assigned_hiring_manager_id
        const profile=editData.job_title;
      
        if (editData) {
            const updateData = await candidateProfileDetails.update(
                {
                    email,
                    mobile,
                    assigned_hiring_manager,
                    round_level,
                    job_title,
                    job_role,
                    address,
                    spoc_name,
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: fixedInterviewkId } });
            const data1 = await candidateProfileDetails.findOne({ where: { candidate_id: fixedInterviewkId } });
            if (data1) {
                const canData = await candidateProfileDetails.update({
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: fixedInterviewkId } });
            }
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData})
        }
        else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({ code:500, message:"Internal Server Error" });
    }
}