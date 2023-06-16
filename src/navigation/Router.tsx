import {useContext, useEffect} from "react";
import {checkUserExpired, getCurrentUser, isLoggedIn} from "../parse/parse";
import {NavigationContainer} from "@react-navigation/native";
import {RootStack} from "./RootStack";
import {AuthStack} from "./AuthStack";
import {AuthContext} from "../context/AuthContext";
import {Alert, SafeAreaView, Text} from "react-native";

export const Router = () => {
	const {isAuth, setIsAuth, isExpired, setIsExpired} = useContext(AuthContext)

	// useEffect(() => {
	// 	// isLoggedIn()
	// 	// 	.then((isLogged) => {
	// 	// 		setIsAuth(isLogged)
	// 	// 	})
	// 	// getCurrentUser().then((user) => {
	// 	// 	if (user !== null) {
	// 	// 		const date = user.get("expiredAt")
	// 	// 		console.log(Date.now() - Date.parse(date))
	// 	// 		console.log(Date.now())
	// 	// 		console.log(date)
	// 	// 		setIsExpired( (Date.now() - Date.parse(date)) < 0)
	// 	// 		// console.log(isExpired)
	// 	// 	} else {
	// 	//
	// 	// 	}
	// 	// })
	// 	console.log(isExpired)
	// 	checkUserExpired().then((isExp) => {
	// 		if (isExp) {
	// 			setIsExpired(isExp)
	// 			console.log(isExp)
	// 		}
	// 	})
	// }, []);

	// if (isExpired) return <SafeAreaView><Text>Ваше время закончилось</Text></SafeAreaView>

	return (
		<NavigationContainer>
				{(isAuth) ? <RootStack/> : <AuthStack/>}
		</NavigationContainer>
	)
}
