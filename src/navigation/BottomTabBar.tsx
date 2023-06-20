

import {HomeScreen} from "../screens/HomeScreen/HomeScreen";
import {DetailsScreen} from "../screens/DetailsScreen/DetailsScreen";
import React, {useContext, useState} from 'react';
import {
	Animated,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ColorsType} from "../context/colors";
import {AuthContext} from "../context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {AppModal} from "../components/Modal/AppModal";

export const BottomTabBar = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const {colors} = useContext(AuthContext)
	const styles = getStyles(colors)
	const navigation = useNavigation()
	const _renderIcon = (routeName: any, selectedTab: any) => {
		let icon = '';

		switch (routeName) {
			case 'Home':
				icon = 'home-outline';
				break;
			case 'Details':
				icon = 'person-circle-outline';
				break;
		}

		return (
			<Ionicons
				name={icon}
				size={routeName === selectedTab ? 30 : 25}
				color={routeName === selectedTab ? colors.text : colors.textOp}
			/>
		);
	};
	const renderTabBar = ({ routeName, selectedTab, navigate }:{ routeName: any, selectedTab: any, navigate: any }) => {
		return (
			<TouchableOpacity
				onPress={() => navigate(routeName)}
				style={styles.tabbarItem}
			>
				{_renderIcon(routeName, selectedTab)}
			</TouchableOpacity>
		);
	};



	return (
		<>
			{modalOpen && (
				 <AppModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
				)}
			<CurvedBottomBar.Navigator
			type="DOWN"
			screenOptions={{headerShown: false}}
			style={styles.bottomBar}
			shadowStyle={styles.shawdow}
			height={50}
			circleWidth={50}
			bgColor={colors.background}
			initialRouteName="Home"
			borderTopLeftRight
			renderCircle={({selectedTab, navigate}) => (
				<Animated.View style={styles.btnCircleUp}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => setModalOpen((prev) => !prev)}
					>
						<Ionicons name='apps-sharp' color={colors.background} size={25}/>
					</TouchableOpacity>
				</Animated.View>
			)}
			tabBar={renderTabBar}
		>
			<CurvedBottomBar.Screen
				name="Home"
				position="LEFT"
				component={HomeScreen}
			/>
			<CurvedBottomBar.Screen
				name="Details"
				component={DetailsScreen}
				position="RIGHT"
			/>
		</CurvedBottomBar.Navigator></>
	);
}

const getStyles = (colors: ColorsType) => {
	return (
		StyleSheet.create({
			container: {
				flex: 1,
				padding: 20,
			},
			shawdow: {
				shadowColor: colors.text,
				shadowOffset: {
					width: 0,
					height: 0,
				},
				shadowOpacity: 0.3,
				shadowRadius: 10,
			},
			button: {
				flex: 1,
				justifyContent: 'center',

			},
			bottomBar: {
				backgroundColor: colors.background
			},
			btnCircleUp: {
				width: 60,
				height: 60,
				borderRadius: 30,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: colors.accent,
				bottom: 28,
				shadowColor: colors.accent,
				shadowOffset: {
					width: 0,
					height: -10,
				},
				shadowOpacity: 0.8,
				shadowRadius: 10,
				elevation: 10,
			},
			imgCircle: {
				width: 30,
				height: 30,
				tintColor: colors.accent,
			},
			tabbarItem: {
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			},
			img: {
				width: 30,
				height: 30,
			},

		})
	)
}
