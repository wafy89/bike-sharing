import axiosModule from 'axios';

const BASE_URL = 'http://localhost:8080';
const axios = axiosModule.create({
	baseURL: BASE_URL,
});

export const getAllBikes = new Promise((resolve, reject) =>
	axios
		.get('bikes')
		.then((response) => {
			resolve(response.data);
		})
		.catch((err) => {
			reject(err.response.data);
		})
);
export const logout = new Promise((resolve, reject) =>
	axios
		.delete('/auth/logout')
		.then((response) => {
			resolve(response);
		})
		.catch((err) => {
			reject(err.response.data);
		})
);

export const authenticate = ({ requestType, email, password }) =>
	new Promise((resolve, reject) =>
		axios
			.post(`/auth/${requestType}`, { email, password })
			.then((response) => {
				if (response.data) resolve(response.data);
			})
			.catch((err) => {
				reject(err.response.data);
			})
	);
