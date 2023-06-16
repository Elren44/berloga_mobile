import 'react-native-get-random-values';
import * as MyParse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from "react-native";
import {resolve} from "@babel/core/lib/vendor/import-meta-resolve";

export const Parse = MyParse.Parse

//Initializing the SDK.
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys
Parse.initialize('hMkhXjRlGUf22iNnUFAId6ZOSWSU6QMvXenLivbc', 'MGRbK4QANFZMF8ioRjkDVyrixaV2DH1KwNbYHgMa');
Parse.serverURL = 'https://parseapi.back4app.com/';

export const doUserRegistration = async (username, password) => {
	return Parse.User.signUp(username, password);
};


export const doUserLogIn = async (username, password) => {
	// return await Parse.User.logIn(username, password);
	return await Parse.User.logIn(username, password)
		.then(async (loggedInUser) => {
			// logIn returns the corresponding ParseUser object
			// Alert.alert(
			// 	'Success!',
			// 	`Поздравляем ${loggedInUser.get('username')} вы успешно зашли!`,
			// );
			// To verify that this is in fact the current user, currentAsync can be used
			const currentUser = await Parse.User.currentAsync();
			return true;
		})
		.catch((error) => {
			// Error can be caused by wrong parameters or lack of Internet connection
			Alert.alert('Error!', error.message);
			return false;
		});
};

export const isLoggedIn = async () => {
	return await Parse.User.currentAsync() != null;
}

export const getCurrentUser = async () => {
	const currentUser = await Parse.User.currentAsync();
	if (currentUser !== null) {
	}
	return currentUser;
};

export const logOut = async () => {
	return await Parse.User.logOut();
}

export const checkUserExpired = async  () => {
	const currentUser = await Parse.User.currentAsync();
	if (currentUser) {
		console.log("currentUser ", currentUser)

		const date = currentUser.get("expiredAt")
		console.log(Date.now() - Date.parse(date))
		console.log(Date.now())
		const isExp = (Date.now() - Date.parse(date)) > 0
		console.log(isExp)
		return isExp


	}
}
