import React, {useContext, useEffect, useState} from 'react'
import {Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {AuthContext} from "../../context/AuthContext";
import {ColorsType} from "../../context/colors";
import {getUser, logoutUser, strapiGetUser} from "../../strapiServices/services";
import {BASE_URL, URL_ADDRESS} from "../../config/config";

export const DetailsScreen = () => {
	const {colors, setIsAuth} = useContext(AuthContext)
	const [userName, setUserName] = useState<string | undefined>("")
	const [createdAt, setCreatedAt] = useState("")
	const [isExit, setIsExit] = useState(false)
	const [avatar, setAvatar] = useState("")
	const [userJwt, setUserJwt] = useState("")

	const styles = getStyles(colors)
	useEffect(() => {
		try {
			getUser().then((user) => {
				if (user) {
					// console.log(user)
					setUserJwt(user.jwt)
					const username = user.user.email
					const created = new Date(user.user.createdAt)
					setUserName(username)
					setCreatedAt(created.toLocaleString("ru", {year: 'numeric', month: 'long', day: "numeric"}))
					strapiGetUser(user.jwt).then((data) => {
						setAvatar(data.data.avatar.url)
					})

				}
			})

		} catch (error) {
			console.error((error as Error).message);
		}
	}, [])

	const showAlert = () =>
		Alert.alert(
			'Внимание',
			'Вы действительно хотите выйти из аккаунта?',
			[
				{
					text: 'Да',
					onPress: () => setIsExit(true),
					style: 'default',
				},
				{
					text: 'Отмена',
					onPress: () => setIsExit(false),
					style: 'cancel',
				},
			],
			{
				cancelable: true,
				onDismiss: () =>
					setIsExit(false)
			},
		);

	const logoutHandler = () => {
		logoutUser().then((data) => {
			setIsAuth(false)
		})

	}

	useEffect(() => {
		if (isExit) {
			logoutHandler()
		}
	}, [isExit]);


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={{color: colors.text, marginBottom: 20, fontSize: 18}}>Профиль пользователя</Text>
				<Pressable onPress={() => console.log("press")} style={styles.avatar}>
					<Image source={{uri: `${URL_ADDRESS}${avatar}`,
						headers: {
							Authorization: `Bearer ${userJwt}`
						}}
					} style={styles.avatarImg}/>
				</Pressable>
			</View>

			<View>
				<Text style={styles.descr}>Почта: {userName}</Text>
				<Text style={styles.descr}>Создан: {createdAt}</Text>
			</View>

			<TouchableOpacity onPress={showAlert}><Text style={styles.exit}>Выйти</Text></TouchableOpacity>
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
			header: {
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center"
			},
			descr: {
				fontSize: 16,
				color: colors.text,
				marginBottom: 10
			},
			exit: {
				fontSize: 16,
				color: colors.text,
				marginTop: 30
			},
			avatar: {
				width: 80,
				height: 80,
				// backgroundColor: colors.text,
				borderRadius: 40,
				borderStyle: "solid",
				borderColor: colors.accent,
				borderWidth: 5,
				overflow: "hidden",
				alignItems: "center",
				justifyContent: "center"
			},
			avatarImg: {
				width: 80,
				height: 80
			}
		})
	)
}
