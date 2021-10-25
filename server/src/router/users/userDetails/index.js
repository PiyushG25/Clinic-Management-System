const router = require ('express').Router();
const { authenticate , authorize} = require( '../../../middleware/auth' );


/* Route -> Create user */
/*router.post("/register" , async (req, res) => {
    uaerController.registerUser(req, res);
});
*/
//const userController1 = require("../../../controller/auth");
const userController = require("../../../controller/users/user_details");

/**
 * Route for Creating User
 */
/*router.post("/register", async (req, res, next) => {
  userController1.register(req, res, next);
});*/
/**
 * Route for Logging In User
 */
/*router.post("/login", async (req, res) => {
  userController.login(req, res);
});*/
/**
 * Route for Verify User Data
 */
router.post("/verify", async (req, res) => {
  userController.verifyUserDetails(req, res);
});
/**
 * Route for Fetching User Data
 */
router.post("/getdata", authenticate, authorize( [ 'admin', 'patient' ] ), async (req, res) => {
  userController.getUserData(req, res);
});
/**
 * Route for Fetching Doctor List
 */
//router.get('/getdoctor', userController.getDoctorList);
router.post("/getdoctor", async (req, res) => {
  userController.getDoctorList(req, res);
});
/**
 * Route for Changing User Data
 */
router.post("/changedata", authenticate, authorize( [ 'admin' ] ), async (req, res) => {
  userController.changeUserData(req, res);
});
/**
 * Route for Changing User Password
 */
router.post("/changepassword", async (req, res) => {
  userController.changeUserPassword(req, res);
});
/**
 * Route for Deleting User
 */
router.post("/delete", authenticate, authorize( [ 'admin' ] ), async (req, res) => {
  userController.deleteUser(req, res);
});
module.exports = router;
