import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from 'context/AuthContext';
import {ColorsType} from 'context/colors';
import {getUser, logoutUser, strapiGetUser} from 'strapiServices/services';
// import {URL_ADDRESS} from "../../config/config";
import {Avatar} from './Avatar/Avatar';

export const ProfileScreen = () => {
  const {colors, setIsAuth, userData, setUserData} = useContext(AuthContext);
  const [userName, setUserName] = useState<string | undefined>('');
  const [createdAt, setCreatedAt] = useState('');
  const [isExit, setIsExit] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [userJwt, setUserJwt] = useState('');
  const styles = getStyles(colors);

  useEffect(() => {
    getUser().then(user => {
      if (user) {
        setUserJwt(user.jwt);
        const username = user.user.email;
        const created = new Date(user.user.createdAt);
        setUserName(username);
        setUserData(user);
        setCreatedAt(
          created.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        );
        strapiGetUser(user.jwt).then(data => {
          setAvatar(data.data.avatar.url);
        });
      }
    });
  }, []);

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
        onDismiss: () => setIsExit(false),
      },
    );

  const logoutHandler = () => {
    logoutUser().then(data => {
      setIsAuth(false);
    });
  };

  useEffect(() => {
    if (isExit) {
      logoutHandler();
    }
  }, [isExit]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: colors.text, marginBottom: 20, fontSize: 18}}>
          Профиль пользователя
        </Text>
        <Avatar avatar={avatar} setAvatar={setAvatar} userJwt={userJwt} />
      </View>

      <View>
        <Text style={styles.descr}>Почта: {userName}</Text>
        <Text style={styles.descr}>Создан: {createdAt}</Text>
      </View>

      <TouchableOpacity onPress={showAlert}>
        <Text style={styles.exit}>Выйти</Text>
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
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    descr: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 10,
    },
    exit: {
      fontSize: 16,
      color: colors.text,
      marginTop: 30,
    },
  });
};
