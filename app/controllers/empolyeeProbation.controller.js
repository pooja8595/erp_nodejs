const db = require("../models/index");
const userDetails = db.user;
const op = db.sequelize.op;
const moment =require('moment');
const Math = require("mathjs");

exports.employeeProbationList = async (req, res) => {
    
    try {
        const getAllData = await userDetails.findAll();
        if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {
                var obj = {
                    "employee_id": getAllData[i].employee_id,
                    "first_name": getAllData[i].first_name,
                    "reporting_manager": getAllData[i].reporting_manager,
                    "reporting_manager_id": getAllData[i].reporting_manager_id,
                    "date_of_joining": getAllData[i].date_of_joining,
                    "probation1": getAllData[i].probation1,
                    "probation": getAllData[i].probation,
                }
                let today_date = moment().toDate();
                let date_of_joining = getAllData[i].date_of_joining;
                let probation_Date = moment(getAllData[i].probation1).toDate();
                var new_date = new Date(date_of_joining);
                
                new_date.setMonth(new_date.getMonth() + 6);
                let formattedDateString = new_date.toISOString().slice(0, 10);
                
                let difference = Math.round((today_date - probation_Date) / (1000 * 60 * 60 * 24));
                if(today_date===probation_Date  || difference>=0){
                let confirm_probation=await userDetails.update({probation:"Confirmed"},{where:{employee_id:getAllData[i].employee_id}})
                }
                else{
                    let  confirm_probation=await userDetails.update({probation:"N/A"},{where:{employee_id:getAllData[i].employee_id}})
                }
                array.push(obj)
                array.sort().reverse()
            }
            // const get_all=await getAllData.findAll({
            //     attributes:['employee_id','first_name','reporting_manager','reporting_manager_id','date_of_joining','probation1','probation']})
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: array });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getByIdEmployeeProbation = async (req, res) => {
    try {
        const employeeProbationId = req.params.id;
        const getData = await userDetails.findOne({ where: { employee_id: employeeProbationId } });
        if (getData) {
            var obj = {
                "employee_id": getData.employee_id,
                "first_name": getData.first_name,
                "reporting_manager": getData.reporting_manager,
                "date_of_joining": getData.date_of_joining,
                "probation1": getData.probation1,
                "probation": getData.probation,
            }
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: obj });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.editProbation = async (req, res) => {
    try {
        const employeeProbationId = req.params.id;
        const { probation1 } = req.body;
        const editData = await userDetails.findOne({ where: { employee_id: employeeProbationId } });
        if (editData) {
            const updateData = await userDetails.update(
                {
                    probation1 
                }, { where: { employee_id: employeeProbationId } }
            );
            return res.status(200).send({ code: 200, message: "Employee Probation Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.statusProbation = async (req, res) => {
    try {
        var datetime = new Date();
        var ogdate = datetime.toISOString().slice(0,10)
        const employeeProbationId = parseInt(req.params.id);
        const editData = await userDetails.findOne({ where: { employee_id: employeeProbationId } });
        const curdate = editData.probation1
        if ( curdate <= ogdate ) {
            const updateData = await userDetails.update(
                {
                    probation: "COMPLETED"
                }, { where: { employee_id: employeeProbationId } }
            );
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}


