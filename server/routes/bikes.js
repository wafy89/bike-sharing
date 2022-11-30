const { Router } = require('express');
const Bike = require('../models/Bike');
const User = require('../models/User');

const router = Router();

// GET ALL BIKES
router.get('/', async (req, res) => {
	const bikes = await Bike.find();
	res.status(200).send(bikes);
});

// authentication middleware
router.use((req, res, next) => {
	const { userID } = req.session;
	console.log(userID);
	if (userID) {
		next();
	} else {
		res.status(401).send('Login is required!');
	}
});

// RENT A BIKE
router.put('/rent/:bikeID', async (req, res) => {
	const { userID } = req.session;
	const { bikeID } = req.params;

	// check if user has rented a bike already
	const user = await User.findById(userID);
	if (user.rentedBike) {
		res
			.status(405)
			.send(
				'Renting more than one bike is not allowed! \n Return the reted bike before renting new one'
			);
	}

	// check if bike available
	const bike = await Bike.findById(bikeID);
	if (bike.rented) {
		res.status(405).send('Bike is already rented');
	} else {
		// rent the bike
		bike.rented = true;
		await bike.save();
		user.rentedBike = bikeID;
		await user.save();
		// rentedBike could be saved in session user but this will
		// allow user to rent an other bike after session is expired
		res.status(200).send(bike);
	}
});

// RENT A BIKE
router.put('/return/:bikeID', async (req, res) => {
	const { bikeID } = req.params;
	const { userID } = req.session;

	// check if user rented the bike
	const user = await User.findById(userID);
	if (user.rentedBike !== bikeID) {
		res.status(405).send('You can return a bike you have rented');
	} else {
		const bike = await Bike.findById(bikeID);
		bike.rented = false;
		user.rentedBike = null;
		await bike.save();
		await user.save();
		res.status(204).send(bike);
	}
});

module.exports = router;