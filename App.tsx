import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {RootStack} from "./src/navigation/RootStack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Router} from "./src/navigation/Router";
import {AuthContext, AuthContextProvider} from "./src/context/AuthContext";


function App() {



	return (
		<SafeAreaProvider>
			<AuthContextProvider>
				<Router/>
				<StatusBar barStyle={"light-content"} backgroundColor={"#3c3c3c"}/>
			</AuthContextProvider>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#3c3c3c",
		flex: 1,
	}
});

export default App;
