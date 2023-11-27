import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AuthService from '../../services/firebase/AuthServices';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/loginActions';
import { setUser } from '../../redux/actions/userActions';
import UserServices from '../../services/firebase/UserServices';

export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userId = await AuthService.login(email, password)
    
    if (!userId) {
      return Alert.alert(
        title="Thông báo",
        message="Thông tin đăng nhập không chính xác!",
        buttons=[
          {
            text: "OK",
            onPress: () => null
          }
        ],
        options={
            cancelable: true
        }
      )
    }

    dispatch(loginSuccess(userId))
    const user = await UserServices.getUserById({ userId })
    if (user) {
      dispatch(setUser(user))
    }

    Alert.alert(
      title="Thông báo",
      message="Đăng nhập thành công!",
      buttons=[
        {
          text: "OK",
          onPress: () => null
        }
      ],
      options={
          cancelable: true
      }
    )
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: "Home" }
      ]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3498db' }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
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
    width: "100%",
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
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});