import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from 'screens/HomeScreen/HomeScreen';
import {ProfileScreen} from 'screens/ProfileScreen/ProfileScreen';
import {EditProfileScreen} from 'screens/EditProfileScreen/EditProfileScreen';
import {BottomTabBar} from 'navigation/BottomTabBar';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  // EditProfile: undefined;
  BottomBar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomBar'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'BottomBar'} component={BottomTabBar} />
      {/*<Stack.Screen*/}
      {/*  name={'Home'}*/}
      {/*  component={HomeScreen}*/}
      {/*  options={{headerShown: false}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name={'Profile'}*/}
      {/*  component={ProfileScreen}*/}
      {/*  options={{headerShown: false}}*/}
      {/*/>*/}
      {/*<Stack.Screen name={'EditProfile'} component={EditProfileScreen} />*/}
    </Stack.Navigator>
  );
};
