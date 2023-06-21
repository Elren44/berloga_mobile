import React, {FC, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from 'context/AuthContext';
import {ColorsType} from 'context/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProfileStackParamList} from 'navigation/ProfileStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props
  extends NativeStackScreenProps<ProfileStackParamList, 'EditProfile'> {
  // other props ...
}

export const EditProfileScreen: FC<Props> = ({route, navigation}) => {
  const {colors, userData, setUserData} = useContext(AuthContext);
  const styles = getStyles(colors);

  // const {user} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons
            name={'arrow-back-circle-outline'}
            size={50}
            color={colors.text}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Редактирование профиля</Text>
        </View>
      </View>
      {userData && (
        <View style={styles.info}>
          {/* UserName*/}
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>ФИО:</Text>
            <Text style={styles.infoText}> {userData.user.username}</Text>
            <TouchableOpacity style={styles.infoBtn}>
              <Text style={styles.infoBtnText}>Сменить</Text>
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Почта:</Text>
            <Text style={styles.infoText}> {userData.user.email}</Text>
            <TouchableOpacity style={styles.infoBtn}>
              <Text style={styles.infoBtnText}>Сменить</Text>
            </TouchableOpacity>
          </View>
          {/* Phone */}
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Телефон:</Text>
            <Text style={styles.infoText}> {userData.user.phone}</Text>
            <TouchableOpacity style={styles.infoBtn}>
              <Text style={styles.infoBtnText}>Сменить</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const getStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: colors.background,
      // paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
      gap: 30,
      marginBottom: 40,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      marginBottom: 5,
    },
    info: {
      gap: 20,
    },
    infoRow: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    infoTitle: {
      color: colors.text,
      fontSize: 18,
    },
    infoText: {
      color: colors.textOp,
      fontSize: 16,
      flex: 1,
    },
    infoBtn: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 50,
      backgroundColor: colors.accent,
      marginLeft: 20,
    },
    infoBtnText: {
      fontSize: 16,
    },
  });
};
