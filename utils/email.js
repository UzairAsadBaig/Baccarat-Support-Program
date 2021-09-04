const nodemailer = require( 'nodemailer' );

const sendEmail = async ( options ) => {

    //?  (1) Create Transporter 
    const transporter = nodemailer.createTransport( {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,

        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    } );


    //?  (2) Define email options

    const mailOptions = {
        from: "Muzamil Ahmad <muzamiljo9@gmail.com>", // sender
        to: options.email, // reciever
        subject: options.subject,
        text: options.message
    }


    //?  (3) Actually send the email
    await transporter.sendMail( mailOptions );


}


module.exports = sendEmail;