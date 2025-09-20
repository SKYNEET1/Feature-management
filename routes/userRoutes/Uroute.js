const express = require('express');
const usersBodyValidation = require('../../middleware/userBody/userBodyValidation');
const userLoginValidate = require('../../middleware/userBody/userLoginValidation');
const { userRegistration } = require('../../controllers/user/userRegistration.controller');
const {userLogin} = require('../../controllers/user/userLogin.controller')
const Urouter = express.Router();


Urouter.post('/user/registration',usersBodyValidation,userRegistration)
Urouter.post('/user/login',userLoginValidate,userLogin)

module.exports = Urouter;