const express = require('express');
const { authenticateUser } = require('../../middleware/autherisedUser');
const autherisedAdmin = require('../../middleware/featuresBody.js/autherisedAdmin');
const addfeaturesValidation = require('../../middleware/featuresBody.js/addfeatures.validation');
const { addFeatures } = require('../../controllers/admin/addFeatures.controller');
const { removeFeature } = require('../../controllers/admin/removeFeatures.controller');
const { getAllFeatures } = require('../../controllers/admin/fetchAllfeatures.controller');
const paramsValidation = require('../../middleware/featuresBody.js/removeParams.validation');
const assignBodyValidation = require('../../middleware/featuresBody.js/assignBodyValidation');
const { assignFeaturesToConsumer } = require('../../controllers/admin/assigningFeatures.controller');
const Froute = express.Router();

Froute.post('/features/add', authenticateUser, autherisedAdmin, addfeaturesValidation, addFeatures)
Froute.delete('/features/:feature_id/remove', authenticateUser, autherisedAdmin, paramsValidation, removeFeature)
Froute.get('/features/getall', authenticateUser, autherisedAdmin, getAllFeatures)
Froute.post('/features/assign', authenticateUser, autherisedAdmin, assignBodyValidation, assignFeaturesToConsumer)

module.exports = Froute