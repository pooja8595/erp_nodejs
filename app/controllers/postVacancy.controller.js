const db = require("../models/index");
const postVacancyDetails = db.jobDescription;
const op = db.sequelize.op;
const jobstitle = db.jobTitles;
const jobs = db.jobs;

/////////////// Create Post Vancay ///////////////

exports.createPostVancay = async (req, res) => {
    console.log("===>",req.body) 
    const { job_title_id, department, position, qualification, job_description, experience, location, job_title, requisition, job_role, job_type, candidate_age, age_range, number_of_position,Interview_level } = req.body;
    try {
        const jobdata = await jobs.findOne({ where: { id: job_title_id } })
        const postVac = await postVacancyDetails.findOne({ where: { job_title_id: job_title_id } })
        if (postVac) {
            return res.status(404).send({ code: 404, mesasge: "Post Vacancy Already Exits!" })
        } else {
            const response = await postVacancyDetails.create({
                job_title_id: job_title_id,
                department: department,
                position: position,
                qualification: qualification,
                age_range: age_range,
                job_description: job_description,
                experiance: experience,
                location: location,
                job_title: job_title,
                job_type: job_type,
                requisition: requisition,
                job_role: job_role,
                candidate_age: candidate_age,
                number_of_position: number_of_position,
                Interview_level:Interview_level
            });
            return res.status(200).send({ code: 200, message: "Post Vacancy Created Successfully", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Post Vancay ///////////////

exports.editPostVancay = async (req, res) => {
    try {
        const jobDescriptionId = req.params.id;
        const editData = await postVacancyDetails.findOne({ where: { job_id: jobDescriptionId } });
        if (editData) {
            const updateData = await postVacancyDetails.update(req.body, { where: { job_id: jobDescriptionId } });
            return res.status(200).send({ code: 200, message: "Post Vacancy Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Post Vancay ///////////////

exports.getAllPostVancay = async (req, res) => {
    try {
        const getAllData = await postVacancyDetails.findAll();
        getAllData.sort((a,b)=>{
            return b.job_id-a.job_id
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

/////////////// Get All Post Vancay ///////////////

exports.get_All_Post_Vancay = async (req, res) => {
    try {
        let getAllData = await postVacancyDetails.findAll({ attributes: ["job_id", "job_title_id"] });
        for(let i = 0; i < getAllData.length; i++) {
            getAllData[i].dataValues.job_applied=getAllData[i].dataValues.job_title_id
        }
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

/////////////// Get ById Post Vancay ///////////////

exports.getByIdPostVancay = async (req, res) => {
    try {
        const jobDescriptionId = req.params.id;
        const getData = await postVacancyDetails.findOne({ where: { job_id: jobDescriptionId } });
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

/////////////// Delete Post Vancay ///////////////

exports.deletePostVancay = async (req, res) => {
    try {
        const jobDescriptionId = req.params.id;
        const dltJobDescription = await postVacancyDetails.findOne({ where: { job_id: jobDescriptionId } });
        if (dltJobDescription) {
            const deleteData = await postVacancyDetails.update({ status: "CLOSED" }, { where: { job_id: jobDescriptionId } });
            return res.status(200).send({ code: 200, message: "Post Vacancy Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Recorb Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};