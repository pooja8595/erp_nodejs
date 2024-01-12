const db = require("../../models/index");
const Achievement = db.achievement;

/////////////// Create Achievement ///////////////

exports.createAchievement = async (req, res) => {
  try {
    if (!req.body.achievements) {
      return res.status(400).send({ code: 400, message: "Achievements can not be empty!" });
    }
    const userExits = await Achievement.findOne({ where: { achievements: req.body.achievements } })
    if (userExits) {
      return res.status(403).send({ code: 403, message: "Achievements Already Exits!" })
    }
    const achievementData = await Achievement.create(req.body)
    return res.status(200).send({ code: 200, message: "create successfully!", data: achievementData })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: err.message || "Some error occurred while creating the achievementData." });
  }
}

/////////////// Achievement List ///////////////

exports.achievementsList = async (req, res) => {
  try {
    const achievementsData = await Achievement.findAll({ where: { status: 'ACTIVE' } })
    if (achievementsData) {
      achievementsData.sort().reverse()
      return res.status(200).send({ message: "Get All Achievements Data Successfully!", data: achievementsData })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ code: 500, message: "error", error: err.message })
  }
}

/////////////// Achievement Details ///////////////

exports.achievementDetails = async (req, res) => {
  try {
    const achieve_id = req.params.id
    const achivedata = await Achievement.findAll({ where: { achievement_id: achieve_id, status: 'ACTIVE' } })
    if (achivedata.length > 0) {
      return res.status(200).send({ message: "achivedata details successfully.", data: achivedata })
    } else {
      return res.status(404).send({ code: 404, message: " Record Not Found" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ code: 500, message: "error", error: err.message })
  }
}

/////////////// Achievement Update ///////////////

exports.achievementUpdate = async (req, res) => {
  try {
    const achieveId = req.params.id
    const achieveDetails = await Achievement.findOne({ where: { achievement_id: achieveId } })
    if (achieveDetails) {
      const achieveData = await Achievement.update(req.body, { where: { achievement_id: achieveId } })
      return res.status(200).send({ code: 200, message: "achieveData updated successfully.", data: achieveData })
    } else {
      return res.status(404).send({ code: 404, message: "Invalid achieve_id..." })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ code: 500, message: "error", error: err.message })
  }
}

/////////////// Achievement Delete ///////////////

exports.achievementDeleted = async (req, res) => {
  try {
    const achieve_id = req.params.id;
    const achieveDetails = await Achievement.findOne({ where: { achievement_id: achieve_id } })
    if (achieveDetails) {
      const achieveData = await Achievement.update({ status: "INACTIVE" }, { where: { achievement_id: achieve_id } })
      return res.status(200).send({ code: 200, message: "Achievement Data is Deleted Successfully!", data: achieveData });
    } else {
      return res.status(404).send({ code: 404, message: "Invalid achieve_id..." })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ code: 500, message: "Could not delete achieveData with id=" + err.message })
  }
}