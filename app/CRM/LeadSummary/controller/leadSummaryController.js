const db = require("../../../models/index");

module.exports.getLeadSummaryData = async (req, res) => {
  try {
    const { user_id,from_date,to_date,status } = req.query;

    let condition = 'WHERE 1=1';

    if (user_id) {
      condition += ` AND C.user_id = ${user_id}`;
    }

    if (from_date && to_date) {
      condition += ` AND C.createdAt BETWEEN '${from_date} 00:00:00' AND '${to_date} 23:59:59'`;
    }

    if (status) {
      condition += ` AND JSON_UNQUOTE(JSON_EXTRACT(C.dynamic_fields, '$.status')) = '${status}'`;
    }
    const data = await db.sequelize.query(
    `SELECT C.id, C.lead_owner, C.contact_person_name, C.contact_number, 
    P.product_name, CONCAT_WS(' ', R.first_name, R.middle_name, R.last_name) AS full_name,
    JSON_UNQUOTE(JSON_EXTRACT(C.dynamic_fields, '$.status')) AS status,
    DATE_FORMAT(C.createdAt, '%Y-%m-%d') AS createdAt
    FROM CRM_CREATE_LEAD_MST AS C
    INNER JOIN SYS_PRODUCT_NAME_MST AS P ON P.id = C.product_id 
    LEFT JOIN registered_users AS R ON R.employee_id = C.user_id
     ${condition} ORDER BY C.id DESC`);

    if (data.length > 0) {
        return res.status(200).send({ code: 200, message: "Get Data Successfully", data: data[0] });
    }else {
            return res.status(404).send({ code: 404, message: "No Data Found " });
    }
    } catch (error) {
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

module.exports.getLeadStatusData = async (req,res) => {
    try {
        const getAllStatusData = await db.models.fieldValue.findAll({attributes:['id','field_value'],
        order: [['id', 'DESC']]});
        if(getAllStatusData.length > 0) {
            return res.status(200).send({ code: 200, message: "Get Data Successfully", data: getAllStatusData });
        }else{
            return res.status(404).send({ code: 404, message: "No Data Found " }); 
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: " server error" });
    }
}

module.exports.createLeadSummary = async (req, res) => {
  try {
    const { assign_id, leadList } = req.body;

    if (!Array.isArray(leadList)) {
      return res.status(400).send({ code: 400, message: "Invalid request format. Expected an array of leads in the 'leadList' property." });
    }
    const dataExist = await db.user.findOne({where:{employee_id:assign_id}});
    if (!dataExist) {
      return res.status(404).send({ code: 404, message: "No Data Found for assign_id " });
    }
    const createLeadIds = leadList.map((lead) => lead.create_lead_id);
    const dataExists = await db.models.createLead.findAll({ where: { id: createLeadIds } });
    if (dataExists.length !== createLeadIds.length) {
      const existingIds = dataExists.map((lead) => lead.id);
      const missingIds = createLeadIds.filter((id) => !existingIds.includes(id));
      return res.status(404).send({ code: 404, message: "No Data Found for create_lead_ids: " + missingIds.join(', ') });
    }

    const results = [];
    for (const lead of leadList) {
      const { create_lead_id } = lead;
      const [ created] = await db.models.leadSummary.findOrCreate({
        where: { create_lead_id, assign_id },
        defaults: {
          create_lead_id: create_lead_id,
          assign_id: assign_id
        }
      });

      if (!created) {
        results.push({ success: false, message: "Lead Summary already exists for create_lead_id: " + create_lead_id + " and assign_id: " + assign_id });
      } else {
        results.push({ success: true, message: "Lead Summary created successfully" });
      }
    }
    const successResults = results.filter((result) => result.success);
    if (successResults.length > 0) {
      return res.status(201).send({ code: 201, message: "Created Successfully" });
    } else {
      return res.status(500).send({ code: 500, message: "Failed to create leads" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: 'Server error' });
  }
};