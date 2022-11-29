const { Router } = require('express');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/bycrypt');

const router = Router();

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).send('Email and password are required');

	// get user
	const user = await User.findOne({ email });
	console.log({ user });
	if (!user) return res.status(401).send('Email is incorrect');

	//check password
	const isValid = comparePassword(password, user.password);
	if (isValid) {
		// set user in session
		req.session.user = user;
		return res.status(200).send(user);
	} else {
		return res.status(401).send("Email and password don't match");
	}
});

router.post('/register', async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	//check if user exists
	if (user) {
		res.status(400).send('User already exists!');
	} else {
		//create password hash
		const password = hashPassword(req.body.password);
		const newUser = await User.create({ password, email });
		res.status(201).send(newUser);
	}
});
router.delete('/logout', (req, res) => {
	if (req.session && req.session.user) {
		req.session.user = null;
		res.status(204).send('deleted');
	}
});

module.exports = router;
