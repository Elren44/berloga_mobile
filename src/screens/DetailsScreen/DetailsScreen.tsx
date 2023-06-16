import React from 'react'
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from "@react-navigation/native";

export const DetailsScreen = () => {
	const navigation = useNavigation()
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: "#3c3c3c", paddingTop: 20}}>
			<Text style={{color: "#e2e2e2", marginBottom: 20}}>DetailsScreen</Text>
			<TouchableOpacity><Text style={{color: "#e2e2e2"}} onPress={() => navigation.goBack()}>Назад</Text></TouchableOpacity>
		</SafeAreaView>
	);
}
