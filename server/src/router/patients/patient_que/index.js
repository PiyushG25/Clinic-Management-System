const router = require("express").Router();
const patientQueController = require("../../../controller/patients/patient_que");
//const { checkreception , checkpatient } = require("../../../functions/User_check");
const { authenticate , authorize} = require( '../../../middleware/auth' );


/**
 * Route for Adding Patient to Que
 */
router.post("/add", authenticate, authorize( [ 'reception' ] ) , async (req, res) => {
  patientQueController.addPatientToQue(req, res);
});

/**
 * Route for Deleting Patient from Que
 */
router.post("/delete", authenticate, authorize( [ 'reception' ] ) , async (req, res) => {
  patientQueController.deletePatientFromQue(req, res);
});

/**
 * Route for Fetching All Patient from Que
 */
router.get("/get",authenticate, authorize( [ 'reception', 'patient' ] ) , async (req, res) => {
  patientQueController.fetchAllQue(req, res);
});

/**
 * Route for Letting in Patient Que
 */
router.post("/letinside", authenticate, authorize( [ 'reception' ] ) , async (req, res) => {
  patientQueController.letPatientIn(req, res);
});

module.exports = router;
