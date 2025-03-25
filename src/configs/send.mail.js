/**
 * @name Hotel Room Booking System
 * @author Md. Samiur Rahman (Mukul)
 * @description Hotel Room Booking and Management System Software ~ Developed By Md. Samiur Rahman (Mukul)
 * @copyright ©2023 ― Md. Samiur Rahman (Mukul). All rights reserved.
 * @version v0.0.1
 *
 */

const sgMail = require('@sendgrid/mail');
const { successResponse, errorResponse } = require('./app.response');

// const sendEmail = async (res, user, url, subjects, message, title) => {
//   sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

//   const msg = {
//     to: user.email,
//     from: process.env.SEND_SENDER_MAIL,
//     subject: subjects,
//     text: message,
//     html: `<div>
//       <h4>${title}</h4>
//       <a href="${url}" target="_blank"> >>> Click Here</a>
//     </div>`
//   };

//   await sgMail.send(msg).then(() => {
//     res.status(200).json(successResponse(
//       0,
//       'SUCCESS',
//       `Email sent to ${user.email} successful`
//     ));
//   }).catch(async (error) => {
//     // eslint-disable-next-line no-param-reassign
//     user.resetPasswordToken = undefined;
//     // eslint-disable-next-line no-param-reassign
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });

//     res.status(500).json(errorResponse(
//       2,
//       'SERVER SIDE ERROR',
//       error
//     ));
//   });
// };
const nodemailer = require('nodemailer');

// const { successResponse, errorResponse } = require('./app.response');

const sendEmail = async (res, user, url, subjects, message, title) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,        // Gmail account
        pass: process.env.MAIL_PASSWORD         // App password (không phải mật khẩu Gmail thường)
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: subjects,
      text: message,
      html: `<div>
        <h4>${title}</h4>
        <a href="${url}" target="_blank"> >>> Click Here</a>
      </div>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      `Email sent to ${user.email} successfully`
    ));
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error.message
    ));
  }
};

module.exports = sendEmail;
