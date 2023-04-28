const regName = `^[a-zA-Z]+ [a-zA-Z]+$`;
const regEmail = {
  minDomainSegments: 2,
  tlds: { allow: ["com", "net"] },
};
const regPhone = /^\(\d{3}\) \d{3}-\d{4}$/;
const regPassword = "^[a-zA-Z0-9]{8,50}$";

module.exports = {
  regName,
  regEmail,
  regPhone,
  regPassword,
};
