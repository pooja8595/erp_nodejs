const { typeOf } = require("mathjs");
const db = require("../../../models/index");
const sequelize = require('sequelize');

const initiate_performance_appraisalDetails = db.initiate_performance_appraisal
const Op = db.Sequelize.Op;

/////////////// Create initiate_performance_appraisal ///////////////

// exports.create_initiate_performance_appraisal = async (req, res) => {
//     try {
//         const { duration_type_name, emptype_id, start_date, end_date, new_region_name, department_name, status_date } = req.body;
        
//         let checkExistance = await db.sequelize.query(`
//           SELECT department_name, new_region_name
//           FROM initiate_performance_appraisals
//           WHERE JSON_CONTAINS(new_region_name, ?) AND JSON_CONTAINS(department_name, ?);
//         `, {
//           replacements: [JSON.stringify(new_region_name), JSON.stringify(department_name)],
//           type: db.sequelize.QueryTypes.SELECT
//         });
    
//         if (checkExistance.length > 0) {
//             return res.status(400).send({ code: 400, message: "Data already exists with the same criteria." });
//         }else{
//         // Create a new record

//             const response = await initiate_performance_appraisalDetails.create({
//                 duration_type_name, emptype_id, start_date, end_date, new_region_name, department_name, status_date
//             });
//             return res.status(200).send({ code: 200, message: "initiate_performance_appraisal Created Successfully!", data: response });

//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ code: 500, message: "Server Error" });
//     }
// };

exports.create_initiate_performance_appraisal = async (req, res) => {
    try {
        const { duration_type_name, emptype_id, start_date, end_date, new_region_name, department_name, status_date } = req.body;
        
        // Check for existing records with the same department_name and new_region_name
        let checkExistance = await db.sequelize.query(`
            SELECT department_name, new_region_name
            FROM initiate_performance_appraisals
            WHERE JSON_CONTAINS(new_region_name, ?) AND JSON_CONTAINS(department_name, ?);
        `, {
            replacements: [JSON.stringify(new_region_name), JSON.stringify(department_name)],
            type: db.sequelize.QueryTypes.SELECT
        });
    
        if (checkExistance.length > 0) {
            // Check for overlapping date ranges within the table
            const overlappingRecords = await initiate_performance_appraisalDetails.findOne({
                where: {
                    [Op.or]: [
                        {
                            start_date: {
                                [Op.between]: [start_date, end_date]
                            }
                        },
                        {
                            end_date: {
                                [Op.between]: [start_date, end_date]
                            }
                        }
                    ]
                }
            });

            if (overlappingRecords) {
                return res.status(400).send({ code: 400, message: "Data already exists with overlapping date range." });
            }
        }

        // Create a new record
        const response = await initiate_performance_appraisalDetails.create({
            duration_type_name, emptype_id, start_date, end_date, new_region_name, department_name, status_date
        });
        return res.status(200).send({ code: 200, message: "initiate_performance_appraisal Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


/////////////// Edit initiate_performance_appraisal ///////////////

exports.edit_initiate_performance_appraisal = async (req, res) => {
    try {
        const initiate_performance_appraisalId = req.params.id;
        const { duration_type_name, emptype_id, start_date, end_date, new_region_name, department_name, status_date, status, isChecked } = req.body;

        // =============================================================================================================================================================

        // Check for existing records with the same department_name and new_region_name
        const checkExistance = await db.sequelize.query(`
            SELECT department_name, new_region_name
            FROM initiate_performance_appraisals
            WHERE JSON_CONTAINS(new_region_name, ?) AND JSON_CONTAINS(department_name, ?);
        `, {
            replacements: [JSON.stringify(new_region_name), JSON.stringify(department_name)],
            type: db.sequelize.QueryTypes.SELECT
        });

        if (checkExistance.length > 0) {
            return res.status(400).send({ code: 400, message: "Data already exists with the same criteria." });
        }

        // Check for overlapping date ranges within the table
        const overlappingRecords = await initiate_performance_appraisalDetails.findOne({
            where: {
                [Op.and]: [
                    {
                        initiate_performance_appraisal_id: {
                            [Op.ne]: initiate_performance_appraisalId
                        }
                    },
                    {
                        [Op.or]: [
                            {
                                start_date: {
                                    [Op.between]: [start_date, end_date]
                                }
                            },
                            {
                                end_date: {
                                    [Op.between]: [start_date, end_date]
                                }
                            }
                        ]
                    }
                ]
            }
        });

        if (overlappingRecords) {
            return res.status(400).send({ code: 400, message: "Data already exists with overlapping date range." });
        }

// =================================================================================================================================================================================

        const editData = await initiate_performance_appraisalDetails.findOne({ where: { initiate_performance_appraisal_id: initiate_performance_appraisalId } });
        
        if (editData) {
            const updateData = await initiate_performance_appraisalDetails.update(
                {
                    duration_type_name,
                    emptype_id,
                    start_date,
                    end_date,
                    new_region_name,
                    department_name,
                    status_date,
                    status,
                    isChecked
                },
                { where: { initiate_performance_appraisal_id: initiate_performance_appraisalId } }
            );

            return res.status(200).send({ code: 200, message: "initiate_performance_appraisal Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
    

// /////////////// Get ById initiate_performance_appraisal ///////////////

exports.getAll_initiate_performance_appraisal = async (req, res) => {
    try {
        const getAllData = await initiate_performance_appraisalDetails.findAll({where: { status: "ACTIVE" },})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All initiate_performance_appraisal Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAll_ongoing_initiate_performance_appraisal = async (req, res) => {
    try {
        const currentDate = new Date();
        const getAllData = await initiate_performance_appraisalDetails.findAll({
            where: {
                status: "ACTIVE",
                start_date: {
                    [Op.lte]: currentDate,
                },
                end_date: {
                    [Op.gte]: currentDate,
                },
            },
        });

        for (const data of getAllData) {
            await data.update({ status_date: "Ongoing" });  
        }

        return res.status(200).send({ code: 200, message: "Fetch All initiate_performance_appraisal Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.getAll_completed_initiate_performance_appraisal = async (req, res) => {
    try {

        const currentDate = new Date();
        const getAllData = await initiate_performance_appraisalDetails.findAll({
            where: {
                status: "ACTIVE",

                [Op.or]: [
                    { start_date: { [Op.gt]: currentDate } },
                    { end_date: { [Op.lt]: currentDate } }, 
                ],
            },
        });

        for (const data of getAllData) {
            await data.update({ status_date: "Completed" });
        }

        return res.status(200).send({ code: 200, message: "Fetch All initiate_performance_appraisal Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get ById initiate_performance_appraisal ///////////////

exports.get_ById_initiate_performance_appraisal = async (req, res) => {
    try {
        const initiate_performance_appraisalId = req.params.id;
        const getData = await initiate_performance_appraisalDetails.findOne({ where: { initiate_performance_appraisal_id: initiate_performance_appraisalId , status: "ACTIVE",} });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete initiate_performance_appraisal ///////////////

exports.delete_initiate_performance_appraisal = async (req, res) => {
    try {
        const initiate_performance_appraisalId = req.params.id;
        const getData = await initiate_performance_appraisalDetails.findOne({ where: { initiate_performance_appraisal_id: initiate_performance_appraisalId } });
        if (getData) {
            const updated = await initiate_performance_appraisalDetails.update({ status: "INACTIVE" }, { where: { initiate_performance_appraisal_id: initiate_performance_appraisalId } });
            return res.status(200).send({ code: 200, message: "initiate_performance_appraisal Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};