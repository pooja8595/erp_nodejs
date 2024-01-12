const { where } = require("sequelize");
const db = require("../../../models/index");

const key_performance_indicatorDetails = db.key_performance_indicator
const Op = db.Sequelize.Op;
const designation= db.designation;
const userDetails = db.user;
const unitDetails = db.unit;
const targetDetails = db.target;
const initiate_performance_appraisalDetails = db.initiate_performance_appraisal;
const Department= db.department;
const self_appraisalDetails = db.self_appraisal;
/////////////// Create key_performance_indicator ///////////////

exports.create_key_performance_indicator = async (req, res) => {
    try {
        const { designation_id,unit_id,target_id,kpi,weightage,description} = req.body;
        // const data = await key_performance_indicatorDetails.findOne({where: {key_performance_indicator_name: key_performance_indicator_name}})
        // if(data){
        //     return res.status(400).send({code: 400, message:"key_performance_indicator_name is Already Exits!"})
        // } else{
        const response = await key_performance_indicatorDetails.create({
            designation_id,unit_id,target_id,kpi,weightage,description
        
        });
        return res.status(200).send({ code: 200, message: "key_performance_indicator Created Successfully!", data: response });
    // }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit key_performance_indicator ///////////////

exports.edit_key_performance_indicator = async (req, res) => {
    try {
        const key_performance_indicatorId = req.params.id;
        const { designation_id,unit_id,target_id,kpi,weightage,description, status, isChecked } = req.body;
        const editData = await key_performance_indicatorDetails.findOne({ where: { key_performance_indicator_id: key_performance_indicatorId } });
        if (editData) {
            const updateData = await key_performance_indicatorDetails.update({
                designation_id,
                unit_id,
                target_id,
                kpi,
                weightage,
                description,
                status,
                isChecked
            },
                { where: { key_performance_indicator_id: key_performance_indicatorId } });

            return res.status(200).send({ code: 200, message: "key_performance_indicator Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById key_performance_indicator ///////////////

exports.getAll_key_performance_indicator = async (req, res) => {
    try {
        const getAllData = await key_performance_indicatorDetails.findAll({where: { status: "ACTIVE" },})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All key_performance_indicator Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById key_performance_indicator ///////////////

exports.get_ById_key_performance_indicator = async (req, res) => {
    try {
        const key_performance_indicatorId = req.params.id;
        const getAllData = await key_performance_indicatorDetails.findAll({ where: { key_performance_indicator_id: key_performance_indicatorId , status: "ACTIVE" },
            include: [
                {    
                    model: designation,
                    attributes: ['designation_id', 'designation_name'],
                    where: {},
                },
                {
                  model: unitDetails,
                  attributes: ['unit_id', 'unit_name'],
                  where: {},
                },
                {
                  model: targetDetails,
                  attributes: ['target_id', 'target_name'],
                  where: {},
                },
                ]
        });


        if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {          

                var designationName = getAllData[i].designation.designation_name;
                var unitName = getAllData[i].unit.unit_name;
                var targetName = getAllData[i].target.target_name;

                var obj = {
                    "key_performance_indicator_id": getAllData[i].key_performance_indicator_id,
                    "kpi":getAllData[i].kpi,
                    'weightage':getAllData[i].weightage,
                    'designation_id':getAllData[i].designation_id,
                    "designation_name": designationName,
                    'unit_id':getAllData[i].unit_id,
                    "unit_name": unitName,
                    'target_id':getAllData[i].target_id,
                    "target_name": targetName,
                    'description':getAllData[i].description,
                    "status": getAllData[i].status,
                    "isChecked":getAllData[i].isChecked,
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




/////////////// Delete key_performance_indicator ///////////////

exports.delete_key_performance_indicator = async (req, res) => {
    try {
        const key_performance_indicatorId = req.params.id;
        const getData = await key_performance_indicatorDetails.findOne({ where: { key_performance_indicator_id: key_performance_indicatorId } });
        if (getData) {
            const updated = await key_performance_indicatorDetails.update({ status: "INACTIVE" }, { where: { key_performance_indicator_id: key_performance_indicatorId } });
            return res.status(200).send({ code: 200, message: "key_performance_indicator Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getbyid_designation_self_kpi = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const currentDate = new Date();
        var getAllData = await initiate_performance_appraisalDetails.findAll({
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
     
        let arr =[];

        for (let single_data of getAllData){
            for (let i of single_data.department_name){
                arr.push(i)
            }
        }
        const departmentNamesArray = arr;

        let arr1 =[];

        for (let single_data of getAllData){
            for (let i of single_data.new_region_name){
                arr1.push(i)
            }
        }
        const new_regionNamesArray = arr1;

        const userData = await userDetails.findAll({
            where: {
                department: {
                    [Op.in]: departmentNamesArray,
                },
                region: {
                    [Op.in]: new_regionNamesArray,
                },
            },
        });


        const userData1 = await userData.filter((item) => item.employee_id == employeeId);


        if (userData1.length == 0) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

        const userDesignation = userData1[0].designation; 


        const designationData = await designation.findOne({ where: { designation_name: userDesignation , status: "ACTIVE",} });

        if (!designationData) {
            return res.status(404).send({ code: 404, message: "Designation Not Found" });
        }

        const designationId = designationData.designation_id;

        const getData = await key_performance_indicatorDetails.findAll({ where: { designation_id: designationId , status: "ACTIVE",} });

        let checkExistance = await db.sequelize.query(`
            SELECT department_name, new_region_name, initiate_performance_appraisal_id, start_date, end_date
            FROM initiate_performance_appraisals
            WHERE JSON_CONTAINS(new_region_name, ?) AND JSON_CONTAINS(department_name, ?);
        `, {
            replacements: [JSON.stringify(userData1[0].region), JSON.stringify(userData1[0].department)],
            type: db.sequelize.QueryTypes.SELECT
        });

        const updatedData = [];

        for (const item of getData) {
            const { key_performance_indicator_id, kpi, description } = item;

            const existingData = await self_appraisalDetails.findOne({ where: { kpi: kpi } });

            if (existingData) {
                // Update existing record
                await self_appraisalDetails.update(
                    {
                        key_performance_indicator_id,
                        kpi,
                        description,
                        start_date: checkExistance[0].start_date,    // start_date
                        end_date: checkExistance[0].end_date,        //enddate 
                        initiate_performance_appraisal_id: checkExistance[0].initiate_performance_appraisal_id,     //initiate_performance_appraisal_id
                    },
                    { where: { kpi: kpi } }
                );
                updatedData.push(existingData);
            } else {
                // Insert new record
                const newData = {
                    employee_id: employeeId,
                    key_performance_indicator_id,
                    kpi,
                    description,
                    start_date: checkExistance[0].start_date,    // start_date
                    end_date: checkExistance[0].end_date,        //enddate 
                    initiate_performance_appraisal_id: checkExistance[0].initiate_performance_appraisal_id,     //initiate_performance_appraisal_id
                };
                updatedData.push(newData);
            }
        }

        // ... (rest of the code)

        // Bulk update all the records
        const updatePromises = updatedData.map(async (item) => {
            await self_appraisalDetails.update(
                {
                    key_performance_indicator_id: item.key_performance_indicator_id,
                    kpi: item.kpi,
                    description: item.description,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    initiate_performance_appraisal_id: item.initiate_performance_appraisal_id,
                },
                { where: { kpi: item.kpi } }
            );
        });

        await Promise.all(updatePromises);

        // Bulk insert new records
        await self_appraisalDetails.bulkCreate(updatedData);

        // ... (rest of the code)
        await self_appraisalDetails.destroy({ where: { kpi: null } });

        return res.status(200).send({ code: 200, message: "Fetch Get ById KPI Successfully and Created/Updated self Appraisal", data: updatedData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};