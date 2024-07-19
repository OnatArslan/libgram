const { Sequelize, DataTypes, Model, STRING } = require(`sequelize`);
const sequelize = require("./database");

const bcrypt = require("bcrypt");
const crypto = require("crypto");

class User extends Model {
  checkPasswordChangedAfterToken(token) {
    // Convert both dates to timestamps for a reliable comparison
    const lastUpdateTimestamp = new Date(this.updatedAt).getTime();
    const tokenIssuedAtTimestamp = token.iat * 1000; // Assuming token.iat is in seconds
    return lastUpdateTimestamp < tokenIssuedAtTimestamp;
  }
  hashPasswordResetToken(token) {
    const hashedPasswordToken = crypto
      .createHash(`sha256`)
      .update(token)
      .digest(`hex`);
    return hashedPasswordToken;
  }
  checkPasswordAndConfirmation(password, passwordConfirm) {
    password = password.toString();
    passwordConfirm = passwordConfirm.toString();
    return password === passwordConfirm;
  }
}

User.init(
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
      },
    },
    passwordConfirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.ENUM([`user`, `admin`]),
      defaultValue: `user`,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    // Options goes here
    tableName: `users`,
    modelName: `User`,
    sequelize,
    paranoid: true,
  }
);

// HERE I DECLARE HOOKS FOR USER MODEL
User.beforeCreate(async (user) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password on user creation.");
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    } catch (error) {
      console.log(error);
      throw new Error("Error hashing password on user update.");
    }
  }
});

User.beforeDestroy(async (user) => {
  try {
    user.isActive = false;
    await user.save();
  } catch (error) {
    throw new Error("Error setting user as inactive on destroy.");
  }
});

module.exports = User;
