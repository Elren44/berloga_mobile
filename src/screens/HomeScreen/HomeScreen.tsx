import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {checkUserExpired, doUserLogIn, getCurrentUser, logOut, Parse} from "../../parse/parse";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/RootStack";
import {AuthContext} from "../../context/AuthContext";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {ColorsType} from "../../context/colors";
import {logoutUser} from "../../strapiServices/services";

export const HomeScreen = () => {

	const {isAuth, setIsAuth, colors} = useContext(AuthContext);
	const navigation = useNavigation<NavigationProp<RootStackParamList>>()
	const styles = getStyles(colors)





	return (
		<SafeAreaView style={styles.container}>
			<Text style={{color: colors.text, fontSize: 18, marginBottom: 20}}>Главная страница</Text>

			<TouchableOpacity style={{marginTop: 30}} onPress={() =>navigation.navigate("Details")}><Text style={styles.text}>Детали</Text></TouchableOpacity>
		</SafeAreaView>
	);
}

const getStyles = (colors: ColorsType) => {
	return (
		StyleSheet.create({
			container: {
				flex: 1,
				paddingHorizontal: 24,
				backgroundColor: colors.background,
				paddingTop: 20
			},
			text: {
				fontSize: 16,
				color: colors.text
			}
		})
	)
}
