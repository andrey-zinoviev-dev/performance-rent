const Space = require('../models/space');

const showAllSpaces = (req, res) => {
  // Object.keys(req.query).forEach((key) => {
  //   console.log(key);
  // })
  Space.find({})
  .then((docs) => {
    return res.status(200).send(docs);
  })
};

const showFilteredSpaces = (req, res) => {
  console.log(req);
}

module.exports = {
  showAllSpaces,
  showFilteredSpaces,
}