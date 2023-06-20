import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {err} from "react-native-svg/lib/typescript/xml";
import {BASE_URL} from "../config/config";
import {Alert} from "react-native";

export const strapiRegister = (username, email, password) => {
	axios
		.post('http://10.252.133.186:1337/api/auth/local/register', {
				username: username,
				email: email,
				password: password,
			}
		)
		.then(response => {
			// Handle success.
			console.log('Well done!');
			console.log('User profile', response.data.user);
			console.log('User token', response.data.jwt);
		})
		.catch(error => {
			// Handle error.
			console.log('An error occurred:', error.response);
		});
}

export const strapiLogin = async (username, password, setErrorText) => {
	let isDone = false
	await axios
		.post('http://10.252.133.186:1337/api/auth/local', {
			identifier: username,
			password: password,
		})
		.then(response => {
			// Handle success.
			console.log('Well done!');
			console.log(response.data)
			// console.log('User profile', response.data.user);
			console.log('User token', response.data.jwt);
			setUser(response.data)
			isDone = true
		})
		.catch(error => {
			if (error.response.data.error.name === "ValidationError") {
				setErrorText("Неправильное имя пользователя или пароль")
			} else {
				setErrorText(error.response.data.error.message)
			}
			isDone = false
		})
	return isDone
}

export const strapiGetUser = async (token) => {
	return await axios.get(`http://10.252.133.186:1337/api/users/me?populate=avatar`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

}

const _storeUser = async (data) => {
	try {
		await AsyncStorage.setItem(
			'user',
			JSON.stringify(data),
		);
	} catch (error) {
		throw error
	}
};

const _retrieveData = async () => {
	try {
		const value = await AsyncStorage.getItem('user');
		if (value !== null) {
			return JSON.parse(value)
		}
	} catch (error) {
		throw error
	}
};

export const logoutUser = async () => {
	try {
		const data = await AsyncStorage.removeItem("user")
		if (data) {
			return data
		}
	} catch (error) {

	}
}


export const getUser = () => {
	return _retrieveData()
}
export const setUser =(data) => {
	try {
		 _storeUser(data)
	} catch (error) {
		return error
	}
}

// ######   Courses

export const getAllCourses = async () => {
	const url =`${BASE_URL}/courses/`
	return await axios.get(url)
}
