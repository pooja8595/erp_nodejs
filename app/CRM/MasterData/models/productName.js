const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const productName = sequelize.define(
    "SYS_PRODUCT_NAME_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return productName;
};
