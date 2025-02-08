require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI || false,
    PORT: process.env.PORT || false
};
