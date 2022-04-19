const express = require('express');
const router = express();
const { showAllSpaces } = require('../controllers/spaces');

router.get('/', showAllSpaces);

module.exports = {
  router,
}