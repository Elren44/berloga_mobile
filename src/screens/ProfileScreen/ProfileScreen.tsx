import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {AuthContext, UserData} from 'context/AuthContext';
import {ColorsType} from 'context/colors';
import {getUser, logoutUser, strapiGetUser} from 'strapiServices/services';
// import {URL_ADDRESS} from "../../config/config";
import {Avatar} from './Avatar/Avatar';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileStackParamList} from 'navigation/ProfileStack';
import {AppModal} from 'components/Modal/AppModal';

export const ProfileScreen = () => {
  const {
    colors,
    setIsAuth,
    userData,
    setUserData,
    isModalOpen,
    setIsModalOpen,
  } = useContext(AuthContext);
  const [createdAt, setCreatedAt] = useState('');
  const [isExit, setIsExit] = useState(false);
  const [avatar, setAvatar] = useState('');
  const styles = getStyles(colors);
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  useEffect(() => {
    getUser().then(user => {
      if (user) {
        // setUserData(user);
        const created = new Date(user.user.createdAt);
        // setUserData(user);
        // console.log('profile user ', user);
        setCreatedAt(
          created.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        );
        strapiGetUser(user.jwt).then(data => {
          if (data.data.avatar) {
            setAvatar(data.data.avatar.url);
          }
          const newUser: UserData = {
            ...user,
            user: {
              ...data.data,
            },
          };
          setUserData(newUser);
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
      setUserData({});
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
        <Avatar
          avatar={avatar}
          setAvatar={setAvatar}
          userJwt={userData ? userData.jwt : ''}
        />
      </View>

      {isModalOpen && (
        <AppModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
      )}
      {userData && (
        <View>
          <Text style={styles.descr}>Почта: {userData.user.email}</Text>
          <Text style={styles.descr}>Создан: {createdAt}</Text>
        </View>
      )}
      <Pressable
        onPress={() => navigation.navigate('EditProfile', {user: userData})}>
        <Text style={styles.descr}>Редактировать</Text>
      </Pressable>

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
      // alignItems: 'center',
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
