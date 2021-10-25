//const router = require("express").Router();
const express = require('express');
const patientComplaintController = require("../../../controller/patients/patient_complaint");
//const { checkdoctor } = require("../../../functions/User_check");
const { authenticate , authorize} = require( '../../../middleware/auth' );

const router = express.Router();

/**
 * Route for creating patient complaint history
 */
router.post("/create", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.createPatientComplaintHistory(req, res);
});
//router.post('/create', authenticate, authorize( [ 'doctor' ] ), patientComplaintController.createPatientComplaintHistory);

/**
 * Route for deleting patient complaint history
 */
router.post("/delete", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.deletePatientComplaintHistory(req, res);
});

/**
 * Route for adding patient complaint history
 */
router.post("/addcomplaint", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.addPatientComplaintHistory(req, res);
});

/**
 * Route for creating patient lab record
 */
router.post("/createlabtest", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.createPatientLabTest(req, res);
});

/**
 * Route for deleting patient lab test record
 */
router.post("/dellabtest", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.deletePatientLabTest(req, res);
});

/**
 * Route for adding patient lab test record
 */
router.post("/addlabtest", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.addPatientLabTest(req, res);
});

/**
 * Route for adding patient lab test result
 */
router.post("/addlabresult", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.addPatientLabResult(req, res);
});
/**
 * Route for deleting patient lab test result
 */
router.post("/dellabresult", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientComplaintController.deletePatientLabResult(req, res);
});

module.exports = router;
