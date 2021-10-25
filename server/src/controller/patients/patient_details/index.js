const mongoose = require('mongoose');
const user = mongoose.model( 'User' );
//const user = require("../../../models/Users_schema");
//const patient = require("../../../models/patient_schema");
//const record = require("../../../models/patients_records_schema");
const record = mongoose.model('patient_record');

//Create patient
 
async function createPatient(req, res) { 
  const newpatient = new user({
    user_name: req.body.user_name,
    user_age: req.body.user_age,
    user_gender: req.body.user_gender,
    user_occupation: req.body.user_occupation,
    address: req.body.user_address,
    user_blood_group: req.body.user_blood_group,
    phone_no: req.body.user_phoneno,
    email_id: req.body.user_email,
    password: req.body.password
  });

  const isuser = await user.findOne({
    user_name: req.body.user_name,
    phone_no: req.body.phone_no,
  });
  if (isuser) {
    return res.send({ error: "patient details already available" });
  }
  if (!isuser) {
    const savednewuser = await newpatient.save();
    if (savednewuser) {
      const newrecord = new record({ userId: savednewuser._id }).save();
      if (newrecord) {
        return res.send({ success: "Successfully added patient to database" });
      } else {
        /* redirect to error*/ 
        return res.send({
          error: "Error adding patinet details to database",
        });
      }
    } else {
      return res.send({ error: "Error adding patinet details to database" });
    }
  }
}

//Get patient data
 
async function fetchPatientData(req, res) {
  if (
    req.body.user_name != undefined &&
    req.body.phone_no != undefined &&
    req.body.user_role === 'patient'
  ) {
    const patientdata = await user.find({
      user_name: req.body.user_name,
      phone_no: req.body.phone_no,
    });
    if (patientdata.length > 0) {
      return res.send({ success: patientdata });
    } else {
      /* redirect to error*/ return res.send({
        error: "No patient data found",
      });
    }
  }
  if (
    req.body.user_name != undefined &&
    req.body.phone_no === undefined &&
    req.body.user_role === 'patient'
  ) {
    const patientdata = await user.find({
      user_name: req.body.user_name,
    });
    if (patientdata.length > 0) {
      return res.send({ success: patientdata });
    } else {
      /* redirect to error*/ return res.send({
        error: "No patient data found",
      });
    }
  }
  if (
    req.body.user_name === undefined &&
    req.body.phone_no != undefined  &&
    req.body.user_role === 'patient'
  ) {
    const patientdata = await user.find({
      phone_no: req.body.phone_no,
    });
    if (patientdata.length > 0) {
      return res.send({ success: patientdata });
    } else {
      /* redirect to error*/ return res.send({
        error: "No patient data found",
      });
    }
  } else {
    const patientdata = await user.find({});
    if (patientdata.length > 0) {
      return res.send({ success: patientdata });
    } else {
      /* redirect to error*/ return res.send({
        error: "No patient data found",
      });
    }
  }
}

//Change patient data
async function changePatientData(req, res) {

  try {
    const isuser = await user.findOne({
      _id: { $ne: req.body.userId },
      user_name: req.body.user_name,
      phone_no: req.body.phone_no,
    });
    if (isuser) {
      return res.send({ error: "Patient details already available" });
    }

    if (!isuser) {
      const newdata = await user.findOneAndUpdate(
        { _id: req.body.userId },
        {
          user_name: req.body.user_name,
          user_age: req.body.user_age,
          user_gender: req.body.user_gender,
          user_occupation: req.body.user_occupation,
          address: req.body.address,
          user_blood_group: req.body.user_blood_group,
          phone_no: req.body.phone_no,
          email_id: req.body.email_id,
        },
        { useFindAndModify: false, new: true }
      );
      if (await newdata) {
        return res.send({
          success: " Successfully updated changes to database ",
        });
      } else {
        /* redirect to error page */ return res.send("error");
      }
    }
  } catch (err) {
    /* redirect to error page */ return res.send({
      error: "Error updating to database",
    });
  }
}

//Get patient data by ID
 
async function fetchPatientDatabyId(req, res) {
  console.log(req.body.userId);
  try {
    const data = await user.findById({ _id: req.body.userId });
    if (data) {
      return res.send({ success: data });
    } else ({ error: "No data found1" });
  } catch (err) {
    return res.send({ error: "No data found2" });
  }
}
module.exports = {
  createPatient,
  fetchPatientData,
  changePatientData,
  fetchPatientDatabyId,
};
