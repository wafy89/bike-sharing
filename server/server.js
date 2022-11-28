const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const Bike = require('./models/Bike');
const authRoute = require('./routes/auth');
// Enviroment Variables
const PORT = 8080;
const SESSION_SECRET = 'bike-shairing-secrit';
const DB_PASSWORD = '08DW9nh3PAD6mg68';
const DB_USERNAME = 'bike-shairing';
const DB_URI =
	'mongodb+srv://bike-shairing:08DW9nh3PAD6mg68@cluster0.kbl5a2n.mongodb.net/bike-shairing?retryWrites=true&w=majority';

mongoose
	.connect(DB_URI)
	.then(() => {
		// SERVER STARTS
		const server = express();
		server.listen(PORT, () => console.log('server running...'));

		server.use(express.json());
		server.use(cors());
		server.use(
			session({
				secret: SESSION_SECRET,
				saveUninitialized: false,
				resave: false,
				cookie: {
					maxAge: 6000 * 60 * 24,
				},
			})
		);

		// GET ALL BIKES
		server.get('/bikes', async (req, res) => {
			const bikes = await Bike.find();
			res.status(200).send(bikes);
		});

		// LOGIN
		server.use('/auth', authRoute);

		//
		server.use((req, res, next) => {
			if (req.session.user) next();
			else res.send(401);
		});

		server.post('/rent/:bikeId', (req, res) => {
			const { bikeId } = req.params;
			const bike = bikes[bikeId];
			if (bike.rented) {
				res.status(405).send('Bike is already rented');
			} else {
				bike.rented = true;
				bikes[bikeId] = bike;
				req.session.user.rentedBike = bikeId;
				res.send(bike);
			}
		});

		server.post('/return/:bikeId', (req, res) => {
			const { bikeId } = req.params;
			const bike = bikes[bikeId];
			if (bike.rented) {
				res.status(405).send('Bike is already rented');
			} else {
				bike.rented = true;
				bikes[bikeId] = bike;
				req.session.user.rentedBike = bikeId;
				res.send(bike);
			}
		});

		server.use((req, res, next) => {
			if (!req.session.user) next();
			else res.send(401);
		});
	})
	.catch((err) => console.error(err));
