const timeSheetController = require("../../controllers/timeSheet/timeSheet.controller");

module.exports = app => {
   app.post("/api/v1/createTimeSheet", timeSheetController.createTimeSheet);
   app.put("/api/v1/editTimeSheet/:id", timeSheetController.editTimeSheet);
   app.get("/api/v1/getAllTimeSheet", timeSheetController.getAllTimeSheet);
   app.get("/api/v1/getByIdTimeSheet/:id", timeSheetController.getByIdTimeSheet);
   app.delete("/api/v1/deleteTimeSheet/:id", timeSheetController.deleteTimeSheet);
}