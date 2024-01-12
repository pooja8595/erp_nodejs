const db = require("../../../models/index");

exports.createServies = async (req, res) => {
    try {
        const {
        service_category_name, service_category_description
        } = req.body;
        const service_category_code = btoa(Math.random()).slice(0, 10).toUpperCase();
        const user = await db.ServicesCategory.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { service_category_name },
                    { service_category_code }
                ]
            }
        });
        if (user) {
            return res.status(403).send({ code: 403, message: "Services  Already Exists" })
        } else if (!user) {
            const response = await db.ServicesCategory.create({
                service_category_code,
                service_category_name,
                service_category_description,
            });
            return res.status(200).send({ code: 200, message: "Services Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    };
};

exports.serviesgetallcategroy = async (req, res) => {
    try {
        const getAllData = await db.ServicesCategory.findAll({where: {  isDeleted: false}});
        return res.status(200).send({ code: 200, message: "Get All Service Category Successfully", data: getAllData });
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }

}
exports.serviesgetallcategroy_id = async (req, res) => {
    try {
        const serives_id = req.params.id;
        const getData = await db.ServicesCategory.findOne({ where: { id: serives_id ,isDeleted: false} });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Got Data Succssesfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.update_servies = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const {  service_category_name, service_category_description } = req.body;
            const service_category_code = btoa(Math.random()).slice(0, 10).toUpperCase();
            const getAllData = await db.ServicesCategory.findOne({ where: { id: id } });
            if (getAllData) {
                await db.ServicesCategory.update({
                    service_category_code, service_category_name, service_category_description
                },
                    {
                        where: { id: id }
                    });
                return res.status(200).send({
                    code: 200, message: "Service  update Successfully!",
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
exports.delete_servies = async (req, res) => {
    try {
        const id = req.params.id
        const getAllData = await db.ServicesCategory.findOne({ where: { id: id } });
        if (getAllData) {
            await db.ServicesCategory.update({ isDeleted: true }, { where: { id: id } });
            return res.status(200).send({ code: 200, message: "Asset is Deleted Successfully!" });
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};
exports.serviesStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        // Check if status property exists in the request body
        if (status === undefined) {
            return res.status(400).send({
                code: 400,
                message: "Bad Request: 'status' property is missing in the request body",
            });
        }

        console.log(status);
        const getData = await db.ServicesCategory.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
        });
        if (getData) {
            await db.ServicesCategory.update(
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
                message: "Services Category Status Change Successfully!",
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};