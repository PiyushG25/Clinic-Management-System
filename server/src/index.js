// run the init file which sets up DB connection
require( './data/init' );


const express = require ('express');
const cors = require('cors');
const path = require ('path');

const indexRouter = require( './router/index' );
const  patientComplaintRouter = require('./router/patients/patient_complaint/index');
const  patientDetailsRouter = require('./router/patients/patient_details/index');
const  patientQueRouter = require('./router/patients/patient_que/index');
const  patientRecordsRouter = require('./router/patients/patient_records/index');
const userDetailsRouter = require('./router/users/userDetails/index');
const authRouter = require( './router/auth' );


const logger = require( './middleware/logger' );
const { pageNotFound, apiNotFound } = require( './middleware/not-found' );
const errorHandler = require( './middleware/error' );

// This creates an Express application object - this includes an HTTP server
const app = express();

// adds the CORS HTTP headers
app.use(cors());

// log request and response and total time for processing
app.use( logger );

//app.use( express.static( path.join( __dirname, 'public' ) ) );

// built-in Express middleware
// Set up form data on req.body
app.use( express.urlencoded( { extended: false } ) );

// Set up JSON data sent using Ajax request on req.body
app.use(express.json());


/*API Routes*/
app.use(indexRouter );

app.use('/complaint', patientComplaintRouter );
app.use('/details', patientDetailsRouter );
app.use('/que', patientQueRouter );
app.use('/records', patientRecordsRouter );
app.use('/user', userDetailsRouter );

app.use( '/auth', authRouter );



/* route middlewares */
//app.use("/api", indexRouter);


/*Middlewares*/

/* Serve static files in production */
/*Connect to mongoDB */

// the error middleware MUST be at the very end
app.use( '/pages', pageNotFound );
app.use( apiNotFound );

// generic error handler
app.use( errorHandler );



// NODE_ENV is an environment variable generally setup to indicate which environment you are working on
// NODE_ENV=development
console.log( process.env.NODE_ENV );
console.log( process.env.PORT );


/*Setting up the PORT*/
const PORT = process.env.PORT || 3000;

app.listen( PORT, error => {
    if( error ) {
        console.error( error.message );
        return;
    }

    console.log( `Check http://localhost:${PORT}` );
});