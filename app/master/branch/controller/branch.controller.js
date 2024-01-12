const db = require("../../../models/index");
const branch = db.tbl_branch;


exports.create_Branch = async (req, res) => {
    try {
        const { branch_name, branch_contact_person_name, branch_contact_no, branch_alt_contact_no, branch_email,
            branch_alt_email, branch_pin_code, branch_address, city_id, country_id, state_id, branch_gstnumber, status
        } = req.body;
        const branch_code = btoa(Math.random()).slice(0, 10).toUpperCase();
        const user = await branch.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { branch_name, },
                    { branch_code }
                ]
            }
        });
        if (user) {
            return res.status(403).send({ code: 403, message: "Branch  Already Exists" })
        } else if (!user) {
            const response = await branch.create({
                branch_name,
                branch_code,
                branch_contact_person_name,
                branch_contact_no,
                branch_alt_contact_no,
                branch_email,
                branch_alt_email,
                branch_pin_code,
                branch_address,
                city_id,
                country_id, 
                state_id, 
                branch_gstnumber, 
                status
            });
            return res.status(200).send({ code: 200, message: "Branch Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

exports.branch_get = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeletedCondition = 'AND T.isDeleted = :isDeleted';
        
        const query = `SELECT T.id, T.branch_name, T.branch_code, T.branch_contact_person_name, T.branch_contact_no,
                    T.branch_alt_contact_no, T.branch_email, T.branch_alt_email, T.branch_pin_code, T.branch_address, T.status,
                    T.branch_gstnumber, T.status, CT.*, S.*, C.*  FROM tbl_branch AS T
                    INNER JOIN countrysses AS CT ON T.country_id = CT.countryss_id
                    INNER JOIN states AS S ON T.state_id = S.states_id
                    JOIN cities AS C ON T.city_id = C.city_id 
                    ${id ? 'WHERE T.id = :id' : ''}
                    ${isDeletedCondition}`;

        const data = await db.sequelize.query(query, { replacements: { id: id, isDeleted: false }, type: db.sequelize.QueryTypes.SELECT });

        if (id) {
            if (data.length > 0) {
                return res.status(200).send({ code: 200, message: "Get Branch Data Successfully", data: data[0] });
            } else {
                return res.status(404).send({ code: 404, message: "No Data found for the provided ID" });
            }
        } else {
            return res.status(200).send({ code: 200, message: "Get All Branch Data Successfully", data: data });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

exports.update_branch = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const { branch_name,
                branch_contact_person_name,
                branch_contact_no,
                branch_alt_contact_no,
                branch_email,
                branch_alt_email,
                branch_pin_code,
                branch_address, city_id, country_id, state_id, branch_gstnumber, status } = req.body;
            const branch_code = btoa(Math.random()).slice(0, 10).toUpperCase();
            const getAllData = await branch.findOne({ where: { id: id } });
            if (getAllData) {
                await branch.update({
                    branch_name,
                    branch_code,
                    branch_contact_person_name,
                    branch_contact_no,
                    branch_alt_contact_no,
                    branch_email,
                    branch_alt_email,
                    branch_pin_code,
                    branch_address, city_id, country_id, state_id, branch_gstnumber, status
                },
                    {
                        where: { id: id }
                    });
                return res.status(200).send({
                    code: 200, message: "Branch update Successfully!",
                    // data: updateData
                });
            } else {
                return res.status(404).send({ code: 403, message: "id not found" });
            };
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    };
};

exports.delete_branch = async (req, res) => {
    try {
        const id = req.params.id
        const getAllData = await branch.findOne({ where: { id: id } });
        if (getAllData) {
            await branch.update({ isDeleted: true }, { where: { id: id } });
            return res.status(200).send({ code: 200, message: "Branch is Deleted Successfully!", });
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};
exports.branchStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;

        if (status === undefined) {
            return res.status(400).send({
                code: 400,
                message: "Bad Request: 'status' property is missing in the request body",
            });
        }

        console.log(status);
        const getData = await branch.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
        });
        if (getData) {
            await branch.update(
                {
                    status,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return res.status(200).send({
                code: 200,
                message: "Branch Status Change Successfully!",
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

