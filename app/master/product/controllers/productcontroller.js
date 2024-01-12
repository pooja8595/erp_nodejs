const db = require("../../../models/index");
const productDetails = db.product_master;

exports.create_product = async (req, res) => {
    try {
        const { product_name, uom_id, variant_name, product_description, mvp, price_per_unit, average_production_cost, product_specification ,maximum_discount } = req.body;
        const product_code = btoa(Math.random()).slice(0, 10).toUpperCase();
        const plant = await productDetails.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { product_name, },
                    { variant_name }
                ]
            }
        });
        if (plant) {
            return res.status(403).send({ code: 403, message: "product Details  Already Exists" })
        } else if (!plant) {
            const response = await productDetails.create({
                product_name, uom_id, variant_name,product_code, product_description, mvp, price_per_unit, average_production_cost, product_specification,maximum_discount
            });
            return res.status(200).send({ code: 200, message: "product Details Created Successfully!",data: response});
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

exports.getAllproduct = async (req, res) => {
    try {
        const { id } = req.params;
        let getAllData;
        if (id) {
            getAllData = await productDetails.findOne({
                where: { id: id , isDeleted: false},
                include: [
                    {
                        model: db.uomdetails,
                        attributes: ["uom_name"],
                    }
                ]
            });
            return res.status(200).send({
                code: 200,
                message: `Get product Details Data  Successfully`,
                data: getAllData,
            });
        } else {
            getAllData = await productDetails.findAll({  where: { isDeleted: false },
                include: [
                    {
                        model: db.uomdetails,
                        attributes: ["uom_name"],
                    }
                ]
            });
            return res.status(200).send({
                code: 200,
                message: "Get all product Deatils Data Successfully",
                data: getAllData,
            });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({
            code: 500,
            message: error.message || "Internal Server Error",
        });
    }
};


exports.update_product = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const getAllData = await productDetails.findOne({ where: { id: id } });
            if (getAllData) {
                if (Object.keys(req.body).length > 0) {
                    const {
                        product_name,
                        uom_id,
                        variant_name,
                        product_description,
                        mvp,
                        price_per_unit,
                        average_production_cost,
                        product_specification,
                        maximum_discount
                    } = req.body;
                    await productDetails.update({
                        product_name,
                        uom_id,
                        variant_name,
                        product_description,
                        mvp,
                        price_per_unit,
                        average_production_cost,
                        product_specification,
                        maximum_discount
                    }, {
                        where: { id: id, status: "ACTIVE" }
                    });
                    return res.status(200).send({
                        code: 200,
                        message: "Product details updated successfully!",
                    });
                } else {
                    return res.status(400).send({
                        code: 400,
                        message: "No data provided for update.",
                    });
                }
            } else {
                return res.status(404).send({
                    code: 404,
                    message: "Product not found with the provided id",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            code: 500,
            message: error.message || "Server Error",
        });
    }
};
 
exports.delete_product = async (req, res) => {
    try {
        const id = req.params.id
        const getAllData = await productDetails.findOne({ where: { id: id  } });
        if (getAllData) {
            await productDetails.update({ isDeleted: true}, { where: { id: id } });
            return res.status(200).send({ code: 200, message: "product Details is Deleted Successfully!" });
        } else {
            return res.status(404).send({ code: 403, message: "id not found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};
exports.productStatus = async (req, res) => {
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
        const getData = await productDetails.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
        });
        if (getData) {
            await productDetails.update(
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
                message: "Product Status Change Successfully!",
            });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};
