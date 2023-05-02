const sgMail = require("@sendgrid/mail");
const { createExcrptionHTTP } = require("./createExceptionHTTP.service");
require("dotenv").config();

const { SANGRID_API_KEY, SANGRID_SENDER_ADDRESS } = process.env;

sgMail.setApiKey(SANGRID_API_KEY);

const sendEmailVerificationLatter = async (data) => {
  const email = {
    ...data,
    to: "yoxafa7069@soombo.com",
    from: SANGRID_SENDER_ADDRESS,
  };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw createExcrptionHTTP(
      504,
      "Sorry. Sending email verification letter failed"
    );
  }
};

module.exports = {
  sendEmailVerificationLatter,
};
