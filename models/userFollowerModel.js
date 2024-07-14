const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require(`./database`);

class userFollower extends Model {}

userFollower.init(
  {
    isAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: `userfriends`,
    modelName: `userFollower`,
  }
);

module.exports = userFollower;
