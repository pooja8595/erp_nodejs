const db = require('../../../models/index');
const ProcurementDetails = db.procurement;
const Procurement_productDetails = db.procurement_product;
const Approved_levelDetails = db.procurement_Approved_level;
const vendorManagementDetails = db.vendorManagement;
const vendor_product_Details = db.vendor_product_details;
const vendor_invoice_data = db.vendor_invoice
const po_Details = db.po_details;
const Department = db.department

const { Op, where } = require("sequelize");
const moment = require("moment")
const transport = require("../../../services/nodemailer");
const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "http://localhost:5000/"

////////////////////////create api //////////////////////////

exports.PR_request = async (req, res) => {
    try {
        const { name, department, emp_id, item_id, item_name, item_code, unit, mvp, location, alldata, state, city, pin, delivery_address, priority } = req.body;

        var file = req.files.file == undefined ? "" : file = req.files.file[0].path;

        if (alldata) {
            var all_Data = JSON.parse(alldata)
        } else {
            var all_Data = null
        }
        var results = [];
        const response = await ProcurementDetails.create({
            name,
            department,
            emp_id,
            item_id,
            item_name,
            item_code,
            unit,
            mvp,
            location,
            alldata: all_Data,
            state,
            city,
            pin,
            delivery_address,
            priority,
            file: baseUrl + file
        });
        var allData2 = response.alldata == null ? file : response.alldata
        for (var i = 0; i < allData2.length; i++) {
            var objuser = {
                "name": response.name,
                "department": response.department,
                "emp_id": response.emp_id,
                "product_image": allData2[i].product_image,
                "item_id": allData2[i].item_id,
                "procurement_id": response.procurement_id,
                "item_name": allData2[i].item_name,
                "item_code": allData2[i].item_code,
                "unit": allData2[i].unit,
                "mvp": allData2[i].mvp,
                "location": response.location,
                "state": response.state,
                "city": response.city,
                "pin": response.pin,
                "delivery_address": response.delivery_address,
                "priority": allData2[i].priority,
                "file": response.file,
                "asset_category_id": allData2[i].asset_category_id,
            }
            const employeedata = await Procurement_productDetails.create(objuser);
            results.push(employeedata);
        }
        return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

// exports.PR_request = async (req, res) => {
//     try {
//         const {  alldata} = req.body;

//         // if (req.file) {
//         //     var doc = req.file.path
//         // } else {
//         //     var doc = ""
//         // }

//         let array = [];
//         const response = await ProcurementDetails.create({
//             // item_name, 
//             // item_code, 
//             // unit, 
//             // priority, 
//             // mvp, 
//             // location, 
//             // state, 
//             // city, 
//             // pin, 
//             // delivery_address, 
//             // file: baseUrl + doc,
//             alldata
//         });
//         for (let i = 0; i < alldata.length; i++) {

//             var obj = {
//                 "item_name": alldata[i].item_name,
//                 "item_code": alldata[i].item_code,
//             }
//             const response2 = await Procurement_productDetails.create(obj);
//             array.push(response2);
//         }
//         return res.status(200).send({ code: 200, message: "Created Successfully!", data: array });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     }
// };

/////////////////////////////////// create product //////////////////////////

// exports.product = async (req, res) => {
//     try {
//         const { procurement_id, item_name, item_code, unit, location, mvp, pin, delivery_address } = req.body;

//         var product_image = req.files.product_image == undefined ? "" : product_image = req.files.product_image[0].path;
//         var file = req.files.file == undefined ? "" : file = req.files.file[0].path;

//         const response = await Procurement_productDetails.create({
//             procurement_id,
//             product_image: baseUrl + product_image,
//             item_name,
//             item_code,
//             unit,
//             location,
//             mvp,
//             pin,
//             file: baseUrl + file,
//             delivery_address
//         });
//         return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     }
// };

///////////////////////////// edit PR Request API ////////////////////
exports.editPR_request = async (req, res) => {
    try {
        const pr_id = req.params.id;
        const { name, department, emp_id, item_name, item_code, unit, mvp, location, state, city, pin, delivery_address, priority } = req.body;

        var prImage = req.files.file == undefined ? "" : prImage = req.files.file[0].path;

        const getdata = await Procurement_productDetails.findOne({ where: { procurement_product_id: pr_id } })
        var prImage = prImage == '' ? prImage = getdata.file : file = baseUrl + prImage;

        if (getdata) {
            const editData = await Procurement_productDetails.update({
                name,
                department,
                emp_id,
                item_name,
                item_code,
                unit,
                mvp,
                location,
                state,
                city,
                pin,
                delivery_address,
                priority,
                file: prImage
            }, { where: { procurement_product_id: pr_id } })
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: editData });

        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////// Get All Product List //////////////////////
exports.getAll_Product = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Procust Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById PR ///////////////

exports.get_ById_PR = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const getData = await Procurement_productDetails.findOne({
            where: { procurement_product_id: procurement_product_id },
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////////////// delete product ///////////////////////////////////////
exports.delete_product = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const editData = await ProcurementDetails.findOne({ where: { procurement_product_id: procurement_product_id } })
        if (editData) {
            const updateData = await ProcurementDetails.update(req.body, { where: { procurement_product_id: procurement_product_id } });
            return res.status(200).send({ code: 200, message: "Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

////////////// level of Approved api ///////////////////////////////
exports.create_Approved = async (req, res) => {
    try {
        const { approver_name, approvel_level } = req.body;

        const response = await Approved_levelDetails.create({
            approver_name,
            approvel_level
        });
        return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////////////// get Approvel level list //////////////////////////
exports.getAll_Approvel_level = async (req, res) => {
    try {
        const getAllData = await Approved_levelDetails.findAll({ where: { status: "ACTIVE" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Approvel ///////////////

exports.get_ById_Approver = async (req, res) => {
    try {
        const approved_level_id = req.params.id;
        const getData = await Approved_levelDetails.findOne({
            where: { approved_level_id: approved_level_id },
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Approver data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
/////////////////////// Status Update /////////////////////
exports.update_status = async (req, res) => {
    try {
        const procurement_product_id = req.params.id
        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });

        if (getData) {
            const updateData = await Procurement_productDetails.update(req.body, { where: { procurement_product_id: procurement_product_id } });
            return res.status(200).send({ code: 200, message: "Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////// Status Update Approvel level /////////////////////
exports.update_approvel_status = async (req, res) => {
    try {
        const approved_level_id = req.params.id
        const getData = await Approved_levelDetails.findOne({ where: { approved_level_id: approved_level_id } });

        if (getData) {
            const updateData = await Approved_levelDetails.update(req.body, { where: { approved_level_id: approved_level_id } });
            return res.status(200).send({ code: 200, message: "Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
/////////////////////////////////////// RFP API ////////////////////////////////////////////////
//////////////////// get All Approved PR /////////////////////////////
exports.getAll_Approved_pr = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", approvel_status: "APPROVED" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAll_Approved_pr_getBy_id = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const getAllData = await Procurement_productDetails.findOne({ where: { status: "ACTIVE", approvel_status: "APPROVED", procurement_product_id: procurement_product_id } });
        let allData = await vendor_product_Details.findOne({ where: { procurement_product_id: procurement_product_id, checked: true } });
        let vendor_id = allData.vendors;
        let vendorData = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_id } });
        let vendor_name = vendorData.vendor_name;
        let newData = {
            ...getAllData.dataValues,
            ...allData.dataValues,
            vendor_name
        }
        if (getAllData) {

            // obj = {
            //     "procurement_product_id" :getAllData.procurement_product_id,
            //     "vendor_product_details_id" : allData.vendor_product_details_id
            // }

            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: newData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getAll_vendor_pr = async (req, res) => {
    try {
        const pro_id = req.params.id;
        const getAllData = await vendor_product_Details.findAll({ where: { procurement_product_id: pro_id } });
        let array = [];
        for (let i = 0; i < getAllData.length; i++) {
            const vendor_id = getAllData[i].vendors;
            const get_vendor_name = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_id } });

            let obj = {
                "vendor_product_details_id": getAllData[i].vendor_product_details_id,
                "procurement_product_id": getAllData[i].procurement_product_id,
                "product_image": getAllData[i].product_image,
                "item_name": getAllData[i].item_name,
                "item_code": getAllData[i].item_code,
                "unit": getAllData[i].unit,
                "priority": getAllData[i].priority,
                "mvp": getAllData[i].mvp,
                "location": getAllData[i].location,
                "state": getAllData[i].state,
                "city": getAllData[i].city,
                "pin": getAllData[i].pin,
                "delivery_address": getAllData[i].delivery_address,
                "file": getAllData[i].file,
                "remarks": getAllData[i].remarks,
                "name": getAllData[i].name,
                "department": getAllData[i].department,
                "emp_id": getAllData[i].emp_id,
                "approvel_status": getAllData[i].approvel_status,
                "status": getAllData[i].status,
                "end_date": getAllData[i].end_date,
                "vendors": getAllData[i].vendors,
                "rfp_status": getAllData[i].rfp_status,
                "price_amt": getAllData[i].price_amt,
                "sgst": getAllData[i].sgst,
                "cgst": getAllData[i].cgst,
                "igst": getAllData[i].igst,
                "delivery_charges": getAllData[i].delivery_charges,
                "additional_charges": getAllData[i].additional_charges,
                "currency": getAllData[i].currency,
                "vendor_remarks": getAllData[i].vendor_remarks,
                "vendor_uploaded_document": getAllData[i].vendor_uploaded_document,
                "remarks_approvel": getAllData[i].remarks_approvel,
                "approvel_vendor": getAllData[i].approvel_vendor,
                "final_remarks": getAllData[i].final_remarks,
                "checked": getAllData[i].checked,
                "is_disabled": getAllData[i].is_disabled,
                "vendor_name": get_vendor_name.vendor_name
            }
            array.push(obj);
        }

        let newData1 = [];
        let newData = array.sort(
            (p1, p2) =>
                (p1.mvp > p2.mvp) ? 1 : (p1.mvp < p2.mvp) ? -1 : 0);

        for (let i = 0; i < newData.length; i++) {
            if (newData[i].price_amt !== null) {
                newData1.push(newData[i])
            }
        }
        if (newData1.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: newData1 });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

//////////////////// get All Rejected PR /////////////////////////////

exports.getAll_Rejected_pr = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", approvel_status: "REJECTED" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

//////////////////// get All To be Approved PR /////////////////////////////

exports.getAll_to_be_approve_pr = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", approvel_status: "TO BE APPROVED" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////////////// get by id approved PR //////////////////////////////////
exports.getBy_id = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////// Send RFP Link ////////////////////////////////////////
exports.sendRFP = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const { vendors, end_date, vendors_invited_count } = req.body;

        if (vendors) {
            var all_Data = JSON.parse(vendors)
        } else {
            var all_Data = null
        }

        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } })

        if (getData) {
            const updateData = await Procurement_productDetails.update(
                {
                    vendors: all_Data,
                    end_date,
                    vendors_invited_count
                },

                { where: { procurement_product_id: procurement_product_id } });

            const get_vendor = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });

            // let array = [];
            // let array1 = [];
            // let array2 = [];

            for (let i = 0; i < get_vendor.vendors.length; i++) {
                const element = get_vendor.vendors[i];
                const get_vendorData = await vendorManagementDetails.findOne({ where: { vendor_management_id: element } });

                let linkDat = req.body.site_url.slice(0, -1)
                let linkDat1 = req.body.site_url


                let info = await transport.mailsend({
                    from: process.env.EMAIL_FROM,
                    to: get_vendorData.email,
                    subject: "link for request for perposal",
                    html:
                        `<p><strong> Hi ${get_vendorData.vendor_name}</strong> <br> <p style=" padding: 3%; background-image: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');"> 
                    Thanks for getting started with DQS India! Simply click the button below to link for request for perposal ${get_vendorData.email} <a href = ${linkDat + get_vendorData.vendor_management_id}
                    <button class="btn" style="padding: 6px 8px; border-radius: 7px;cursor: pointer; border-color: blue; color: white; background-color:blue;" > Click Me </button>`,
                });
            }

            // let info = await transport.mailsend({
            //     from: process.env.EMAIL_FROM,
            //     to: array,
            //     cc: "",
            //     bcc: "",
            //     subject: "",
            //     html:
            //     `<p><strong> Hi ${array2}</strong> <br> <p style=" padding: 3%; background-image: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');"> 
            //     Thanks for getting started with DQS India! Simply click the button below to link for request for perposal ${array} <a href = ${req.body.site_url}
            //     <button class="btn" style="padding: 6px 8px; border-radius: 7px;cursor: pointer; border-color: blue; color: white; background-color:blue;" > Click Me </button>`,
            // });

            const update_RFP_Status = await Procurement_productDetails.update({
                rfp_status: "LIVE RFP"
            }, { where: { procurement_product_id: procurement_product_id } })

            const getAll_data = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });

            for (let j = 0; j < all_Data.length; j++) {
                obj = {
                    "procurement_product_id": getAll_data.procurement_product_id,
                    "product_image": getAll_data.product_image,
                    "item_name": getAll_data.item_name,
                    "item_code": getAll_data.item_code,
                    "unit": getAll_data.unit,
                    "priority": getAll_data.priority,
                    "mvp": getAll_data.mvp,
                    "location": getAll_data.location,
                    "state": getAll_data.state,
                    "city": getAll_data.city,
                    "pin": getAll_data.pin,
                    "delivery_address": getAll_data.delivery_address,
                    "file": getAll_data.file,
                    "remarks": getAll_data.remarks,
                    "name": getAll_data.name,
                    "department": getAll_data.department,
                    "emp_id": getAll_data.emp_id,
                    "approvel_status": getAll_data.approvel_status,
                    "status": getAll_data.status,
                    "end_date": getAll_data.end_date,
                    "vendors": getAll_data.vendors[j],
                    "rfp_status": getAll_data.rfp_status,
                }
                const vendorData = await vendor_product_Details.create(obj);

            }
            const vendorData = await vendor_product_Details.findAll({where:{procurement_product_id: procurement_product_id}})
            for (let k = 0; k < vendorData.length; k++) {
                if (vendorData[k].vendors == true) {
                    await vendor_product_Details.update({
                        updateValue: false
                    },{where:{procurement_product_id:procurement_product_id}})
                }
                
            }

            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////////////////////// update vendor qutation data //////////////////

exports.update_vendorData = async (req, res) => {
    try {
        const vendors = req.params.id;
        const pr_id = req.body.pr_id;

        const { price_amt, delivery_charges, additional_charges, currency, vendor_remarks } = req.body;

        var vendor_uploaded = req.files.vendor_uploaded_document == undefined ? "" : vendor_uploaded = req.files.vendor_uploaded_document[0].path;

        const getData = await vendor_product_Details.findOne({ where: { vendors: vendors } });
        var vendor_uploaded = vendor_uploaded == '' ? vendor_uploaded = getData.vendor_uploaded_document : vendor_uploaded_document = baseUrl + vendor_uploaded;

        var igstData = req.body.igst == 'NaN' ? null : req.body.igst
        var sgstData = req.body.sgst == 'NaN' ? null : req.body.sgst
        var cgstData = req.body.cgst == 'NaN' ? null : req.body.cgst


        const allData = await vendor_product_Details.findAll()
        const lastData = allData[allData.length - 1]; // Get the last element
        await vendor_product_Details.update({ updateValue: true},{where:{vendor_product_details_id: lastData.vendor_product_details_id}})

        if (getData) {
            const updateData = await vendor_product_Details.update({
                price_amt,
                sgst: sgstData,
                cgst: cgstData,
                igst: igstData,
                delivery_charges,
                additional_charges,
                currency,
                vendor_remarks,
                vendor_uploaded_document: vendor_uploaded
            }, { where: { vendor_product_details_id: lastData.vendor_product_details_id } });

            const newData = await vendor_product_Details.findAll({ where: { procurement_product_id: pr_id } });

            let vendor_responded_count = 0;
            for (let i = 0; i < newData.length; i++) {
                const sgst = newData[i].sgst;

                if (sgst != null) {
                    vendor_responded_count += 1;
                    await Procurement_productDetails.update({
                        vendors_responded_count: vendor_responded_count
                    }, { where: { procurement_product_id: pr_id } })

                }

            }
           

            return res.status(200).send({ code: 200, message: "UPdate Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


////////////////////////////// get All live rfp ///////////////////////////

exports.GetAll_liveRFP = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", rfp_status: "LIVE RFP" } });

        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Get Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

////////////////////////////// get All Close rfp ///////////////////////////

exports.GetAll_CloseRFP = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE" } });
        const getAllData1 = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", rfp_status: "CLOSE RFP" } });
        let current_Date = moment(new Date()).format("YYYY-MM-DD");

        for (let i = 0; i < getAllData.length; i++) {
            const procurement_product_id = getAllData[i].procurement_product_id;
            const end_Date = getAllData[i].end_date;

            if (end_Date < current_Date) {
                await Procurement_productDetails.update({
                    rfp_status: "CLOSE RFP"
                }, { where: { procurement_product_id: procurement_product_id } })
            }
        }

        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Get Successfully", data: getAllData1 });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

//////////////////////// update RFP end date status /////////////////////////////

exports.update_endDate = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        let end_date = req.body.end_date;
        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });
        if (getData) {
            const updateData = await Procurement_productDetails.update({
                end_date: end_date
            }, { where: { procurement_product_id: procurement_product_id } });

            return res.status(200).send({ code: 200, message: "UPdate Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

//////////////////////// Delete live RFP /////////////////////////////

exports.delete_live_rfp = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });
        if (getData) {
            const updateData = await Procurement_productDetails.update(req.body, { where: { procurement_product_id: procurement_product_id } });

            return res.status(200).send({ code: 200, message: "Delete Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

//////////////////////// approvel api quotation /////////////////////////////

exports.quotation_approvel = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const { remarks_approvel, approvel_vendor } = req.body;
        const getData = await vendor_product_Details.findOne({ where: { procurement_product_id: procurement_product_id } });
        if (getData) {
            const updateData = await vendor_product_Details.update({
                remarks_approvel,
                approvel_vendor
            }, { where: { procurement_product_id: procurement_product_id } });

            return res.status(200).send({ code: 200, message: "UPdate Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

////////////////////////////// get All Approved Vendor ///////////////////////////

exports.GetAll_Approved_vendor = async (req, res) => {
    try {
        const getAllData = await vendor_product_Details.findAll({ where: { approvel_vendor: "APPROVED" } });

        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Get Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////// get All Approved Cost ///////////////////////////

exports.GetAll_Approved_Cost = async (req, res) => {
    try {
        const getAllData = await vendor_product_Details.findAll({ where: { approvel_vendor: "APPROVED COST" } });
        let array = [];
        if (getAllData) {
            for (let i = 0; i < getAllData.length; i++) {
                const vendor_id = getAllData[i].vendors;
                const get_vendor_name = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_id } });

                obj = {
                    "vendor_product_details_id": getAllData[i].vendor_product_details_id,
                    "procurement_product_id": getAllData[i].procurement_product_id,
                    "product_image": getAllData[i].product_image,
                    "item_name": getAllData[i].item_name,
                    "item_code": getAllData[i].item_code,
                    "unit": getAllData[i].unit,
                    "priority": getAllData[i].priority,
                    "mvp": getAllData[i].mvp,
                    "location": getAllData[i].location,
                    "state": getAllData[i].state,
                    "city": getAllData[i].city,
                    "pin": getAllData[i].pin,
                    "delivery_address": getAllData[i].delivery_address,
                    "file": getAllData[i].file,
                    "remarks": getAllData[i].remarks,
                    "name": getAllData[i].name,
                    "department": getAllData[i].department,
                    "emp_id": getAllData[i].emp_id,
                    "approvel_status": getAllData[i].approvel_status,
                    "status": getAllData[i].status,
                    "end_date": getAllData[i].end_date,
                    "vendors": getAllData[i].vendors,
                    "rfp_status": getAllData[i].rfp_status,
                    "price_amt": getAllData[i].price_amt,
                    "sgst": getAllData[i].sgst,
                    "cgst": getAllData[i].cgst,
                    "igst": getAllData[i].igst,
                    "delivery_charges": getAllData[i].delivery_charges,
                    "additional_charges": getAllData[i].additional_charges,
                    "currency": getAllData[i].currency,
                    "vendor_remarks": getAllData[i].vendor_remarks,
                    "vendor_uploaded_document": getAllData[i].vendor_uploaded_document,
                    "remarks_approvel": getAllData[i].remarks_approvel,
                    "approvel_vendor": getAllData[i].approvel_vendor,
                    "final_remarks": getAllData[i].final_remarks,
                    "checked": getAllData[i].checked,
                    "is_disabled": getAllData[i].is_disabled,
                    "vendor_name": get_vendor_name.vendor_name,
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Get Successfully", data: array });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////// get All Approved Cost ///////////////////////////

exports.GetAll_rejected = async (req, res) => {
    try {
        const getAllData = await vendor_product_Details.findAll({ where: { approvel_vendor: "REJECTED" } });
        let array = [];
        if (getAllData) {
            for (let i = 0; i < getAllData.length; i++) {
                const vendor_id = getAllData[i].vendors;
                const get_vendor_name = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_id } });

                obj = {
                    "vendor_product_details_id": getAllData[i].vendor_product_details_id,
                    "procurement_product_id": getAllData[i].procurement_product_id,
                    "product_image": getAllData[i].product_image,
                    "item_name": getAllData[i].item_name,
                    "item_code": getAllData[i].item_code,
                    "unit": getAllData[i].unit,
                    "priority": getAllData[i].priority,
                    "mvp": getAllData[i].mvp,
                    "location": getAllData[i].location,
                    "state": getAllData[i].state,
                    "city": getAllData[i].city,
                    "pin": getAllData[i].pin,
                    "delivery_address": getAllData[i].delivery_address,
                    "file": getAllData[i].file,
                    "remarks": getAllData[i].remarks,
                    "name": getAllData[i].name,
                    "department": getAllData[i].department,
                    "emp_id": getAllData[i].emp_id,
                    "approvel_status": getAllData[i].approvel_status,
                    "status": getAllData[i].status,
                    "end_date": getAllData[i].end_date,
                    "vendors": getAllData[i].vendors,
                    "rfp_status": getAllData[i].rfp_status,
                    "price_amt": getAllData[i].price_amt,
                    "sgst": getAllData[i].sgst,
                    "cgst": getAllData[i].cgst,
                    "igst": getAllData[i].igst,
                    "delivery_charges": getAllData[i].delivery_charges,
                    "additional_charges": getAllData[i].additional_charges,
                    "currency": getAllData[i].currency,
                    "vendor_remarks": getAllData[i].vendor_remarks,
                    "vendor_uploaded_document": getAllData[i].vendor_uploaded_document,
                    "remarks_approvel": getAllData[i].remarks_approvel,
                    "approvel_vendor": getAllData[i].approvel_vendor,
                    "final_remarks": getAllData[i].final_remarks,
                    "checked": getAllData[i].checked,
                    "is_disabled": getAllData[i].is_disabled,
                    "vendor_name": get_vendor_name.vendor_name,
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Get Successfully", data: array });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

//////////////////////// approvel Cost api /////////////////////////////

exports.approvel_cost_rejected = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const { final_remarks, approvel_vendor, vendor_product_details_id } = req.body;

        if (req.body.vendor_product_details_id) {

            const getData = await vendor_product_Details.findOne({ where: { vendor_product_details_id: vendor_product_details_id } });
            if (getData) {
                const updateData = await vendor_product_Details.update({
                    final_remarks,
                    approvel_vendor
                }, { where: { vendor_product_details_id: vendor_product_details_id } });

                return res.status(200).send({ code: 200, message: "UPdate Successfully", data: updateData });
            } else {
                return res.status(403).send({ code: 403, message: "Record Not Found" });
            }
        } else {
            const updateData = await vendor_product_Details.update({
                final_remarks,
                approvel_vendor
            }, { where: { procurement_product_id: procurement_product_id } });
            return res.status(200).send({ code: 200, message: "UPdate Successfully", data: updateData });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
exports.GetData_vendor_id = async (req, res) => {
    try {
        const vendor_id = req.params.id
        const getAllData = await vendor_product_Details.findAll({ where: { vendor_product_details_id: vendor_id } });

        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Get Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

//////////////////////////////////// checked value true //////////////////////
exports.checked_value_ture = async (req, res) => {
    try {
        const vendor_product_details_id = req.params.id;
        const procurement_product_id = req.body.procurement_product_id;

        const getData = await vendor_product_Details.findOne({ where: { vendor_product_details_id: vendor_product_details_id } });
        if (getData) {
            const updateData = await vendor_product_Details.update(req.body, { where: { vendor_product_details_id: vendor_product_details_id } });
            const getData1 = await vendor_product_Details.findAll({ where: { procurement_product_id: procurement_product_id } });

            if (req.body.checked == true) {
                for (let j = 0; j < getData1.length; j++) {
                    if (getData1[j].checked == false) {
                        await vendor_product_Details.update({
                            is_disabled: true
                        }, { where: { procurement_product_id: procurement_product_id } })
                    }
                }

                for (let i = 0; i < getData1.length; i++) {
                    if (getData1[i].checked == true) {
                        await vendor_product_Details.update({
                            is_disabled: false
                        }, { where: { vendor_product_details_id: vendor_product_details_id } })
                    }
                }
            } else {
                await vendor_product_Details.update({
                    checked: false,
                    is_disabled: false
                }, { where: { procurement_product_id: procurement_product_id } })
            }

            return res.status(200).send({ code: 200, message: "Update Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////////// update Draft po status /////////////////////////////////
exports.updateDraft_po_status = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });

        if (getData) {
            updateData = await Procurement_productDetails.update(req.body, { where: { procurement_product_id: procurement_product_id } });
            return res.status(200).send({ code: 200, message: "Update Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////////////////////// get all draft po //////////////////////////////////////
exports.getAll_draft_po = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", po_status: "DRAFT PO" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
/////////////////////////////// get all issued po //////////////////////////////////////
exports.getAll_issued_po = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", po_status: "ISSUED PO" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



exports.getAll_issued = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE" } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



exports.po_issued_details = async (req, res) => {
    try {
        const getAllData = await Procurement_productDetails.findAll({ where: { status: "ACTIVE", statusVendor: "vendorInvoice"  } });
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////////////////////// get by id all issued po //////////////////////////////////////
exports.getBy_idAll_issued_po = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const getAllData = await Procurement_productDetails.findOne({ where: { status: "ACTIVE", po_status: "ISSUED PO", procurement_product_id: procurement_product_id } });
        const getData = await po_Details.findOne({ where: { procurement_product_id: procurement_product_id } });
        let allData = await vendor_product_Details.findOne({ where: { procurement_product_id: procurement_product_id, checked: true } });
        let vendor_id = allData.vendors;

        let vendorData = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_id } });
        let vendor_name = vendorData.vendor_name;
        const newdata = { ...getAllData, ...allData, ...getData, vendor_name };
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All PR Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////////////////////// po issued /////////////////////////////////
exports.po_issued = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const { po_date, raised_by, total, grand_total } = req.body;
        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });

        if (getData) {
            updateData = await Procurement_productDetails.update(req.body, { where: { procurement_product_id: procurement_product_id } });
            createData = await po_Details.create({ po_date, raised_by, procurement_product_id, total, grand_total })
            return res.status(200).send({ code: 200, message: "Update Successfully", data: createData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////////// submit  /////////////////////////////////
exports.invoice_status_update = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const { invoice_date, invoice_remarks, po_status } = req.body;

        var invoice_file = req.file.invoice_file == undefined ? "" : invoice_file = req.file.invoice_file[0].path;

        function getNuber(min = 1000, max = 500000) {
            min = Math.ceil(min);
            max = Math.floor(max);
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            return num;
        }

        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });

        var invoice_file = invoice_file == '' ? invoice_file = getData.invoice_file : invoice_file = baseUrl + invoice_file;

        if (getData) {
            updateData = await Procurement_productDetails.update({
                invoice_n_o: getNuber(),
                invoice_date,
                invoice_remarks,
                po_status,
                invoice_file: invoice_file
            }, { where: { procurement_product_id: procurement_product_id } });
            return res.status(200).send({ code: 200, message: "Update Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
///////////////////////////////// get all GRN api ///////////////////////////////////
exports.getAll_GRN = async (req, res) => {
    try {
        const getAllData1 = await Procurement_productDetails.findAll({ where: { po_status: "PAID" } });
        return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getAllData1 });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

///////////////////////////////// get By id all GRN api ///////////////////////////////////
exports.getBy_id_GRN = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        let getAllData1 = await Procurement_productDetails.findOne({ where: { po_status: "PAID", procurement_product_id: procurement_product_id } });
        let getAll_Data2 = await vendor_product_Details.findOne({ where: { procurement_product_id: procurement_product_id } })
        let getAll_Data4 = await po_Details.findOne({ where: { procurement_product_id: procurement_product_id } })
        let allData = await vendor_product_Details.findOne({ where: { procurement_product_id: procurement_product_id, checked: true } })

        let vendor_id = allData.vendors
        let vendor_data = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_id } })
        let vendor_name = vendor_data.vendor_name

        if (getAllData1 && getAll_Data2 && getAll_Data4) {
            let ans_data = { ...getAllData1.dataValues, ...getAll_Data2.dataValues, ...getAll_Data4.dataValues, vendor_name }
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: ans_data });
        }
        else {
            return res.status(404).send({ code: 404, message: "No procurement_product_id Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error--" });
    };
};

///////////////////////////////// submit grn  /////////////////////////////////
exports.update_grn = async (req, res) => {
    try {
        const procurement_product_id = req.params.id;
        const { grn_date, grn_item_n_o, grn_location } = req.body;
        var grn_file = req.file.grn_file == undefined ? "" : grn_file = req.file.grn_file[0].path;

        const getData = await Procurement_productDetails.findOne({ where: { procurement_product_id: procurement_product_id } });

        if (getData) {
            updateData = await Procurement_productDetails.update({
                grn_date,
                grn_item_n_o,
                grn_location,
                grn_file: baseUrl + grn_file
            }, { where: { procurement_product_id: procurement_product_id } });
            return res.status(200).send({ code: 200, message: "Update Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

//////////////////////////// Budget approvel api for RBH ///////////////
exports.budget_approvel = async (req, res) => {
    try {
        const department_name = req.params.department_name;
        const GetData = await Department.findOne({ where: { department_name: department_name } });

        if (GetData) {
            updateData = await Department.update(req.body, { where: { department_name: department_name } });
            return res.status(200).send({ code: 200, message: "Update Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }


    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

///////////////////////////////// get all budget ///////////////////////////////////
exports.getAll_budget = async (req, res) => {
    try {
        const getAllData1 = await Department.findAll();
        return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getAllData1 });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.inventory_Data = async (req, res) => {
    try {
        const getData = await Procurement_productDetails.findAll();

        // Filter out records where grn_item_n_o is not null
        const filteredData = getData.filter(item => item.grn_item_n_o !== null);

        // Create an object to hold aggregated data by item_code
        const aggregatedData = {};
        var itemDetails

        // Iterate through filteredData and aggregate grn_item_n_o values by item_code
        filteredData.map(item => {
            if (aggregatedData[item.item_code]) {
                aggregatedData[item.item_code] += item.grn_item_n_o;
                itemDetails = item
            } else {
                aggregatedData[item.item_code] = item.grn_item_n_o;
                itemDetails = item
            }
        });
        // Convert the aggregatedData object into an array of objects
        const aggregatedArray = Object.keys(aggregatedData).map(item_code => ({
            item_code,
            total_grn_item_n_o: aggregatedData[item_code],
            ...itemDetails.dataValues

        }));
        return res.status(200).send({ code: 200, message: "Fetch data and aggregate successfully", data: aggregatedArray });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.getVendor_replyData = async (req, res) => {
    try {
        const All_id = req.params.id;
        const splitData = All_id.split(",");
        const procurement_product_id = splitData[0];
        const vendors = splitData[1];

        const getAllData = await vendor_product_Details.findAll({ where: { procurement_product_id: procurement_product_id, vendors: vendors } });

        if (getAllData.length > 0) {
            const lastData = getAllData[getAllData.length - 2]; // Get the last element
            return res.status(200).send({ code: 200, message: "Fetch data and aggregate successfully", data: lastData });
        } else {
            return res.status(200).send({ code: 200, message: "Record Not Found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
