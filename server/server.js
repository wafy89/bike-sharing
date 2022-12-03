const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const bikesRoute = require('./routes/bikes');
const MongoStore = require('connect-mongo');

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

		server.use(
			cors({
				origin: 'http://localhost:3000',
				methods: ['POST', 'PUT', 'GET', 'DELETE'],
				credentials: true,
			})
		);
		server.use(
			session({
				secret: SESSION_SECRET,
				saveUninitialized: false,
				resave: false,
				store: MongoStore.create({
					mongoUrl: DB_URI,
				}),
				cookie: {
					maxAge: 60000 * 60 * 24, // one day
				},
			})
		);

		// Routes
		server.use('/auth', authRoute);
		server.use('/bikes', bikesRoute);
	})
	.catch((err) => console.error(err));
