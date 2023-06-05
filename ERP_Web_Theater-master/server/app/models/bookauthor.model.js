module.exports = (sequelize, Sequelize) => {
    const AuthorBook = sequelize.define("bookAuthor", {
        nameAuthor: {
        type: Sequelize.STRING,
      },
     
    });
    return AuthorBook;
  };