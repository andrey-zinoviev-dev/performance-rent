const express = require('express');
const router = express();
const { showAllSpaces, showFilteredSpaces } = require('../controllers/spaces');

router.get('/', showAllSpaces);
router.post('/filter', showFilteredSpaces);

module.exports = {
  router,
}