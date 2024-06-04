const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/db");

const CartItem = sequelize.define(
  "cartItem",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { tableName: "cartItems" }
);

module.exports = CartItem;
