import { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from "react-redux";
// import { loginSuccess } from "../../redux/actions/loginActions"
import AuthService from '../../services/firebase/AuthServices';

export default function LandingScreen({ navigation }) {
  useEffect(() => {
    AuthService.checkLoggedIn()
    .then((user) => {
      if (user) {
        console.log(user);
        navigation.navigate('Home');
      }
    }).catch((error) => console.log(error))
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
