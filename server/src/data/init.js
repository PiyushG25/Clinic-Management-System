// create the models to talk to the DB
require( '../models/attendence_schema' );
require( '../models/patient_queue_schema' );
require( '../models/patient_schema' );
require('../models/patients_records_schema');
require('../models/plan-calendar_schema');
require('../models/Users_schema');

const mongoose = require( 'mongoose' );

mongoose.set( 'returnOriginal', false );
mongoose.set( 'runValidators', true );
// mongoose.set( 'useFindAndModify', false );

// mongodb is the name of the service
/*if( process.env.DOCKER === 'NO_DOCKER' ) {
    console.log( 'Connecting to mongodb://localhost:27017/workshopsDB' );
    mongoose.connect( 'mongodb://localhost:27017/workshopsDB' );
} else {
    console.log( 'Connecting to mongodb://mongodb/workshopsDB' );
    mongoose.connect( 'mongodb://mongodb/workshopsDB' );
} */

console.log( 'Connecting to mongodb://localhost:27017/ClinicManagementDB' );
mongoose.connect( 'mongodb://localhost:27017/ClinicManagementDB' );


mongoose.connection.on( 'connected', () => {
    console.log( 'connected' );
});

mongoose.connection.on( 'error', error => {
    console.error( error.message );
});

mongoose.connection.on( 'disconnect', error => {
    console.error( error.message );
});