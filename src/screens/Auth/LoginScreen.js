import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
      return alert("Thông tin đăng nhập sai")
    }

    dispatch(loginSuccess(userId))
    const user = await UserServices.getUserById({ userId })
    if (user) {
      dispatch(setUser(user))
    }

    alert("Đăng nhập thành công")
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: "Home" }
      ]
    }));
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});
