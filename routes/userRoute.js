const express = require('express');
const { signUp, login, getAllUsers } = require('../controller/userController');


const authAdmin = require('../middleware/authAudmin');

const router = express.Router();

router.post('/login', login);
router.post('/create',authAdmin, signUp);
router.get('/users', authAdmin, getAllUsers);

module.exports = router;
