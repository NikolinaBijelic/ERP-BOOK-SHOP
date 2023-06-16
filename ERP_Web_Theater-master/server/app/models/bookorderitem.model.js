
module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("orderItem", {
      price: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      availableStock:DataTypes.INTEGER
      
    });
    return OrderItem;
  };

  