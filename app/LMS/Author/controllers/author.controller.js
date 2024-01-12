const db = require("../../../models/index");
const authorDetails = db.author;
const categoryDetails = db.category;
const regionDetails = db.region;
const lms_notificationDetails = db.lms_author_notification;
const transport = require("../../../services/nodemailer");
const User = db.user
const op = db.Sequelize.Op
const notification_for_sales_request =db.notification_sales_request
const notificationfor_openHouse_trainings = db.notificationfor_openHouse_trainings
const userDetails = db.user
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
const lms_notification_history = db.lms_notification_history
/////////////// Create Author ///////////////

exports.createAuthor = async (req, res) => {
    try {
        const { employee_id, author_name, fullName, employee_code, segment_suv, category, department, region, module, branch, course_name, created_by } = req.body;
        if (req.file) {
            var doc = req.file.path
        } else {
            var doc = ""
        }
        const findData = await authorDetails.findOne({ where: { author_name: author_name } })
        if (findData) {
            return res.status(403).send({ code: 403, message: "Author Name is Already Exits" })
        } else {
            const response = await authorDetails.create({
                employee_id,
                author_name,
                fullName,
                employee_code,
                segment_suv,
                category,
                department,
                region,
                module,
                branch,
                course_name,
                created_by,
                upload_trainer_document: baseUrl + doc
            });
            return res.status(200).send({ code: 200, message: "Author Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// author notification api /////////////////////////////////////
exports.LMS_notification = async (req, res) => {
    try {
        let resData = [];
        for (let i = 0; i < req.body.length; i++) {
            const response = await lms_notificationDetails.create({
                employee_id:  req.body[i].employee_id,
                emp_name:  req.body[i].emp_name,
                employee_official_email:  req.body[i].employee_official_email,
                role:  req.body[i].role,
                role_id:  req.body[i].role_id,
                remark:  req.body[i].remark,
                type:  req.body[i].type
            });

            const history_log = await lms_notification_history.create({ 
                lead_genration_id:req.body[i].lead_genration_id,
                employee_id: req.body[i].employee_id,
                emp_name: req.body[i].emp_name,
                employee_official_email:req.body[i].employee_official_email,
                role: req.body[i].role,
                role_id: req.body[i].role_id,
                type: req.body[i].type,
                remark: req.body[i].remark,
                subject: req.body[i].subject,
                textData: req.body[i].textData,
    
            });

            transport.mailsend({
                from: process.env.EMAIL_FROM,
                to:  req.body[i].employee_official_email,
                subject: `${ req.body[i].subject}`,
                html: `${ req.body[i].textData}`
            });
            resData.push(response)
            resData.push(history_log);
        }

        return res.status(200).send({ code: 200, message: "Author Created Successfully!", data: resData });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getLMS_notification = async (req, res) => {
    try {
        const employee_id = req.params.id;
        var UserData = await User.findOne({ where: { employee_id: employee_id } })
    var newRole = UserData.role_master_id
    var newRole = UserData.role_master_id
    const allRoleData  =  [10,4,22,24,34]
    const isValue1Present = allRoleData.includes(newRole);

    if(isValue1Present === true) {
      var notification_for_Open_house_training = await notificationfor_openHouse_trainings.findAll({
        attributes:["message"],
        order: [['createdAt', 'DESC']]
      })
    }
    if(newRole == 10){
        var sales_request_notification = await notification_for_sales_request.findAll({
            where:{role_master_id :10},
            order: [['createdAt', 'DESC']]
        })
   
    

        const getData = await lms_notificationDetails.findAll({ where: { employee_id: employee_id } });
        if (getData) {

            getData.unshift(sales_request_notification)

            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData ,sales_request_notification,notification_for_Open_house_training});
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    }
    else {
        const getData = await lms_notificationDetails.findAll({ where: { employee_id: employee_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData,notification_for_Open_house_training });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };

    }

    
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_notification_count = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const getData = await lms_notificationDetails.findAll({ where: { employee_id: employee_id, status: "ACTIVE" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData.length });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.edit_LMS_notification = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const getData = await lms_notificationDetails.update(req.body, { where: { employee_id: employee_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Delete data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.delete_LMS_notification = async (req, res) => {
    try {
        const lms_notification_id = req.body;
        let resData = [];
        for (let i = 0; i < lms_notification_id.lms_notification_id.length; i++) {
            const element = lms_notification_id.lms_notification_id[i];

            const getData = await lms_notificationDetails.destroy({ where: { lms_notification_id: element } });
            resData.push(getData)
        }
        return res.status(200).send({ code: 200, message: "Delete data Successfully", data: resData.length });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Author ///////////////

exports.editAuthor = async (req, res) => {
    try {
        const AuthorId = req.params.id;
        const { employee_id, author_name, fullName, employee_code, segment_suv, category, department, region, module, branch, course_name, created_by } = req.body;
        if (req.file) {
            var doc = req.file.path
        } else {
            var doc = ""
        }
        const editData = await authorDetails.findOne({ where: { author_trainer_id: AuthorId } });
        if (editData) {
            const updateData = await authorDetails.update({
                employee_id,
                author_name,
                fullName,
                employee_code,
                segment_suv,
                category,
                department,
                region,
                module,
                branch,
                course_name,
                created_by,
                upload_trainer_document: baseUrl + doc
            }, { where: { author_trainer_id: AuthorId } });
            return res.status(200).send({ code: 200, message: "Author Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Author ///////////////

exports.getByIdAuthor = async (req, res) => {
    try {
        const AuthorId = req.params.id;
        const getData = await authorDetails.findOne({ where: { author_trainer_id: AuthorId } });
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

/////////////// Get All Category ///////////////

exports.get_All_Categoryies = async (req, res) => {
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

/////////////// Get All Region List ///////////////

exports.get_All_region_List = async (req, res) => {
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

/////////////// Get All User List ///////////////

exports.user_Name_List = async (req, res) => {
    try {
        const getData = await userDetails.findAll();
        if (getData) {
            var array = [];
            for (var i = 0; i < getData.length; i++) {
                const first_name = getData[i].first_name
                const last_name = getData[i].last_name
                var obj = {
                    "employee_id": getData[i].employee_id,
                    "fullName": first_name + " " + last_name,
                    "segment_suv": getData[i].segment_suv,
                    "employee_code": getData[i].employee_code,
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
};

/////////////// Get ById User List ///////////////

exports.get_ById_user = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getData = await userDetails.findAll({ where: { employee_id: employeeId } });
        if (getData) {
            var array = [];
            for (var i = 0; i < getData.length; i++) {
                const first_name = getData[i].first_name
                const last_name = getData[i].last_name
                var obj = {
                    "employee_id": getData[i].employee_id,
                    "fullName": first_name + " " + last_name,
                    "segment_suv": getData[i].segment_suv,
                    "department": getData[i].department,
                    "employee_code": getData[i].employee_code,
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Get All Author ///////////////

exports.getAllAuthor = async (req, res) => {
    try {
        const getAllData = await authorDetails.findAll()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Author Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Get All Author with attribute ///////////////

exports.getAll_course_author = async (req, res) => {
    try {
        const getAllData = await authorDetails.findAll({
            where: { status: "ACTIVE" },
            attributes: ["employee_id", "author_trainer_id", "author_name", "category"]
        })

        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Author Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Delete Author ///////////////

exports.deleteAuthor = async (req, res) => {
    try {
        const AuthorId = req.params.id;
        const { status, isChecked } = req.body
        const getData = await authorDetails.findOne({ where: { author_trainer_id: AuthorId } });
        if (getData) {
            const updated = await authorDetails.update({ status, isChecked }, { where: { author_trainer_id: AuthorId } });
            return res.status(200).send({ code: 200, message: "Author Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(400).send({ code: 400, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};