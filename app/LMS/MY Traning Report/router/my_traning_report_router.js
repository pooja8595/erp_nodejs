const myTraningReport = require('../controller/my_traning_report_controller');

module.exports = app => {
    app.get("/api/v1/getAllTraningReport", myTraningReport.getAllTraningReport);
    app.get("/api/v1/getAllScheduledTrainng/:id", myTraningReport.getAllScheduledTrainng);

};