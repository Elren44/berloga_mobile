import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {DismissKeyboard} from "../../components/DismissKeyboard";
import {doUserLogIn} from "../../parse/parse";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStack, RootStackParamList} from "../../navigation/RootStack";
import {AuthContext} from "../../context/AuthContext";

export const LoginScreen = () => {
	const [username, onChangeUsername] = React.useState('');
	const [password, onChangePassword] = React.useState('');
	const {isAuth, setIsAuth} = useContext(AuthContext);

	const loginHandler = async () => {
		try {
			doUserLogIn(username, password).then((user) => {
				if (user) {
					setIsAuth(true)
				}
			})
		} catch (error) {
			console.error((error as Error).message);
		}
	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: "#3c3c3c"}}>
			<DismissKeyboard>
				<View style={styles.formContainer}>
					<View style={styles.form}>
						<View style={styles.formRow}>
							<View style={{marginBottom: 6, alignSelf: "flex-start"}}><Text
								style={{color: "#e2e2e2"}}>Логин</Text></View>

							<TextInput style={styles.input} placeholder="Введите имя..."
							           placeholderTextColor="rgba(0,0,0,0.7)"
							           onChangeText={onChangeUsername}
							           value={username}
							/>

						</View>
						<View style={styles.formRow}>
							<View style={{marginBottom: 6, alignSelf: "flex-start"}}><Text
								style={{color: "#e2e2e2"}}>Пароль</Text></View>
							<TextInput style={styles.input} placeholder="Введите пароль..."
							           placeholderTextColor="rgba(0,0,0,0.7)"
							           onChangeText={onChangePassword}
							           value={password}
							/>
						</View>
						<TouchableOpacity style={styles.formBtn} onPress={loginHandler}>
							<Text style={{fontSize: 18, fontWeight: "600"}}>Вход</Text>
						</TouchableOpacity>

					</View>

				</View>

			</DismissKeyboard>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 24
	},
	form: {
		gap: 15,
	},
	formRow: {
		alignItems: "center"
	},
	input: {
		paddingLeft: 15,
		paddingVertical: 8,
		paddingRight: 100,
		backgroundColor: "#e2e2e2",
		width: "100%"
	},
	formBtn: {
		paddingHorizontal: 20,
		paddingVertical: 8,
		backgroundColor: "#d2c390",
		alignSelf: "center",
		marginTop: 20
	}
})
