const sql = require("mssql");


function registerAccount(req, res) {
  sqlConfig = {
    user: "sa",
    password: "123456",
    database: "ECommerce",
    server: "localhost",
    port: 1433,
    type: "mssql",
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
    },
  }
  const {
    username,
    email,
    customerName,
    customerPassword,
    gender,
    dateOfBirth,
    customerAvatar,
    phoneNumber
  } = req.body;
  sql.connect(sqlConfig, (err) => {
    if (err) console.log(err);
    var request = new sql.Request();
    const queryStatement = `INSERT INTO Customer (Username, Email, CustomerName, CustomerPassword, Gender, DateOfBirth, CustomerAvatar, PhoneNumber) VALUES ('${username}', '${email}','${customerName}', '${customerPassword}', '${gender}', '${dateOfBirth}', '${customerAvatar}', '${phoneNumber}');`;
    request.query(queryStatement, (err, data) => {
      if (err) console.log(err);
      if (!data) {
        res
          .status(400)
          .json({ errors: [{ msg: "Fail to register a new account" }] });
        res.send({ registerStatus: false });
      } else {
        if (data.rowsAffected.length === 0) {
          res.status(400).json({ errors: [{ msg: "User already existed" }] });
          res.send({ registerStatus: false });
        } else {
          res.send({ registerStatus: true });
        }
      }
    });
  });
}

module.exports = {
  registerAccount,
};
