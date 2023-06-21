import {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AuthContext} from 'context/AuthContext';
import {BottomTabBar} from './BottomTabBar';
import {getUser} from 'strapiServices/services';
import {RootStack} from 'navigation/RootStack';

export const Router = () => {
  const {isAuth, setIsAuth, setUserData} = useContext(AuthContext);

  useEffect(() => {
    getUser().then(user => {
      if (user && user !== null) {
        // console.log("user!!!!!", user)
        setIsAuth(true);
        // setUserData(user)
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <BottomTabBar /> : <AuthStack />}
      {/*<BottomTabBar />*/}
    </NavigationContainer>
  );
};
