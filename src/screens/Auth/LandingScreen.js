import { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthService from '../../services/firebase/AuthServices';
import UserServices from '../../services/firebase/UserServices';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions'

export default function LandingScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser(){
      const userId = await AuthService.checkLoggedIn()
      if (userId) {
        console.log(userId);
        try {
          const user = await UserServices.getUserById({ userId })
          if (user) {
            dispatch(setUser(user))
          }
        } catch (error) {
          return
        }
        navigation.navigate('Home');
      }
    }

    getUser()

  //   AuthService.checkLoggedIn()
  //   .then((userId) => {
  //     if (userId) {
  //       console.log(userId);
  //       navigation.navigate('Home');
  //     }
  //   }).catch((error) => console.log(error))
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button title="Log In" onPress={() => navigation.navigate('Login')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
