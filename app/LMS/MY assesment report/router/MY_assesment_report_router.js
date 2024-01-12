const myAssesmentReport = require('../countroller/MY_assesment_report_controller');

module.exports = app => {
    app.get("/api/v1/getAllAssesmentReport", myAssesmentReport.getAllAssesmentReport)

};