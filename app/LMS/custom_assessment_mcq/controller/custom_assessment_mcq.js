const { where } = require("sequelize");
const db = require("../../../models/index");
const { assign } = require("nodemailer/lib/shared");
const custom_assesment_mcqDetails = db.custom_assesment_mcq;
const newAssesmentDetails = db.newAssesment;
const questionariesDetails = db.questionaries;
const optionDetails = db.option;
const { Op } = require('sequelize');

const newContentDetails = db.newContent;
const newContent2Details = db.newContent2;
const newTraningDetails = db.newTraning;
const Number_of_attempt = db.no_of_attempt;
const userDetails = db.user;
const attempetData_Details = db.lms_number_of_attemptData;
const options_attempetData_Details = db.lms_optons_attemptData;
const course_Re_assign_Details = db.lms_course_Re_assign;
const addUserCourseDetails = db.addUserCourse;
const newRequestCourseDetails = db.newRequestCourse



// const answer_custom_assesmentDetails= db.answer_custom_assesment;
const op = db.sequelize.op;

exports.create_mcqCustom_Assesment = async (req, res) => {
    try {
        const { assesment_id, assesment_type } = req.body;

        if (req.body.assesment_type == "MCQ") {

            let arraymcq = [];

            for (let i = 0; i < req.body.details.length; i++) {
                var Objmcq = {
                    custom_assesment_question_mcq: req.body.details[i].custom_assesment_question_mcq,
                    custom_option1: req.body.details[i].custom_option1,
                    custom_option2: req.body.details[i].custom_option2,
                    custom_option3: req.body.details[i].custom_option3,
                    custom_option4: req.body.details[i].custom_option4,
                };

                let mcqdata = await custom_assesment_mcqDetails.create({
                    assesment_id,
                    assesment_type,
                    custom_assesment_question_mcq: Objmcq.custom_assesment_question_mcq,
                    custom_option1: Objmcq.custom_option1,
                    custom_option2: Objmcq.custom_option2,
                    custom_option3: Objmcq.custom_option3,
                    custom_option4: Objmcq.custom_option4,
                });

                arraymcq.push(mcqdata);
            }
            if (arraymcq) {
                return res.status(200).send({ code: 200, message: "Created Successfully", data: arraymcq })
            }
        }
        else {
            return res.status(403).send({ code: 403, message: "Assessment Type (Not a MCQ)" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAll_mcqCustom_Assesment = async (req, res) => {
    try {
        const getAllData = await custom_assesment_mcqDetails.findAll({
            where: { status: "ACTIVE" },
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

// ///////////// GetById Stage ///////////////

exports.getById_mcqCustom_Assesment = async (req, res) => {
    try {
        const assesment_id = parseInt(req.params.assesment_id);
        const getData = await custom_assesment_mcqDetails.findAll({ where: { assesment_id: assesment_id, assesment_type: "MCQ" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Stage ///////////////

exports.edit_mcqCustom_Assesment = async (req, res) => {
    try {
        const assesment_Id = parseInt(req.params.assesment_id);
        if (req.body.assesment_type == "MCQ") {

            let arraymcq = [];

            for (let i = 0; i < req.body.details.length; i++) {

                const userdata = await custom_assesment_mcqDetails.findOne({ where: { custom_assesment_mcq_id: req.body.details[i].custom_assesment_mcq_id } })
                if (userdata) {


                    var Objmcq = {
                        custom_assesment_mcq_id: req.body.details[i].custom_assesment_mcq_id,
                        custom_assesment_question_mcq: req.body.details[i].custom_assesment_question_mcq,
                        custom_option1: req.body.details[i].custom_option1,
                        custom_option2: req.body.details[i].custom_option2,
                        custom_option3: req.body.details[i].custom_option3,
                        custom_option4: req.body.details[i].custom_option4,
                    };

                    let mcqdata = await custom_assesment_mcqDetails.update({
                        custom_assesment_question_mcq: Objmcq.custom_assesment_question_mcq,
                        custom_option1: Objmcq.custom_option1,
                        custom_option2: Objmcq.custom_option2,
                        custom_option3: Objmcq.custom_option3,
                        custom_option4: Objmcq.custom_option4,
                    }, { where: { custom_assesment_mcq_id: Objmcq.custom_assesment_mcq_id, assesment_id: assesment_Id } });

                    arraymcq.push(mcqdata);
                }
                // }            
            }
            if (arraymcq) {
                return res.status(200).send({ code: 200, message: "Updated Successfully", data: arraymcq })
            }
        }
        else {
            return res.status(403).send({ code: 403, message: "Assessment Type (Not a MCQ)" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.create_mcq_QUES = async (req, res) => {
    try {
        const { assesment_id, assesment_type } = req.body;

        if (req.body.assesment_type == "Subjective") {

            let arraymcq = [];

            for (let i = 0; i < req.body.details.length; i++) {
                var Objmcq = {
                    custom_assesment_question_mcq: req.body.details[i].custom_assesment_question_mcq,

                };

                let mcqdata = await custom_assesment_mcqDetails.create({
                    assesment_id,
                    assesment_type,
                    custom_assesment_question_mcq: Objmcq.custom_assesment_question_mcq,

                });

                arraymcq.push(mcqdata);
            }
            if (arraymcq) {
                return res.status(200).send({ code: 200, message: "Created Successfully", data: arraymcq })
            }
        }
        else {
            return res.status(403).send({ code: 403, message: "Assessment Type (Not a Subjective)" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.edit_subjectiveCustom_Assesment = async (req, res) => {
    try {
        const assesment_Id = parseInt(req.params.assesment_id);
        if (req.body.assesment_type == "Subjective") {

            let arraymcq = [];

            for (let i = 0; i < req.body.details.length; i++) {

                const userdata = await custom_assesment_mcqDetails.findOne({ where: { custom_assesment_mcq_id: req.body.details[i].custom_assesment_mcq_id } })
                if (userdata) {


                    var Objmcq = {
                        custom_assesment_mcq_id: req.body.details[i].custom_assesment_mcq_id,
                        custom_assesment_question_mcq: req.body.details[i].custom_assesment_question_mcq,

                    };

                    let mcqdata = await custom_assesment_mcqDetails.update({
                        custom_assesment_question_mcq: Objmcq.custom_assesment_question_mcq,

                    }, { where: { custom_assesment_mcq_id: Objmcq.custom_assesment_mcq_id, assesment_id: assesment_Id } });

                    arraymcq.push(mcqdata);
                }

            }
            if (arraymcq) {
                return res.status(200).send({ code: 200, message: "Updated Successfully", data: arraymcq })
            }
        }
        else {
            return res.status(403).send({ code: 403, message: "Assessment Type (Not a Subjective)" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getById_subjectiveCustom_Assesment = async (req, res) => {
    try {
        const assesment_id = parseInt(req.params.assesment_id);
        const getData = await custom_assesment_mcqDetails.findAll({ where: { assesment_id: assesment_id, assesment_type: "Subjective" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// create questionaries to course /////////////////////////////

exports.create_questionaries = async (req, res) => {
    try {
        let mainArray = [];
        for (i = 0; i < req.body.length; i++) {

            var objData = {
                "content_id": req.body[i].content_id,
                "questions": req.body[i].questions,
                "question_remarks": req.body[i].question_remarks,
                "correct_answer": req.body[i].correct_answer,
                "options": req.body[i].options,
                "option_mode": req.body[i].option_mode,
                "user_login_id": req.body[i].user_login_id,
            }

            if (objData.options) {
                var questions1 = objData.options
            } else {
                var questions1 = null
            }
            let array = [];
            let mcqdata = await questionariesDetails.create({
                content_id: objData.content_id,
                questions: objData.questions,
                question_remarks: objData.question_remarks,
                options: questions1,
                correct_answer: objData.correct_answer,
                option_mode: objData.option_mode,
                user_login_id: objData.user_login_id
            });
            for (var j = 0; j < objData.options.length; j++) {
                var objData1 = {
                    "questionaries_id": mcqdata.questionaries_id,
                    "content_id": objData.content_id,
                    "options": objData.options[j].options,
                }
                const userData = await optionDetails.create(objData1);
                array.push(userData);
            }
            mainArray.push(objData);
        }
        return res.status(200).send({ code: 200, message: "Created Successfully", data: mainArray })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////// data get by content id//////////////////////////
exports.get_questions_By_content_id = async (req, res) => {
    try {
        const content_id = req.params.id;
        const getData = await questionariesDetails.findAll({
            where: { content_id: content_id },
            attributes: ["questionaries_id", "questions", "question_remarks", "correct_answer", "option_mode"]
        });

        var mainarr = [];
        for (var j = 0; j < getData.length; j++) {
            const questionId = getData[j].questionaries_id

            let getAllData = await optionDetails.sequelize.query(`SELECT * FROM options where content_id = ${content_id} AND questionaries_id =${questionId} `, {
                type: optionDetails.sequelize.QueryTypes.SELECT
            });

            for (let i of getAllData) {
                if (i.isChecked == 1) {
                    i.isChecked = true
                } else if (i.isChecked == 0) {
                    i.isChecked = false
                }
            }

            let obj = {
                "questionaries_id": getData[j].questionaries_id,
                "questions": getData[j].questions,
                "question_remarks": getData[j].question_remarks,
                "correct_answer": getData[j].correct_answer,
                "option_mode": getData[j].option_mode,
                "options": getAllData
            }
            mainarr.push(obj)
        }

        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: mainarr });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////// get data api for vinay //////////////////////////
exports.get_questions_By_contentID = async (req, res) => {
    try {
        const content_id = req.params.id;
        const data = await newContentDetails.findAll({
            where: { content_id: content_id },
            attributes: ["traning_id", "content_name"]
        });
        const getData = await questionariesDetails.findAll({
            where: { content_id: content_id },
            attributes: ["content_id", "questionaries_id", "questions", "question_remarks"]
        });

        let mainarr = [];
        for (var j = 0; j < getData.length; j++) {
            const questionId = getData[j].questionaries_id

            let getAllData = await optionDetails.sequelize.query(`SELECT option_id,options,isChecked FROM options where content_id = ${content_id} AND questionaries_id =${questionId} `, {
                type: optionDetails.sequelize.QueryTypes.SELECT
            });

            for (let i of getAllData) {
                if (i.isChecked == 1) {
                    i.isChecked = true
                } else if (i.isChecked == 0) {
                    i.isChecked = false
                }
            }

            let obj = {
                "traning_id": data[0].traning_id,
                "content_id": getData[j].content_id,
                "questionaries_id": getData[j].questionaries_id,
                "questions": getData[j].questions,
                "question_remarks": getData[j].question_remarks,
                "correct_answer": getData[j].correct_answer,
                "options": getAllData
            }
            mainarr.push(obj)
        }

        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", content_name: data[0].content_name, data: mainarr });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////// data edit questionaries////////////////////

exports.editquestionaries = async (req, res) => {

    try {

        let array = [];
        const data = req.body;


        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            const questionaries_id = element.questionaries_id;
            var objData = {
                "questions": element.questions,
                "question_remarks": element.question_remarks,
                "correct_answer": element.correct_answer,
                "user_answer": element.user_answer,
                "user_login_id": element.user_login_id
            }

            if (req.body[i].content_id != null) {
                const response = await questionariesDetails.create({
                    questions: data[i].questions,
                    question_remarks: data[i].question_remarks,
                    correct_answer: data[i].correct_answer,
                    content_id: data[i].content_id,
                    user_answer: data[i].user_answer,
                    user_login_id: data[i].user_login_id
                });

                for (var k = 0; k < data[i].options.length; k++) {
                    let abc = data[i].options[k].options
                    const optionData = await optionDetails.create({
                        questionaries_id: response.questionaries_id,
                        content_id: response.content_id,
                        options: abc
                    })
                }
            }

            if (!req.body[i].content_id) {
                const userData1 = await questionariesDetails.update(objData, { where: { questionaries_id: questionaries_id } });
                for (var j = 0; j < element.options.length; j++) {
                    const option_id = element.options[j].option_id
                    var objData = {
                        "options": element.options[j].options,
                        "isChecked": element.options[j].isChecked,
                    }
                    const userData = await optionDetails.update(objData, { where: { option_id: option_id } });
                    array.push(userData);
                }

            }
        }

        return res.status(200).send({ code: 200, message: "Update Successfully", data: array });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////// data edit questionaries for vinay////////////////////
// exports.edit_questionaries = async (req, res) => {

//     try {

//         const user_login_id = req.params.id;
//         const data = req.body;

//         const attemptData = await newTraningDetails.findOne({ where: { traning_id: data[0].traning_id } })
//         const data11 = attemptData.Max_attempt_count;
//         const data12 = attemptData.current_attempt_count;

//         const count = await newContentDetails.findAll({ where: { traning_id: data[0].traning_id } })
//         const true_count = await newContentDetails.findAll({ where: { traning_id: data[0].traning_id, isAssesment_submited: true } })
//         const data22 = count.length;
//         const data23 = true_count.length;

//         let given_attempt_count = count[0].given_attempt_count;

//         if (data11 >= data12) {

//             let array = [];
//             var Total_question = [];
//             let Attempt_count = [];
//             var correct_answer = [];
//             let wrong_answer = [];
//             for (let i = 0; i < data.length; i++) {
//                 const element = data[i];
//                 var objData = {
//                     "traning_id": element.traning_id,
//                     "content_id": element.content_id,
//                     "questionaries_id": element.questionaries_id,
//                     "questions": element.questions,
//                     "question_remarks": element.question_remarks,
//                     "user_login_id": element.user_login_id,
//                     "options": element.options,
//                 }
//                 const userData1 = await attempetData_Details.create({
//                     traning_id: objData.traning_id,
//                     content_id: objData.content_id,
//                     questionaries_id: objData.questionaries_id,
//                     employee_id: objData.user_login_id,
//                     questions: objData.questions,
//                     question_remarks: objData.question_remarks,
//                 });
//                 array.push(userData1);

//                 for (let j = 0; j < data[i].options.length; j++) {
//                     await options_attempetData_Details.create({
//                         content_id: data[i].content_id,
//                         questionaries_id: data[i].questionaries_id,
//                         option_id: data[i].options[j].option_id,
//                         options: data[i].options[j].options,
//                         isChecked: data[i].options[j].isChecked,
//                     });
//                 };

//                 var total_question = await questionariesDetails.findAll({ where: { content_id: userData1.content_id } })
//                 var total_question1 = data[i].options.filter(option => option.isChecked === true);
//                 console.log(total_question1,"total_question1")
//                 if(total_question1.length > 0){

//                 console.log(total_question1);
//                 Total_question.push(total_question1);

//                 let questionaries_id = total_question[i].questionaries_id
//                 let correct_option = total_question[i].correct_answer
//                 console.log(correct_option,"correct_option")

//                 var userAttempt_option = await options_attempetData_Details.findAll({ 
//                     where: {
//                         [Op.and]: [
//                           { questionaries_id: questionaries_id },
//                           { isChecked: true},
//                         ]
//                       },
                    
//                     // where: { questionaries_id: questionaries_id, isChecked: true }
//                  });
//                 console.log(userAttempt_option,"userAttempt_option")
//                 // var userAttempt_option_Data = userAttempt_option[0].options;
//                 // total_question1
//                 var userAttempt_option_Data = total_question1[0].options;

//                 console.log(userAttempt_option_Data,"userAttempt_option_Data")

//                 if (correct_option === userAttempt_option_Data) {
//                     correct_answer.push(correct_option)
//                 } else {
//                     wrong_answer.push(userAttempt_option_Data)
//                 }

//                 let attempt_count = await attempetData_Details.findAll({ where: { content_id: userData1.content_id } });
//                 Attempt_count.push(attempt_count);
//             }

//             let Not_attempt_count = Total_question[0].length - Attempt_count.length;
//             console.log(Not_attempt_count,"Not_attempt_count11111111111111")
//             console.log(correct_answer,"lenght")
//             console.log(correct_answer.length,"lenght")
//             console.log(Total_question[0],"totalquestion")
//             console.log(Total_question.length,"totalquestion_lenght")

//           var content_result = Math.round(((correct_answer.length) / (Total_question.length)) * 100);
//             console.log(content_result,"content_result11111111111111")
//             console.log(data[0],"data[0]hgdfgdfgd")
//             console.log(data[0].content_id,"data[0]11111111")
//             const updateData3 = await newContentDetails.update({
//                 result: content_result,
//                 question_not_attempt: Not_attempt_count,
//                 result_preview: true
//             }, { where: { content_id: data[0].content_id } });
//             console.log(updateData3,"updateData311111111111111")
//             console.log("ram")

//         }
    
//             let totalresult = 0;
//             let progressRate = 0;
//             let question_not_attempt = 0;
//             let AttemptCount = 0;
//             let traning_data = await newContentDetails.findAll({ where: { traning_id: data[0].traning_id } });
//             let traning_data2 = await newContentDetails.findAll({ where: { traning_id: data[0].traning_id, isAssesment_submited: true } });

//             for (let j = 0; j < traning_data.length; j++) {
//                 const element = traning_data[j].result;
//                 if (data[0].traning_id == traning_data[j].traning_id) {

//                     totalresult += parseInt(traning_data[j].result);
//                     progressRate += parseInt(traning_data[j].progress_rate)
//                     question_not_attempt += parseInt(traning_data[j].question_not_attempt)
//                 }

//                 if (traning_data[j].isAssesment_submited == true) {
//                     AttemptCount += 1
//                 }
//             }

//             let traning_result = Math.round(totalresult / traning_data.length);
//             let progress_rate = progressRate / traning_data.length;

//             await newTraningDetails.update({
//                 result: traning_result,
//                 progress_rate: progress_rate,
//                 not_attempt: question_not_attempt
//             }, { where: { traning_id: data[0].traning_id } });

//             await newRequestCourseDetails.update({
//                 result: traning_result,
//                 progress_rate: progress_rate,
//                 not_attempt: question_not_attempt,
//                 reporting_manager_id: data11,
//             }, { where: { traning_id: data[0].traning_id } });

//             if (data22 == data23) {
//                 // given_attempt_count += 1;

//                 await newContentDetails.update({
//                     given_attempt_count: given_attempt_count,
//                     // isAssesment_submited: false
//                 }, { where: { traning_id: data[0].traning_id } });
//             }
//             if (traning_data.length == traning_data2.length) {
//                 await newTraningDetails.update({
//                     readyForNextAttempt: true
//                 }, { where: { traning_id: data[0].traning_id } });

//                 await newRequestCourseDetails.update({
//                     readyForNextAttempt: true
//                 }, { where: { traning_id: data[0].traning_id } });
//             }

//             return res.status(200).send({ code: 200, message: "Update Successfully", data: array });
//         } else {
//             return res.status(405).send({ code: 405, message: "You Take Your All Attempts" });

//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };
exports.edit_questionaries = async (req, res) => {
    try {
        var user_login_id = parseInt(req.params.id);

        const data = req.body;
        var bodyDataLength = data.length

        const attemptData = await newTraningDetails.findOne({ where: { traning_id: data[0].traning_id } });
        const data11 = attemptData.Max_attempt_count;
        const data12 = attemptData.current_attempt_count;

        const count = await newContent2Details.findAll({ where: { traning_id: data[0].traning_id , employee_id:user_login_id } });
        const true_count = await newContent2Details.findAll({ where: { traning_id: data[0].traning_id, isAssesment_submited: true , employee_id:user_login_id, } });
        const data22 = count.length;
        const data23 = true_count.length;

        let given_attempt_count;
        if(count.length>0){
            given_attempt_count = count[0].given_attempt_count;
        }

        if (data11 >= data12) {
            let array = [];
            var Total_question = [];
            let Attempt_count = [];
            var correct_answer = [];
            let wrong_answer = [];
            let Not_attempt_count = 0;  // Initialize the count of not attempted questions.

            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                var objData = {
                    "traning_id": element.traning_id,
                    "content_id": element.content_id,
                    "questionaries_id": element.questionaries_id,
                    "questions": element.questions,
                    "question_remarks": element.question_remarks,
                    "user_login_id": element.user_login_id,
                    "options": element.options,
                }

                const userData1 = await attempetData_Details.create({
                    traning_id: objData.traning_id,
                    content_id: objData.content_id,
                    questionaries_id: objData.questionaries_id,
                    employee_id: objData.user_login_id,
                    questions: objData.questions,
                    question_remarks: objData.question_remarks,
                });
                array.push(userData1);

                for (let j = 0; j < data[i].options.length; j++) {
                    await options_attempetData_Details.create({
                        content_id: data[i].content_id,
                        questionaries_id: data[i].questionaries_id,
                        option_id: data[i].options[j].option_id,
                        options: data[i].options[j].options,
                        isChecked: data[i].options[j].isChecked,
                    });
                };

                var total_question = await questionariesDetails.findAll({ where: { content_id: userData1.content_id } });
                var total_question1 = data[i].options.filter(option => option.isChecked === true);

                if (total_question1.length > 0) {
                    Total_question.push(total_question1);

                    let questionaries_id = total_question[i].questionaries_id;
                    let correct_option = total_question[i].correct_answer;

                    var userAttempt_option = await options_attempetData_Details.findAll({
                        where: {
                            [Op.and]: [
                                { questionaries_id: questionaries_id },
                                { isChecked: true },
                            ]
                        },
                    });

                    var userAttempt_option_Data = total_question1[0].options;

                    if (correct_option === userAttempt_option_Data) {
                        correct_answer.push(correct_option);
                    } else {
                        wrong_answer.push(userAttempt_option_Data);
                    }

                    let attempt_count = await attempetData_Details.findAll({ where: { content_id: userData1.content_id } });
                    Attempt_count.push(attempt_count);

                    // Update Not_attempt_count for this question.
                    // Not_attempt_count += bodyDataLength - attempt_count.length;
                }
            }

            // Calculate content result
            var content_result = Math.round(((correct_answer.length) / bodyDataLength) * 100);
            Not_attempt_count = bodyDataLength - Attempt_count.length;

            // Update content details
            const updateData3 = await newContent2Details.update({
                result: content_result,
                employee_id:user_login_id,
                question_not_attempt: Not_attempt_count,
                result_preview: true
            }, { where: { content_id: data[0].content_id , employee_id:user_login_id,} });

            // const updateData2s = await newContent2Details.update({
            //     result: content_result,
            //     employee_id:user_login_id,
            //     question_not_attempt: Not_attempt_count,
            //     result_preview: true
            // }, { where: { traning_id: data[0].traning_id } });

            let totalresult = 0;
            let progressRate = 0;
            let question_not_attempt = 0;
            let AttemptCount = 0;
            let traning_data = await newContent2Details.findAll({ where: { traning_id: data[0].traning_id, employee_id:user_login_id } });
            let traning_data2 = await newContent2Details.findAll({ where: { traning_id: data[0].traning_id, isAssesment_submited: true , employee_id:user_login_id,} });

            for (let j = 0; j < traning_data.length; j++) {
                const element = traning_data[j].result;
                if (data[0].traning_id == traning_data[j].traning_id) {
                    totalresult += parseInt(traning_data[j].result);
                    progressRate += parseInt(traning_data[j].progress_rate);
                    question_not_attempt += parseInt(traning_data[j].question_not_attempt);
                }

                if (traning_data[j].isAssesment_submited == true) {
                    AttemptCount += 1;
                }
            }

            let traning_result = Math.round(totalresult / traning_data.length);
            let progress_rate = progressRate / traning_data.length;
            await newTraningDetails.update({
                result: traning_result,
                progress_rate: progress_rate,
                not_attempt: question_not_attempt
            }, { where: { traning_id: data[0].traning_id } });

            await newRequestCourseDetails.update({
                result: traning_result,
                progress_rate: progress_rate,
                not_attempt: question_not_attempt,
                // reporting_manager_id: data11,
            }, { where: { traning_id: data[0].traning_id , employee_id:user_login_id} });

            if (data22 == data23) {
                // given_attempt_count += 1;
                // await newContentDetails.update({
                //     given_attempt_count: given_attempt_count,
                //     // isAssesment_submited: false
                // }, { where: { traning_id: data[0].traning_id } });
                await newContent2Details.update({
                    given_attempt_count: given_attempt_count,
                    // isAssesment_submited: false
                }, { where: { traning_id: data[0].traning_id ,employee_id:user_login_id} });
            
            }

            if (traning_data.length == traning_data2.length) {
                await newTraningDetails.update({
                    readyForNextAttempt: true
                }, { where: { traning_id: data[0].traning_id } });

                await newRequestCourseDetails.update({
                    readyForNextAttempt: true
                }, { where: { traning_id: data[0].traning_id,employee_id:user_login_id } });
            }
            return res.status(200).send({ code: 200, message: "Update Successfully", data: array });
        } else {
            return res.status(405).send({ code: 405, message: "You Take Your All Attempts" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};




////////////////////////////delete_questionaries/////////////////////
exports.delete_questionaries = async (req, res) => {
    try {
        const questionaries_id = req.params.id;
        const getData = await questionariesDetails.findOne({ where: { questionaries_id: questionaries_id } });
        const getData1 = await optionDetails.findAll({ where: { questionaries_id: questionaries_id } });

        if (getData) {
            const del = await questionariesDetails.destroy({ where: { questionaries_id: questionaries_id } });
            const del1 = await optionDetails.destroy({ where: { questionaries_id: questionaries_id } });
            return res.status(200).send({ code: 200, message: "File Data is Deleted Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 403, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


////////////////////////////// user correct answer //////////////////////////
exports.questions_result = async (req, res) => {
    try {
        const user_login_id = req.params.id;
        const splitData = user_login_id.split(",");

        const user_login_id1 = splitData[0];
        const traningid = splitData[1];
        const contentid = splitData[2];

        const questionData = await questionariesDetails.findAll({ where: { user_login_id: user_login_id1, content_id: contentid } });
        
        var Attemptd = [];
        var content_id = [];
        var question_count = [];

        for (var j = 0; j < questionData.length; j++) {
            const questionId = questionData[j].questionaries_id
            let contentData = questionData[j].content_id;

            let getAllData = await optionDetails.sequelize.query(`SELECT option_id, options, isChecked, questionaries_id FROM options where questionaries_id =${questionId} AND content_id = ${contentid} `, {
                type: optionDetails.sequelize.QueryTypes.SELECT
            });

            let getAllData1 = await questionariesDetails.sequelize.query(`SELECT questionaries_id FROM questionaries where content_id =${contentData} `, {
                type: questionariesDetails.sequelize.QueryTypes.SELECT
            });

            let qustionCount = getAllData1.length;
            question_count.push(qustionCount);


            for (var i = 0; i < getAllData.length; i++) {
                let obj = {
                    "isChecked": getAllData[i].isChecked,
                    "option_id": getAllData[i].option_id,
                    "questionaries_id": getAllData[i].questionaries_id,
                    "options": getAllData[i].options,
                }

                if (getAllData[i].isChecked == 1) {
                    Attemptd.push(obj);
                }
            }
        }

        let optionID = [];
        let ischecked = [];
        let rightanswered = [];

        for (var l = 0; l < Attemptd.length; l++) {
            let data = Attemptd[l].isChecked
            let data1 = Attemptd[l].option_id
            let data2 = Attemptd[l].questionaries_id
            let data3 = Attemptd[l].options
            ischecked.push(data);
            optionID.push(data1);

            let getAllData = await questionariesDetails.sequelize.query(`SELECT correct_answer, questionaries_id FROM questionaries where questionaries_id =${data2} `, {
                type: questionariesDetails.sequelize.QueryTypes.SELECT
            });

            if (getAllData[0].correct_answer == data3) {
                rightanswered.push(getAllData[0].correct_answer)
            }
        }

        let correct_answerCount = rightanswered.length;

        let NotAttempt = questionData.length - Attemptd.length;

        await newContentDetails.update({
            question_not_attempt: NotAttempt
        }, { where: { content_id: contentid[contentid.length - 1] } });

        const data1 = await newTraningDetails.findAll();
        for (var k = 0; k < data1.length; k++) {
            let t_id = data1[k].traning_id;

            let getAllData = await newContentDetails.sequelize.query(`SELECT content_id, traning_id, question_not_attempt, result, progress_rate FROM new_contents where traning_id = ${t_id} `, {
                type: newContentDetails.sequelize.QueryTypes.SELECT
            });


            let totalamt = 0;
            let totalresult = 0;
            let trainingCount = 0;
            let progressRate = 0;
            for (var h = 0; h < getAllData.length; h++) {

                if (t_id == getAllData[h].traning_id) {

                    totalresult += parseInt(getAllData[h].result)
                    progressRate += parseInt(getAllData[h].progress_rate)
                    trainingCount += 1
                }


                let sum = getAllData[h].question_not_attempt;
                let t_id1 = getAllData[h].traning_id;
                totalamt += sum
            }

            progressRate > 0 ? progressRate = progressRate / trainingCount : progressRate = 0

            let traning_result;
            totalresult > 0 ? traning_result = totalresult / trainingCount : traning_result = 0

            await newTraningDetails.update({
                not_attempt: totalamt,
                result: traning_result,
                progress_rate: progressRate
            }, { where: { traning_id: t_id } });
        };

        const Result = correct_answerCount / question_count[0] * 100;

        let AllData = {
            total_question_count: question_count[0],
            Attempted_question: ischecked.length,
            NotAttempt_question: NotAttempt,
            right_answer_count: correct_answerCount,
            final_result: Result
        }


        const attemptData = await newTraningDetails.findOne({ where: { traning_id: traningid } })
        const data11 = attemptData.no_of_assesment_attempt;

        const count = await Number_of_attempt.findAll({ where: { content_id: contentid } })
        const data22 = count.length;


        await newContentDetails.update({
            result: AllData.final_result,
            given_attempt_count: data22,
            result_preview: true
        }, { where: { content_id: contentid[contentid.length - 1] } });





        if (data11 > data22) {

            await Number_of_attempt.create({
                content_id: contentid,
                total_question: AllData.total_question_count,
                Attempted_question: AllData.Attempted_question,
                NotAttempt_question: AllData.NotAttempt_question,
                right_answer_count: AllData.right_answer_count

            });

        } else {
            return res.status(405).send({ code: 405, message: "You Take Your All Attempts" });
        }

        return res.status(200).send({ code: 200, message: "Get Data Successfully!", data: AllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


////////////////////// options reset ///////////////

// exports.option_reset = async (req, res) => {
//     try {
//         const content_id = req.params.id;
//         const updateData =  await optionDetails.update({isChecked: false}, {where:{content_id: content_id }});
//         return res.status(200).send({ code: 200, message: "Update Data Successfully!", data: updateData });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     }
// };

///////////////////////////update new_content isAssesment_submited field//////////////////////

exports.update_isAssesment_submited = async (req, res) => {
    try {
        const content_id = req.body.content_id;
        const employee_id = req.body.employee_id;
        const updateData = await newContent2Details.update({ isAssesment_submited: true }, { where: { content_id: content_id , employee_id:employee_id} });
        return res.status(200).send({ code: 200, message: "Update Data Successfully!", data: updateData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

////////////////////// api for update new traning readyForNextAttempt field////////////////////////////

exports.update_current_attempt_count = async (req, res) => {
    try {
        // const traning_id = req.params.id;
        const traning_id = req.body.traning_id;
        const employee_id = req.body.employee_id;

        const oldData = await newRequestCourseDetails.findOne({ where: { traning_id: traning_id, employee_id:employee_id } });
        const max_count = oldData.Max_attempt_count;
        const current_attempt_count = oldData.current_attempt_count;
        if (max_count !== current_attempt_count) {
            const updateData = await newTraningDetails.update({
                current_attempt_count: req.body.current_attempt_count,
                progress_rate: 0,
                not_attempt: 0,
                result: 0,
                readyForNextAttempt: false
            }, { where: { traning_id: traning_id } });
            const updateData1 = await newRequestCourseDetails.update({
                current_attempt_count: req.body.current_attempt_count,
                progress_rate: 0,
                not_attempt: 0,
                result: 0,
                readyForNextAttempt: false
            }, { where: { traning_id: traning_id ,employee_id:employee_id} });
            await newContent2Details.update({
                progress_rate: 0,
                question_not_attempt: 0,
                result: 0,
                result_preview: 0,
                given_attempt_count: 0,
                isAssesment_submited: false
            }, { where: { traning_id: traning_id ,employee_id:employee_id} });

            const updateData2 = await newTraningDetails.findOne({ where: { traning_id: traning_id } });
            await newContent2Details.update({
                given_attempt_count: updateData2.current_attempt_count,
            }, { where: { traning_id: traning_id ,employee_id:employee_id} });
            return res.status(200).send({ code: 200, message: "Update Data Successfully!", data: updateData });
        } else {
            return res.status(405).send({ code: 405, message: "You Take Your All Attempts" });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////// Assigned User Result List /////////////////////
exports.AssignedUser_list = async (req, res) => {
    try {
        const reporting_manager_id = req.params.id;
        const currentDate = new Date(); // Get the current date
        var userdata = await userDetails.findAll({
            where: { reporting_manager_id: reporting_manager_id },
            attributes: ["employee_id", "first_name", "last_name", "segment_suv"]
        });

        let array = []
        for (i = 0; i < userdata.length; i++) {
            let name = userdata[i].first_name;
            let last_name = userdata[i].last_name;
            let employee_id = userdata[i].employee_id;
            let segment_suv = userdata[i].segment_suv;
            
            var newTraningdetai = await newTraningDetails.findAll({
                where: { employee_id: employee_id },
                attributes: ["traning_id", "employee_id", "Max_attempt_count", "current_attempt_count", "isExpired"]
            });

            var newRequestCourse = await newRequestCourseDetails.findAll({ where: { course_request_status: "APPROVED", employee_id: employee_id } });
            if(newRequestCourse.length>0){
                let count=0;
               newRequestCourse.map( async(item)=> {
                let end_date= new Date(item.end_date)
                if (item.new_max_count > item.current_attempt_count &&  item.result < 100) {
                    item.status = "INPROGRESS";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})

                }
                if (item.new_max_count == item.current_attempt_count && item.result < 100 ) {
                    item.status = "FAILED";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                if (item.new_max_count >= item.current_attempt_count && item.result == 100) {
                    item.status = "COMPLETED";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                if (currentDate > end_date &&  item.result < 100) {
                    item.status = "EXPIRED";
                   const up = await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                // if (currentDate < item.end_date &&  item.result > 100 && item.new_max_count <= item.current_attempt_count) {
                //     item.status = "FAILED";
                //     await newRequestCourseDetails.save();
                // }
               })
            }

            var addUserCourse = await addUserCourseDetails.findAll({ where: { employee_id: employee_id, course_request_status: "APPROVED" } });
            if(addUserCourse.length>0){
                let count=0;
                addUserCourse.map( async(item)=> {
                let end_date1= new Date(item.end_date)
                // addUserCourse.map( async(item)=> {
                
                    if (item.new_max_count > item.current_attempt_count &&  item.result < 100) {
                        item.status = "INPROGRESS";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (item.new_max_count == item.current_attempt_count && item.result < 100 ) {
                        item.status = "FAILED";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (item.new_max_count >= item.current_attempt_count && item.result == 100) {
                        item.status = "COMPLETED";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (currentDate > end_date1 &&  item.result < 100) {
                        item.status = "EXPIRED";
                       const up1 = await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                // if (currentDate > item.end_date &&  item.result > 100) {
                //     item.status = "EXPIRED";
                //     await addUserCourseDetails.update({status:item.status}, {where: {traning_id: item.traning_id ,author_course_id:item.author_course_id }})
                    
                // }
                // if (currentDate < item.end_date &&  item.result > 100 && item.new_max_count <= item.current_attempt_count) {
                //     item.status = "FAILED";
                //     await addUserCourseDetails.save();
                // }
                // // else {
                // //     item.status = "OPEN";
                // //     await addUserCourseDetails.save();
                // // }
               })
            }
            obj = {
                "first_name": name,
                "last_name": last_name,
                "employee_id": employee_id,
                "segment_suv": segment_suv,
                "count_data": newTraningdetai,
                "requested_data": newRequestCourse,
                "assgned_data": addUserCourse
            }
            array.push(obj)
        }
        if (array) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////// RE-Assigned /////////////////////

exports.RE_Assigned = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const author_id = req.body.author_id;
        const re_assigned_by = req.body.re_assigned_by;
        const traning_ID = req.body.traning_id;
        const course_request_status = req.body.course_request_status;
        const Data = await newRequestCourseDetails.findAll({ where: { employee_id: employee_id } });
        const userName = await userDetails.findOne({ where: { employee_id: employee_id } });
        if (Data) {
            for (let i = 0; i < Data.length; i++) {
                const old_data = await course_Re_assign_Details.findOne({where: {course_name:Data[i].course_name }})
                if(!old_data){
                    const data = await course_Re_assign_Details.create({
              
                        category: Data[i].category,
                        user_name: userName.first_name,
                        segment: userName.segment_suv,
                        course_name: Data[i].course_name,
                        re_assigned_by: re_assigned_by,
                        author_id: author_id,
                        start_date: Data[i].start_date,
                        end_date: Data[i].end_date,
                        })
                }
                
            }
            const updatedata = await newTraningDetails.update({
                progress_rate: 0,
                not_attempt: 0,
                result: 0,
                isExpired: true
            }, { where: { employee_id: employee_id , traning_id:traning_ID } });

            const updatedata1 = await newRequestCourseDetails.update({
                course_request_status: course_request_status,
                re_assign_status : true,
                current_attempt_count : 0 ,
                result: 0,
            }, { where: { employee_id: employee_id , traning_id:traning_ID} });

            for (let i = 0; i < Data.length; i++) {
                const updatedata2 = await newContent2Details.update({
                    progress_rate: 0,
                    question_not_attempt: 0,
                    result_preview: 0,
                    isAssesment_submited: 0,
                    given_attempt_count: 1,
                    result: 0,
                    video_current_time: 0,
                }, { where: { traning_id: Data[i].traning_id , employee_id:employee_id} });
            }

            return res.status(200).send({ code: 200, message: "Update Data Successfully!", data: updatedata });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////// course re_assigned list api ///////////////////////////////////

exports.getAll_list_re_assigned = async (req, res) => {
    try {
        const author_id = req.params.id
        const AllData = await course_Re_assign_Details.findAll({ where: { author_id: author_id } });
        return res.status(200).send({ code: 200, message: "Get Data Successfully!", data: AllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


exports.getAll_status_compare_update = async (req, res) => {
    try {
        const employee_id = req.body.employee_id;
        const traning_id = req.body.traning_id;
        const currentDate = new Date(); // Get the current date

        var newRequest_check = await newRequestCourseDetails.findOne({
            where: {
                course_request_status: "APPROVED",
                employee_id: employee_id,
                traning_id: traning_id,
                start_date: {
                    [Op.lte]: currentDate, // Start date is less than or equal to the current date
                },
                end_date: {
                    [Op.gte]: currentDate, // End date is greater than or equal to the current date
                },
            }
        });

        if (newRequest_check) {
            // Check if new_max_count is greater than or equal to current_attempt_count
            if (newRequest_check.new_max_count > newRequest_check.current_attempt_count &&  newRequest_check.result < 100) {
                // Update the status to "INPROGRESS"
                newRequest_check.status = "INPROGRESS";
                await newRequest_check.save(); // Save the updated record

                return res.status(200).send({ code: 200, message: "Status Updated to INPROGRESS!", data: newRequest_check });
            }
            if (newRequest_check.new_max_count == newRequest_check.current_attempt_count && newRequest_check.result < 100 ) {
                // Update the status to "FAILED"
                newRequest_check.status = "REQUEST";
                await newRequest_check.save(); // Save the updated record

                return res.status(200).send({ code: 200, message: "Status Updated to FAILED!", data: newRequest_check });
            }
            else if (newRequest_check.new_max_count >= newRequest_check.current_attempt_count && 100 == newRequest_check.result) {
                // Update the status to "COMPLETED"
                newRequest_check.status = "COMPLETED";
                await newRequest_check.save(); // Save the updated record

                return res.status(200).send({ code: 200, message: "Status Updated to COMPLETED!", data: newRequest_check });
            }
            else {
                console.log("CONDITION FAILED xxxxx.");
                return res.status(400).send({ code: 400, message: "CONDITION FAILED" });
            }
        }
        // else if (currentDate > newRequest_check.end_date &&  newRequest_check.reult > 100) {

        //         newRequest_check.status = "START COURSE";
        //         await newRequest_check.save(); // Save the updated record

        //         return res.status(200).send({ code: 200, message: "Status Updated to EXPIRED!", data: newRequest_check });
            
        // }
        else {
            console.log("No matching record found.");
            return res.status(404).send({ code: 404, message: "No matching record found." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};



exports.AssignedUser_list_traning_author  = async (req, res) => {
    try {
        const traning_id = req.body.traning_id;
        const author_course_id = req.body.author_course_id;
        const currentDate = new Date(); // Get the current date
        var userdata = await newRequestCourseDetails.findAll(
            {where: {
                [Op.and]: [
                  { traning_id:traning_id },
                  { author_course_id:author_course_id },
                ]
            , assigned :true},
            include: [{
                model: userDetails,
                attributes: ["employee_id", "first_name", "last_name", "segment_suv"]
             
              }]
           
        });

        // let array = []
        for (i = 0; i < userdata.length; i++) {
            let employee_id = userdata[i].registered_user.employee_id;
            var newRequestCourse = await newRequestCourseDetails.findAll({ where: { course_request_status: "APPROVED", employee_id: employee_id } });
            if(newRequestCourse.length>0){
                let count=0;
               newRequestCourse.map( async(item)=> {
                let end_date= new Date(item.end_date)
                if (item.new_max_count > item.current_attempt_count &&  item.result < 100) {
                    item.status = "INPROGRESS";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                    
                }
                if (item.new_max_count == item.current_attempt_count && item.result < 100 ) {
                    item.status = "FAILED";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                if (item.new_max_count >= item.current_attempt_count && item.result == 100) {
                    item.status = "COMPLETED";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                if (currentDate.toISOString().split('T')[0] > end_date.toISOString().split('T')[0] &&  item.result < 100) {
                    item.status = "EXPIRED";
                   const up = await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                // if (currentDate < item.end_date &&  item.result > 100 && item.new_max_count <= item.current_attempt_count) {
                //     item.status = "FAILED";
                //     await newRequestCourseDetails.save();
                // }
               })
            }

            var addUserCourse = await addUserCourseDetails.findAll({ where: { employee_id: employee_id, course_request_status: "APPROVED" } });
            if(addUserCourse.length>0){
                let count=0;
                addUserCourse.map( async(item)=> {
                let end_date1= new Date(item.end_date)
                // addUserCourse.map( async(item)=> {
                
                    if (item.new_max_count > item.current_attempt_count &&  item.result < 100) {
                        item.status = "INPROGRESS";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (item.new_max_count == item.current_attempt_count && item.result < 100 ) {
                        item.status = "FAILED";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (item.new_max_count >= item.current_attempt_count && item.result == 100) {
                        item.status = "COMPLETED";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (currentDate.toISOString().split('T')[0] > end_date1.toISOString().split('T')[0] &&  item.result < 100) {
                        item.status = "EXPIRED";
                       const up1 = await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
               })
            }
            // obj = {
            //      userdata
            // }
            // array.push(obj)
        }

        final_data = await newRequestCourseDetails.findAll(
            {where: {
                [Op.and]: [
                  { traning_id:traning_id },
                  { author_course_id:author_course_id },
                ]
            , assigned :true},
            include: [{
                model: userDetails,
                attributes: ["employee_id", "first_name", "last_name", "segment_suv"]
             
              }]
           
        });

        if (final_data) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: final_data });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


exports.AssignedUser_list_byreportmanger = async (req, res) => {
    try {
        const reporting_manager_id = req.params.id;
        const currentDate = new Date(); // Get the current date
        var userdata = await userDetails.findAll({
            where: { reporting_manager_id: reporting_manager_id },
            attributes: ["employee_id", "first_name", "last_name", "segment_suv" ,"reporting_manager_id"]
        });

        let array = []
        for (i = 0; i < userdata.length; i++) {
            let name = userdata[i].first_name;
            let last_name = userdata[i].last_name;
            let employee_id = userdata[i].employee_id;
            let segment_suv = userdata[i].segment_suv;
            
            var newTraningdetai = await newTraningDetails.findAll({
                where: { employee_id: employee_id },
                attributes: ["traning_id", "employee_id", "Max_attempt_count", "current_attempt_count", "isExpired"]
            });

            var newRequestCourse = await newRequestCourseDetails.findAll({ where: { course_request_status: "APPROVED", employee_id: employee_id} });
            if(newRequestCourse.length>0){
                let count=0;
               newRequestCourse.map( async(item)=> {
                let end_date= new Date(item.end_date)
                if (item.new_max_count > item.current_attempt_count &&  item.result < 100) {
                    item.status = "INPROGRESS";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})

                }
                if (item.new_max_count == item.current_attempt_count && item.result < 100 ) {
                    item.status = "FAILED";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                if (item.new_max_count >= item.current_attempt_count && item.result == 100) {
                    item.status = "COMPLETED";
                    await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
                if (currentDate.toISOString().split('T')[0] > end_date.toISOString().split('T')[0] &&  item.result < 100) {
                    item.status = "EXPIRED";
                   const up = await newRequestCourseDetails.update({status:item.status}, {where: {request_id: item.request_id}})
                }
               })
            }

            var addUserCourse = await addUserCourseDetails.findAll({ where: { employee_id: employee_id, course_request_status: "APPROVED" } });
            if(addUserCourse.length>0){
                let count=0;
                addUserCourse.map( async(item)=> {
                let end_date1= new Date(item.end_date)
                // addUserCourse.map( async(item)=> {
                
                    if (item.new_max_count > item.current_attempt_count &&  item.result < 100) {
                        item.status = "INPROGRESS";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (item.new_max_count == item.current_attempt_count && item.result < 100 ) {
                        item.status = "FAILED";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (item.new_max_count >= item.current_attempt_count && item.result == 100) {
                        item.status = "COMPLETED";
                        await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
                    if (currentDate.toISOString().split('T')[0] > end_date1.toISOString().split('T')[0] &&  item.result < 100) {
                        item.status = "EXPIRED";
                       const up1 = await addUserCourseDetails.update({status:item.status}, 
                            {where: {
                                [Op.and]: [
                                  { traning_id: item.traning_id },
                                  { author_course_id:item.author_course_id },
                                ]
                            }
                            })
                    }
               })
            }

        }

    for (let i = 0; i < userdata.length; i++) {
        let employee_id = userdata[i].employee_id;
        var newRequest1 = await newRequestCourseDetails.findAll({
            where: {
                course_request_status: "APPROVED",
                [Op.and]: [
                    { employee_id: employee_id },
                    { reporting_manager_id: reporting_manager_id },
                ]
            },
            include: [{
                        model: userDetails,
                        attributes: ["employee_id", "first_name", "last_name", "segment_suv"]
                     
                      }]
        });

        // Do something with newRequest1 if needed
        if (newRequest1.length > 0) {
            array.push(newRequest1)
        }
     
    }

  
        if (array) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


exports.AssignedUser_list_course_id = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const userdata = await newRequestCourseDetails.findAll({
            where: { author_course_id: author_course_id, re_assign_status: true },
            include: [{
                model: userDetails,
                attributes: ["employee_id", "first_name", "last_name", "segment_suv"]
            }]
        });

        if (userdata) {
            const extendedData = [];

            for (const user of userdata) {
                const reportingManagerId = user.reporting_manager_id;

                // Find reporting manager by their employee_id
                const reportingManager = await userDetails.findOne({
                    where: { employee_id: reportingManagerId },
                    attributes: ["employee_id", "first_name", "last_name", "segment_suv"]
                });

                // Add reporting manager details to the response
                if (reportingManager) {
                    extendedData.push({
                        ...user.dataValues,
                        reporting_manager: reportingManager
                    });
                }
            }

            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: extendedData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
