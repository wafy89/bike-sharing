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
		return res
			.status(405)
			.send(
				'Renting more than one bike is not allowed! Return the reted bike before renting new one'
			);
	}

	const bike = await Bike.findById(bikeID);
	// check if bike is available
	if (bike.rented) {
		return res.status(405).send('Bike is already rented');
	} else {
		// rent the bike
		bike.rented = true;
		await bike.save();
		user.rentedBike = bike._id;
		await user.save();
		// rentedBike could be saved in session but this will
		// allow user to rent an other bike after session is expired
		res.status(200).send(bike);
	}
});

// RETURN A BIKE
router.put('/return/:bikeID', async (req, res) => {
	const { bikeID } = req.params;
	const { userID } = req.session;
	const user = await User.findById(userID);
	const bike = await Bike.findById(bikeID);

	// check if user rented the bike
	if (!user.rentedBike || !user.rentedBike.equals(bikeID)) {
		return res.status(405).send('You can return a bike you have rented');
	} else {
		bike.rented = false;
		user.rentedBike = null;
		await bike.save();
		await user.save();
		res.status(200).send(bike);
	}
});

module.exports = router;
