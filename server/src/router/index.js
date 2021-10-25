const express = require('express');
const { postMessage } = require( '../controller/index' );

const router = express.Router();

router.post( '/', postMessage );



module.exports = router;