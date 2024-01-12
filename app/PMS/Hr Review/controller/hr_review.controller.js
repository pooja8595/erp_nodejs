const db = require("../../../models/index");

const hr_reviewDetails = db.hr_review
const Op = db.Sequelize.Op;
const previous_goalDetails = db.previous_goal
const new_goalDetails = db.new_goal
const self_appraisalDetails = db.self_appraisal
const manager_reviewDetails = db.manager_review
const head_reviewDetails = db.head_review
/////////////// Create hr_review ///////////////

exports.create_hr_review = async (req, res) => {
    try {
        const { first_name , designation, department, employee_id ,} = req.body;
        const data = await hr_reviewDetails.findOne({where: {hr_review_name: hr_review_name}})
        if(data){
            return res.status(400).send({code: 400, message:"hr_review_name is Already Exits!"})
        } else{
        const response = await hr_reviewDetails.create({
            first_name,
            designation,
            department,
            employee_id,
            
        
        });
        return res.status(200).send({ code: 200, message: "hr_review Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit hr_review ///////////////

exports.edit_hr_review = async (req, res) => {
    try {
        const hr_reviewId = req.params.id;
        const { first_name , designation, department, employee_id , manager_rating_id, head_rating_id,hr_rating_id, status, isChecked,review_status,comment } = req.body;
        const editData = await hr_reviewDetails.findOne({ where: { hr_review_id: hr_reviewId } });
        if (editData) {
        //     let review_status;
        //    let statusdata= rating_id? review_status ="Reviewed" : "Pending"
            const updateData = await hr_reviewDetails.update({
                first_name,
                designation,
                department,
                employee_id,
                manager_rating_id,
                head_rating_id,
                hr_rating_id,
                status,
                isChecked,
                review_status,
                comment
            },
                { where: { hr_review_id: hr_reviewId } });


            return res.status(200).send({ code: 200, message: "hr_review Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById hr_review ///////////////

exports.getAll_Pending_hr_review = async (req, res) => {
    try {
        const getAllData = await hr_reviewDetails.findAll({where: { review_status: "Pending" , status: "ACTIVE" },})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All hr_review Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAll_Reviewed_hr_review = async (req, res) => {
    try {
        const getAllData = await hr_reviewDetails.findAll({where: { review_status: "Reviewed" , status: "ACTIVE" },})
        if (getAllData) {


            return res.status(200).send({ code: 200, message: "Fetch All hr_review Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Get ById hr_review ///////////////

exports.get_ById_hr_review = async (req, res) => {
    try {
        const hr_reviewId = req.params.id;
        const getData = await hr_reviewDetails.findOne({ where: { hr_review_id: hr_reviewId ,status: "ACTIVE"}});
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

/////////////// Delete hr_review ///////////////

exports.delete_hr_review = async (req, res) => {
    try {
        const hr_reviewId = req.params.id;
        const getData = await hr_reviewDetails.findOne({ where: { hr_review_id: hr_reviewId } });
        if (getData) {
            const updated = await hr_reviewDetails.update({ status: "INACTIVE" }, { where: { hr_review_id: hr_reviewId } });
            return res.status(200).send({ code: 200, message: "hr_review Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAll_hr_review = async (req, res) => {
    try {
        const getAllData = await hr_reviewDetails.findAll({where: { status: "ACTIVE" },})
        if (getAllData) {


            return res.status(200).send({ code: 200, message: "Fetch All hr_review Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_ByempId_hr_review = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getData1 = await self_appraisalDetails.findOne({ where: { employee_id: employeeId ,status: "ACTIVE"},attributes: [ ['review_status', 'emp_review_status']]});
        const getData2 = await manager_reviewDetails.findOne({ where: { employee_id: employeeId ,status: "ACTIVE"},attributes: [ ['review_status', 'manager_review_status']]});
        const getData3 = await head_reviewDetails.findOne({ where: { employee_id: employeeId ,status: "ACTIVE"},attributes: [ ['review_status', 'head_review_status']]});
        if (getData1 || getData2 || getData3) {
            return res.status(200).send({ code: 200, message: "Fetch Get ByempId all status Successfully", getData1,getData2,getData3 });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.calculate_rating_hr = async (req, res) => {
    try {
      const employeeId = req.params.id;
  
      // Fetch the data from the two tables based on the employee_id
      const valuesA = await manager_reviewDetails.findAll({
        where: { employee_id: employeeId },
        attributes: ['rating_id'],
    });

    // Extract the 'rating_id' values from the fetched data
    const managerRatingsA = valuesA.map((entry) => entry.rating_id);

    // Calculate the sum of managerRatingsA
    const summedValueA = managerRatingsA.reduce((sum, rating) => sum + rating, 0);

    // Calculate the percentage for each rating_id
    const percentageValuesA = managerRatingsA.map((rating) => (rating / summedValueA) * 100);

    // Calculate the total percentage out of 100
    const overallPercentageA = (summedValueA / (managerRatingsA.length * 100)) * 100;

    // Map overallPercentageA to the corresponding value based on the defined ranges
    let mappedValueA;
    if (overallPercentageA <= 20) {
      mappedValueA = 20;
    } else if (overallPercentageA <= 40) {
      mappedValueA = 40;
    } else if (overallPercentageA <= 60) {
      mappedValueA = 60;
    } else if (overallPercentageA <= 80) {
      mappedValueA = 80;
    } else {
      mappedValueA = 100;
    }

      // ==========================================================================================================
  
      const valuesB = await head_reviewDetails.findAll({
        where: { employee_id: employeeId },
        attributes: ['head_rating_id'],
      });
  
      // Extract the 'head_rating_id' values from the fetched data
      const headRatingsB = valuesB.map((entry) => entry.head_rating_id);
  
      // Calculate the sum of headRatingsB
      const summedValueB = headRatingsB.reduce((sum, rating) => sum + rating, 0);
  
      // Calculate the percentage for each head_rating_id
      const percentageValuesB = headRatingsB.map((rating) => (rating / summedValueB) * 100);
  
      // Calculate the total percentage out of 100
      const overallPercentageB = (summedValueB / (headRatingsB.length * 100)) * 100;
  
      // Map overallPercentageB to the corresponding value based on the defined ranges
      let mappedValueB;
      if (overallPercentageB <= 20) {
        mappedValueB = 20;
      } else if (overallPercentageB <= 40) {
        mappedValueB = 40;
      } else if (overallPercentageB <= 60) {
        mappedValueB = 60;
      } else if (overallPercentageB <= 80) {
        mappedValueB = 80;
      } else {
        mappedValueB = 100;
      }
  

      // ==========================================================================================================
  
      // Calculate the sum of all mappedValue variables
      const mappedValueSum = ((mappedValueA + mappedValueB  ) / 200 * 100);
  
      let mappedValueALL;
      if (mappedValueSum <= 20) {
        mappedValueALL = 20;
      } else if (mappedValueSum <= 40) {
        mappedValueALL = 40;
      } else if (mappedValueSum <= 60) {
        mappedValueALL = 60;
      } else if (mappedValueSum <= 80) {
        mappedValueALL = 80;
      } else {
        mappedValueALL = 100;
      }
  
     const updated = await self_appraisalDetails.update({ final_hr_rating: mappedValueALL }, { where: { employee_id: employeeId } });
      return res.status(200).json({ code: 200, message: "Percentage values calculated successfully", data: { percentagesA: percentageValuesA, totalPercentageA: overallPercentageA, mappedValueA, percentagesB: percentageValuesB, totalPercentageB: overallPercentageB, mappedValueB,  mappedValueSum ,mappedValueALL , updated} });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: "Server Error" });
    }
  };