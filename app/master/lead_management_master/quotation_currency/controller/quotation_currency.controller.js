const db = require("../../../../models/index");
const quotation_currencyDetails = db.quotation_currency;
const op = db.sequelize.op;

exports.createQuotation_currency = async (req, res) => {
    try {
        const { quotation_currency_name } = req.body;
        const quotation_currencyData = await quotation_currencyDetails.findOne({ where: { quotation_currency_name: quotation_currency_name } });   
        if (quotation_currencyData) {
            return res.status(403).send({ code: 403, message: "Quotation_currency Name is Already Exits!" });
        }            
        const response = await quotation_currencyDetails.create({
                quotation_currency_name
            });
            return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllQuotation_currency = async (req, res) => {
    try {
        const getAllData = await quotation_currencyDetails.findAll({
            where: { status: "ACTIVE" },
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetById quotation_currency ///////////////

exports.getByIdQuotation_currency = async (req, res) => {
    try {
        const quotation_currencyId = parseInt(req.params.quotation_currency_id);
        const getData = await quotation_currencyDetails.findOne({ where: { quotation_currency_id: quotation_currencyId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete quotation_currency ///////////////

exports.deleteQuotation_currency = async (req, res) => {
    try {
        const quotation_currencyId = parseInt(req.params.quotation_currency_id);
        const dltquotation_currency = await quotation_currencyDetails.findOne({ where: { quotation_currency_id: quotation_currencyId } });
        if (dltquotation_currency) {
            const deleteData = await quotation_currencyDetails.update({ status: "INACTIVE" }, { where: { quotation_currency_id: quotation_currencyId } });
            return res.status(200).send({ code: 200, message: "Quotation_currency Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.editQuotation_currency = async (req, res) => {
    try {
        const quotation_currency_ID = parseInt(req.params.quotation_currency_id);
        const dltquotation_currency = await quotation_currencyDetails.findOne({ where: { quotation_currency_id:quotation_currency_ID } });
        if (dltquotation_currency) {
            const EDITData = await quotation_currencyDetails.update(req.body, { where: { quotation_currency_id: quotation_currency_ID } });
            return res.status(200).send({ code: 200, message: "Data is Update Successfully!", data: EDITData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};