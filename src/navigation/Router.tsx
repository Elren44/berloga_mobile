import {useContext, useEffect} from "react";
import {checkUserExpired, getCurrentUser, isLoggedIn} from "../parse/parse";
import {NavigationContainer} from "@react-navigation/native";
import {RootStack} from "./RootStack";
import {AuthStack} from "./AuthStack";
import {AuthContext} from "../context/AuthContext";
import {Alert, SafeAreaView, Text} from "react-native";
import {BottomTabBar} from "./BottomTabBar";
import {getUser} from "../strapiServices/services";

export const Router = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext)

	useEffect(() => {
		getUser().then((user) => {
			console.log(user)
			if (user && user !== null) {
				setIsAuth(true)
			} else {
				setIsAuth(false)
			}
		})

	}, []);


	return (
		<NavigationContainer>
				{(isAuth) ? <BottomTabBar /> : <AuthStack/>}
		</NavigationContainer>
	)
}
