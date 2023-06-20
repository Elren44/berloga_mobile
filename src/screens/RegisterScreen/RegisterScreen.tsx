import React, {useContext, useEffect, useState} from 'react'
import {Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {DismissKeyboard} from "../../components/DismissKeyboard";
import {doUserLogIn, doUserRegistration} from "../../parse/parse";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStack, RootStackParamList} from "../../navigation/RootStack";
import {AuthContext} from "../../context/AuthContext";
import {ColorsType} from "../../context/colors";
import {AuthStackParamList} from "../../navigation/AuthStack";
import axios from "axios";
import {strapiRegister} from "../../strapiServices/services";

export const RegisterScreen = () => {
	const [username, onChangeUsername] = React.useState('');
	const [email, onChangeEmail] = React.useState('');
	const [password, onChangePassword] = React.useState('');
	const [repeatPassword, onChangeRepeatPassword] = React.useState('');
	const {isAuth, setIsAuth, colors} = useContext(AuthContext);
	const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
	const styles = getStyles(colors)
	// const registerHandler = async () => {
	// 	if (password === repeatPassword) {
	// 		try {
	// 			doUserRegistration(username, password).then((user) => {
	// 				if (user) {
	// 					Alert.alert(`Поздравляем ${user.get("username")} вы успешно зарегистрировались`)
	// 					navigation.navigate("Login")
	// 				}
	// 			})
	// 		} catch (error) {
	// 			console.error((error as Error).message);
	// 		}
	// 	} else {
	// 		Alert.alert("Ошибка","Пароли не совпадают!")
	// 	}
	//
	// }

	const registerHandler =  () => {
		if (password === repeatPassword) {
			try {
				strapiRegister(username, email, password)
				Alert.alert(`Поздравляем ${username} вы успешно зарегистрировались`)
				 					navigation.navigate("Login")
			} catch (error) {
				console.error((error as Error).message);
			}
		} else {
			Alert.alert("Ошибка","Пароли не совпадают!")
		}

	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: "#3c3c3c"}}>
			<DismissKeyboard>
				<View style={styles.formContainer}>
					<View style={styles.form}>
						<View style={styles.formRow}>
							<View style={{marginBottom: 6, alignSelf: "flex-start"}}><Text
								style={{color: colors.text}}>Имя</Text></View>

							<TextInput keyboardType={"default"}
							           style={styles.input} placeholder="Введите имя..."
							           placeholderTextColor={colors.textAccentOp}
							           onChangeText={onChangeUsername}
							           value={username}
							/>

						</View><View style={styles.formRow}>
							<View style={{marginBottom: 6, alignSelf: "flex-start"}}><Text
								style={{color: colors.text}}>Логин</Text></View>

							<TextInput keyboardType={"email-address"} autoComplete={"email"}
							           style={styles.input} placeholder="Введите почту..."
							           placeholderTextColor={colors.textAccentOp}
							           onChangeText={onChangeEmail}
							           value={email}
							/>

						</View>
						<View style={styles.formRow}>
							<View style={{marginBottom: 6, alignSelf: "flex-start"}}><Text
								style={{color: colors.text}}>Пароль</Text></View>
							<TextInput style={styles.input} placeholder="Введите пароль..."
							           placeholderTextColor={colors.textAccentOp}
							           onChangeText={onChangePassword}
							           value={password}
							/>
						</View>
						<View style={styles.formRow}>
							<View style={{marginBottom: 6, alignSelf: "flex-start"}}><Text
								style={{color: colors.text}}>Повтор пароля</Text></View>
							<TextInput style={styles.input} placeholder="Повторите пароль..."
							           placeholderTextColor={colors.textAccentOp}
							           onChangeText={onChangeRepeatPassword}
							           value={repeatPassword}
							/>
						</View>
						<View style={styles.submitRow}>
							<Pressable style={styles.loginBtns} onPress={() => {
								navigation.navigate("Login")
							}}>
								<Text style={styles.loginBtnText}>Логин</Text>
							</Pressable>
							<TouchableOpacity style={styles.formBtn} onPress={registerHandler}>
								<Text style={{fontSize: 18, fontWeight: "600", color: colors.textAccent}}>Регистрация</Text>
							</TouchableOpacity>

						</View>

					</View>

				</View>

			</DismissKeyboard>
		</SafeAreaView>
	);
}


const getStyles = (colors:ColorsType) => {
	return (
		StyleSheet.create({
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
				backgroundColor: colors.text,
				width: "100%"
			},
			submitRow: {
				alignItems: "center",
				gap: 20,
				marginTop: 20},
			formBtn: {
				paddingHorizontal: 20,
				paddingVertical: 8,
				backgroundColor: colors.accent,
				alignSelf: "center"
			},
			loginBtns: {
				position: "absolute",
				top: 10,
				left: -40,
			},
			loginBtnText: {
				fontSize: 16,
				fontWeight: "600",
				color: colors.textOp,
			}
		})
	)
}
