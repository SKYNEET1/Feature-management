const express = require('express');
const { authenticateUser } = require('../../middleware/autherisedUser');
const autherisedConsumer = require('../../middleware/consumerBody/autherisedConsumer');
const consumerBodyValidation = require('../../middleware/consumerBody/consumerBody.Validation');
const { consumerProfile } = require('../../controllers/consumer/consumerProfile.controller');
const Crouter = express.Router();

Crouter.post('/consumer/profile',authenticateUser,autherisedConsumer,consumerBodyValidation,consumerProfile);

module.exports = Crouter;