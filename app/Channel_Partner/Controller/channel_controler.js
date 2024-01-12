const db = require("../../models/index")
const userDetails = db.user
const channelPartnerDetail = db.channelPartner
const createProvisionDetails = db.Create_Provision
const statesDetails = db.states;
const countryssDetails = db.countryss;
const LeadManagmentDetails = db.LeadManagment;
const CP_Details = db.cp_notification ;

const moment = require("moment");
const { Op } = require("sequelize");
// const leadManagmentModel = require("../../Lead_Managment/models/leadManagment.model");

/////////////// Create Channel Partner ///////////////

exports.create_Channel_Partner = async (req, res) => {
    try {
        const { associated_comapny, first_name, last_name, email, designation, city_id, city_name, state_id, state_name, Region_id,
            Region_name, Cp_registration_Approver_id, Cp_registration_Approver_name, Cp_source_id, Cp_source_name, Contact_source_id,
            Contact_source_name, Agreed_prec_incentive, Phone_number, cp_veriferId, mobile_phone_number, cp_veriferName } = req.body;
        const Role_Verify = await userDetails.findOne({ where: { employee_id: cp_veriferId } })
        if (Role_Verify.user_role == "Cp_verifier") {

            const companyData = await channelPartnerDetail.findOne({
                where: {
                    [Op.or]: [
                        { associated_comapny: associated_comapny },
                        { email: email },
                    ]
                },
            })

            if (companyData) {
                return res.status(404).send({ code: 404, message: `Email Or associated_comapny is Already Exist!` })
            }
            else {
                const response = await channelPartnerDetail.create({
                    associated_comapny,
                    cp_veriferId,
                    cp_veriferName,
                    first_name,
                    last_name,
                    email,
                    designation,
                    city_id,
                    city_name,
                    state_id,
                    state_name,
                    Region_id,
                    Region_name,
                    Cp_registration_Approver_id,
                    Cp_registration_Approver_name,
                    Cp_source_id,
                    Cp_source_name,
                    Contact_source_id,
                    Contact_source_name,
                    Agreed_prec_incentive,
                    Phone_number,
                    mobile_phone_number
                });
                return res.status(200).send({ code: 200, message: "Channel Partner Created Successfully!", data: response })
            }
        } else {
            return res.status(404).send({ code: 404, message: "Your Role is not CP_Verifer" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Update Channel Partner ///////////////

exports.update_Channel_Partner = async (req, res) => {
    try {
        const channelPartnerId = req.params.id
        const { first_name, last_name, email, designation, city_id, city_name, state_id, state_name, Region_id, Region_name, Cp_registration_Approver_id,
            Cp_registration_Approver_name, Cp_source_id, Cp_source_name, Contact_source_id, Contact_source_name, Agreed_prec_incentive,
            Phone_number, mobile_phone_number } = req.body;
        const channel_partner = await channelPartnerDetail.findOne({ where: { channel_partner_id: channelPartnerId } })
        if (channel_partner) {
            const updateChannelPartner = await channelPartnerDetail.update({
                first_name,
                last_name,
                email,
                designation,
                city_id,
                city_name,
                state_id,
                state_name,
                Region_id,
                Region_name,
                Cp_registration_Approver_id,
                Cp_registration_Approver_name,
                Cp_source_id,
                Cp_source_name,
                Contact_source_id,
                Contact_source_name,
                Agreed_prec_incentive,
                Phone_number,
                mobile_phone_number
            }, { where: { channel_partner_id: channelPartnerId } })
            return res.status(200).send({ code: 200, message: "Updated Channel Partner Successfully!", data: updateChannelPartner })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

/////////////// Read Channel Partner ///////////////

exports.read_Channel_Partner = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const user_data = await userDetails.findOne({ where: { employee_id: employee_id } })
        if (user_data) {
            if (user_data.user_role == "Cp_verifier") {
                const find_cp = await channelPartnerDetail.findAll()
                return res.status(200).send({ code: 200, message: "Data fetched successfully", data: find_cp });
            }
            else if (user_data.user_role == "Cp_registration_approver") {
                const find_cp1 = await channelPartnerDetail.findAll({ where: { Cp_registration_Approver_id: employee_id } })
                return res.status(200).send({ code: 200, message: "Data fetched successfully", data: find_cp1 });
            }
            else if (user_data.user_role == "HR_Team") {
                const find_cp2 = await channelPartnerDetail.findAll({ where: { status: "APPROVED" }, })
                return res.status(200).send({ code: 200, message: "Data fetched successfully", data: find_cp2 });
            }
            else {
                return res.status(403).send({ code: 403, message: "You Role is not vaild" })
            }
        } else {
            return res.status(404).send({ code: 404, message: "You have not authenticated" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

/////////////// Get All Cp Registration Approver ///////////////

exports.get_All_Channel_Partner_Registration_Approver = async (req, res) => {
    try {
        const getData = await channelPartnerDetail.findAll({ attributes: ['Cp_registration_Approver', 'channel_partner_id'] })
        if (getData) {
            return res.status(200).send({ code: 200, message: "data Fetched successfully", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

/////////////// Get States By Country Id ///////////////

exports.getstatesbycountryid = async (req, res) => {
    try {
        const getAllData = await statesDetails.findAll({
            where: { countryss_id: 1, status: "ACTIVE" },
            include: [{
                model: countryssDetails,
                attributes: ["countryss_name", "countryss_id"],
            }]
        });
        if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {
                var getName = getAllData[i].countryss.countryss_name;
                var obj = {
                    "states_id": getAllData[i].states_id,
                    "states_name": getAllData[i].states_name,
                    "countryss_id": getAllData[i].countryss_id,
                    "status": getAllData[i].status,
                    "countryss_name": getName
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Cp Source ///////////////

exports.get_All_Channel_Partner_Source = async (req, res) => {
    try {
        const getData = await channelPartnerDetail.findAll({ attributes: ['Cp_source', 'channel_partner_id'] })
        if (getData) {
            return res.status(200).send({ code: 200, message: "data Fetched successfully", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

/////////////// Get All Contact Source ///////////////

exports.get_All_Contact_Source = async (req, res) => {
    try {
        const getData = await channelPartnerDetail.findAll({ attributes: ['Contact_source', 'channel_partner_id'] })
        if (getData) {
            return res.status(200).send({ code: 200, message: "data Fetched successfully", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

/////////////// Read Channel partner ById ///////////////

exports.read_Channel_Partner_ById = async (req, res) => {
    try {
        const channelPartnerId = req.params.id
        const getData = await channelPartnerDetail.findOne({ where: { channel_partner_id: channelPartnerId } })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully!", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}


exports.read_Channel_Partner_ByIdApproved = async (req, res) => {
    try {
        // const channelPartnerId = req.params.id
        const channelPartnerId = req.params.id
        const getData = await channelPartnerDetail.findAll({  where:{status: "APPROVED"}
            // where: {
            //     // [Op.and]: [
            //     //   { channel_partner_id: channelPartnerId},
                //   { status: "APPROVED" },
            //     // ]
            //   },
            
            // where: { channel_partner_id: channelPartnerId }
         })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully!", data: getData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}
/////////////// Delete Channel Partner ///////////////

exports.delete_Channel_Partner = async (req, res) => {
    try {
        const channelPartnerId = req.params.id;
        const getData = await channelPartnerDetail.findOne({ where: { channel_partner_id: channelPartnerId } })
        if (getData) {
            const deleteData = await channelPartnerDetail.update({ status: "INACTIVE" }, { where: { channel_partner_id: channelPartnerId } })
            return res.status(200).send({ code: 200, message: "Channel partner Deleted Successfully!", data: deleteData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

/////////////// Parmanent Delete Channel Partner ///////////////

exports.parmanent_Delete_Channel_Partner = async (req, res) => {
    try {
        const channelPartnerId = req.params.id;
        const getData = await channelPartnerDetail.findOne({ where: { channel_partner_id: channelPartnerId } })
        if (getData) {
            const deleteData = await channelPartnerDetail.destroy({ where: { channel_partner_id: channelPartnerId } })
            return res.status(200).send({ code: 200, message: "Channel partner Deleted Successfully!", data: deleteData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

/////////////// Get All Channel Partner Name ///////////////

exports.get_All_Channel_Partner_Name = async (req, res) => {
    try {
        const getAllData = await channelPartnerDetail.findAll({ where: { status: "APPROVED" } });
        if (getAllData) {
            var array = [];
            for (let i = 0; i < getAllData.length; i++) {
                var objData = {
                    "channel_partner_id": getAllData[i].channel_partner_id,
                    "first_name": getAllData[i].first_name,
                    "last_name": getAllData[i].last_name,
                }
                array.push(objData)
            }
            return res.status(200).send({ code: 200, message: "Fetch All Channel Partner Name Successfully!", data: array })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get Single Provision Details ///////////////

exports.get_Single_Provision_Details = async (req, res) => {
    try {
        const lead_genration_id = parseInt(req.body.lead_genration_id)
        const channel_partner_id = req.params.id
        const getData = await userDetails.findOne({ where: { employee_id: channel_partner_id } })
        var employee_email = getData.employee_official_email
        var getcpDetails = await channelPartnerDetail.findOne({where: {email:employee_email}})
        const getAllData = await db.LeadManagment.findAll({
            where:{lead_genration_id: lead_genration_id},
            attributes:["lead_genration_id","br_number","associated_company","product_request","address2","gst_number",],
            include: [{
              model: db.Mandays,
              attributes: [ "lead_genration_id","br_number","stage","noOfMandays"]
            }]
        });
        var newArray = [getcpDetails,...getAllData]
        if (getcpDetails) {
            return res.status(200).send({ code: 200, message: "Fetch Single Channel Partner Details Data Successfully!", data: newArray });
        } else {
            return res.status(404).send({ code: 404, message: "Record not found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get All Provision Details List ///////////////

exports.get_All_Provision_Details_List = async (req, res) => {
    try {
        const employeeId = parseInt(req.params.employee_id)
        const userData = await userDetails.findOne({ where: { employee_id: employeeId } })
        const cp_data  = await channelPartnerDetail.findAll({where: {Contact_source_id:employeeId}})
        var allLeadData = []
        var registerred_userId = []
        var leadData = []
        for (var i = 0; i < cp_data.length ; i++){
          

             var Obj  = {
                "lead_created_by_id": cp_data[i].email
             }
             allLeadData.push(Obj)
    
        }

        for(var j = 0; j < allLeadData.length; j++){
            var  registerData  = await userDetails.findAll({ where:{employee_official_email: allLeadData[j].lead_created_by_id}})
            if(registerData.length >=1 ){
                var Obj  = {
                    "register_userId": registerData[0].employee_id
                 }
                 registerred_userId.push(Obj)

            }
            else{
                console.log("Data not found")
            }
          
        }

        if (registerred_userId) {
            for(var k=0; k<registerred_userId.length; k++) {
            const allData = await LeadManagmentDetails.findAll({ where: { lead_created_by_id: registerred_userId[k].register_userId } });
            if(allData.length >=1 ){
                const PKC = {
                    "allData": allData
                }
                leadData.push(PKC)
                
            }
           
            }
            if (leadData) {
                return res.status(200).send({ code: 200, message: "Fetch All Provision Details List Data Successfully!", data: leadData});
            } else {
                return res.status(404).send({ code: 404, message: "Record not found" })
            }
        } else {
            return res.status(405).send({ code: 405, message: "You are not SP" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get Agreed Rate By CP Id ///////////////

exports.get_agreed_rate_by_cp_id = async (req, res) => {
    try {
        const channelPartnerId = req.params.id;
        const CP_Agreed_perc = await channelPartnerDetail.findOne({ where: { channel_partner_id: channelPartnerId } });
        if (CP_Agreed_perc) {
            const Agreed_perc = CP_Agreed_perc.Agreed_prec_incentive;
            return res.status(200).send({ code: 200, message: "Agreed Percentage Of CP", data: Agreed_perc });
        } else {
            return res.status(404).send({ code: 404, message: "No channel partner  Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 400, message: "Server Error" });
    }
};

/////////////// Created CP Provision Details List ///////////////

exports.Created_CP_Provision_Details_List = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const emp_data = await userDetails.findOne({ where: { employee_id: employee_id } });
        const CP_Detail_List = await channelPartnerDetail.findAll({
            include: [{
                model: Create_Provision,
                attributes: ["CP_Name", "Cert_Type", "GST_Number", "MSME_Number", "Address", "Product", "Assessment_Fee",
                    "Delivered_Month", "Requested_Incentive", "Agreed_Incentives", "special_Incentives_Amount", "Remarks",
                    "Invoice_submitted_by_cp", "Invoice_Number", "Invoice_Date", "Date_of_pay_Cp", "createdAt", "status"],
            }],
        });
        return res.status(200).send({ code: 200, message: "Data Fetched Successfully", data: CP_Detail_List });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Update Created CP Provision List ///////////////

exports.update_Created_CP_Provision_list = async (req, res) => {
    try {
        const getAlldata = await channelPartnerDetail.findAll({
            attributes: ["associated_comapny", "first_name", "last_name", "email", "designation", "mobile_phone_number",
                "Cp_registration_Approver", "Cp_source", "Contact_source", "Agreed_prec_incentive", "status"],
            include: [{
                model: Create_Provision,
                attributes: ["CP_Name", "Requested_Incentive"],
            }],
        });
        if (getAlldata) {
            return res.status(200).send({ code: 200, message: "Data found", data: getAlldata });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// CP Provision Details List ///////////////

exports.CP_provision_Details_list = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const emp_data = await userDetails.findOne({ employee_id: employee_id });
        if (emp_data.role_master_id == 19) {
            const getAlldata = await channelPartnerDetail.findAll({
                attributes: ["associated_comapny", "first_name", "last_name", "email", "designation", "mobile_phone_number", "Cp_registration_Approver",
                    "Cp_source", "Contact_source", "Agreed_prec_incentive", "status"],
                include: [{
                    model: Create_Provision,
                    attributes: ["CP_Name", "Requested_Incentive"],
                }],
            });
            if (getAlldata) {
                return res.status(200).send({ code: 200, message: "Data found", data: getAlldata });
            } else {
                return res.status(404).send({ code: 404, message: "No data found" });
            }
        } else {
            return res.status(405).send({ code: 404, message: "Your Role is not SP" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "servre Error" });
    }
};

/////////////// Get CP Provision Details Approval List ///////////////

exports.CP_provision_Details_Approval_List = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const emp_data = userDetails.findOne({ where: { employee_id: employee_id } });
        if (emp_data.role_master_id == 11) {
            const getAllData = await channelPartnerDetail.findAll({
                attributes: ["associated_comapny", "first_name", "last_name", "email", "designation", "Phone_number", "Cp_registration_Approver", "Cp_source", "Contact_source"],
                include: [{
                    model: Create_Provision,
                    attributes: ["CP_Name", "Requested_Incentive", "Agreed_Incentives", "status", "createdAt"],
                }],
            });
            return res.status(200).send({ code: 200, message: "Data updated successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Your Role is not RBH" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Verify CP ///////////////

exports.Verify_CP = async (req, res) => {
    try {
        const channelPartnerId = req.params.id;
        const { status, Re_Ap_Remarks, cp_ApproverId } = req.body;
        const findCP = await userDetails.findOne({ where: { employee_id: cp_ApproverId } })
        if (findCP.user_role == "Cp_registration_approver") {
            const Data_CP = await channelPartnerDetail.update({
                status,
                cp_ApproverId,
                Re_Ap_Remarks,
                Approved_date: moment(new Date()).format("YYYY/MM/DD"),
            }, { where: { channel_partner_id: channelPartnerId } })
            return res.status(200).send({ code: 200, message: "Success", data: Data_CP });
        } else {
            return res.status(404).send({ code: 404, message: "You Are Not a Cp Registration Approver" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}
/////////////////////////Dwonload File////////////////////////////
exports.downloadChannel_partner_Docs = (req, res) => {
    const fileName = req.params.fileName;
    res.download("documents/" + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

/////////////// author notification api /////////////////////////////////////
// exports.cp_notification = async (req, res) => {
//     try {
//         let resData = [];
//         for (let i = 0; i < req.body.length; i++) {
//             const response = await CP_Details.create({
//                 employee_id:  req.body[i].employee_id,
//                 emp_name:  req.body[i].emp_name,
//                 employee_official_email:  req.body[i].employee_official_email,
//                 role:  req.body[i].role,
//                 role_id:  req.body[i].role_id,
//                 remark:  req.body[i].remark
//             });

//             await transport.mailsend({
//                 from: process.env.EMAIL_FROM,
//                 to:  req.body[i].employee_official_email,
//                 subject: `${ req.body[i].subject}`,
//                 html: `${ req.body[i].textData}`
//             });
//             resData.push(response)
//         }
//         return res.status(200).send({ code: 200, message: "Author Created Successfully!", data: resData });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };

// exports.get_cp_notification = async (req, res) => {
//     try {
//         const employee_id = req.params.id;
//         const getData = await lms_notificationDetails.findAll({ where: { employee_id: employee_id } });
//         if (getData) {
//             return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
//         } else {
//             return res.status(404).send({ code: 404, message: "Record Not Found" });
//         };
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };

// exports.edit_cp_notification = async (req, res) => {
//     try {
//         const employee_id = req.params.id;
//         const getData = await lms_notificationDetails.update(req.body, { where: { employee_id: employee_id } });
//         if (getData) {
//             return res.status(200).send({ code: 200, message: "Delete data Successfully", data: getData });
//         } else {
//             return res.status(404).send({ code: 404, message: "Record Not Found" });
//         };
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };

// exports.delete_cp_notification = async (req, res) => {
//     try {
//         const lms_notification_id = req.body;
//         let resData = [];
//         for (let i = 0; i < lms_notification_id.lms_notification_id.length; i++) {
//             const element = lms_notification_id.lms_notification_id[i];

//             const getData = await lms_notificationDetails.destroy({ where: { lms_notification_id: element } });
//             resData.push(getData)
//         }
//         return res.status(200).send({ code: 200, message: "Delete data Successfully", data: resData.length });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };