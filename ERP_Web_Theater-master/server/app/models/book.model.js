
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
      Bookname: {
        type: DataTypes.STRING,
      },
     
    });
    return Book;
  };

  