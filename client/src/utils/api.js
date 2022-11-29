import axiosModule from 'axios';

const BASE_URL = 'http://localhost:8080';
const axios = axiosModule.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

export const getAllBikes = () =>
	new Promise((resolve, reject) => {
		axios
			.get('bikes')
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err.response.data);
			});
	});

export const logout = () =>
	new Promise((resolve, reject) =>
		axios
			.delete('/auth/logout')
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err.response.data);
			})
	);

export const authenticate = ({ requestType, email, password }) =>
	new Promise((resolve, reject) => {
		axios
			.post(`/auth/${requestType}`, { email, password })
			.then((response) => {
				if (response) resolve();
			})
			.catch((err) => {
				reject(err.response.data);
			});
	});

export const rentBike = (bikeID) =>
	new Promise((resolve, reject) =>
		axios
			.post(`rent/${bikeID}`)
			.then((response) => {
				if (response && response.data) resolve(response.data);
			})
			.catch((err) => {
				reject(err.response.data);
			})
	);
