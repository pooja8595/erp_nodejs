const db = require("../../../models/index");

const manager_reviewDetails = db.manager_review
const Op = db.Sequelize.Op;
const previous_goalDetails = db.previous_goal
const new_goalDetails = db.new_goal
const self_appraisalDetails = db.self_appraisal
const head_reviewDetails = db.head_review
/////////////// Create manager_review ///////////////

exports.create_manager_review = async (req, res) => {
    try {
        const { first_name , designation, department, start_date, end_date, employee_id ,} = req.body;
        const data = await manager_reviewDetails.findOne({where: {manager_review_name: manager_review_name}})
        if(data){
            return res.status(400).send({code: 400, message:"manager_review_name is Already Exits!"})
        } else{
        const response = await manager_reviewDetails.create({
            first_name,
            designation,
            department,
            start_date, end_date,
            employee_id,
            
        
        });
        return res.status(200).send({ code: 200, message: "manager_review Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit manager_review ///////////////

exports.edit_manager_review = async (req, res) => {
    try {
        const manager_reviewId = req.params.id;
        const { first_name , designation, department, employee_id , rating_id, status, isChecked,review_status, comment , start_date, end_date,} = req.body;
        const editData = await manager_reviewDetails.findOne({ where: { manager_review_id: manager_reviewId } });
        if (editData) {
        //     let review_status;
        //    let statusdata= rating_id? review_status ="Reviewed" : "Pending"
            const updateData = await manager_reviewDetails.update({
                first_name,
                designation,
                department,
                employee_id,
                rating_id,
                status,
                isChecked,
                review_status,
                comment,
                start_date, end_date,
            },
                { where: { manager_review_id: manager_reviewId } });


            return res.status(200).send({ code: 200, message: "manager_review Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById manager_review ///////////////

exports.getAll_Pending_manager_review = async (req, res) => {
    try {
        const getAllData = await manager_reviewDetails.findAll({where: { review_status: "Pending" , status: "ACTIVE" },})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All manager_review Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAll_Reviewed_manager_review = async (req, res) => {
    try {
        const getAllData = await manager_reviewDetails.findAll({where: { review_status: "Reviewed" , status: "ACTIVE" },})
        if (getAllData) {

          const dataToInsert = [];

          for (const item of getAllData) {
              const {first_name,
                designation,
                department,
                start_date,
                 end_date,
                employee_id,
                rating_id,} = item;
  
                      const data = await head_reviewDetails.findOne({where: {employee_id: employee_id}})
          if(data){
              return res.status(200).send({ code: 200, message: "Fetch Get ById manager_review Successfully and not created head_review", data: getAllData });
          }else{
  
              dataToInsert.push({
                first_name,
                designation,
                department,
                start_date, 
                end_date,
                employee_id,
                rating_id,
              });
          }
          }
          // Insert the data into head_reviewDetails using bulkCreate method
          const createdData = await head_reviewDetails.bulkCreate(dataToInsert);
          
            return res.status(200).send({ code: 200, message: "Fetch All manager_review Data Successfully and created head_review", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Get ById manager_review ///////////////

exports.get_ById_manager_review = async (req, res) => {
    try {
        const manager_reviewId = req.params.id;
        const getData = await manager_reviewDetails.findOne({ where: { manager_review_id: manager_reviewId ,status: "ACTIVE"}});
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

/////////////// Delete manager_review ///////////////

exports.delete_manager_review = async (req, res) => {
    try {
        const manager_reviewId = req.params.id;
        const getData = await manager_reviewDetails.findOne({ where: { manager_review_id: manager_reviewId } });
        if (getData) {
            const updated = await manager_reviewDetails.update({ status: "INACTIVE" }, { where: { manager_review_id: manager_reviewId } });
            return res.status(200).send({ code: 200, message: "manager_review Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.calculate_rating_manager = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Fetch the data from the three tables based on the employee_id
    const valuesA = await self_appraisalDetails.findAll({
      where: { employee_id: employeeId },
      attributes: ['manager_rating'],
    });

    // Extract the 'manager_rating' values from the fetched data
    const managerRatingsA = valuesA.map((entry) => entry.manager_rating);

    // Calculate the sum of managerRatingsA
    const summedValueA = managerRatingsA.reduce((sum, rating) => sum + rating, 0);

    // Calculate the percentage for each manager_rating
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

    const valuesB = await new_goalDetails.findAll({
      where: { employee_id: employeeId },
      attributes: ['manager_rating'],
    });

    // Extract the 'manager_rating' values from the fetched data
    const managerRatingsB = valuesB.map((entry) => entry.manager_rating);

    // Calculate the sum of managerRatingsB
    const summedValueB = managerRatingsB.reduce((sum, rating) => sum + rating, 0);

    // Calculate the percentage for each manager_rating
    const percentageValuesB = managerRatingsB.map((rating) => (rating / summedValueB) * 100);

    // Calculate the total percentage out of 100
    const overallPercentageB = (summedValueB / (managerRatingsB.length * 100)) * 100;

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

    const valuesC = await previous_goalDetails.findAll({
      where: { employee_id: employeeId },
      attributes: ['manager_rating'],
    });

    // Extract the 'manager_rating' values from the fetched data
    const managerRatingsC = valuesC.map((entry) => entry.manager_rating);

    // Calculate the sum of managerRatingsC
    const summedValueC = managerRatingsC.reduce((sum, rating) => sum + rating, 0);

    // Calculate the percentage for each manager_rating
    const percentageValuesC = managerRatingsC.map((rating) => (rating / summedValueC) * 100);

    // Calculate the total percentage out of 100
    const overallPercentageC = (summedValueC / (managerRatingsC.length * 100)) * 100;

    // Map overallPercentageC to the corresponding value Based on the defined ranges
    let mappedValueC;
    if (overallPercentageC <= 20) {
      mappedValueC = 20;
    } else if (overallPercentageC <= 40) {
      mappedValueC = 40;
    } else if (overallPercentageC <= 60) {
      mappedValueC = 60;
    } else if (overallPercentageC <= 80) {
      mappedValueC = 80;
    } else {
      mappedValueC = 100;
    }

    // ==========================================================================================================

    // Calculate the sum of all mappedValue variables
    const mappedValueSum = ((mappedValueA + mappedValueB + mappedValueC ) / 300 * 100);

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

   const updated = await manager_reviewDetails.update({ rating_id: mappedValueALL }, { where: { employee_id: employeeId } });
    return res.status(200).json({ code: 200, message: "Percentage values calculated successfully", data: { percentagesA: percentageValuesA, totalPercentageA: overallPercentageA, mappedValueA, percentagesB: percentageValuesB, totalPercentageB: overallPercentageB, mappedValueB, percentagesC: percentageValuesC, totalPercentageC: overallPercentageC, mappedValueC, mappedValueSum ,mappedValueALL , updated} });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
};

exports.editbyEMP_ID_manager_review = async (req, res) => {
  try {
      const employeeId = req.params.id;
      const { first_name , designation, department, rating_id, status, isChecked,review_status, comment, start_date, end_date,} = req.body;
      const editData = await manager_reviewDetails.findOne({ where: { employee_id: employeeId } });
      if (editData) {
      //     let review_status;
      //    let statusdata= rating_id? review_status ="Reviewed" : "Pending"
          const updateData = await manager_reviewDetails.update({
              first_name,
              designation,
              department,
              rating_id,
              status,
              isChecked,
              review_status,
              comment,
              start_date, 
              end_date,
          },
              { where: { employee_id: employeeId } });


          return res.status(200).send({ code: 200, message: "manager_review Updated SuccessFully", data: updateData });
      } else {
          return res.status(404).send({ code: 404, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};  