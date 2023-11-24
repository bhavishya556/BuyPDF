const jwt = require("jsonwebtoken");
require("dotenv").config();

const genrateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}


module.exports = genrateToken;
