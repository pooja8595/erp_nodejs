const db = require('../../../models/index');
const holidayDetails = db.holidayDetail;
const parse = require('csv-parser');
const fs = require('fs');
const path = require("path");
const readXlsxFile = require("read-excel-file/node");

/////////////// Create Holiday ///////////////

exports.create_holiday = async (req, res) => {
    try {
        const { employee_id, holiday_name, holiday_from, holiday_to, holiday_type, resion, restricted_holiday } = req.body;
        const empData = await holidayDetails.findAll({
            limit: 1,
            where: { employee_id: req.body.employee_id },
            order: [['createdAt', 'DESC']]
        })
        const date1 = new Date(holiday_from);
        const date2 = new Date(holiday_to);
        date2.setSeconds(date2.getSeconds() + 10);
        const diffTime = Math.abs(date2 - date1);
        const total_leave = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const holidayData = await holidayDetails.findOne({ where: { holiday_name: holiday_name } })
        if (holidayData) {
            return res.status(400).send({ code: 400, message: "Holiday Name Already Exits!" })
        } else {
            const response = await holidayDetails.create({
                employee_id,
                holiday_name,
                holiday_type,
                holiday_from,
                holiday_to,
                total_leave: total_leave,
                resion,
                restricted_holiday
            });
            return res.status(200).send({ code: 200, message: "Holiday Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Holiday ///////////////

exports.edit_holiday = async (req, res) => {
    try {
        const holidayId = req.params.id;
        const { employee_id, holiday_name, holiday_from, holiday_to, holiday_type, resion, restricted_holiday } = req.body;
        const empData = await holidayDetails.findAll({
            limit: 1,
            where: { employee_id: req.body.employee_id },
            order: [['createdAt', 'DESC']]
        })
        const date1 = new Date(holiday_from);
        const date2 = new Date(holiday_to);
        date2.setSeconds(date2.getSeconds() + 10);
        const diffTime = Math.abs(date2 - date1);
        const total_leave = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const editData = await holidayDetails.findOne({ where: { holiday_id: holidayId } });
        if (editData) {
            const updateData = await holidayDetails.update({
                employee_id,
                holiday_name,
                holiday_type,
                holiday_from,
                holiday_to,
                total_leave: total_leave,
                resion,
                restricted_holiday
            },
                { where: { holiday_id: holidayId } });
            return res.status(200).send({ code: 200, message: "Holiday Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Holiday ///////////////

exports.get_All_holiday = async (req, res) => {
    try {
        const getAllData = await holidayDetails.findAll({ where: { holiday_status: "ACTIVE" } })
        if (getAllData) {
            getAllData.sort().reverse()
            return res.status(200).send({ code: 200, message: "Fetch All Holiday Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Holiday ///////////////

exports.get_ById_holiday = async (req, res) => {
    try {
        const holidayId = req.params.id;
        const getData = await holidayDetails.findOne({ where: { holiday_id: holidayId} });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Holiday Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Holiday ///////////////

exports.delete_holiday = async (req, res) => {
    try {
        const holidayId = req.params.id;
        const getData = await holidayDetails.findOne({ where: { holiday_id: holidayId } });
        if (getData) {
            const updated = await holidayDetails.update({ holiday_status: "INACTIVE" }, { where: { holiday_id: holidayId } });
            return res.status(200).send({ code: 200, message: "Holiday Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Upload Csv Holiday ///////////////

exports.upload_Holiday_By_file = async (req, res) => {
    try {
        const user = await holidayDetails.findAll();
        if (!user) {
            throw new BadRequestError("user not found");
        }
        if (req.file == undefined) {
            return res.status(400).send("Please Upload Valid File!");
        }
        if (req.file.mimetype == "text/csv") {
            let csvData = []
            let filePath = path.join(__dirname, '../../../../holiday_csv/' + req.file.filename);
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("error", (error) => {
                    throw error.message;
                })
                .on("data", (row) => {
                    csvData.push(row);
                })
                .on("end", async () => {
                    for (let i = 0; i < csvData.length; i++) {
                        var holiday_name = csvData[i].holiday_name;
                        var holiday_from = csvData[i].holiday_from;
                        var holiday_to = csvData[i].holiday_to;
                        var total_leave = csvData[i].total_leave;
                        var resion = csvData[i].resion;
                        var holiday_status = csvData[i].holiday_status;

                        const holidayName = await holidayDetails.findOne({ where: { holiday_name: holiday_name } });
                        if (holidayName) {
                            return res.status(400).send({ code: 400, message: "Holiday Name Already Exits!" })
                        } else {
                            const Data = await holidayDetails.create({
                                holiday_name: holiday_name,
                                holiday_from: holiday_from,
                                holiday_to: holiday_to,
                                total_leave: total_leave,
                                resion: resion,
                                holiday_status: holiday_status
                            })
                            console.log(Data, "data")
                        }
                    }
                    return res.status(200).send({ code: 200, message: "File Uploded Successfully!" });
                });
        } else if (req.file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
            }
            let filePath = path.join(__dirname, '../../../../holiday_csv/' + req.file.filename);

            readXlsxFile(filePath).then((rows) => {
                rows.shift();
                let excels = [];
                rows.forEach((row) => {
                    let tutorial = {
                        holiday_name: row[0],
                        holiday_from: row[1],
                        holiday_to: row[2],
                        total_leave: row[3],
                        resion: row[4],
                        holiday_status: row[5]
                    };
                    excels.push(tutorial);
                });
                holidayDetails.bulkCreate(excels)
                return res.status(201).send({ code: 201, message: "File Uploded Successfully!" });
            });
        } else {
            console.log("please choose valide files CSV or Excel")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Download Document Holiday ///////////////

exports.download_Document_Holiday = (req, res) => {
    const fileName = req.params.fileName;
    let filePath = path.join(__dirname, '../../../../holiday_csv/');
    res.download(filePath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};