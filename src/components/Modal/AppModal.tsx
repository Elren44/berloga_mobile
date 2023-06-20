import React, {Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from 'react'
import {Animated, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View,} from 'react-native'
import {ColorsType} from "../../context/colors";
import {AuthContext} from "../../context/AuthContext";
import GestureRecognizer from 'react-native-swipe-gestures';
import {Parse} from "../../parse/parse";
import {getAllCourses} from "../../strapiServices/services";

type AppModalProps = {
	modalOpen: boolean,
	setModalOpen: Dispatch<SetStateAction<boolean>>
}

type Course = {
	objectId: string,
	title: string,
	description: string[]
}

export const AppModal = ({modalOpen, setModalOpen}: AppModalProps) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(1000)).current
	const [courses, setCourses] = useState([new Parse.Object('Person')])


	const {colors} = useContext(AuthContext)
	const styles = getStyles(colors)

	useEffect(() => {
		fadeIn()
		function fetchCourses() {
			let coursesFetched = getAllCourses()
			return coursesFetched
		}
		fetchCourses().then((courses) => {
			setCourses(courses.data.data)
		// console.log(courses.data.data)
		})
	}, []);


	const fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start()
	};

	const fadeOut = () => {

		// Will change fadeAnim value to 0 in 3 seconds
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
		Animated.timing(slideAnim, {
			toValue: 1000,
			duration: 300,
			useNativeDriver: true,
		}).start();
		setTimeout(() => {
			setModalOpen(false)
		}, 300)

	};


	return (
		<SafeAreaView style={styles.container}>
			<GestureRecognizer style={{flex: 1}}
			                   onSwipeUp={() => fadeIn()}
			                   onSwipeDown={() => fadeOut()}
			>
				<Animated.View style={[styles.modal, {
					opacity: fadeAnim, transform: [
						{translateY: slideAnim}
					]
				}]}>
					<View>
						<Text style={styles.title}>
							Список курсов:
						</Text>
					</View>

					<FlatList data={courses} contentContainerStyle={{gap: 10}}
					          keyExtractor={(item) => item.attributes.uuid}
					          showsVerticalScrollIndicator={false}
					          scrollEnabled={true} renderItem={({item}) => (
						<View style={styles.course}>
							<Text style={{color: colors.text}}>{item.attributes.title}</Text>

						</View>
					)}>
					</FlatList>
					<Text style={styles.closeBtn} onPress={fadeOut}>Закрыть</Text>
				</Animated.View>
			</GestureRecognizer>
		</SafeAreaView>
	);
}

const getStyles = (colors: ColorsType) => {
	return (
		StyleSheet.create({
			container: {
				position: "relative",
				zIndex: 1
			},
			modal: {
				position: "absolute",
				bottom: 0,
				top: 30,
				left: 0,
				right: 0,
				width: Dimensions.get("window").width - 60,
				height: Dimensions.get("window").height - 200,
				backgroundColor: colors.text,
				margin: 30,
				borderRadius: 30,
				zIndex: 2,
				padding: 24,
			},
			closeBtn: {
				position: "absolute",
				right: 20,
				top: 28,
				color: colors.background
			},
			title: {
				fontSize: 18,
				fontWeight: "600",
				marginBottom: 30,
				color: colors.background
			},
			course: {
				padding: 10,
				backgroundColor: colors.background,
				flexDirection: "row",
				justifyContent: "space-between"
			}
		})
	)
}
