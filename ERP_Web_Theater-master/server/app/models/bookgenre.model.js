module.exports = (sequelize, Sequelize) => {
  const GenreBook = sequelize.define("bookGenre", {
    genreName: {
      type: Sequelize.STRING,
    },
   
  });
  return GenreBook;
};