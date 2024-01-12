const db = require("../../../models/index");
const Sequelize = require('sequelize');
const itemSpecificationModel = require('../model/itemSpecificationModel');
const itemSpecifications = db.itemSpecification;
const ItemMasters = db.ItemMaster;
const asset = db.asset
const tbl_uom = db.uomdetails

//============= Create Item ==============//

exports.createItem = async (req, res) => {
    try {
        const {
            asset_id, item_name, MVP, uom_id, Bar_QR_Code, description, threshold_stock
        } = req.body;
        const allItemSpecification = req.body.itemSpecification;
        let main_specification = JSON.parse(allItemSpecification);
        
        const item_code = btoa(Math.random()).slice(0, 10).toUpperCase();
        let image = "";
        if (req.file && req.file['filename'] && req.file['filename'].length > 0) {
            image = req.file.path;
        } else {
            image = "";
        }
        const Item = await ItemMasters.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { item_name, },
                    { item_code }
                ]
            }
        })
        if (Item) {
            return res.status(403).send({ code: 403, message: "Item  Already Exists" })
        } else if (!Item) {
            const item_image = image.replace(/\\/g, '/');
            const createData = await ItemMasters.create({
                item_name, asset_id, item_code, MVP, uom_id, Bar_QR_Code, threshold_stock,
                description, item_document: item_image
            })
            let response;
            if (createData) {
                for (let i = 0; i < main_specification.length; i++) {
                    response = await itemSpecifications.create({
                        item_id: createData.id,
                        specificationType: main_specification[i].specificationType,
                        specificationDetails: main_specification[i].specificationDetails
                    });
                }
            }
            return res.status(200).json({
                code: 200, message: "Item Created Successfully",
                data: { ...createData, ItemSpecification: response },
            })
        }
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" })
    }
}

exports.getAllItem = async (req, res) => {
    try {
        serviceData = await ItemMasters.findAll({
            where: {
                isDeleted: false
            },
            include: [
                {
                    model: asset,
                },
                {
                    model: tbl_uom,
                },
                {
                    model: itemSpecifications,
                    where: { isDeleted: false }
                }
            ],
            order: [['id', 'DESC']],
        });
        if (serviceData) {
            return res.status(200).send({ code: 200, message: "Get All Item data successfully", data: serviceData });
        } else {
            return res.status(404).send({ code: 404, message: "No Item found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
}

exports.getItemById = async (req, res) => {
    try {
        const item_id = req.params.id;
        serviceData = await ItemMasters.findOne({
            where: {
                id: item_id,
                status: "Active",
                isDeleted: false
            },
            include: [
                {
                    model: asset,
                },
                {
                    model: tbl_uom,
                },
                {
                    model: itemSpecifications,
                    where: { isDeleted: false }
                }
            ],
        });
        if (serviceData) {
            return res.status(200).send({ code: 200, message: "Get Item data successfully", data: serviceData });
        } else {
            return res.status(404).send({ code: 404, message: "No Item found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
}

exports.updateItemMaster = async(req , res) =>{
    try {
        const Item_id = req.params.id
        const {
            asset_id, item_name, MVP, uom_id, Bar_QR_Code, description, threshold_stock
        } = req.body;

        const getAllData = await ItemMasters.findOne({
            include:[
                {
                    model:itemSpecifications
                }
            ],
            where: { id: Item_id } 
        });
        const allItemSpecification = req.body.itemSpecification || '[]'
        let main_specification= JSON.parse(allItemSpecification);

        let image = "";
        if (req.file && req.file['filename'] && req.file['filename'].length > 0) {
            image = req.file.path;
        } else {
            image = "";
        }

        if (getAllData) {
            const item_image = image.replace(/\\/g, '/');
            const updateData = await ItemMasters.update({
                asset_id, item_name, MVP, uom_id, Bar_QR_Code,threshold_stock, description, item_document: item_image
            },
                {
                    where: { id: Item_id }
                });
            let response;
            if (updateData) {
                await itemSpecifications.destroy({ where: { item_id: Item_id } });

                for (let i = 0; i < main_specification.length; i++) {
                    response = await itemSpecifications.create({
                        item_id: Item_id,
                        specificationType: main_specification[i].specificationType,
                        specificationDetails: main_specification[i].specificationDetails
                    });
                }

                const updatedItemWithSpecifications = await ItemMasters.findOne({
                    include: [{
                        model: itemSpecifications
                    }],
                    where: { id: Item_id },
                });

                return res.status(200).send({
                  code: 200,
                  message: "Item updated successfully",
                  data: updatedItemWithSpecifications
                });
            }
        } else {
            return res.status(404).send({ code: 403, message: "Data not found" });
        };
    } catch (error) {
        console.error(error, "Error");
        return res.status(500).send({ code : 500, message: error.message || "Internal Server Error"});
    }
}  

exports.deleteItemMaster = async (req, res) => {
    try {
        const id = req.params.id
        const getAllData = await ItemMasters.findOne({ where: { id: id } });
        if (getAllData) {
            await ItemMasters.update({ isDeleted: true }, { where: { id: id } });
            return res.status(200).send({ code: 200, message: "Item is Deleted Successfully!", });
        } else {
            return res.status(404).send({ code: 403, message: "Data not found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
}

exports.updateItemStatus = async (req, res) => {
    try {
        const Item_id = req.params.itemId;
        const { status } = req.body;
        const editData = await ItemMasters.findOne({ where: { id: Item_id } });
        if (editData) {
            const updateData = await ItemMasters.update(
                {
                    status
                }, { where: { id: Item_id } }
            );
            return res.status(200).send({ code: 200, message: "Status Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}





