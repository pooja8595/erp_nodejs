const db = require("../../../models/index");
const newContentDetails = db.newContent;
const newContent2Details = db.newContent2;
const categoryDetails = db.category;
const newTraningDetails = db.newTraning;
const op = db.Sequelize.Op
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "http://localhost:5000/"
// const baseUrl = "http://192.168.20.158:5000/"
const parse = require('csv-parser');
const fs = require('fs');
const path = require("path");
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

/////////////// Create New Content ///////////////

exports.create_New_Content = async (req, res) => {
    try {
        const { segment, category, module, is_assessment_avl, number_of_content, content_type } = req.body;

        var upload_assessment = req.files.upload_assessment == undefined ? "" : upload_assessment = req.files.upload_assessment[0].path;
        var upload_content = req.files.upload_content == undefined ? "" : upload_content = req.files.upload_content[0].path;

        const response = await newContentDetails.create({
            segment,
            category,
            module,
            is_assessment_avl,
            upload_assessment: baseUrl + upload_assessment,
            number_of_content,
            content_type,
            upload_content: baseUrl + upload_content,
        });
        return res.status(200).send({ code: 200, message: "New Content Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit New Content ///////////////

exports.edit_New_Content = async (req, res) => {
    try {
        const contentId = req.params.id;
        const { segment, category, module, is_assessment_avl, number_of_content, content_type } = req.body;

        var upload_assessment = req.files.upload_assessment == undefined ? "" : upload_assessment = req.files.upload_assessment[0].path;
        var upload_content = req.files.upload_content == undefined ? "" : upload_content = req.files.upload_content[0].path;

        const editData = await newContentDetails.findOne({ where: { content_id: contentId } });
        var uploadData = upload_assessment == '' ? upload_assessment = editData.upload_assessment : upload_assessment = baseUrl + upload_assessment
        var uploadCsvData = upload_content == '' ? upload_content = editData.upload_content : upload_content = baseUrl + upload_content
        if (editData) {
            const updateData = await newContentDetails.update(
                {
                    segment,
                    category,
                    module,
                    is_assessment_avl,
                    upload_assessment: uploadData,
                    number_of_content,
                    content_type,
                    upload_content: uploadCsvData,
                },
                { where: { content_id: contentId } }
            );
            return res.status(200).send({ code: 200, message: "Content Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_All_New_Content = async (req, res) => {
    try {
        const getAllData = await newContentDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData && getAllData.length) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {

                var obj = {
                    "content_id": getAllData[i].content_id,
                    "segment": getAllData[i].segment,
                    "category": getAllData[i].category,
                    "module": getAllData[i].module,
                    "is_assessment_avl": getAllData[i].is_assessment_avl,
                    "branch": getAllData[i].branch,
                    "upload_assessment": getAllData[i].upload_assessment,
                    "number_of_content": getAllData[i].number_of_content,
                    "content_type": getAllData[i].content_type ? getAllData[i].content_type : "N/A",
                    "upload_content": getAllData[i].upload_content,
                    "status": getAllData[i].status,
                    "createdAt": getAllData[i].createdAt,
                    "updatedAt": getAllData[i].updatedAt,
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

/////////////// Get ById Content ///////////////

exports.get_ById_Content = async (req, res) => {
    try {
        const contentId = req.params.id;
        const getData = await newContentDetails.findOne({ where: { content_id: contentId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Author ///////////////

exports.deleteContent = async (req, res) => {
    try {
        const contentId = req.params.id;
        const getData = await newContentDetails.findOne({ where: { content_id: contentId } });
        if (getData) {
            const updated = await newContentDetails.update({ status: "INACTIVE" }, { where: { content_id: contentId } });
            return res.status(200).send({ code: 200, message: "Content Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(400).send({ code: 400, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Bulk Upload New Content ///////////////

exports.contentUploadCsv = async (req, res) => {
    try {
        const user = await newContentDetails.findAll();
        if (!user) {
            throw new BadRequestError("user not found");
        }
        if (req.file == undefined) {
            return res.status(400).send("Please Upload Valid File!");
        }
        if (req.file.mimetype == "text/csv") {
            let csvData = []
            let filePath = path.join(__dirname, '../../../../new_content_doc/' + req.file.filename);
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
                        var employee_user_name = csvData[i].employee_user_name;
                        var employee_code = csvData[i].employee_code;
                        var segment = csvData[i].segment;
                        var roles = csvData[i].roles;
                        var position = csvData[i].position;
                        var status = csvData[i].statuvar

                        const employeecode = await newUserDetails.findOne({
                            where: { employee_code: employee_code },
                        });
                        if (employeecode) {
                            console.log("Employee Code Already Exist");
                        }
                        else {
                            const Data = await newUserDetails.create({
                                employee_user_name: employee_user_name,
                                employee_code: employee_code,
                                segment: segment,
                                roles: roles,
                                position: position,
                                status: status
                            })
                            console.log(Data, "data")
                        }
                    }
                });
            return res.status(200).send({ code: 200, message: "File Uploded Successfully!" });
        }
        else if (req.file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
            }
            let filePath = path.join(__dirname, '../../../../new_content_doc/' + req.file.filename);
            console.log(filePath, "filePath")

            readXlsxFile(filePath).then((rows) => {
                rows.shift();
                let excels = [];
                rows.forEach((row) => {
                    let tutorial = {
                        employee_user_name: row[0],
                        employee_code: row[1],
                        segment: row[2],
                        roles: row[3],
                        position: row[4],
                        status: row[5]
                    };
                    excels.push(tutorial);
                });
                newUserDetails.bulkCreate(excels)
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


/////////////// Get ById Download Document New Content ///////////////

exports.downloadDocument_NewContent = (req, res) => {
    const fileName = req.params.fileName;
    let filePath = path.join(__dirname, '../../../../new_content_doc/');
    res.download(filePath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};



/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// ADD CONTENT TO COURSE ////////////////////////////////////

exports.create_Content_Course = async (req, res) => {
    try {
        const { traning_id, content_name, content_description, question_status, no_of_option_question, option_mode } = req.body;

        var thumbnail = req.files.thumbnail == undefined ? "" : thumbnail = req.files.thumbnail[0].path;
        var upload_material = req.files.upload_material == undefined ? "" : upload_material = req.files.upload_material[0].path;
        var upload_course_video = req.files.upload_course_video == undefined ? "" : upload_course_video = req.files.upload_course_video[0].path;

        const response = await newContentDetails.create({
            traning_id,
            content_name,
            content_description,
            question_status,
            no_of_option_question: no_of_option_question? no_of_option_question: null,
            option_mode,
            thumbnail: baseUrl + thumbnail,
            upload_material: baseUrl + upload_material,
            upload_course_video: baseUrl + upload_course_video,
        });

        // const response1 = await newContent2Details.create({
        //     content_id:response.content_id,
        //     traning_id,
        //     content_name,
        //     content_description,
        //     question_status,
        //     no_of_option_question: no_of_option_question? no_of_option_question: null,
        //     option_mode,
        //     thumbnail: baseUrl + thumbnail,
        //     upload_material: baseUrl + upload_material,
        //     upload_course_video: baseUrl + upload_course_video,
        // });


        return res.status(200).send({ code: 200, message: "Course Content Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////// get all data behalf new traning id////////////////////////


exports.get_cource_id_newContent = async (req, res) => {
    try {
        const traning_id = req.params.id;
        const getAllData = await newContentDetails.findAll({ 
            where: { traning_id: traning_id, status: "ACTIVE" },
            include: [{
                model: newTraningDetails,
                attributes: ["no_of_option_question"]
            }], where: { traning_id: traning_id, status: "ACTIVE" },
        });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete new Content ///////////////

exports.delete_newContent = async (req, res) => {
    try {
        const content_id = req.params.id;
        const getData = await newContentDetails.findOne({ where: { content_id: content_id } });
        if (getData) {
            const updated = await newContentDetails.update({ status: "INACTIVE" }, { where: { content_id: content_id } });
            return res.status(200).send({ code: 200, message: "New Content Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 403, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////////////////////edit status//////////////////////
exports.editcontent_status = async (req, res) => {
    try {
        const content_id = req.params.id;
        const editData = await newContentDetails.findOne({ where: { content_id: content_id } });
        if (editData) {
            const updateData = await newContentDetails.update(req.body, { where: { content_id: content_id } });
            return res.status(200).send({ code: 200, message: "Data Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}; 

///////////////////////////////get content by content id//////////////////////
exports.getContentBY_contentID = async (req, res) => {
    try {
        const content_id = req.params.id;
        const editData = await newContentDetails.findOne({ where: { content_id: content_id } });
        if (editData) {
            return res.status(200).send({ code: 200, message: "Data Updated SuccessFully", data: editData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}; 


///////////////////////////////edit all content data//////////////////////
exports.editcontent = async (req, res) => {
    try {
        const content_id = req.params.id;
        const { traning_id, content_name, content_description, question_status, no_of_option_question, option_mode } = req.body;

        var thumbnail = req.files.thumbnail == undefined ? "" : thumbnail = req.files.thumbnail[0].path;
        var upload_material = req.files.upload_material == undefined ? "" : upload_material = req.files.upload_material[0].path;
        var upload_course_video = req.files.upload_course_video == undefined ? "" : upload_course_video = req.files.upload_course_video[0].path;

        const editData = await newContentDetails.findOne({ where: { content_id: content_id } });

        var thumbnailData = thumbnail == '' ? thumbnail = editData.thumbnail : thumbnail = baseUrl + thumbnail
        var uploadMaterial = upload_material == '' ? upload_material = editData.upload_material : upload_material = baseUrl + upload_material
        var uploadCourseVideo = upload_course_video == '' ? upload_course_video = editData.upload_course_video : upload_course_video = baseUrl + upload_course_video

        if (editData) {
            const updateData = await newContentDetails.update(
                {
                    traning_id,
                    content_name,
                    content_description,
                    question_status,
                    no_of_option_question: no_of_option_question? no_of_option_question: null,
                    option_mode,
                    thumbnail: thumbnailData,
                    upload_material: uploadMaterial,
                    upload_course_video: uploadCourseVideo
                },
                { where: { content_id: content_id } }
            );
            return res.status(200).send({ code: 200, message: "Content Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////////////// Edit Progressrate /////////////////////////

exports.edit_single_Content = async (req, res) => {
    try {
        const content_id = req.params.id;
        const { progress_rate, result, video_current_time } = req.body;
        const editData = await newContent2Details.findOne({ where: { content_id: content_id } });
        if (editData) {
            const updateData = await newContent2Details.update(
                {
                    progress_rate,
                    result,
                    video_current_time
                },
                { where: { content_id: content_id } }
            );
            return res.status(200).send({ code: 200, message: "Content Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};