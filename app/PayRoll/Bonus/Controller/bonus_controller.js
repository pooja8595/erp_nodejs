const db = require('../../../models/index')
const bonusDetails = db.bonusDetail

/////////////// Create Bonus ///////////////

exports.Create_Bonus = async (req, res) => {
    try {
        const { add_multiplr_user, bonus_amount, bonus_date, Month_Name, Year_Name, BonusType, department, description } = req.body;
        const response = await bonusDetails.create({
            add_multiplr_user,
            bonus_amount,
            bonus_date,
            Month_Name,
            Year_Name,
            BonusType,
            department,
            description
        })
        res.status(200).send({ code: 200, message: "Bonus Created successfully", data: response })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}

/////////////// Get Bonus ById ///////////////

exports.Get_Bonus_byid = async (req, res) => {
    try {
        const Bonus_id = req.params.id
        const Bonus_data = await bonusDetails.findOne({ where: { Bonus_id: Bonus_id } })
        res.status(200).send({ code: 200, "message": "Bonus Data Found successfully", data: Bonus_data })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}

/////////////// Get All Bonus ///////////////

exports.Get_all_Bonus = async (req, res) => {
    try {
        const Get_Bonus = await bonusDetails.findAll()
        return res.status(200).send({ code: 200, message: "Data fetched", data: Get_Bonus })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}

/////////////// Update Bonus ById ///////////////

exports.update_Bonus_byid = async (req, res) => {
    try {
        const Bonus_id = req.params.id
        const { add_multiplr_user, bonus_amount, bonus_date, Month_Name, Year_Name, BonusType, department, description } = req.body;
        const Find_bonus = await bonusDetails.findOne({ where: { Bonus_id: Bonus_id } })
        if (Find_bonus) {
            const Update_Bonus = await bonusDetails.update({
                add_multiplr_user: add_multiplr_user,
                bonus_amount: bonus_amount,
                bonus_date: bonus_date,
                Month_Name: Month_Name,
                Year_Name: Year_Name,
                BonusType: BonusType,
                department: department,
                description: description
            }, { where: { Bonus_id: Bonus_id } })
            return res.status(200).send({ code: 200, message: "updated successfully", data: Update_Bonus })
        } else {
            return res.status(404).send({ code: 404, "message": "No Bonus found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}

/////////////// Delete Bonus ///////////////

exports.Delete_Bonus = async (req, res) => {
    try {
        const Bonus_id = req.params.id
        const Get_Bonus = await bonusDetails.findOne({ where: { Bonus_id: Bonus_id } })
        if (Get_Bonus) {
            const Delete_Bonus = await bonusDetails.update({ status: "INACTIVE" }, { where: { Bonus_id: Bonus_id } })
            return res.status(200).send({ code: 200, message: "Data deleted", data: Delete_Bonus })
        } else {
            return res.status(500).send({ code: 404, "message": "No Bonus Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}

/////////////// Remove Bonus ///////////////

exports.Remove_Bonus = async (req, res) => {
    try {
        const Bonus_id = req.params.id
        const Get_Bonus = await bonusDetails.findOne({ where: { Bonus_id: Bonus_id } })
        if (Get_Bonus) {
            const Delete_Bonus = await bonusDetails.destroy({ where: { Bonus_id: Bonus_id } })
            return res.status(200).send({ code: 200, message: "Data deleted", data: Delete_Bonus })
        } else {
            return res.status(404).send({ code: 404, "message": "No bonus found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}

/////////////// Get Bonus By Date ///////////////  

exports.Get_Bonus_byDate = async (req, res) => {
    try {
        const bonus_date = req.body;
        const Date_data = bonus_date.bonus_date
        const Get_Bonus = await bonusDetails.findOne({ where: { bonus_date: Date_data } })
        return res.status(200).send({ code: 200, "message": "data found", data: Get_Bonus })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}

/////////////// Get Employee By Date ///////////////

exports.Get_emp_bydate = async (req, res) => {
    try {
        const { Month_Name, Year_Name } = req.body;
        const Get_Bonus = await bonusDetails.findAll({ where: { Month_Name: Month_Name, Year_Name: Year_Name } })
        return res.status(200).send({ code: 200, "message": "data found", data: Get_Bonus })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, "message": "Server Error" })
    }
}