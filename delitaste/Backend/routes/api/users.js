const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const customerRepository = require('../../models/customerRepository')
// @route      POST api/user
// @desc       Register user
// @access     Public
router.post('/register', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password requires a minimum of 6 characters').isLength({ min: 6})
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, name, password, gender, birthday, avatar, phoneNumber } = req.body;
    try {
        await customerRepository.registerAccount(req, res);    
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;
