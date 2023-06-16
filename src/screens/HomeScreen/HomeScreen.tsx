import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, Text, TouchableOpacity} from 'react-native'
import {checkUserExpired, doUserLogIn, logOut, Parse} from "../../parse/parse";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/RootStack";
import {AuthContext} from "../../context/AuthContext";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

export const HomeScreen = () => {

	const {isAuth, setIsAuth, isExpired, setIsExpired} = useContext(AuthContext);
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()

	useEffect(() => {

		try {
			checkUserExpired().then((isExp) => {

				if (isExp !== null && isExp !== undefined) {
					setIsExpired(isExp)
					console.log("is Exp",isExp)
				}
			})
		} catch (error) {
			console.error((error as Error).message);
		}
	}, [isExpired]);

	const logoutHandler = () => {
		logOut().then(() => {
			setIsAuth(false)
		})
	}

	if (isExpired) return <SafeAreaView><Text>Ваше время закончилось</Text></SafeAreaView>

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: "#3c3c3c", paddingTop: 20}}>
			<Text style={{color: "#e2e2e2"}}>HomeScreen</Text>
			<TouchableOpacity onPress={logoutHandler}><Text style={{color: "#e2e2e2"}}>Выйти</Text></TouchableOpacity>
			<TouchableOpacity style={{marginTop: 30}} onPress={() =>navigation.navigate("Details")}><Text style={{color: "#e2e2e2"}}>Детали</Text></TouchableOpacity>
		</SafeAreaView>
	);
}
