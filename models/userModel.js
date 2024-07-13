const { Sequelize, DataTypes } = require(`sequelize`);
const sequelize = require("./database");
const validator = require(`validator`);

const User = sequelize.define(
  `User`,
  {
    // Fields goes here
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
      validate: {
        min: 4,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough(value) {
          if (value.length < 8) {
            throw new Error(`Password should be at least 8 character `);
          }
        },
        matchesConfirmation(value) {
          if (value !== this.passwordConfirmation) {
            throw new Error(`Passowrd confirmation does not match password`);
          }
        },
      },
    },
    passwordConfirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    // Options goes here
    tableName: `users`,
  }
);

module.exports = User;
