import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
//import { auth } from '../services/firebase'; // import Firebase authentication service

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Thực hiện đăng nhập bằng email và mật khẩu sử dụng Firebase
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     // Đăng nhập thành công, thực hiện điều hướng hoặc thực hiện các hành động khác
    //     navigation.navigate('Home'); // Ví dụ: Điều hướng đến màn hình chính sau khi đăng nhập
    //   })
    //   .catch(error => {
    //     // Xử lý lỗi đăng nhập
    //     alert(error.message);
    //   });

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
