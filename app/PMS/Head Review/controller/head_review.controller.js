const db = require("../../../models/index");

const manager_reviewDetails = db.manager_review
const head_reviewDetails = db.head_review
const Op = db.Sequelize.Op;
const previous_goalDetails = db.previous_goal
const new_goalDetails = db.new_goal
const self_appraisalDetails = db.self_appraisal
const hr_reviewDetails = db.hr_review
/////////////// Create head_review ///////////////

exports.create_head_review = async (req, res) => {
    try {
        const { first_name , designation, department, employee_id ,} = req.body;
        const data = await head_reviewDetails.findOne({where: {head_review_name: head_review_name}})
        if(data){
            return res.status(400).send({code: 400, message:"head_review_name is Already Exits!"})
        } else{
        const response = await head_reviewDetails.create({
            first_name,
            designation,
            department,
            employee_id,
            
        
        });
        return res.status(200).send({ code: 200, message: "head_review Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit head_review ///////////////

exports.edit_head_review = async (req, res) => {
    try {
        const head_reviewId = req.params.id;
        const { first_name , designation, department, employee_id , rating_id, head_rating_id, status, isChecked,review_status,comment,start_date, end_date, } = req.body;
        const editData = await head_reviewDetails.findOne({ where: { head_review_id: head_reviewId } });
        if (editData) {
        //     let review_status;
        //    let statusdata= rating_id? review_status ="Reviewed" : "Pending"
            const updateData = await head_reviewDetails.update({
                first_name,
                designation,
                department,
                employee_id,
                rating_id,
                head_rating_id,
                status,
                isChecked,
                review_status,
                comment,
                start_date, end_date,
            },
                { where: { head_review_id: head_reviewId } });


            return res.status(200).send({ code: 200, message: "head_review Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById head_review ///////////////

exports.getAll_Pending_head_review = async (req, res) => {
    try {
        const getAllData = await head_reviewDetails.findAll({where: { review_status: "Pending" , status: "ACTIVE" },})
        if (getAllData) {
          var array = [];
          for (var i = 0; i < getAllData.length; i++) {   
       
             var manager_reviewName = getAllData[i].employee_id;
             const managerReview = await manager_reviewDetails.findOne({where:{employee_id:manager_reviewName}})
             var commentData = managerReview.comment


              var obj = {
                "head_review_id":getAllData[i].head_review_id,
                "first_name":getAllData[i].first_name,
                "designation":getAllData[i].designation,
                "department":getAllData[i].department,
                "employee_id":getAllData[i].employee_id,
                "rating_id":getAllData[i].rating_id,
                "head_rating_id":getAllData[i].head_rating_id,
                "comment":getAllData[i].comment,
                "start_date":getAllData[i].start_date,
                "end_date":getAllData[i].end_date,
                "isChecked":getAllData[i].isChecked,
                "review_status":getAllData[i].review_status,
                "status":getAllData[i].status,
                "manager_comment":commentData,
              }
              array.push(obj);
          }
          return res.status(200).send({ code: 200, message: "Fetch All Pending_head_review Data Successfully", data: array });
      } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAll_Reviewed_head_review = async (req, res) => {
    try {
        const getAllData = await head_reviewDetails.findAll({where: { review_status: "Reviewed" , status: "ACTIVE" },})
        if (getAllData) {
          var array = [];
          for (var i = 0; i < getAllData.length; i++) {   
       
             var manager_reviewName = getAllData[i].employee_id;
             const managerReview = await manager_reviewDetails.findOne({where:{employee_id:manager_reviewName}})
             var commentData = managerReview.comment


              var obj = {
                "head_review_id":getAllData[i].head_review_id,
                "first_name":getAllData[i].first_name,
                "designation":getAllData[i].designation,
                "department":getAllData[i].department,
                "employee_id":getAllData[i].employee_id,
                "rating_id":getAllData[i].rating_id,
                "head_rating_id":getAllData[i].head_rating_id,
                "comment":getAllData[i].comment,
                "start_date":getAllData[i].start_date,
                "end_date":getAllData[i].end_date,
                "isChecked":getAllData[i].isChecked,
                "review_status":getAllData[i].review_status,
                "status":getAllData[i].status,
                "manager_comment":commentData,
              }
              array.push(obj);
          }
          return res.status(200).send({ code: 200, message: "Fetch All Reviewed_head_review Data Successfully", data: array });
      } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Get ById head_review ///////////////

exports.get_ById_head_review = async (req, res) => {
    try {
        const head_reviewId = req.params.id;
        const getData = await head_reviewDetails.findOne({ where: { head_review_id: head_reviewId ,status: "ACTIVE"}});
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

/////////////// Delete head_review ///////////////

exports.delete_head_review = async (req, res) => {
    try {
        const head_reviewId = req.params.id;
        const getData = await head_reviewDetails.findOne({ where: { head_review_id: head_reviewId } });
        if (getData) {
            const updated = await head_reviewDetails.update({ status: "INACTIVE" }, { where: { head_review_id: head_reviewId } });
            return res.status(200).send({ code: 200, message: "head_review Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.calculate_rating_head = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Fetch the data from the three tables based on the employee_id
    const valuesA = await self_appraisalDetails.findAll({
      where: { employee_id: employeeId },
      attributes: ['head_rating'],
    });

    // Extract the 'head_rating' values from the fetched data
    const headRatingsA = valuesA.map((entry) => entry.head_rating);

    // Calculate the sum of headRatingsA
    const summedValueA = headRatingsA.reduce((sum, rating) => sum + rating, 0);

    // Calculate the percentage for each head_rating
    const percentageValuesA = headRatingsA.map((rating) => (rating / summedValueA) * 100);

    // Calculate the total percentage out of 100
    const overallPercentageA = (summedValueA / (headRatingsA.length * 100)) * 100;

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
      attributes: ['head_rating'],
    });

    // Extract the 'head_rating' values from the fetched data
    const headRatingsB = valuesB.map((entry) => entry.head_rating);

    // Calculate the sum of headRatingsB
    const summedValueB = headRatingsB.reduce((sum, rating) => sum + rating, 0);

    // Calculate the percentage for each head_rating
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

    const valuesC = await previous_goalDetails.findAll({
      where: { employee_id: employeeId },
      attributes: ['head_rating'],
    });

    // Extract the 'head_rating' values from the fetched data
    const headRatingsC = valuesC.map((entry) => entry.head_rating);

    // Calculate the sum of headRatingsC
    const summedValueC = headRatingsC.reduce((sum, rating) => sum + rating, 0);

    // Calculate the percentage for each head_rating
    const percentageValuesC = headRatingsC.map((rating) => (rating / summedValueC) * 100);

    // Calculate the total percentage out of 100
    const overallPercentageC = (summedValueC / (headRatingsC.length * 100)) * 100;

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

   const updated = await head_reviewDetails.update({ head_rating_id: mappedValueALL }, { where: { employee_id: employeeId } });
    return res.status(200).json({ code: 200, message: "Percentage values calculated successfully", data: { percentagesA: percentageValuesA, totalPercentageA: overallPercentageA, mappedValueA, percentagesB: percentageValuesB, totalPercentageB: overallPercentageB, mappedValueB, percentagesC: percentageValuesC, totalPercentageC: overallPercentageC, mappedValueC, mappedValueSum ,mappedValueALL , updated} });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
};

exports.editbyEMP_ID_head_review = async (req, res) => {
  try {
      const employeeId = req.params.id;
      const { first_name , designation, department, rating_id, head_rating_id, status, isChecked,review_status,comment , start_date, end_date,} = req.body;
      const editData = await head_reviewDetails.findOne({ where: { employee_id: employeeId } });
      if (editData) {
      //     let review_status;
      //    let statusdata= rating_id? review_status ="Reviewed" : "Pending"
          const updateData = await head_reviewDetails.update({
              first_name,
              designation,
              department,
              rating_id,
              head_rating_id,
              status,
              isChecked,
              review_status,
              comment,
              start_date, end_date,
          },
              { where: { employee_id: employeeId } });


          return res.status(200).send({ code: 200, message: "head_review Updated SuccessFully", data: updateData });
      } else {
          return res.status(404).send({ code: 404, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
}; 

exports.getAll_head_review = async (req, res) => {
  try {
      const getAllData = await head_reviewDetails.findAll({where: {status: "ACTIVE" },})
      if (getAllData) {
        const dataToInsert = [];

        for (const item of getAllData) {
            const {first_name,
              designation,
              department,
              start_date, end_date,
              employee_id,
              rating_id,
              head_rating_id,} = item;

// =====================================================================

const valuesA = await manager_reviewDetails.findAll({
  where: { employee_id: employee_id },
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
  where: { employee_id: employee_id },
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


// ==========================================================================
                    const data = await hr_reviewDetails.findOne({where: {employee_id: employee_id}})
        if(data){
            return res.status(200).send({ code: 200, message: "Fetch Get ById manager_review Successfully and not created hr_review", data: getAllData });
        }else{

            dataToInsert.push({
              first_name,
              designation,
              department,
              start_date, end_date,
              employee_id,
              manager_rating_id:rating_id,
              head_rating_id,
              hr_rating_id: mappedValueALL
            });
        }
        }
        // Insert the data into head_reviewDetails using bulkCreate method
        const createdData = await hr_reviewDetails.bulkCreate(dataToInsert);
        
          return res.status(200).send({ code: 200, message: "Fetch All manager_review Data Successfully and created hr_review", data: getAllData });
      } else {
          return res.status(404).send({ code: 404, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};

exports.getbyid_emp_comment = async (req, res) => {
  try {
    const employeeId = req.params.id;
      const getAllData = await head_reviewDetails.findAll({where: { employee_id: employeeId , status: "ACTIVE" },})
      if (getAllData) {
        var array = [];
        for (var i = 0; i < getAllData.length; i++) {   
     
           var manager_reviewName = getAllData[i].employee_id;
           const managerReview = await manager_reviewDetails.findOne({where:{employee_id:manager_reviewName}})
           var commentData = managerReview.comment


            var obj = {
              "head_review_id":getAllData[i].head_review_id,
              "first_name":getAllData[i].first_name,
              "designation":getAllData[i].designation,
              "department":getAllData[i].department,
              "employee_id":getAllData[i].employee_id,
              "rating_id":getAllData[i].rating_id,
              "head_rating_id":getAllData[i].head_rating_id,
              "funtional_comment":getAllData[i].comment,
              "start_date":getAllData[i].start_date,
              "end_date":getAllData[i].end_date,
              "isChecked":getAllData[i].isChecked,
              "review_status":getAllData[i].review_status,
              "status":getAllData[i].status,
              "manager_comment":commentData,
            }
            array.push(obj);
        }
        return res.status(200).send({ code: 200, message: "Fetch All Reviewed_head_review Data Successfully", data: array });
    } else {
          return res.status(404).send({ code: 404, message: "Record Not Found" });
      };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ code: 500, message: "Server Error" });
  };
};