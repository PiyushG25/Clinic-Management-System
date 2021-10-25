const mongoose = require('mongoose');
const bcrypt = require( 'bcrypt' );

const Users = new mongoose.Schema({
    status:{
        type:Boolean,
        default:true,
        //required:true
    },
    user_name:{
        type:String,
        required:true,
    },
    user_role:{
        type:String,
        lowercase:true,
        default: 'patient',
        enum: [ 'admin', 'doctor', 'patient', 'reception' ]
    },
    email_id:{
        type:String,
        required:true,
        lowercase:true
    },
    phone_no:{
        type:String,
        //required:true
    },
    user_occupation:{
        type: String
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    user_age:{
        type:Number,
    },
    user_gender:{
        type:String,
    },
    user_blood_goup:{
        type:String
    },
    attendance:{
        type:String
    },
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Reference: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

Users.path( 'email_id' ).validate(
    email_id => emailRegex.test( email_id ),
    'Invalid email id format'
);

Users.path( 'password' ).validate( 
    password => passwordRegex.test( password ),
    'Invalid password format - Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and one special character'
);

const SALT_FACTOR = 10;

Users.pre( 'save', function( done ) {
    const user = this;

    // password has not been updated
    if( !user.isModified( 'password' ) ) {
        return done();
    }

    // password has been updated - hash and save it
    bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
        if( err ) {
            return done( err );
        }

        bcrypt.hash( user.password, salt, ( err, hashedPassword ) => {
            if( err ) {
                return done( err );
            }

            user.password = hashedPassword;
            done();
        });
    });
});

Users.methods.checkPassword = function( password, done ) {
    bcrypt.compare( password, this.password, ( err, isMatch ) => {
        done( err, isMatch );
    });
};


mongoose.model('User', Users)