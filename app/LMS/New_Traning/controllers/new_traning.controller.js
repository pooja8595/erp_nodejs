const db = require("../../../models/index");
const newTraningDetails = db.newTraning;
const newTaningUserDetails = db.newUserTraning
const newUserDetails = db.newUser
const categoryDetails = db.category;
const regionDetails = db.region;
const branchDetails = db.branch;
const userDetails = db.user
const authorDetails = db.author;
const addUsers = db.addUser;
const newContentDetails = db.newContent;
const newContent2Details = db.newContent2;
const newRequestCourseDetails = db.newRequestCourse
const addUserCourseDetails = db.addUserCourse;
const op = db.Sequelize.Op
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "http://localhost:5000/"
const parse = require('csv-parser');
const fs = require('fs');
const path = require("path");
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");
const { NUMBER } = require("sequelize");
const Op = require('sequelize').Op;
// const numberToText = require('number-to-text')
// require('number-to-text/converters/en-us')

/////////////// Create New Traning ///////////////

exports.create_New_Traning = async (req, res) => {
    try {
        const { category, course_name, branch, region, mode, add_user, attendance_count, from_scheduled_date, to_scheduled_date, venue, is_checked, employee_id, user_id } = req.body;

        var upload_material = req.files.upload_material == undefined ? "" : upload_material = req.files.upload_material[0].path;
        var bulk_upload_user = req.files.bulk_upload_user == undefined ? "" : bulk_upload_user = req.files.bulk_upload_user[0].path;

        if (add_user) {
            var addUser = JSON.parse(add_user)
        } else {
            var addUser = null
        }
        var results = [];
        const response = await newTraningDetails.create({
            category,
            course_name,
            branch,
            region,
            add_user: addUser,
            mode,
            attendance_count,
            from_scheduled_date,
            to_scheduled_date,
            venue,
            is_checked,
            employee_id,
            user_id,
            upload_material: baseUrl + upload_material,
            bulk_upload_user: baseUrl + bulk_upload_user
        });
        var add_user1 = response.add_user == null ? bulk_upload_user : response.add_user
        for (var i = 0; i < add_user1.length; i++) {
            var objuser = {
                "employee_id": add_user1[i].employee_id,
                "user_id": response.user_id,
                "traning_id": response.traning_id,
                "user_name": add_user1[i].user_name,
            }
            const employeedata = await newTaningUserDetails.create(objuser);
            results.push(employeedata);
        }
        return res.status(200).send({ code: 200, message: "New Traning Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit New Traning ///////////////

exports.edit_New_Traning = async (req, res) => {
    try {
        const traningId = req.params.id;
        const { category, course_name, branch, region, mode, add_user, attendance_count, from_scheduled_date, to_scheduled_date, venue, is_checked, employee_id, user_id } = req.body;
        var upload_material = req.files.upload_material == undefined ? "" : upload_material = req.files.upload_material[0]?.path;
        var bulk_upload_user = req.files.bulk_upload_user == undefined ? "" : bulk_upload_user = req.files.bulk_upload_user[0].path;
        const editData = await newTraningDetails.findOne({ where: { traning_id: traningId } });
        if (add_user) {
            var addUser = JSON.parse(add_user)
        } else {
            var addUser = null
        }
        var uploadData = upload_material == '' ? upload_material = editData.upload_material : upload_material = baseUrl + upload_material
        var uploadCsvData = bulk_upload_user == '' ? bulk_upload_user = editData.bulk_upload_user : bulk_upload_user = baseUrl + bulk_upload_user
        if (editData) {
            var results = [];
            const updateData = await newTraningDetails.update(
                {
                    category,
                    course_name,
                    branch,
                    region,
                    add_user: addUser,
                    mode,
                    attendance_count,
                    from_scheduled_date,
                    to_scheduled_date,
                    venue,
                    is_checked,
                    employee_id,
                    user_id,
                    upload_material: uploadData,
                    bulk_upload_user: uploadCsvData
                },
                { where: { traning_id: traningId } }
            );
            for (var i = 0; i < editData.add_user.length; i++) {
                var objuser = {
                    "employee_id": editData.add_user[i].employee_id,
                    "user_id": editData.add_user[i].user_id,
                    "traning_id": editData.traning_id,
                    "user_name": editData.add_user[i].user_name,
                }
                const employeedata = await newTaningUserDetails.update(objuser, { where: { traning_id: traningId } });
                results.push(employeedata);
            }
            return res.status(200).send({ code: 200, message: "Traning Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All New User ///////////////

exports.get_All_New_User = async (req, res) => {
    try {
        const getData = await newUserDetails.findAll({
            attributes: ["user_id", "employee_user_name"]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Branch ///////////////

exports.get_All_Branch = async (req, res) => {
    try {
        const getAllData = await branchDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Branch Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All New Author ///////////////

exports.get_All_New_Author = async (req, res) => {
    try {
        const getData = await authorDetails.findAll({
            attributes: ["author_trainer_id", "author_name"]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All New Author Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Category ///////////////

exports.get_All_Category = async (req, res) => {
    try {
        const getAllData = await categoryDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Category Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Region List ///////////////

exports.region_List = async (req, res) => {
    try {
        const regionData = await regionDetails.findAll({ where: { status: 'ACTIVE' } })
        if (regionData) {
            return res.status(200).send({ code: 200, message: "Fetch All Region Data Successfully", data: regionData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (err) {
        console.log(err.message)
        res.status(400).send({ message: "error", error: err.message })
    }
}

/////////////// Get All User ///////////////

exports.get_All_User = async (req, res) => {
    try {
        const getData = await userDetails.findAll();
        if (getData) {
            var array = [];
            for (var i = 0; i < getData.length; i++) {
                const first_name = getData[i].first_name
                const last_name = getData[i].last_name
                var obj = {
                    "employee_id": getData[i].employee_id,
                    "reporting_manager_id" : getData[i].reporting_manager_id,
                    "fullName": first_name + " " + last_name,
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch All User Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Bulk Upload New User ///////////////

exports.user_Traning_uploadCsv = async (req, res) => {
    try {
        const user = await newTraningDetails.findAll();
        if (!user) {
            throw new BadRequestError("user not found");
        }
        if (req.file == undefined) {
            return res.status(400).send("Please Upload Valid File!");
        }
        if (req.file.mimetype == "text/csv") {
            let csvData = []
            let filePath = path.join(__dirname, '../../../../new_traning_doc/' + req.file.filename);
            console.log(filePath, "filePath")
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("error", (error) => {
                    throw error.message;
                })
                .on("data", (row) => {
                    csvData.push(row);
                })
                .on("end", async () => {
                    console.log(csvData);
                    for (let i = 0; i < csvData.length; i++) {
                        let course_name = csvData[i].course_name;

                        const Data = await newTraningDetails.create({
                            course_name: course_name
                        })
                        console.log(Data, "data")
                    }
                });
            return res.status(200).send({ code: 200, message: "File Uploded Successfully!" });
        }
        else if (req.file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
            }
            let filePath = path.join(__dirname, '../../../../new_traning_doc/' + req.file.filename);
            console.log(filePath, "filePath")

            readXlsxFile(filePath).then((rows) => {
                rows.shift();
                let excels = [];
                rows.forEach((row) => {
                    let tutorial = {
                        course_name: row[0]
                    };
                    excels.push(tutorial);
                });
                newTraningDetails.bulkCreate(excels)
                return res.status(200).send({ code: 200, message: "File Uploded Successfully!" });
            });
        } else {
            console.log("please choose valide files CSV or Exel")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get ById New User ///////////////

exports.get_ById_New_Traning = async (req, res) => {
    try {
        const traningId = req.params.id;
        let getData = await newTraningDetails.findAll({ where: { traning_id: traningId } });
        if (getData) {
            const scheduledDate = getData.to_scheduled_date
            var datetime = new Date();
            var tomorrow = datetime.toISOString().slice(0, 10)
            if (tomorrow > scheduledDate) {
                getData.status = "COMPLETED"
            }
            for (var i = 0; i < getData.length; i++) {
                let count = getData[i].add_user.length;
                getData[i].attendance_count = count
            };
            return res.status(200).send({ code: 200, message: "Fetch All New Traning Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All New Traning ///////////////

exports.get_All_New_Traning = async (req, res) => {
    try {
        let getAllData = await newTraningDetails.findAll();
        if (getAllData) {
            for (var i = 0; i < getAllData.length; i++) {
                const scheduledDate = getAllData[i].to_scheduled_date
                var datetime = new Date();
                var tomorrow = datetime.toISOString().slice(0, 10)
                if (tomorrow > scheduledDate) {
                    getAllData[i].status = "COMPLETED"
                }
            }
            for (var i = 0; i < getAllData.length; i++) {
                let count = getAllData[i].add_user.length;
                getAllData[i].attendance_count = count
            };
            return res.status(200).send({ code: 200, message: "Fetch All New Traning Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Cancel Traning ///////////////

exports.cancel_Traning = async (req, res) => {
    try {
        const traningId = req.params.id;
        const { status } = req.body;
        const getData = await newTraningDetails.findOne({ where: { traning_id: traningId } });
        if (getData) {
            const updated = await newTraningDetails.update({ status }, { where: { traning_id: traningId } });
            return res.status(200).send({ code: 200, message: "Traning Data is Canceled Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Status Closed Traning ///////////////

exports.status_Closed_Traning = async (req, res) => {
    try {
        var datetime = new Date();
        var currentDate = datetime.toISOString().slice(0, 10)
        const traningId = req.params.id;
        const editData = await newTraningDetails.findOne({ where: { traning_id: traningId } });
        const scheduledDate = editData.status
        if (scheduledDate > currentDate) {
            const updateData = await newTraningDetails.update(
                {
                    status: "COMPLETED"
                }, { where: { traning_id: traningId } }
            );
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

/////////////// Reschedule Traning Update ///////////////

exports.reschedule_Traning_Update = async (req, res) => {
    try {
        const traningId = req.params.id;
        const { from_scheduled_date, to_scheduled_date, status } = req.body;
        const getData = await newTraningDetails.findOne({ where: { traning_id: traningId } });
        if (getData) {
            const updated = await newTraningDetails.update(
                {
                    from_scheduled_date,
                    to_scheduled_date,
                    status
                },
                { where: { traning_id: traningId } });
            return res.status(200).send({ code: 200, message: "Traning Data is Rescheduled Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Traning Reschedule ///////////////

exports.traning_Reschedule = async (req, res) => {
    try {
        const data = await newTraningDetails.findAll({ where: { status: "RESCHEDULED" } });
        if (data) {
            for (var i = 0; i < data.length; i++) {
                let count = data[i].add_user.length;
                data[i].attendance_count = count
            };
            return res.status(200).send({ code: 200, message: "Fetch All Data Rescheduled Traning", result: data })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Export Excel File Traning ///////////////

exports.export_File = async (req, res) => {
    try {
        const array = [];
        const exportData = await newTraningDetails.findAll();
        if (exportData) {
            for (let i = 0; i < exportData.length; i++) {
                var obj = {
                    "category": exportData[i].category,
                    "course_name": exportData[i].course_name,
                    'branch': exportData[i].branch,
                    'mode': exportData[i].mode,
                    'from_scheduled_date': exportData[i].from_scheduled_date,
                    'to_scheduled_date': exportData[i].to_scheduled_date,
                    'venue': exportData[i].venue,
                    'user_name': exportData[i].user_name,
                    'status': exportData[i].status
                }
                array.push(obj)
            }
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=download.csv");
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: array });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

/////////////// Get ById Download Document New Traning ///////////////

exports.downloadDocument_NewTraning = (req, res) => {
    const fileName = req.params.fileName;
    let filePath = path.join(__dirname, '../../../../new_traning_doc/');
    res.download(filePath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

//////////////////////////////////////////// Admin APIs ////////////////////////////////////////////

/////////////// Content And Learning ///////////////

exports.get_All_Content_Learning = async (req, res) => {
    try {
        let getAllData = await newTraningDetails.findAll({
            include: [{
                model: authorDetails,
                attributes: ["author_trainer_id", "author_name"],
            },
            {
                model: userDetails,
                attributes: ["employee_id", "employee_official_email"],
            }]
        });

        if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {

                if (getAllData[i].new_authors[0].author_name == null) {
                    var authorName = 'N/A'
                } else {
                    var authorName = getAllData[i].new_authors[0].author_name
                }

                if (getAllData[i].registered_users[0].employee_official_email == null) {
                    var employee_official_email = 'N/A'
                } else {
                    var employee_official_email = getAllData[i].registered_users[0].employee_official_email
                }

                var obj = {
                    "traning_id": getAllData[i].traning_id,
                    "course_name": getAllData[i].course_name,
                    "status": getAllData[i].status,
                    "author_name": authorName,
                    "employee_official_email": employee_official_email
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch New Content Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////// Create New Course /////////////// 

exports.CreateNewCourse = async (req, res) => {
    try {
        const { employee_id, author_course_id, author_course_name, category, segment, no_of_option_question, course_name, course_description, Max_attempt_count } = req.body;
        var course_thumbnail = req.files.course_thumbnail == undefined ? "" : course_thumbnail = req.files.course_thumbnail[0].path;
        const response = await newTraningDetails.create({
            employee_id,
            author_course_id,
            author_course_name,
            category,
            segment,
            no_of_option_question,
            course_name,
            course_description,
            course_thumbnail: baseUrl + course_thumbnail,
            Max_attempt_count,
            
        });

        const response1 = await newRequestCourseDetails.create({
            traning_id: response.traning_id,
            employee_id,
            author_course_id,
            author_course_name,
            category,
            segment,
            no_of_option_question,
            course_name,
            course_description,
            course_thumbnail: baseUrl + course_thumbnail,
            Max_attempt_count,
            new_max_count: response.Max_attempt_count
        });
        console.log(response1, "response1")
        return res.status(200).send({ code: 200, message: "Cource Created Successfully!", data: response });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Edit Course ///////////////

exports.editCourse = async (req, res) => {
    try {
        const traning_id = req.params.id;
        const { employee_id, author_course_id, author_course_name, category, segment, no_of_option_question, course_name, course_description, user_status, Max_attempt_count } = req.body;
        var course_thumbnail = req.files.course_thumbnail == undefined ? "" : course_thumbnail = req.files.course_thumbnail[0].path;
        const editData = await newTraningDetails.findOne({ where: { traning_id: traning_id } });
        var courseThumbnail = course_thumbnail == '' ? course_thumbnail = editData.course_thumbnail : course_thumbnail = baseUrl + course_thumbnail;
        if (editData) {
            const response = await newTraningDetails.update({
                employee_id,
                author_course_id,
                author_course_name,
                category,
                segment,
                no_of_option_question,
                course_name,
                course_description,
                course_thumbnail: courseThumbnail,
                user_status,
                Max_attempt_count
            }, { where: { traning_id: traning_id } });
            const editData2 = await newTraningDetails.findOne({ where: { traning_id: traning_id } });
            const response1 = await newRequestCourseDetails.update({
                employee_id: editData2.employee_id,
                author_course_id: editData2.author_course_id,
                author_course_name: editData2.author_course_name,
                category: editData2.category,
                segment: editData2.segment,
                no_of_option_question: editData2.no_of_option_question,
                course_name: editData2.course_name,
                course_description: editData2.course_description,
                course_thumbnail: baseUrl + editData2.course_thumbnail,
                user_status: editData2.user_status,
                Max_attempt_count: editData2.Max_attempt_count,
                new_max_count: editData2.Max_attempt_count
            }, { where: { traning_id: traning_id } });
            console.log(response1, "response1")
            return res.status(200).send({ code: 200, message: "Updated SuccessFully", data: response });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.editCheck_content2 = async (req, res) => {
    try {
        const traning_id = req.params.id;

        const checkdata = await newContent2Details.findAll({ where: { traning_id: traning_id } });
        const checkdata1 = await newContentDetails.findAll({ where: { traning_id: traning_id ,  status: "ACTIVE" } });
        // Check your condition here
        if (checkdata.length === 0) {
            return res.status(200).send({ code: 200, message: "Condition is met, checkdata.length is 0", assign_content_emp_data: checkdata.length , content_count_by_course: checkdata1.length});
        } else {
            return res.status(200).send({ code: 200, message: "Condition is not met, checkdata.length is not 0", assign_content_emp_data: checkdata.length , content_count_by_course: checkdata1.length});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};  


exports.Check_find_emp_id = async (req, res) => {

        try {
            const traning_id = req.params.id;
    
            const checkdata = await newContent2Details.findAll({ where: { traning_id: traning_id } });
    
            // Extracting unique employee IDs using Set to remove duplicates
            const employeeIdsSet = new Set(checkdata.map(entry => entry.employee_id));
            const uniqueEmployeeIds = Array.from(employeeIdsSet);
    
            return res.status(200).send({ code: 200, message: "Unique Employee IDs", data: uniqueEmployeeIds });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ code: 500, message: "Server Error" });
        }
    };
    

/////////////// Get All Cource /////////////// 

exports.getAllCource = async (req, res) => {
    try {
        const Alldata = await newTraningDetails.findAll({
            include: [{
                model: addUsers,
                attributes: ["create_user_status"],
            }]
        });
        if (Alldata) {
            var array = [];
            for (let i = 0; i < Alldata.length; i++) {

                if (Alldata[i].add_new_users[0].create_user_status == null) {
                    var create_user_status1 = null
                } else {
                    var create_user_status1 = Alldata[i].add_new_users[0].create_user_status
                }

                var obj = {
                    "traning_id": Alldata[i].traning_id ? Alldata[i].traning_id : null,
                    "employee_id": Alldata[i].employee_id ? Alldata[i].employee_id : null,
                    "author_course_id": Alldata[i].author_course_id ? Alldata[i].author_course_id : null,
                    "author_course_name": Alldata[i].author_course_name ? Alldata[i].author_course_name : null,
                    "category": Alldata[i].category ? Alldata[i].category : null,
                    "course_name": Alldata[i].course_name ? Alldata[i].course_name : null,
                    "segment": Alldata[i].segment ? Alldata[i].segment : null,
                    "no_of_option_question": Alldata[i].no_of_option_question ? Alldata[i].no_of_option_question : null,
                    "course_description": Alldata[i].course_description ? Alldata[i].course_description : null,
                    "course_thumbnail": Alldata[i].course_thumbnail ? Alldata[i].course_thumbnail : null,
                    "user_status": Alldata[i].user_status ? Alldata[i].user_status : null,
                    "content_count": Alldata[i].content_count ? Alldata[i].content_count : 0,
                    "progress_rate": Alldata[i].progress_rate ? Alldata[i].progress_rate : 0,
                    "not_attempt": Alldata[i].not_attempt ? Alldata[i].not_attempt : 0,
                    "result": Alldata[i].result ? Alldata[i].result : 0,
                    "assigned": Alldata[i].assigned ? Alldata[i].assigned : false,
                    "course_request_status": Alldata[i].course_request_status ? Alldata[i].course_request_status : "NOT REQUEST",
                    "status": Alldata[i].status ? Alldata[i].status : "OPEN",
                    "start_date": Alldata[i].start_date ? Alldata[i].start_date : null,
                    "end_date": Alldata[i].end_date ? Alldata[i].end_date : null,
                    "createdAt": Alldata[i].createdAt ? Alldata[i].createdAt : null,
                    "updatedAt": Alldata[i].updatedAt ? Alldata[i].updatedAt : null,
                    "create_user_status": create_user_status1
                }
                array.push(obj)
            }
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: array })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });

    }
};

/////////////// Get ById Course ///////////////

exports.getByIdCourse = async (req, res) => {
    try {
        const traning_id = req.params.id;
        const getData = await newTraningDetails.findOne({ where: { traning_id: traning_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Data Category ///////////////

exports.getAllData_category = async (req, res) => {
    try {
        const department = req.params.department;
        // let getData = await addUserCourseDetails.findAll({ attributes: ["employee_id", "author_course_name"] });
        const mainRes = await userDetails.findAll({ where: { department: department }, attributes: ["employee_id", "first_name", "last_name"] })
        // const filtered = mainRes.filter(i => getData.every(j => i["employee_id"] !== j["employee_id"]))
        if (mainRes) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: mainRes });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

//////////////////////////////////// get ALL category//////////////////////////////

exports.getAll_category = async (req, res) => {
    try {
        let getData = await addUserCourseDetails.findAll({ attributes: ["employee_id", "author_course_name"] });
        const mainRes = await userDetails.findAll({ attributes: ["employee_id", "first_name", "last_name"] })
        const filtered = mainRes.filter(i => getData.every(j => i["employee_id"] !== j["employee_id"]))
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: filtered });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Edit Assign Course ///////////////

exports.edit_Assign_Course = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const editData = await addUserCourseDetails.findOne({ where: { employee_id: employeeId } });
        if (editData) {
            const updateData = await addUserCourseDetails.update(req.body, { where: { employee_id: employeeId } });
            return res.status(200).send({ code: 200, message: "Band Type Updated Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
//////////////////////////////////// get all users //////////////////////////////

exports.getAll_user = async (req, res) => {
    try {
        const getData = await userDetails.findAll({ attributes: ["employee_id", "first_name"] });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get All Requested Pending Course ///////////////

exports.getAll_requested_pending_course = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const getData = await newRequestCourseDetails.findAll({
            where: { course_request_status: "REQUEST", author_course_id: author_course_id },
            attributes: ["traning_id", "author_course_id", "course_name", "course_request_status", "author_course_name", "re_assign_status"],
            include: [{
                model: userDetails,
                attributes: ["employee_id", "employee_official_email", "employee_code", "first_name", "last_name"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Edit Status Course ///////////////

exports.edit_Status_Course = async (req, res) => {
    try {
        const traning_id = req.params.id;
        const { course_request_status, employee_id, author_course_id, start_date, end_date, reporting_manager_id } = req.body;
        const editData = await newRequestCourseDetails.findOne({
            where: {
                [Op.and]: [
                    { traning_id: traning_id },
                    { employee_id: employee_id },
                    { author_course_id: author_course_id }
                ]
            },
        });
        console.log(editData, "editDataaaa")
        if (editData) {
            const updateData = await newRequestCourseDetails.update({
                author_course_id,
                employee_id,
                course_request_status,
                start_date,
                end_date,
                reporting_manager_id
            }, { where: { [Op.and]: [
                { traning_id: traning_id },
                { employee_id: employee_id },
                { author_course_id: author_course_id }
            ] } });
            console.log(updateData,"updateDataaaa")
            
            if (req.body.course_request_status === "APPROVED" && editData.re_assign_status === false) {
                const AData = await newRequestCourseDetails.findOne({
                    where: {
                        [Op.and]: [
                            { traning_id: traning_id },
                            { employee_id: employee_id },
                            { author_course_id: author_course_id }
                        ]
                    },
                });
                   console.log("wqeqwew",AData);
                    console.log("wqeqwew",AData.traning_id);
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
            
                        // Create records in newContent2Details table using bulkCreate   (duplication data create)
                        const create_content2 = await newContent2Details.bulkCreate(content2Records);
            
                        console.log("Content2 records created successfully" ,create_content2);
                    } else {
                        console.log("No content data found in newContentDetails");
                    }
                } else {
                    console.log("No data found in newRequestCourseDetails");
                }
            }
            return res.status(200).send({ code: 200, message: "Course Status Updated Successfully", data: updateData });
        } else {
            const findData = await newTraningDetails.findOne({ where: { traning_id: traning_id } }) 
            const findData1 = await newContentDetails.findAll({ where: { traning_id: traning_id } }) 
            console.log("sdffindData1.length",findData1.length)
            const createData = await newRequestCourseDetails.create({
                traning_id: traning_id,
                author_course_id,
                employee_id,
                course_request_status,
                start_date,
                end_date,
                reporting_manager_id,
                author_course_name: findData.author_course_name,
                category: findData.category,
                course_name: findData.course_name,
                course_description: findData.course_description,
                course_thumbnail: findData.course_thumbnail,
                new_max_count: findData.Max_attempt_count,
                content_count: findData1.length,
                no_of_option_question: findData.no_of_option_question,
                Max_attempt_count: findData.Max_attempt_count,

               
            });
            console.log("eeeeee",findData.content_count);
            return res.status(200).send({ code: 200, message: "Course Status cre-Updated Successfully", data: createData });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By Content Traning Id ///////////////

// exports.getBy_content_traning_id = async (req, res) => {
//     try {

//         const employee_id = req.body.employee_id; // Get employee_id from request parameters
//         const traning_Id = req.body.traning_id; // Get traning_id from request parameters

//         // Find data in newTraningDetails table based on employee_id and traning_id
//         const trainingDetails = await newRequestCourseDetails.findOne({
//             where: { employee_id: employee_id, traning_id: traning_Id }
//         });
//         const contentDetails = await newContentDetails.findOne({
//             where: { employee_id: employee_id, traning_id: traning_Id }
//         });
//         const content2Details = await newContent2Details.findOne({
//             where: { employee_id: employee_id, traning_id: traning_Id }
//         });
//         console.log("trainingDetails",trainingDetails)
//         console.log("contentDetails",contentDetails)
//         console.log("content2Details",content2Details)

//         if (!content2Details) {
//             const traning_id = trainingDetails.traning_id;
//         const Alldata = await newContentDetails.findAll({
//             where: { traning_id: traning_id, status: "ACTIVE" },
//             include: [{
//                 model: newTraningDetails,
//                 attributes: ["Max_attempt_count"]
//             }]
//         });
        
//         let Max_attempt_count = Alldata[0].new_traning.Max_attempt_count;
//         let current_attempt_count = Alldata[0].given_attempt_count;
//         if (Alldata) {
//             var array = [];
//             for (let i = 0; i < Alldata.length; i++) {
//                 var obj = {
//                     "content_id": Alldata[i].content_id ? Alldata[i].content_id : 0,
//                     "traning_id": Alldata[i].traning_id ? Alldata[i].traning_id : 0,
//                     "question_status": Alldata[i].question_status ? Alldata[i].question_status : null,
//                     "upload_course_video": Alldata[i].upload_course_video ? Alldata[i].upload_course_video : null,
//                     "upload_material": Alldata[i].upload_material ? Alldata[i].upload_material : null,
//                     "content_name": Alldata[i].content_name ? Alldata[i].content_name : null,
//                     "content_description": Alldata[i].content_description ? Alldata[i].content_description : null,
//                     "thumbnail": Alldata[i].thumbnail ? Alldata[i].thumbnail : null,
//                     "option_mode": Alldata[i].option_mode ? Alldata[i].option_mode : null,
//                     "no_of_option_question": Alldata[i].no_of_option_question ? Alldata[i].no_of_option_question : 0,
//                     "progress_rate": Alldata[i].progress_rate ? Alldata[i].progress_rate : 0,
//                     "video_current_time": Alldata[i].video_current_time ? Alldata[i].video_current_time : 0,
//                     "question_not_attempt": Alldata[i].question_not_attempt ? Alldata[i].question_not_attempt : 0,
//                     "result": Alldata[i].result ? Alldata[i].result : 0,
//                     "assesment_not_attempt": Alldata[i].assesment_not_attempt ? Alldata[i].assesment_not_attempt : null,
//                     "assesment": Alldata[i].assesment ? Alldata[i].assesment : null,
//                     "result_preview": Alldata[i].result_preview ? Alldata[i].result_preview : false,
//                     "status": Alldata[i].status ? Alldata[i].status : null,
//                     "createdAt": Alldata[i].createdAt ? Alldata[i].createdAt : null,
//                     "updatedAt": Alldata[i].updatedAt ? Alldata[i].updatedAt : null,
//                     "given_attempt_count": Alldata[i].given_attempt_count ? Alldata[i].given_attempt_count : 0,
//                     "no_of_assesment_attempt": Alldata[i].new_traning?.max_no_of_assesment_attempt,
//                     "isAssesment_submited": Alldata[i].isAssesment_submited
//                 }
//                 array.push(obj)
//             }
//             return res.status(200).send({ code: 200, message: "Fetch All Data R Successfully", Max_attempt_count: Max_attempt_count, current_attempt_count: current_attempt_count, data: array })
//         }
//         }
//         else if(content2Details) {
//             const traning_id = content2Details.traning_id;
//             const Alldata = await newContent2Details.findAll({
//                 where: { traning_id: traning_id, status: "ACTIVE" },
//                 include: [{
//                     model: newTraningDetails,
//                     attributes: ["Max_attempt_count"]
//                 }]
//             });
            
//             let Max_attempt_count = Alldata[0].new_traning.Max_attempt_count;
//             let current_attempt_count = Alldata[0].given_attempt_count;
//             if (Alldata) {
//                 var array = [];
//                 for (let i = 0; i < Alldata.length; i++) {
//                     var obj = {
//                         "content_id": Alldata[i].content_id ? Alldata[i].content_id : 0,
//                         "traning_id": Alldata[i].traning_id ? Alldata[i].traning_id : 0,
//                         "question_status": Alldata[i].question_status ? Alldata[i].question_status : null,
//                         "upload_course_video": Alldata[i].upload_course_video ? Alldata[i].upload_course_video : null,
//                         "upload_material": Alldata[i].upload_material ? Alldata[i].upload_material : null,
//                         "content_name": Alldata[i].content_name ? Alldata[i].content_name : null,
//                         "content_description": Alldata[i].content_description ? Alldata[i].content_description : null,
//                         "thumbnail": Alldata[i].thumbnail ? Alldata[i].thumbnail : null,
//                         "option_mode": Alldata[i].option_mode ? Alldata[i].option_mode : null,
//                         "no_of_option_question": Alldata[i].no_of_option_question ? Alldata[i].no_of_option_question : 0,
//                         "progress_rate": Alldata[i].progress_rate ? Alldata[i].progress_rate : 0,
//                         "video_current_time": Alldata[i].video_current_time ? Alldata[i].video_current_time : 0,
//                         "question_not_attempt": Alldata[i].question_not_attempt ? Alldata[i].question_not_attempt : 0,
//                         "result": Alldata[i].result ? Alldata[i].result : 0,
//                         "assesment_not_attempt": Alldata[i].assesment_not_attempt ? Alldata[i].assesment_not_attempt : null,
//                         "assesment": Alldata[i].assesment ? Alldata[i].assesment : null,
//                         "result_preview": Alldata[i].result_preview ? Alldata[i].result_preview : false,
//                         "status": Alldata[i].status ? Alldata[i].status : null,
//                         "createdAt": Alldata[i].createdAt ? Alldata[i].createdAt : null,
//                         "updatedAt": Alldata[i].updatedAt ? Alldata[i].updatedAt : null,
//                         "given_attempt_count": Alldata[i].given_attempt_count ? Alldata[i].given_attempt_count : 0,
//                         "no_of_assesment_attempt": Alldata[i].new_traning?.max_no_of_assesment_attempt,
//                         "isAssesment_submited": Alldata[i].isAssesment_submited
//                     }
//                     array.push(obj)
//                 }
//                 return res.status(200).send({ code: 200, message: "Fetch All Data C2 Successfully", Max_attempt_count: Max_attempt_count, current_attempt_count: current_attempt_count, data: array })
//             }
//         }

//         else {
//             return res.status(400).send({ code: 400, message: "Record Not Found" })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };


exports.getBy_content_traning_id = async (req, res) => {
    try {

        const employee_id = req.body.employee_id; // Get employee_id from request parameters
        const traning_Id = req.body.traning_id; // Get traning_id from request parameters

        // Find data in newTraningDetails table based on employee_id and traning_id
        const trainingDetails = await newRequestCourseDetails.findOne({
            where: { employee_id: employee_id, traning_id: traning_Id }
        });
        const contentDetails = await newContentDetails.findOne({
            where: { employee_id: employee_id, traning_id: traning_Id }
        });
        const content2Details = await newContent2Details.findOne({
            where: { employee_id: employee_id, traning_id: traning_Id }
        });

        console.log("trainingDetails",trainingDetails)
        console.log("contentDetails",contentDetails)


        if (!content2Details) {
            const traning_id = trainingDetails.traning_id;
        const Alldata = await newContentDetails.findAll({
            where: { traning_id: traning_id, status: "ACTIVE" },
            include: [{
                model: newTraningDetails,
                attributes: ["Max_attempt_count"]
            }]
        });
        
        let Max_attempt_count = Alldata[0].new_traning.Max_attempt_count;
        let current_attempt_count = Alldata[0].given_attempt_count;
        if (Alldata) {
            var array = [];
            for (let i = 0; i < Alldata.length; i++) {
                var obj = {
                    "content_id": Alldata[i].content_id ? Alldata[i].content_id : 0,
                    "traning_id": Alldata[i].traning_id ? Alldata[i].traning_id : 0,
                    "question_status": Alldata[i].question_status ? Alldata[i].question_status : null,
                    "upload_course_video": Alldata[i].upload_course_video ? Alldata[i].upload_course_video : null,
                    "upload_material": Alldata[i].upload_material ? Alldata[i].upload_material : null,
                    "content_name": Alldata[i].content_name ? Alldata[i].content_name : null,
                    "content_description": Alldata[i].content_description ? Alldata[i].content_description : null,
                    "thumbnail": Alldata[i].thumbnail ? Alldata[i].thumbnail : null,
                    "option_mode": Alldata[i].option_mode ? Alldata[i].option_mode : null,
                    "no_of_option_question": Alldata[i].no_of_option_question ? Alldata[i].no_of_option_question : 0,
                    "progress_rate": Alldata[i].progress_rate ? Alldata[i].progress_rate : 0,
                    "video_current_time": Alldata[i].video_current_time ? Alldata[i].video_current_time : 0,
                    "question_not_attempt": Alldata[i].question_not_attempt ? Alldata[i].question_not_attempt : 0,
                    "result": Alldata[i].result ? Alldata[i].result : 0,
                    "assesment_not_attempt": Alldata[i].assesment_not_attempt ? Alldata[i].assesment_not_attempt : null,
                    "assesment": Alldata[i].assesment ? Alldata[i].assesment : null,
                    "result_preview": Alldata[i].result_preview ? Alldata[i].result_preview : false,
                    "status": Alldata[i].status ? Alldata[i].status : null,
                    "createdAt": Alldata[i].createdAt ? Alldata[i].createdAt : null,
                    "updatedAt": Alldata[i].updatedAt ? Alldata[i].updatedAt : null,
                    "given_attempt_count": Alldata[i].given_attempt_count ? Alldata[i].given_attempt_count : 0,
                    "no_of_assesment_attempt": Alldata[i].new_traning.max_no_of_assesment_attempt,
                    "isAssesment_submited": Alldata[i].isAssesment_submited
                }
                array.push(obj)
            }
            return res.status(200).send({ code: 200, message: "Fetch All Data R Successfully", Max_attempt_count: Max_attempt_count, current_attempt_count: current_attempt_count, data: array })
        }
        }
        else if(content2Details) {
            const traning_id = content2Details.traning_id;
            const Alldata = await newContent2Details.findAll({
                where: { traning_id: traning_id, employee_id: req.body.employee_id, status: "ACTIVE" },
                include: [{
                    model: newTraningDetails,
                    attributes: ["Max_attempt_count"]
                }]
            });
            
            let Max_attempt_count = Alldata[0].new_traning.Max_attempt_count;
            let current_attempt_count = Alldata[0].given_attempt_count;
            if (Alldata) {
                var array = [];
                for (let i = 0; i < Alldata.length; i++) {
                    var obj = {
                        "content_id": Alldata[i].content_id ? Alldata[i].content_id : 0,
                        "traning_id": Alldata[i].traning_id ? Alldata[i].traning_id : 0,
                        "question_status": Alldata[i].question_status ? Alldata[i].question_status : null,
                        "upload_course_video": Alldata[i].upload_course_video ? Alldata[i].upload_course_video : null,
                        "upload_material": Alldata[i].upload_material ? Alldata[i].upload_material : null,
                        "content_name": Alldata[i].content_name ? Alldata[i].content_name : null,
                        "content_description": Alldata[i].content_description ? Alldata[i].content_description : null,
                        "thumbnail": Alldata[i].thumbnail ? Alldata[i].thumbnail : null,
                        "option_mode": Alldata[i].option_mode ? Alldata[i].option_mode : null,
                        "no_of_option_question": Alldata[i].no_of_option_question ? Alldata[i].no_of_option_question : 0,
                        "progress_rate": Alldata[i].progress_rate ? Alldata[i].progress_rate : 0,
                        "video_current_time": Alldata[i].video_current_time ? Alldata[i].video_current_time : 0,
                        "question_not_attempt": Alldata[i].question_not_attempt ? Alldata[i].question_not_attempt : 0,
                        "result": Alldata[i].result ? Alldata[i].result : 0,
                        "assesment_not_attempt": Alldata[i].assesment_not_attempt ? Alldata[i].assesment_not_attempt : null,
                        "assesment": Alldata[i].assesment ? Alldata[i].assesment : null,
                        "result_preview": Alldata[i].result_preview ? Alldata[i].result_preview : false,
                        "status": Alldata[i].status ? Alldata[i].status : null,
                        "createdAt": Alldata[i].createdAt ? Alldata[i].createdAt : null,
                        "updatedAt": Alldata[i].updatedAt ? Alldata[i].updatedAt : null,
                        "given_attempt_count": Alldata[i].given_attempt_count ? Alldata[i].given_attempt_count : 0,
                        "no_of_assesment_attempt": Alldata[i].new_traning.max_no_of_assesment_attempt,
                        "isAssesment_submited": Alldata[i].isAssesment_submited
                    }
                    array.push(obj)
                }
                return res.status(200).send({ code: 200, message: "Fetch All Data C Successfully", Max_attempt_count: Max_attempt_count, current_attempt_count: current_attempt_count, data: array })
            }
        }

        else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
/////////////// Edit User Status ///////////////

exports.edit_user_status = async (req, res) => {
    try {
        const traning_id = req.params.id;
        const { user_status } = req.body;
        const editData = await newTraningDetails.findOne({ where: { traning_id: traning_id } });
        if (editData) {
            const updateData = await newTraningDetails.update(
                {
                    user_status
                },
                { where: { traning_id: traning_id } }
            );
            return res.status(200).send({ code: 200, message: "User Status Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By Emp Id Course ///////////////

exports.getBy_emp_Id_Course = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const reporting_managerData = await userDetails.findOne({ where: { employee_id: employee_id } });
        var data = await newTraningDetails.findAll({
            attributes: ["traning_id", "employee_id", "author_course_id", "author_course_name", "category", "course_name",
                "segment", "course_description", "course_thumbnail", "user_status", "content_count", "no_of_option_question",
                "progress_rate", "not_attempt", "result", "assigned", "course_request_status", "status", "start_date", "end_date",
                "createdAt", "updatedAt", "Max_attempt_count", "current_attempt_count"],
            include: [{
                model: newContentDetails,
            }]
        });

        for (var i = 0; i < data.length; i++) {
            let content_count = data[i].new_contents.length;
            data[i].content_count = content_count
         const data1 = await    newRequestCourseDetails.update({content_count: data[i].content_count},{where:{traning_id: data[i].traning_id,employee_id:data[i].employee_id }})
         console.log(data1,"data121")
            
        };
        
        const getData = await newRequestCourseDetails.findAll({
            attributes: ["request_id", "traning_id", "employee_id", "author_course_id", "author_course_name", "category", "course_name",
                "segment", "course_description", "course_thumbnail","content_count", "user_status", "no_of_option_question",
                "progress_rate", "not_attempt", "result", "assigned", "course_request_status", "status", "start_date", "end_date",
                "createdAt", "updatedAt", "Max_attempt_count", "current_attempt_count"],
            where: { course_request_status: { [Op.ne]: "NOT REQUEST" }, employee_id: employee_id },
            include: [{
                model: newContentDetails,
            }]
        });
        // for (var i = 0; i < data.length; i++) {
        //     let content_count = data[i].new_contents.length;
        //     data[i].content_count = content_count
        // };
        const addData121 = [...getData, ...data];
        const uniqueIds = [];
        const unique = addData121.filter(element => {
            const isDuplicate = uniqueIds.includes(element.traning_id);
            if (!isDuplicate) {
                uniqueIds.push(element.traning_id);
                return true;
            }
            return false;
        });
        // console.log ("uniqueunique",unique)
        if (addData121) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", RM_id: reporting_managerData.reporting_manager_id, data: unique });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By Approved Status ///////////////

exports.get_By_Approved_Course = async (req, res) => {
    console.log("====")
    try {
        const employee_id = req.params.id;
        const getData = await addUserCourseDetails.findAll({ where: { employee_id: employee_id } });
        const data = await newTraningDetails.findAll({ where: { employee_id: employee_id } });

        const Alldata = await newRequestCourseDetails.findAll({
            where: { employee_id: employee_id, course_request_status: "APPROVED" },
            include: [{
                model: newContentDetails,

            }]
        });
        for (var i = 0; i < Alldata.length; i++) {
            let content_count = Alldata[i].new_contents.length;
            Alldata[i].content_count = content_count
        };
        if (Alldata) {
            var array = [];
            for (let i = 0; i < Alldata.length; i++) {
                var obj = {
                    "traning_id": Alldata[i].traning_id ? Alldata[i].traning_id : 0,
                    "employee_id": Alldata[i].employee_id ? Alldata[i].employee_id : 0,
                    "author_course_id": Alldata[i].author_course_id ? Alldata[i].author_course_id : null,
                    "author_course_name": Alldata[i].author_course_name ? Alldata[i].author_course_name : null,
                    "category": Alldata[i].category ? Alldata[i].category : null,
                    "course_name": Alldata[i].course_name ? Alldata[i].course_name : null,
                    "segment": Alldata[i].segment ? Alldata[i].segment : null,
                    "course_description": Alldata[i].course_description ? Alldata[i].course_description : null,
                    "course_thumbnail": Alldata[i].course_thumbnail ? Alldata[i].course_thumbnail : null,
                    "user_status": Alldata[i].user_status ? Alldata[i].user_status : null,
                    "content_count": Alldata[i].content_count ? Alldata[i].content_count : 0,
                    "progress_rate": Alldata[i].progress_rate ? Alldata[i].progress_rate : 0,
                    "not_attempt": Alldata[i].not_attempt ? Alldata[i].not_attempt : 0,
                    "result": Alldata[i].result ? Alldata[i].result : 0,
                    "assigned": Alldata[i].assigned ? Alldata[i].assigned : false,
                    "course_request_status": Alldata[i].course_request_status ? Alldata[i].course_request_status : null,
                    "status": Alldata[i].status ? Alldata[i].status : null,
                    "start_date": Alldata[i].start_date ? Alldata[i].start_date : null,
                    "end_date": Alldata[i].end_date ? Alldata[i].end_date : null,
                    "createdAt": Alldata[i].createdAt ? Alldata[i].createdAt : null,
                    "updatedAt": Alldata[i].updatedAt ? Alldata[i].updatedAt : null,
                    "new_contents": Alldata[i].new_contents,
                    "Max_attempt_count": Alldata[i].Max_attempt_count,
                    "current_attempt_count": Alldata[i].current_attempt_count,
                    "readyForNextAttempt": Alldata[i].readyForNextAttempt,
                }
                array.push(obj)
            }
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: array })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// get by emp id all curse name ///////////////

exports.getbyempidAllCource = async (req, res) => {
    try {
        const employee_Id = parseInt(req.params.employee_id);
        const Alldata = await newTraningDetails.findAll({
            where: { employee_id: employee_Id },
            include: [{
                model: addUsers,
                attributes: ["create_user_status"],
            }]
        });
        if (Alldata) {
            var array = [];
            for (let i = 0; i < Alldata.length; i++) {

                if (Alldata[i].add_new_users[0].create_user_status == null) {
                    var create_user_status1 = null
                } else {
                    var create_user_status1 = Alldata[i].add_new_users[0].create_user_status
                }

                var obj = {
                    "traning_id": Alldata[i].traning_id ? Alldata[i].traning_id : null,
                    "employee_id": Alldata[i].employee_id ? Alldata[i].employee_id : null,
                    "author_course_id": Alldata[i].author_course_id ? Alldata[i].author_course_id : null,
                    "author_course_name": Alldata[i].author_course_name ? Alldata[i].author_course_name : null,
                    "category": Alldata[i].category ? Alldata[i].category : null,
                    "course_name": Alldata[i].course_name ? Alldata[i].course_name : null,
                    "segment": Alldata[i].segment ? Alldata[i].segment : null,
                    "no_of_option_question": Alldata[i].no_of_option_question ? Alldata[i].no_of_option_question : null,
                    "course_description": Alldata[i].course_description ? Alldata[i].course_description : null,
                    "course_thumbnail": Alldata[i].course_thumbnail ? Alldata[i].course_thumbnail : null,
                    "user_status": Alldata[i].user_status ? Alldata[i].user_status : null,
                    "content_count": Alldata[i].content_count ? Alldata[i].content_count : 0,
                    "progress_rate": Alldata[i].progress_rate ? Alldata[i].progress_rate : 0,
                    "not_attempt": Alldata[i].not_attempt ? Alldata[i].not_attempt : 0,
                    "result": Alldata[i].result ? Alldata[i].result : 0,
                    "assigned": Alldata[i].assigned ? Alldata[i].assigned : false,
                    "course_request_status": Alldata[i].course_request_status ? Alldata[i].course_request_status : "NOT REQUEST",
                    "status": Alldata[i].status ? Alldata[i].status : "OPEN",
                    "start_date": Alldata[i].start_date ? Alldata[i].start_date : null,
                    "end_date": Alldata[i].end_date ? Alldata[i].end_date : null,
                    "createdAt": Alldata[i].createdAt ? Alldata[i].createdAt : null,
                    "updatedAt": Alldata[i].updatedAt ? Alldata[i].updatedAt : null,
                    "create_user_status": create_user_status1
                }
                array.push(obj)
            }
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: array })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.get_By_Request_Course = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const getData = await newRequestCourseDetails.findAll({
            where: { author_course_id: author_course_id, re_assign_status :false , assigned: false},
            include: [{
                model: userDetails,
                attributes: ["employee_id", "first_name", "employee_official_email", "segment_suv", "department"]
            }]
        })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.get_By_Ap_rej_Course = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const getAllData = await newRequestCourseDetails.findAll({
            where: { author_course_id: author_course_id },
            include: [{
                model: userDetails,
                attributes: ["employee_id", "first_name", "employee_official_email", "segment_suv", "department"]

            }]
        })
        console.log("alldata121", getAllData);
        let filterData = []
        for (let i = 0; i < getAllData.length; i++) {
            let candiateInfo = getAllData[i].registered_user.length ? getAllData[i].registered_user[0].employee_id : ""

            if (getAllData[i].employee_id !== candiateInfo) {
                filterData.push(getAllData[i])
            }
        }
        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: filterData })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////// api of course expire ///////////////////////////////

exports.course_expire = async (req, res) => {
    try {
        var datetime = new Date();
        var currentDate = datetime.toISOString().slice(0, 10)
        const Data = await newTraningDetails.findAll();

        for (let i = 0; i < Data.length; i++) {
            const t_id = Data[i].traning_id;
            const endDate = Data[i].end_date;

            if (endDate < currentDate) {
                await newTraningDetails.update({
                    isExpired: true
                }, { where: { traning_id: t_id } });
            }
        }
        return res.status(200).send({ code: 200, message: "Fetch All Data Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////////////////// Auther by id emp result AUDITOR //////////////////
exports.ByAuther_getAll_empResult = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const getData = await newTraningDetails.findAll({
            where: { author_course_id: author_course_id },
            attributes: ["course_name", "result"]
        });
        if (getData.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////// no of Assined course graph api for AUDITOR ///////////////////
exports.no_of_attend_and_no_of_assined_course = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const getAllData = await addUserCourseDetails.findAll({
            where: { author_course_id: author_course_id },
            attributes: ["traning_id", "course_name", "result", "employee_id"]
        });
        let getcourse = await newTraningDetails.findAll();
        if (getAllData) {

            const countDup = () => {
                let courseDetails = [];
                let count = {}
                let count1 = {}

                for (let el of getAllData) {
                    count[el.traning_id] = (count[el.traning_id] || 0) + 1

                    if (Number(el.result) == 0) {

                        count1[el.traning_id] = (count1[el.traning_id] || 0) + 1
                    }
                }

                for (let key in count) {
                    for (let i = 0; i < getcourse.length; i++) {
                        if (Number(key) === Number(getcourse[i].traning_id)) {
                            courseDetails.push({ course_name: getcourse[i].course_name, course_count: count[key], notAttend_count: count1[key] })
                        }

                    }
                }
                return courseDetails
            }

            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: countDup() })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
///////////////////////////////////// no of attendes graph api for AUDITOR ///////////////////////////
exports.no_of_attendes_count = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        const getAllData = await addUserCourseDetails.findAll({
            where: { author_course_id: author_course_id },
            attributes: ["traning_id", "course_name", "result", "employee_id"]
        });
        let getcourse = await newTraningDetails.findAll();
        if (getAllData) {

            const countDup = () => {
                let courseDetails = [];
                let count = {}

                for (let el of getAllData) {
                    if (Number(el.result) !== 0) {

                        count[el.traning_id] = (count[el.traning_id] || 0) + 1
                    }
                }
                for (let key in count) {
                    for (let i = 0; i < getcourse.length; i++) {
                        if (Number(key) === Number(getcourse[i].traning_id)) {
                            courseDetails.push({ course_name: getcourse[i].course_name, attened_count: count[key] })
                        }

                    }
                }
                return courseDetails
            }

            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: countDup() })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////////////  emp result for ADMIN //////////////////
exports.getAll_empResult_admin = async (req, res) => {
    try {
        const getData = await newTraningDetails.findAll({
            attributes: ["course_name", "result"]
        });
        if (getData.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////////////////////// no of Assined course graph api for ADMIN //////////////////////////////////////////////
exports.no_of_assined_for_admin = async (req, res) => {
    try {
        const getAllData = await addUserCourseDetails.findAll({
            attributes: ["traning_id", "course_name", "result", "employee_id"]
        });
        let getcourse = await newTraningDetails.findAll();
        if (getAllData) {

            const countDup = () => {
                let courseDetails = [];
                let count = {}
                let count1 = {}

                for (let el of getAllData) {
                    count[el.traning_id] = (count[el.traning_id] || 0) + 1
                    if (Number(el.result) == 0) {

                        count1[el.traning_id] = (count1[el.traning_id] || 0) + 1
                    }
                }

                for (let key in count) {
                    for (let i = 0; i < getcourse.length; i++) {
                        if (Number(key) === Number(getcourse[i].traning_id)) {
                            courseDetails.push({ course_name: getcourse[i].course_name, course_count: count[key], notAttend_count: count1[key] })
                        }

                    }
                }
                return courseDetails
            }

            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: countDup() })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////////////// no of attendes graph api for ADMIN ///////////////////////////
exports.no_of_attendes_count_admin = async (req, res) => {
    try {
        const getAllData = await addUserCourseDetails.findAll({
            attributes: ["traning_id", "course_name", "result", "employee_id"]
        });
        let getcourse = await newTraningDetails.findAll();
        if (getAllData) {

            const countDup = () => {
                let courseDetails = [];
                let count = {}

                for (let el of getAllData) {
                    if (Number(el.result) !== 0) {

                        count[el.traning_id] = (count[el.traning_id] || 0) + 1
                    }
                }
                for (let key in count) {
                    for (let i = 0; i < getcourse.length; i++) {
                        if (Number(key) === Number(getcourse[i].traning_id)) {
                            courseDetails.push({ course_name: getcourse[i].course_name, attened_count: count[key] })
                        }

                    }
                }
                return courseDetails
            }

            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: countDup() })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////////////  emp result for USER //////////////////
exports.getAll_empResult_user = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const getData = await newTraningDetails.findAll({
            where: { employee_id: employee_id },
            attributes: ["course_name", "result"]
        });
        if (getData.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////// no of Assined course graph api for USER ///////////////////
exports.no_of_assined_course_user = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const getAllData = await addUserCourseDetails.findAll({
            where: { employee_id: employee_id },
            attributes: ["traning_id", "course_name", "result", "employee_id"]
        });
        let getcourse = await newTraningDetails.findAll();
        if (getAllData) {

            const countDup = () => {
                let courseDetails = [];
                let count = {}
                let count1 = {}

                for (let el of getAllData) {
                    count[el.traning_id] = (count[el.traning_id] || 0) + 1

                    if (Number(el.result) == 0) {

                        count1[el.traning_id] = (count1[el.traning_id] || 0) + 1
                    }
                }

                for (let key in count) {
                    for (let i = 0; i < getcourse.length; i++) {
                        if (Number(key) === Number(getcourse[i].traning_id)) {
                            courseDetails.push({ course_name: getcourse[i].course_name, course_count: count[key], notAttend_count: count1[key] })
                        }

                    }
                }
                return courseDetails
            }

            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: countDup() })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////////////// no of attendes graph api for USER ///////////////////////////
exports.no_of_attendes_count_user = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const getAllData = await addUserCourseDetails.findAll({
            where: { employee_id: employee_id },
            attributes: ["traning_id", "course_name", "result", "employee_id"]
        });
        let getcourse = await newTraningDetails.findAll();
        if (getAllData) {

            const countDup = () => {
                let courseDetails = [];
                let count = {}

                for (let el of getAllData) {
                    if (Number(el.result) !== 0) {

                        count[el.traning_id] = (count[el.traning_id] || 0) + 1
                    }
                }
                for (let key in count) {
                    for (let i = 0; i < getcourse.length; i++) {
                        if (Number(key) === Number(getcourse[i].traning_id)) {
                            courseDetails.push({ course_name: getcourse[i].course_name, attened_count: count[key] })
                        }

                    }
                }
                return courseDetails
            }

            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: countDup() })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.req_data_listby_auth_co_id  = async (req, res) => {
    try {
        const author_course_id = req.params.id;
        var userdata = await newRequestCourseDetails.findAll(
            {where: {
               author_course_id:author_course_id , status: {
                [Op.not]: ["INPROGRESS", "COMPLETED"]
            }  },
               attributes: ["request_id","traning_id", "course_name", "employee_id"],
            include: [{
                model: userDetails,
                attributes: ["employee_id", "first_name", "last_name"]
             
              }]
           
        });

            return res.status(200).send({ code: 200, message: "Fetch Data By Id Successfully", data: userdata });
       
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};