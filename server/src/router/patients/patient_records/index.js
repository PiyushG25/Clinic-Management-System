const router = require("express").Router();
//const { checkdoctor, checkpatient } = require("../../../functions/User_check");
const patientRecordController = require("../../../controller/patients/patient_records");
const { authenticate , authorize} = require( '../../../middleware/auth' );


/**
 * Route for Adding Patient Family History
 */
router.post("/addfamilyhistory",authenticate, authorize( [ 'doctor', 'patient' ] ), async (req, res) => {
  patientRecordController.addFamilyHistory(req, res);
});
/**
 * Route for Editing Patient Family History
 */
router.post("/editfamilyhistory", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientRecordController.editFamilyHistory(req, res);
});
/**
 * Route for Deleting Patient Family History
 */
router.post("/delfamilyhistory", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientRecordController.deleteFamilyHistory(req, res);
});

/**
 * Route for Adding Patient Personal History
 */
router.post("/addpersonalhistory",authenticate, authorize( [ 'doctor', 'patient' ] ), async (req, res) => {
  patientRecordController.addPersonalHistory(req, res);
});
/**
 * Route for Editing Patient Personal History
 */
router.post("/editpersonalhistory", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientRecordController.editPersonalHistory(req, res);
});
/**
 * Route for Deleting Patient Personal History
 */
router.post("/delpersonalhistory", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientRecordController.deletePersonalHistory(req, res);
});
/**
 * Route for Adding Patient Past History
 */
router.post("/addpasthistory", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientRecordController.addPastHistory(req, res);
});
/**
 * Route for Editing Patient Past History
 */
router.post("/editpasthistory", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientRecordController.editPastHistory(req, res);
});
/**
 * Route for Deleting Patient Past History
 */
router.post("/delpasthistory", authenticate, authorize( [ 'doctor' ] ), async (req, res) => {
  patientRecordController.deletePastHistory(req, res);
});
/**
 * Route for fetch history by id
 */
router.post('/getall',authenticate, authorize( [ 'doctor', 'patient' ] ),async (req,res)=>{
  patientRecordController.fetchPatientRecord(req,res)
})

module.exports = router;
