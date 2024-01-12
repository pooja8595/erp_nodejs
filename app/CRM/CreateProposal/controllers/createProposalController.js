const db = require("../../../models/index");



module.exports.getProposalCompanyData= async(req,res,next)=>{
    try {
        const {id}= req.params;
        const companyData = await db.sequelize.query(
            `SELECT C.company_name, R.first_name,R.middle_name,R.last_name,R.mobile_number,R.personal_email
            FROM CRM_CREATE_LEAD_MST AS C
            INNER JOIN registered_users AS R ON R.employee_id=C.user_id
            WHERE C.id=${id}`
        )
        if(companyData){
            return res.status(200).send({code:200,data:companyData[0][0]});
        }else{
            return res.status(404).send({code:400, message:'Data not found'})
        }
    } catch (error) {
        return res.status(500).send({code: 500, massage:'server error'})
    }
}

module.exports.createProposal = async (req, res) => {
    try {
        const { proposal_no, proposal_type, gst_no, create_lead_id, productList } = req.body;

        const leadExists = await db.models.createLead.findOne({where:{id:create_lead_id}});
        if(!leadExists){
            return res.status(404).send({code: 404 , message:'Lead not found '});
        }
        const createdProposal = await db.models.proposalData.create({
            proposal_no, proposal_type, gst_no, create_lead_id
        });

        const createdProductList = await Promise.all(productList.map(async (product) => {
            const { qty, cgst, sgst, igst, uom_id, product_master_id } = product;
            return await db.models.proposalList.create({
                qty, cgst, sgst, igst, uom_id, product_master_id,
                proposal_id: createdProposal.id
            });
        }));

        if (createdProposal && createdProductList) {
            return res.status(201).send({ code: 201, message:"created successfully " });
        } else {
            return res.status(404).send({ code: 404, message: 'Data not found' });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: 'Server error' });
    }
};



