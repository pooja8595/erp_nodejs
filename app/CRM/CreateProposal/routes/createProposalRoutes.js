const express = require("express");
const router = express.Router();

const createProposalController = require("../controllers/createProposalController");


router.get('/api/v1/getProposalCompanyData/:id', createProposalController.getProposalCompanyData);
router.post('/api/v1/createProposal', createProposalController.createProposal)
module.exports = router;
