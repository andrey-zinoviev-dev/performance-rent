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
  let finalDate;
  
  Object.keys(req.body).forEach((key, i, array) => {
    if(key === 'date') {
      // queriedDate = req.body[key].split('.').reverse().join('-');
      // queriedDate = Date.parse(req.body[key]);
      queriedDate = req.body[key].split('.');
      // finalDate = queriedDate[0].split('.').reverse().join('-').concat(`T${queriedDate[1].replace(" ", "")}`);
      
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
    // console.log(finalDate);
    const day = queriedDate.reverse().join('-');
    console.log(day);
    return Space.find({}).exec((err, docs) => {
      // return docs.forEach((doc) => {
      //   //check each array position of days occupied
      //   return doc.occupied.forEach((day) => {
      //     if(day.length > 1) {
      //       const splittedDay = day.split(',');
      //       // console.log(splittedDay);
      //       if(splittedDay.length === 1) {
      //         //hardcode test for matching whole rented day and position in database
      //         // const resultArray = splittedDay[0] !== docs[2].occupied[0];
      //         const resultArray = docs.filter((doc) => {
      //           return doc.occupied[0] !== splittedDay[0];
      //         });
      //         res.status(200).send({
      //           resultArray,
      //         });
      //       }
      //     }
      //   });
      //   // const separation = doc.occupied.split(',');
      //   // console.log(separation);
      // });
      return res.status(200).send({docs, day});
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

