const db = require("../../../models/index");
const newUserDetails = db.newUser;
const User = db.user
const roleMasterDetails = db.role_master;
const op = db.Sequelize.Op
const parse = require('csv-parser');
const fs = require('fs');
const path = require("path");
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
/////////////// Create New User ///////////////

exports.create_New_User = async (req, res) => {
    try {
        const { employee_user_name, employee_code, segment, roles, position } = req.body;
        const response = await newUserDetails.create({
            employee_user_name,
            employee_code,
            segment,
            roles,
            position 
        });
        return res.status(200).send({ code: 200, message: "New User Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// User All Data ///////////////

exports.userAllData = async (req, res) => {
    try {
        const getData = await User.findAll();
        if (getData) {
            var array = [];
            for (var i = 0; i < getData.length; i++) {
                const first_name = getData[i].first_name
                const last_name = getData[i].last_name
                var obj = {
                    "employee_id": getData[i].employee_id,
                    "employee_code": getData[i].employee_code,
                    "fullName": first_name + " " + last_name,
                    "segment_suv": getData[i].segment_suv,
                    "designation": getData[i].designation,
                    "user_role": getData[i].user_role,
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get All Role ///////////////

exports.get_All_Role = async (req, res) => {
    try {
        const getAllData = await roleMasterDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

/////////////// Get ById New User ///////////////

exports.getById_New_User = async (req, res) => {
    try {
        const userId = req.params.id;
        const getData = await newUserDetails.findOne({ where: { user_id: userId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All New User ///////////////

exports.getAll_New_User = async (req, res) => {
    try {
        const getAllData = await newUserDetails.findAll()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All New User Data Successfully", data: getAllData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete New User ///////////////

exports.delete_New_User = async (req, res) => {
    try {
        const userId = req.params.id;
        const { status, isChecked } = req.body
        const getData = await newUserDetails.findOne({ where: { user_id: userId } });
        if (getData) {
            const updated = await newUserDetails.update({ status, isChecked }, { where: { user_id: userId } });
            return res.status(200).send({ code: 200, message: "New User Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(400).send({ code: 400, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Bulk Upload New User ///////////////

exports.uploadCsv = async (req, res) => {
    try {
        const user = await newUserDetails.findAll();
        if (!user) {
            throw new BadRequestError("user not found");
        }
        if (req.file == undefined) {
            return res.status(400).send("Please Upload Valid File!");
        }
        if (req.file.mimetype == "text/csv") {
            let csvData = []
            let filePath = path.join(__dirname, '../../../../new_user_doc/' + req.file.filename);
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
            let filePath = path.join(__dirname, '../../../../new_user_doc/' + req.file.filename);
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

/////////////// Get ById Download Document New User ///////////////

exports.downloadDocument_NewUser = (req, res) => {
    const fileName = req.params.fileName;
    let filePath = path.join(__dirname, '../../../../new_user_doc/');
    res.download(filePath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
