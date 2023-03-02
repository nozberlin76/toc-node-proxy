const express = require('express');

const feedController = require('./controllers');

const router = express.Router();

router.get('/order/:orderId/:env', feedController.getOrder);
router.get('/acme-challenge/1f7-qrtejP4f_m2MumkOwSVYfuDNCrmIfJKVRzAGqb8', feedController.getChallenge);

module.exports = router;

