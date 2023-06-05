module.exports = (sequelize, Sequelize) => {
    const LanguageBook = sequelize.define("bookLanguage", {
        languageName: {
        type: Sequelize.STRING,
      },
     
    });
    return LanguageBook;
  };