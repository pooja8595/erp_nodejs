const db = require("../../../models/index");

const self_appraisalDetails = db.self_appraisal
const Op = db.Sequelize.Op;
const userDetails = db.user;
const manager_reviewDetails = db.manager_review
const ratingDetails = db.rating;
/////////////// Create self_appraisal ///////////////

exports.create_self_appraisal = async (req, res) => {
    try {
        const { kpi, description , start_date, end_date, employee_id, rating_id, } = req.body;
        const data = await self_appraisalDetails.findOne({where: {kpi: kpi}})
        if(data){
            return res.status(400).send({code: 400, message:"kpi is Already Exits!"})
        } else{
        const response = await self_appraisalDetails.create({
            kpi,
            description,
            start_date, end_date,
            employee_id,
            rating_id,
        
        });
        return res.status(200).send({ code: 200, message: "self_appraisal Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit self_appraisal ///////////////

exports.edit_self_appraisal = async (req, res) => {
    try {
        const self_appraisalId = req.params.id;
        const { kpi, description , start_date, end_date, employee_id, rating_id, manager_rating, head_rating, status, isChecked , review_status} = req.body;
        const editData = await self_appraisalDetails.findOne({ where: { self_appraisal_id: self_appraisalId } });
        if (editData) {
                      let review_status;
         let statusdata= rating_id? review_status ="Reviewed" : "Pending"
            const updateData = await self_appraisalDetails.update({
                kpi,
                description,
                start_date, end_date,
                employee_id,
                rating_id,
                manager_rating,
                status,
                isChecked,
                head_rating,
                review_status:statusdata
            },
                { where: { self_appraisal_id: self_appraisalId } });

            return res.status(200).send({ code: 200, message: "self_appraisal Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById self_appraisal ///////////////

exports.getAll_self_appraisal = async (req, res) => {
    try {
        const getAllData = await self_appraisalDetails.findAll({where: { status: "ACTIVE" },
        include: [
            {    
                model: userDetails,
                attributes: ['employee_id','first_name','last_name', 'region','designation','department'],
                where: {},
            },
            {
                model : ratingDetails,
                attributes:['rating_id','rating_value'],
                where: {},
            }
        ]
    });
        if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {          

                var firstName = getAllData[i].registered_user.first_name;
                var lastName = getAllData[i].registered_user.last_name;
                var regionName = getAllData[i].registered_user.region;
                var designationName = getAllData[i].registered_user.designation;
                var departmentName = getAllData[i].registered_user.department;
                var ratingName = getAllData[i].rating.rating_value;

                var obj = {
                    "self_appraisal_id": getAllData[i].self_appraisal_id,
                    "kpi": getAllData[i].kpi,
                    "description": getAllData[i].description,
                    "start_date": getAllData[i].start_date, 
                    "end_date": getAllData[i].end_date,
                    "rating_id": getAllData[i].rating_id,
                    "rating_value": ratingName,
                    "manager_rating":getAllData[i].manager_rating,
                    "head_rating":getAllData[i].head_rating,
                    "final_hr_rating":getAllData[i].final_hr_rating,
                    "employee_id": getAllData[i].employee_id,
                    "first_name": firstName,
                    "last_name": lastName,
                    "region": regionName,
                    "designation": designationName,
                    "department": departmentName,
                    "status": getAllData[i].status,
                    "isChecked":getAllData[i].isChecked,
                    "createdAt":getAllData[i].createdAt,
                    "updatedAt": getAllData[i].updatedAt,
                }
                array.push(obj);
            }

            return res.status(200).send({ code: 200, message: "Fetch All self_appraisal Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById self_appraisal ///////////////

exports.get_ById_self_appraisal = async (req, res) => {
    try {
        const self_appraisalId = req.params.id;
        const getAllData = await self_appraisalDetails.findAll({ where: { self_appraisal_id: self_appraisalId  , status: "ACTIVE"},
        include: [
            {    
                model: userDetails,
                attributes: ['employee_id','first_name','last_name', 'region','designation','department'],
                where: {},
            },
            {
                model : ratingDetails,
                attributes:['rating_id','rating_value'],
                where: {},
            }
        ]
    });
        if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {          

                var firstName = getAllData[i].registered_user.first_name;
                var lastName = getAllData[i].registered_user.last_name;
                var regionName = getAllData[i].registered_user.region;
                var designationName = getAllData[i].registered_user.designation;
                var departmentName = getAllData[i].registered_user.department;
                var ratingName = getAllData[i].rating.rating_value;

                var obj = {
                    "self_appraisal_id": getAllData[i].self_appraisal_id,
                    "kpi": getAllData[i].kpi,
                    "description": getAllData[i].description,
                    "start_date": getAllData[i].start_date, 
                    "end_date": getAllData[i].end_date,
                    "rating_id": getAllData[i].rating_id,
                    "rating_value": ratingName,
                    "manager_rating":getAllData[i].manager_rating,
                    "head_rating":getAllData[i].head_rating,
                    "final_hr_rating":getAllData[i].final_hr_rating,
                    "employee_id": getAllData[i].employee_id,
                    "first_name": firstName,
                    "last_name": lastName,
                    "region": regionName,
                    "designation": designationName,
                    "department": departmentName,
                    "status": getAllData[i].status,
                    "isChecked":getAllData[i].isChecked,
                    "createdAt":getAllData[i].createdAt,
                    "updatedAt": getAllData[i].updatedAt,
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete self_appraisal ///////////////

exports.delete_self_appraisal = async (req, res) => {
    try {
        const self_appraisalId = req.params.id;
        const getData = await self_appraisalDetails.findOne({ where: { self_appraisal_id: self_appraisalId } });
        if (getData) {
            const updated = await self_appraisalDetails.update({ status: "INACTIVE" }, { where: { self_appraisal_id: self_appraisalId } });
            return res.status(200).send({ code: 200, message: "self_appraisal Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_ByEMPId_self_appraisal = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getAllData = await self_appraisalDetails.findAll({ where: { employee_id: employeeId  ,status: "ACTIVE"},
        include: [
            {    
                model: userDetails,
                attributes: ['employee_id','first_name','last_name', 'region','designation','department'],
                where: {},
            },

        ]
    });
        if (getAllData) {
            let array = [];
            for (var i = 0; i < getAllData.length; i++) {          

                var firstName = getAllData[i].registered_user.first_name;
                var lastName = getAllData[i].registered_user.last_name;
                var regionName = getAllData[i].registered_user.region;
                var designationName = getAllData[i].registered_user.designation;
                var departmentName = getAllData[i].registered_user.department;
                // var ratingName = getAllData[i].rating.rating_value;

                var obj = {
                    "self_appraisal_id": getAllData[i].self_appraisal_id,
                    "kpi": getAllData[i].kpi,
                    "description": getAllData[i].description,
                    "start_date": getAllData[i].start_date, 
                    "end_date": getAllData[i].end_date,
                    "rating_id": getAllData[i].rating_id,
                    // "rating_value": ratingName,
                    "manager_rating":getAllData[i].manager_rating,
                    "head_rating":getAllData[i].head_rating,
                    "final_hr_rating":getAllData[i].final_hr_rating,
                    "employee_id": getAllData[i].employee_id,
                    "first_name": firstName,
                    "last_name": lastName,
                    "region": regionName,
                    "designation": designationName,
                    "department": departmentName,
                    "status": getAllData[i].status,
                    "isChecked":getAllData[i].isChecked,
                    "createdAt":getAllData[i].createdAt,
                    "updatedAt": getAllData[i].updatedAt,
                }
                array.push(obj);
            }
// =======================================================================================================================

       const lastObject = array[array.length - 1]; // Assuming you want to use the last object from the array


        const data = await manager_reviewDetails.findOne({where: {employee_id: employeeId}})
        if(data){
            return res.status(200).send({ code: 200, message: "Fetch Get ById employee_id Successfully and not created manager review", data: array  });
        }else{

       const createdData = await manager_reviewDetails.create({
                first_name: lastObject.first_name,
                designation: lastObject.designation,
                department: lastObject.department,
                employee_id: lastObject.employee_id,
                start_date:lastObject.start_date, 
                end_date:lastObject.end_date,
            });
        
        }
        
// ===========================================================================================================================
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully and created manager review", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


// exports.getAll_self_appraisal_hr = async (req, res) => {
//     try {
//         const getAllData = await self_appraisalDetails.findAll({where: { status: "ACTIVE" },
//         include: [
//             {    
//                 model: userDetails,
//                 attributes: ['employee_id','first_name','last_name', 'region','designation','department'],
//                 where: {},
//             },
//             {
//                 model : ratingDetails,
//                 attributes:['rating_id','rating_value'],
//                 where: {},
//             }
//         ]
//     });
//         if (getAllData) {
//             var array = [];
//             for (var i = 0; i < getAllData.length; i++) {          

//                 var firstName = getAllData[i].registered_user.first_name;
//                 var lastName = getAllData[i].registered_user.last_name;
//                 var regionName = getAllData[i].registered_user.region;
//                 var designationName = getAllData[i].registered_user.designation;
//                 var departmentName = getAllData[i].registered_user.department;
//                 var ratingName = getAllData[i].rating.rating_value;

//                 var obj = {
//                     "self_appraisal_id": getAllData[i].self_appraisal_id,
//                     "kpi": getAllData[i].kpi,
//                     "description": getAllData[i].description,
//                     "start_date": getAllData[i].start_date, 
//                     "end_date": getAllData[i].end_date,
//                     "rating_id": getAllData[i].rating_id,
//                     "rating_value": ratingName,
//                     "manager_rating":getAllData[i].manager_rating,
//                     "head_rating":getAllData[i].head_rating,
//                     "final_hr_rating":getAllData[i].final_hr_rating,
//                     "employee_id": getAllData[i].employee_id,
//                     "first_name": firstName,
//                     "last_name": lastName,
//                     "region": regionName,
//                     "designation": designationName,
//                     "department": departmentName,
//                     "status": getAllData[i].status,
//                     "isChecked":getAllData[i].isChecked,
//                     "createdAt":getAllData[i].createdAt,
//                     "updatedAt": getAllData[i].updatedAt,
//                 }
//                 array.push(obj);
//             }

//             return res.status(200).send({ code: 200, message: "Fetch All self_appraisal Data Successfully", data: array });
//         } else {
//             return res.status(404).send({ code: 404, message: "Record Not Found" });
//         };
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     };
// };

exports.getAll_self_appraisal_hr = async (req, res) => {
    try {
        const getAllData = await self_appraisalDetails.findAll({
            where: { status: "ACTIVE" },
            include: [
                {
                    model: userDetails,
                    attributes: ['employee_id', 'first_name', 'last_name', 'region', 'designation', 'department'],
                    where: {},
                },
                {
                    model: ratingDetails,
                    attributes: ['rating_id', 'rating_value'],
                    where: {},
                }
            ]
        });

        if (getAllData) {
            var array = [];
            var uniqueEmployeeIds = new Set(); // To track unique employee_id values

            for (var i = 0; i < getAllData.length; i++) {
                const selfAppraisal = getAllData[i];
                const employeeId = selfAppraisal.registered_user.employee_id;

                // Check if the employee_id is already processed
                if (!uniqueEmployeeIds.has(employeeId)) {
                    uniqueEmployeeIds.add(employeeId); // Add to the Set

                    var firstName = selfAppraisal.registered_user.first_name;
                    var lastName = selfAppraisal.registered_user.last_name;
                    var regionName = selfAppraisal.registered_user.region;
                    var designationName = selfAppraisal.registered_user.designation;
                    var departmentName = selfAppraisal.registered_user.department;
                    var ratingName = selfAppraisal.rating.rating_value;

                    var obj = {
                        "self_appraisal_id": selfAppraisal.self_appraisal_id,
                        "kpi": selfAppraisal.kpi,
                        "description": selfAppraisal.description,
                        "start_date": selfAppraisal.start_date,
                        "end_date": selfAppraisal.end_date,
                        "rating_id": selfAppraisal.rating_id,
                        "rating_value": ratingName,
                        "manager_rating": selfAppraisal.manager_rating,
                        "head_rating": selfAppraisal.head_rating,
                        "final_hr_rating": selfAppraisal.final_hr_rating,
                        "employee_id": selfAppraisal.employee_id,
                        "first_name": firstName,
                        "last_name": lastName,
                        "region": regionName,
                        "designation": designationName,
                        "department": departmentName,
                        "status": selfAppraisal.status,
                        "isChecked": selfAppraisal.isChecked,
                        "createdAt": selfAppraisal.createdAt,
                        "updatedAt": selfAppraisal.updatedAt,
                    };
                    array.push(obj);
                }
            }

            return res.status(200).send({ code: 200, message: "Fetch All self_appraisal Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
