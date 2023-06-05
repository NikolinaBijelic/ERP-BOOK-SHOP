module.exports = (sequelize, Sequelize) => {
    const PublisherBook = sequelize.define("bookPublisher", {
        namePublisher: {
        type: Sequelize.STRING,
      },
     
    });
    return PublisherBook;
  };