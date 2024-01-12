const controller = require("../../controllers/achievement/achievecontroller");

module.exports = app => {
  app.post("/api/v1/createAchievement", controller.createAchievement);
  app.get("/api/v1/achievementsList", controller.achievementsList)
  app.get("/api/v1/achievementDetails/:id", controller.achievementDetails)
  app.put("/api/v1/achievementUpdate/:id", controller.achievementUpdate)
  app.put("/api/v1/achievementDeleted/:id", controller.achievementDeleted)
};