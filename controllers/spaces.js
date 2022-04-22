const { off } = require('../models/space');
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
  let minPrice;
  let maxPrice;
  
  Object.keys(req.body).forEach((key) => {
    if(key === 'price-min') {
      minPrice = +req.body[key];
    }
    if(key === 'price-max') {
      maxPrice = +req.body[key];
    }
    Space.find({price: {$gte: minPrice, $lte: maxPrice}})
    .then((docs) => {
      return res.status(200).send(docs);
    })
  })
}

module.exports = {
  showAllSpaces,
  showFilteredSpaces,
}