const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );
const jwt = require( 'jsonwebtoken' );

const register = ( req, res, next ) => {
    const user = req.body;

    if( !user ) {
        const error = new Error( 'User details not sent in request body' );
        next( error );
        return;
    }

    User
        .create( user )
        .then( updatedUser => {
            const dataToSend = {
                user_name: updatedUser.user_name,
                user_role: updatedUser.user_role,
                email_id: updatedUser.email_id,
                phone_no: updatedUser.phone_no,
                password: updatedUser.password,

            };

            res.status( 201 ).json( dataToSend );
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });
};

const login = ( req, res, next ) => {
    // this has { email: string, password: string }
    const u = req.body;

    if( !u ) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }
    
    if( !u.email_id || !u.password ) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }

    User
        .findOne( { email_id: u.email_id } )
        .then( user => {
            if( !user ) {
                const error = new Error( 'No matching credentials' );
                error.status = 404;
                return next( error );
            }

            // check if password matches the hashed one in DB
            user.checkPassword( u.password, ( err, isMatch ) => {
                if( err ) {
                    const error = new Error( 'No matching credentials' );
                    error.status = 404;
                    return next( error );
                }

                if( !isMatch ) {
                    const error = new Error( 'No matching credentials' );
                    error.status = 404;
                    return next( error );
                }

                // generate the token
                const claims = {
                    user_name: user.user_name,
                    email_id: user.email_id,
                    user_role: user.user_role
                };

                // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
                jwt.sign( claims, 'abcd' /* process.env.JWT_SECRET */, { expiresIn: 24 * 60 * 60 }, ( err, token ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }

                    res.send({
                        userId: user._id,
                        role: user.user_role,
                        email_id: user.email_id,
                        token: token
                    });
                });
            });
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });
};

module.exports = {
    register,
    login
};