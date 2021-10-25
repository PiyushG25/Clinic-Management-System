const record = require("../../../models/patients_records_schema");
//const {checkdoctor} = require("../../../functions/Users");
const mongoose = require("mongoose");

/*Create Patient Complaint History*/
//Post patient_id
//async function createComplaintHistory(req, res){
const createComplaintHistory = async (req, res, next) => {
    try{
        var complaint_id = mongoose.Types.ObjectId();
        const add_history = await record.findOneAndUpdate(
            {patient_id: req.body.patient_id},
            {
                $push: {
                    complaint_history: {
                        complaint_id,
                        doctor_name: req.body.doctor_name,
                        doctor_id: req.body.doctor_id
                    },
                },
            },
            { useFindAndModify: false, new:true }
        );
        if(await add_history) {
            return res.send({sucess: complaint_id});
        } else {
            return res.send({ error: "Failed to Add History"});
        }
    }
    catch (error) {
        return next(error);
    }
}


/*Delete Patient Complaint History*/
//Post patient_id, complaint_id
//async function deleteComplaintHistory(req, res) {
const deleteComplaintHistory = async (req, res, next) => {
  try {
        const delete_history = await record.findOneAndUpdate(
            {patient_id : req.body.patient_id},
            {
                $pull: {
                    complaint_history:{
                        complaint_id:req.body.complaint_id
                    }
                },
            },
            {
                useFindAndModify: false, new:true
            }
        );
        if (await delete_history) {
            return res.send({success: "Deleted Successfully"});
        } else {
            return res.send({ error : "Failed to Delete"});
        }
    } catch (error) {
        return next(error);
    }
}

/*Add Patient Complaint History*/
//Post patinet_id , complaint_id, complaint
//async function addComplaintHistory(req, res) {
const addComplaintHistory = async (req, res, next) => {
    try {
        const addComplaint = await record.findOneAndUpdate(
            {
                patient_id: req.body.patient_id,
                'complaint_hisotry.complaint_id': req.body.complaint_id,
            },
            {
                $set : {
                    'complaint_history.$.complaints': req.body.complaints,
                    'complaint_history.$.interpretation': req.body.interpretation,
                    'complaint_history.$.medication': req.body.medication
                },
            },
            { useFindAndModify:false, new:true}
        );
        if(await addComplaint) {
            return res.send({ success: "Complaint Added SuccessFully" });
        } else {
            return res.send({ error: addcomplaint });
    }
    }catch (err) {
        return next(err);
    }
}

/*Create Patient Lab Test*/
//async function createLabTest(req, res) {
const createLabTest = async (req, res, next) => {
    try {
        var lab_test_id=mongoose.Types.ObjectId();
        const createLabTest = await record.findOneAndUpdate(
            {patient_id: req.body.patient_id},
            {
                $push: {
                    lab_test: {
                        lab_test_id,
                        complaint_id: req.body.complaint_id,
                    },
                },
            },
            { useFindAndModify: false, new: true }
        );
        if(await createLabTest) {
            return res.send({success:lab_test_id});
        } else {
            return res.send({error: "Lab Test Creation Failed"});
        }
    } catch(error) {
        return next(error);
    }
}

/*Add Patient Lab Test*/
//Post patient_id, complaint_id, complaint
//async function addLabTest(req, res) {
const addLabTest = async (req, res, next) => {
    try {
        const add_labTest = await record.findOneAndUpdate(
            {
                patient_id: req.body.patient_id,
                'labtest.labtest_id': req.body.lab_test_id,
            },
            {
                $set:
                {
                    'labtest.$.test_suggested': req.body.test_suggested
                },
            },
            { useFindAndModify: false, new:true}
        );
        if(await addLabTest) {
            return res.send({
                success: "Lab Test added Successfully"
            })
        } else {
            return res.send({
                error:"Lab Test add failed"
            })
        }
    } catch(error){
        return console.log({error});
    }
}

/* Delete Patient Lab Test*/
//Post patient_id, complaint_id
//async function deleteLabTest(req, res) {
const deleteLabTest = async (req, res, next) => {
    try {
        const deleteLabTest = await record.findOneAndUpdate(
          { patient_id: req.body.patient_id },
          {
            $pull: { labtest: { labtest_id: req.body.lab_test_id } },
          },
          { useFindAndModify: false, new: true }
        );
        if (await deleteLabTest) {
          return res.send({ success: "Lab Test Successfully Deleted" });
        } else {
          return res.send({ error: "Error deleting Lab Test" });
        }
      } catch (err) {
        return res.send({ error: err });
      }
    }   


/*Add Lab Result */
//Post patient_id, complaint_id, complaint
//async function addPatientLabResult(req, res) {
const addPatientLabResult = async (req, res, next) => {
    try {
      var result_id = mongoose.Types.ObjectId();
      const addlabresult = await record.findOneAndUpdate(
        {
          patient_id: req.body.patient_id,
          "labtest.labtest_id": req.body.lab_test_id,
        },
        {
          $push: {
            "labtest.$.test_result": {
              _id: result_id,
              test: req.body.test,
              comment: req.body.comment,
            },
          },
        },
        { useFindAndModify: false, new: true }
      );
      if (await addlabresult) {
        return res.send({ success: result_id });
      } else {
        return res.send({ error: "Error adding Lab Result to database" });
      }
    } catch (err) {
      return res.send({ error: err });
    }
  }
  
//Delete patient lab result
//---------patient_id, complaint_id, complaint
//async function deletePatientLabResult(req, res) {
const deletePatientLabResult = async (req, res, next) => {  
    try {
      const deletelabresult = await record.findOneAndUpdate(
        {
          patient_id: req.body.patient_id,
          "labtest.labtest_id": req.body.lab_test_id,
        },
        {
          $pull: { "labtest.$.test_result": { _id: req.body.result_id } },
        },
        { useFindAndModify: false, new: true }
      );
      if (await deletelabresult) {
        return res.send({ success: "Successfully deleted the result from database" });
      } else {
        return res.send({ error: "Error deleting result from database" });
      }
    } catch (err) {
      return res.send({ error: err });
    }
  }
  
  module.exports = {
    createComplaintHistory,
    deleteComplaintHistory,
    addComplaintHistory,
    createLabTest,
    addLabTest,
    deleteLabTest,
    addPatientLabResult,
    deletePatientLabResult
  };
  