import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from 'context/AuthContext';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {ColorsType} from 'context/colors';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {AppModal} from 'components/Modal/AppModal';

export const HomeScreen = () => {
  const {colors, isModalOpen, setIsModalOpen} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: colors.text, fontSize: 18, marginBottom: 20}}>
        Главная страница
      </Text>
      {isModalOpen && (
        <AppModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
      )}
      <TouchableOpacity
        style={{marginTop: 30}}
        onPress={() => navigation.navigate('ProfileStack')}>
        <Text style={styles.text}>Профиль</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: colors.background,
      paddingTop: 20,
      position: 'relative',
    },
    text: {
      fontSize: 16,
      color: colors.text,
    },
  });
};
