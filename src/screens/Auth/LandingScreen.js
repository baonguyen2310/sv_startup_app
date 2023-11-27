import { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AuthService from '../../services/firebase/AuthServices';
import UserServices from '../../services/firebase/UserServices';
import { CommonActions } from '@react-navigation/native';

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
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [
            { name: "Home" }
          ]
        }))
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
      <View style={styles.header}>
        <Text style={styles.title}>Chào mừng bạn đến với IV Kids</Text>
        <Text style={styles.secondary}>Ứng dụng cải thiện Tiếng Việt cho trẻ từ 2 đến 6 tuổi</Text>
      </View>
      <Image style={styles.body} source={require("../../assets/images/icon-2.png")}/>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3498db' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10
  },
  header: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    resizeMode: 'contain'
  },
  footer: {
    width: "100%",
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F875AA'
  },
  secondary: {
    color: "#0dcaf0",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: 'center'
  },
  button: {
    marginVertical: 10,
    padding: 10,
    width: "100%",
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    alignItems: 'center', // Canh giữa nội dung bên trong TouchableOpacity
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});