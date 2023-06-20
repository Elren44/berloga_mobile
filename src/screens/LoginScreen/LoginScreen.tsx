import React, {useContext, useEffect} from 'react'
import {Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {DismissKeyboard} from "../../components/DismissKeyboard";
import {AuthContext} from "../../context/AuthContext";
import {ColorsType} from "../../context/colors";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {AuthStackParamList} from "../../navigation/AuthStack";
import {strapiLogin} from "../../strapiServices/services";

export const LoginScreen = () => {
	const [username, onChangeUsername] = React.useState('');
	const [password, onChangePassword] = React.useState('');
	const [errorText, setErrorText] = React.useState("")
	const {colors, setIsAuth,} = useContext(AuthContext);
	const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
	const styles = getStyles(colors)
	// const loginHandler = async () => {
	// 	try {
	// 		doUserLogIn(username, password).then((user) => {
	// 			if (user) {
	// 				setIsAuth(true)
	// 			}
	// 		})
	// 	} catch (error) {
	// 		console.error((error as Error).message);
	// 	}
	// }
	const loginHandler = () => {
		strapiLogin(username, password, setErrorText).then((isDone) => {
			setIsAuth(isDone)
		})
		// onChangeUsername("")
		// onChangePassword("")
	}

	useEffect(() => {
		setErrorText("")
	}, [username, password]);


	return (
		<SafeAreaView style={{flex: 1, backgroundColor: "#3c3c3c"}}>
			<DismissKeyboard>
				<View style={styles.formContainer}>
					<View style={styles.form}>
						<View style={styles.formRow}>
							<View style={{marginBottom: 6, alignSelf: "flex-start"}}><Text
								style={{color: colors.text}}>Почта</Text></View>

							<TextInput style={styles.input} placeholder="Введите почту..."
							           placeholderTextColor={colors.textAccentOp}
							           onChangeText={onChangeUsername}
							           value={username}
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
						<View style={styles.submitRow}>

							<View><Text numberOfLines={2} style={{color: colors.error}}>{errorText}</Text></View>
							<View style={{position: "relative"}}>
								<Pressable style={styles.loginBtns} onPress={() => {
									navigation.navigate("Register")
								}}>
									<Text style={styles.loginBtnText}>Регистрация</Text>
								</Pressable>
								<TouchableOpacity style={styles.formBtn} onPress={loginHandler}>
									<Text
										style={{fontSize: 18, fontWeight: "600", color: colors.textAccent}}>Вход</Text>
								</TouchableOpacity>
							</View>

						</View>
					</View>

				</View>

			</DismissKeyboard>
		</SafeAreaView>
	);
}


const getStyles = (colors: ColorsType) => {
	return (
		StyleSheet.create({
			formContainer: {
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				marginHorizontal: 24,
			},
			form: {
				gap: 15,
				width: "80%"
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
				marginTop: 20
			},
			formBtn: {
				paddingHorizontal: 20,
				paddingVertical: 8,
				backgroundColor: colors.accent,
				alignSelf: "center"
			},
			loginBtns: {
				position: "absolute",
				top: 10,
				left: -120,
			},
			loginBtnText: {
				fontSize: 16,
				fontWeight: "600",
				color: colors.textOp,
			}
		})
	)
}
