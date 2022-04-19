const Space = require('../models/space');

const showAllSpaces = (req, res) => {
  Space.find({})
  .then((docs) => {
    return res.status(200).send(docs);
  })
};

module.exports = {
  showAllSpaces,
}