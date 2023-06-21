import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {URL_ADDRESS} from 'config/config';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {strapiGetUser, updateAvatar} from 'strapiServices/services';
import {ColorsType} from 'context/colors';
import {AuthContext} from 'context/AuthContext';

type AvatarProps = {
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
  userJwt: string;
};

export const Avatar = ({avatar, setAvatar, userJwt}: AvatarProps) => {
  const {colors, setIsAuth, userData, setUserData} = useContext(AuthContext);
  const [pickedAvatar, setPickedAvatar] = useState<Asset>({});
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [avatarId, setAvatarId] = useState(null);
  const styles = getStyles(colors);

  useEffect(() => {
    if (isUpdatingAvatar) {
      setTimeout(() => {
        strapiGetUser(userJwt).then(user => {
          console.log('details effect ', user);
          if (user.data.avatar) {
            setAvatar(user.data.avatar.url);
            setAvatarId(user.data.avatar.id);
          }
          // setPickedAvatar({});
          setIsUpdatingAvatar(false);
        });
      }, 500);
    }
  }, [isUpdatingAvatar]);

  useEffect(() => {
    if (!isUpdatingAvatar && pickedAvatar.fileName && userData) {
      updateAvatar(pickedAvatar, userData, avatarId);
    }
  }, [pickedAvatar]);

  const avatarHandler = () => {
    if (!isUpdatingAvatar && userData) {
      launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.didCancel) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          console.log('Image selected: ', response.assets);
          if (response.assets) {
            const avatarImg = {
              ...response.assets[0],
              fileName: `${userData.user.uuid}-avatar.jpg`,
            };
            // console.log(avatarImg);
            setPickedAvatar(avatarImg);
            setIsUpdatingAvatar(true);
          }
        }
      });
    }
  };
  return (
    <Pressable onPress={() => avatarHandler()} style={styles.avatar}>
      <Image
        source={{
          uri: `${URL_ADDRESS}${avatar}`,
          headers: {
            Authorization: `Bearer ${userJwt}`,
          },
        }}
        style={styles.avatarImg}
      />
    </Pressable>
  );
};
const getStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderStyle: 'solid',
      borderColor: colors.accent,
      borderWidth: 5,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarImg: {
      width: 80,
      height: 80,
    },
  });
};
