const express = require('express');

const feedController = require('./controllers');

const router = express.Router();

router.get('/order/:orderId', feedController.getOrder);

module.exports = router;
