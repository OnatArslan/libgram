const { Sequelize, Model } = require(`sequelize`);
const sequelize = require(`./database`);

class userBook extends Model {}

userBook.init({}, { sequelize, tableName: `userbooks` });

module.exports = userBook;
