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
  // let minPrice;
  let queriedDate;
  let minSize;
  let maxSize;
  let maxPrice;
  
  Object.keys(req.body).forEach((key, i, array) => {
    if(key === 'date') {
      queriedDate = req.body[key].split('.').reverse().join('-');
      // queriedDate = Date.parse(req.body[key]);
      // console.log(queriedDate);
    }
    if(key === 'size-min') {
      // console.log(`${key} is sent`, array);
      minSize = +req.body[key];
    }
    if(key === 'size-max') {
      // console.log(`${key} is sent`, array);
      maxSize = +req.body[key];
    }

    if(key === 'price-max') {
      maxPrice = +req.body[key];
      // console.log(`${key} is sent`, array);
    }

  });

  if(minSize && maxSize && maxPrice) {
    return Space.find({
      space: { $gte: minSize, $lte: maxSize },
      price: { $lte: maxPrice },
    }).exec((err, docs) => {
      return res.status(200).send(docs);
    })
    // return console.log('send request to db with min and max floor');
  }

  if(minSize && maxSize) {
    return Space.find({
      space: { $gte: minSize, $lte: maxSize },
    }).exec((err, docs) => {
      return res.status(200).send(docs);
    });
  }

  if(minSize && maxPrice) {
    return Space.find({
      space: { $gte: minSize },
      price: { $lte: maxPrice },
    }).exec((err, docs) => {
      return res.status(200).send(docs);
    });
  }

  if(queriedDate) {
    // console.log(queriedDate);
    return Space.find({
      occupied: { $ne: queriedDate },
    }).exec((err, docs) => {
      // console.log(docs);
      return res.status(200).send(docs);
    });
  }

  if(maxSize) {
    return Space.find({
      space: { $lte: maxSize }
    }).exec((err, docs) => {
      return res.status(200).send(docs);
    })
    // return console.log('send request to db with max floor only');
  }

  if(minSize) {
    return Space.find({
      space: { $gte: minSize }
    }).exec((err, docs) => {
      return res.status(200).send(docs);
    });
    // console.log('send request to db with min floor only');
  }

  if(maxPrice) {
    return Space.find({
      price: { $lte: maxPrice },
    }).exec((err, docs) => {
      return res.status(200).send(docs);
    });
  }

}

module.exports = {
  showAllSpaces,
  showFilteredSpaces,
}

