import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from 'screens/ProfileScreen/ProfileScreen';
import {EditProfileScreen} from 'screens/EditProfileScreen/EditProfileScreen';
import {UserData} from 'context/AuthContext';

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: {user: UserData | null};
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Profile'}
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name={'Profile'} component={ProfileScreen} />
      <Stack.Screen name={'EditProfile'} component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
