const db = require("../../../models/index");
const addUsers = db.addUser;
const newTraningDetails = db.newTraning;
const addUserCourseDetails = db.addUserCourse;
const newContentDetails = db.newContent;
const newContent2Details = db.newContent2;
const newRequestCourseDetails = db.newRequestCourse
const user = db.user
const Op = require('sequelize').Op;

///////////////////////////////////sinkesh code///////////////////////////////////////////////////////

///////////////  Create Add User Course ///////////////

// exports.assign_course_to_user = async (req, res) => {
//     try {
//         const { traning_id, user_category, add_user, author_course_id, start_date, end_date, employee_id, user_id } = req.body;
//         if (add_user) {
//             var addUser = add_user
//         } else {
//             var addUser = null
//         }
//         const getData = await newTraningDetails.findOne({ where: { assigned: req.body.assigned } });
//         var array = [];
//         const response = await addUsers.create({
//             traning_id,
//             user_category,
//             author_course_id,
//             add_user: addUser,
//             start_date,
//             end_date,
//             employee_id,
//             user_id,
//             assigned: req.body.assigned,
//             create_user_status: "Created User"
//         });
//         console.log(response, "response")
//         for (var i = 0; i < add_user.length; i++) {
//             const addData = await newRequestCourseDetails.findAll({ where: { traning_id: traning_id } })
//             if (addData) {
//                 let array1 = [];
//                 for (let j = 0; j < addData.length; j++) {
//                     var objData = {
//                         "traning_id": response.traning_id,
//                         "employee_id": add_user[i].employee_id,
//                         "author_course_id": response.author_course_id,
//                         "user_id": response.user_id,
//                         "assigned": response.assigned,
//                         "start_date": response.start_date,
//                         "end_date": response.end_date,
//                         "user_category": response.user_category,
//                         "author_course_name": addData[j]?.author_course_name,
//                         "category": addData[j]?.category,
//                         "course_name": addData[j]?.course_name,
//                         "segment": addData[j]?.segment,
//                         "course_description": addData[j]?.course_description,
//                         "course_thumbnail": addData[j]?.course_thumbnail,
//                         "course_request_status": "APPROVED"
//                     }
//                     array1.push(objData)
//                 }
//             }
//             const userData = await addUserCourseDetails.create(objData);
//             array.push(userData);
//         }
//         return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };

exports.assign_course_to_user = async (req, res) => {
    try {
        const { traning_id, user_category, add_user, author_course_id, start_date, end_date, employee_id, reporting_manager_id, user_id } = req.body;
        if (add_user) {
            var addUser = add_user
        } else {
            var addUser = null
        }
        const getData = await newTraningDetails.findOne({ where: { assigned: req.body.assigned } });
        var array = [];
        const response = await addUsers.create({
            traning_id,
            user_category,
            author_course_id,
            add_user: addUser,
            start_date,
            end_date,
            employee_id,
            reporting_manager_id,
            user_id,
            assigned: req.body.assigned,
            create_user_status: "Created User"
        });
        var maxdata = await newTraningDetails.findOne({ where: { traning_id: response.traning_id } })
        const findData1 = await newContentDetails.findAll({ where: { traning_id: response.traning_id } }) 
        for (var i = 0; i < add_user.length; i++) {
            const addData = await newRequestCourseDetails.findAll({ where: { traning_id: traning_id } })
            if (addData) {
                let array1 = [];
                for (let j = 0; j < addData.length; j++) {
                    var objData = {
                        "traning_id": response.traning_id,
                        "employee_id": add_user[i].employee_id,
                        "reporting_manager_id":add_user[i].reporting_manager_id,
                        "author_course_id": response.author_course_id,
                        "user_id": response.user_id,
                        "assigned": response.assigned,
                        "start_date": response.start_date,
                        "end_date": response.end_date,
                        "user_category": response.user_category,
                        "author_course_name": addData[j]?.author_course_name,
                        "category": addData[j]?.category,
                        "course_name": addData[j]?.course_name,
                        "segment": addData[j]?.segment,
                        "course_description": addData[j]?.course_description,
                        "course_thumbnail": addData[j]?.course_thumbnail,
                        "course_request_status": "APPROVED",
                        "new_max_count": maxdata.Max_attempt_count,
                        "re_assign_status": false,
                        "Max_attempt_count": maxdata.Max_attempt_count,
                        "content_count": findData1.length,
                        "no_of_option_question": maxdata.no_of_option_question,
                     
                    }
                    array1.push(objData)
                }
            }
            const userData = await addUserCourseDetails.create(objData);
            array.push(userData);
            const userData1 = await newRequestCourseDetails.create(objData);
            array.push(userData1);  
            
            if (userData1.course_request_status === "APPROVED" && userData1.re_assign_status === false) {
                const AData = await newRequestCourseDetails.findOne({
                    where: {
                        [Op.and]: [
                            { traning_id: userData1.traning_id },
                            { employee_id: userData1.employee_id },
                            { author_course_id: userData1.author_course_id }
                        ]
                    },
                });
                if (AData) {
                    const findcontentData = await newContentDetails.findAll({
                        where: { traning_id: AData.traning_id }
                    });

                    if (findcontentData && findcontentData.length > 0) {
                        // Use map function to create records in newContent2Details table
                        const content2Records = findcontentData.map(new_contents => ({
                            content_id:new_contents.content_id,
                            traning_id: new_contents.traning_id,
                            content_name: new_contents.content_name,
                            content_description: new_contents.content_description,
                            question_status: new_contents.question_status,
                            no_of_option_question: new_contents.no_of_option_question,
                            option_mode: new_contents.option_mode,
                            thumbnail: new_contents.thumbnail,
                            upload_material: new_contents.upload_material,
                            upload_course_video: new_contents.upload_course_video,
                            progress_rate:new_contents.progress_rate,
                            video_current_time:new_contents.video_current_time,
                            question_not_attempt:new_contents.question_not_attempt,
                            result:new_contents.result,
                            assesment_not_attempt:new_contents.assesment_not_attempt,
                            assesment:new_contents.assesment,
                            result_preview:new_contents.result_preview,
                            isAssesment_submited:new_contents.isAssesment_submited,
                            given_attempt_count:new_contents.given_attempt_count,
                            employee_id:AData.employee_id,

                        }));
            
                        // Create records in newContent2Details table using bulkCreate
                        const create_content2 = await newContent2Details.bulkCreate(content2Records);
            
                    } else {
                        console.log("No content data found in newContentDetails");
                    }
                } else {
                    console.log("No data found in newRequestCourseDetails");
                }
            }


            
        }
        return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


///////////////  Edit Add User Course ///////////////

exports.edit_add_user_course = async (req, res) => {
    try {
        const traningId = req.params.id;
        const { user_category, author_course_id, add_user, user_segment, start_date, end_date, employee_id, user_id } = req.body;
        const editData = await addUsers.findOne({ where: { traning_id: traningId } });
        if (add_user) {
            var addUser = add_user
        } else {
            var addUser = null
        }
        if (editData) {
            const updateData = await addUsers.update({
                user_category,
                author_course_id,
                user_segment,
                add_user: addUser,
                start_date,
                end_date,
                employee_id,
                reporting_manager_id,
                user_id,
                assigned: req.body.assigned,
            }, { where: { traning_id: traningId } });
            var maxdata = await newTraningDetails.findOne({ where: { traning_id:traningId } })
            const editData2 = await addUsers.findOne({ where: { traning_id: traningId } });
            const response1 = await addUserCourseDetails.update({
                // "employee_id": add_user[i].employee_id,
                "author_course_id": editData2.author_course_id,
                "user_id": editData2.user_id,
                // "reporting_manager_id":editData2.reporting_manager_id,
                "assigned": editData2.assigned,
                "start_date": editData2.start_date,
                "end_date": editData2.end_date,
                "user_category": editData2.user_category,
                "author_course_name": editData2.author_course_name,
                "category": editData2.category,
                "course_name": editData2.course_name,
                "segment": editData2.segment,
                "course_description": editData2.course_description,
                "course_thumbnail": editData2.course_thumbnail,
                "course_request_status": "APPROVED",
                "new_max_count": maxdata.Max_attempt_count,
                "Max_attempt_count": maxdata.Max_attempt_count,
            }, { where: { traning_id: traningId } });
            return res.status(200).send({ code: 200, message: "Traning Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////  Get All User Course ///////////////

exports.get_All_User_Course = async (req, res) => {
    try {
        const traningId = req.params.id;
        const getAllData = await addUsers.findAll({ where: { traning_id: traningId },
            include: [{
                model: newTraningDetails,
                attributes: ["employee_id", "traning_id", "result", "Max_attempt_count", "current_attempt_count"]
            }]
        });
        let mainarr = [];
        for (var k = 0; k < getAllData.length; k++) {
            let arrinf = [];
            for (var n = 0; n < getAllData[k].add_user.length; n++) {
                let employeeInf = getAllData[k].add_user[n].employee_id
                let userdata = await user.findOne({
                    where: { employee_id: employeeInf },
                    attributes: ["employee_id", "first_name", "segment_suv", "department"]
                })
                arrinf.push(userdata)
            }
            getAllData[k]["add_user"] = arrinf
            mainarr.push(getAllData[k])
        }
        if (mainarr) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: mainarr });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.create_add_user = async (req, res) => {
    try {
        const { traning_id, employee_id, user_category, add_user, user_segment, scheduled_start_date, scheduled_end_date } = req.body;

        const updateData = await addUsers.create({
            traning_id,
            employee_id,
            user_category,
            add_user,
            user_segment,
            scheduled_start_date,
            scheduled_end_date
        })

        return res.status(200).send({ code: 200, message: "Create SuccessFully", data: updateData });

    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////////////////  edit user ////////////////////////////

exports.edit_add_user = async (req, res) => {
    try {
        const traning_id = req.params.id
        const { user_category, add_user, user_segment, start_date, end_date } = req.body;
        const updateData = await addUsers.update({
            user_category,
            add_user,
            user_segment,
            start_date,
            end_date
        },
            { where: { traning_id: traning_id } })
        return res.status(200).send({ code: 200, message: "Create SuccessFully", data: updateData });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////// user data get by id //////////////////////////

exports.getBy_user_id = async (req, res) => {
    try {
        const user_id = req.params.id;
        const getData = await addUserDetails.findAll({ where: { user_id: user_id }, status: "ACTIVE" });
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

////////////////////// get user by traning_id //////////////////////////

exports.getBy_user_traning_id = async (req, res) => {
    try {
        const traning_id = req.params.id;
        const getData = await addUsers.findAll({ where: { traning_id: traning_id } });
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


////////////////////// get data behalf of emp_id //////////////////////////

exports.getBy_data_emp_id = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const getData = await addUsers.findAll({
            where: { employee_id: employee_id },
            include: [{
                model: newTraningDetails
            }]
        });
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

////////////////////// get data behalf of emp_id //////////////////////////

exports.getBy_course_emp_id = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const getData = await newTraningDetails.findAll({
            where: { course_request_status: { [Op.ne]: "REQUEST" }, employee_id: employee_id },
            include: [{
                model: newContentDetails,
            }]
        });
        for (var i = 0; i < getData.length; i++) {
            let content_count = getData[i].new_contents.length;
            getData[i].content_count = content_count
        };
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

/////////////// Get All Assigned Course ///////////////

exports.get_All_Assigned_Course = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getData = await addUserCourseDetails.findAll({ where: { employee_id: employeeId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_all_user_request_Course = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const getAllData = await addUsers.findAll({ where: { author_course_id: author_course_id } });
        let mainarr = [];
        for (var k = 0; k < getAllData.length; k++) {
            let arrinf = [];
            for (var n = 0; n < getAllData[k].add_user.length; n++) {
                let employeeInf = getAllData[k].add_user[n].employee_id
                let userdata = await user.findOne({
                    where: { employee_id: employeeInf },
                    attributes: ["employee_id", "first_name", "employee_official_email", "segment_suv", "department"]
                })
                arrinf.push(userdata)
            }
            getAllData[k]["add_user"] = arrinf
            mainarr.push(getAllData[k])
        }
        if (mainarr) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: mainarr });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
