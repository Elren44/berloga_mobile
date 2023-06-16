import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "../screens/HomeScreen/HomeScreen";
import {DetailsScreen} from "../screens/DetailsScreen/DetailsScreen";

export type RootStackParamList = {
	Home: undefined;
	Details: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootStack = () => {
	// const [isAuth, setIsAuth] = useState(false)
	//
	// const checkAuth = async () => {
	// 	let loggedIn = await isLoggedIn();
	// 	setIsAuth(loggedIn)
	// }
	// useEffect(() => {
	// 	checkAuth()
	// }, []);
	return (
		<Stack.Navigator initialRouteName={"Home"}>
			<Stack.Screen name={"Home"} component={HomeScreen}
			              options={{headerShown: false}}/>
			<Stack.Screen name={"Details"} component={DetailsScreen} options={{headerShown: false}}/>
		</Stack.Navigator>
	);
}
