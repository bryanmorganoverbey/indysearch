const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("event", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: true,
      type: DataTypes.DATE,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    date: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    link: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
