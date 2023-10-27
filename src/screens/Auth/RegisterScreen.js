import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import { auth } from '../services/firebase'; // import Firebase authentication service

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Thực hiện đăng ký bằng email và mật khẩu sử dụng Firebase
    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     // Đăng ký thành công, thực hiện điều hướng hoặc thực hiện các hành động khác
    //     navigation.navigate('Login'); // Ví dụ: Điều hướng người dùng đến màn hình đăng nhập sau khi đăng ký
    //   })
    //   .catch(error => {
    //     // Xử lý lỗi đăng ký
    //     alert(error.message);
    //   });

    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
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
