const express = require('express');
const usersBodyValidation = require('../middleware/userBody/userBodyValidation');
const { userRegistration } = require('../controllers/userRegistration.controller');
const userLoginValidate = require('../middleware/userBody/userLoginValidation');
const { userLogin } = require('../controllers/userLogin.controller');
const router = express.Router();

router.post('/user/registration',usersBodyValidation,userRegistration)
router.post('/user/login',userLoginValidate,userLogin)

module.exports = router;