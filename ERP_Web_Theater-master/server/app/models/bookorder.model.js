
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
      date: {
        type: DataTypes.STRING,
      },
    });
    return Order;
  };

  