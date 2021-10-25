const router = require("express").Router();
const patientController = require("../../../controller/patients/patient_details");
//const { checkreception, checkpatient } = require("../../../functions/User_check");
const { authenticate , authorize} = require( '../../../middleware/auth' );


/**
 * Route for Creating Patient
 */
router.post("/create",authenticate, authorize( [ 'reception' ] ), async (req, res) => {
  patientController.createPatient(req, res);
});

/**
 * Route for Fetching Patient Data
 */
router.post("/getdata", authenticate, authorize( [ 'reception' ] ) , async (req, res) => {
  patientController.fetchPatientData(req, res);
});

/**
 * Route for Changing Patient Data
 */
router.post("/changedata", authenticate, authorize( [ 'reception' ] ) , async (req, res) => {
  patientController.changePatientData(req, res);
});

/**
 * Route for Fetching Patient Data by Id
 */
router.get("/getbyid", authenticate, authorize( [ 'reception', 'patient' ] ) , async (req, res) => {
  patientController.fetchPatientDatabyId(req, res);
});

module.exports = router;
