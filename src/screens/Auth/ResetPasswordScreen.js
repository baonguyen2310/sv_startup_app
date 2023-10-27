import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import { auth } from '../services/firebase'; // Import Firebase authentication service

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Gửi email xác thực đặt lại mật khẩu bằng Firebase
    // auth
    //   .sendPasswordResetEmail(email)
    //   .then(() => {
    //     // Gửi email xác thực thành công, hiển thị thông báo hoặc điều hướng người dùng
    //     alert('Email xác thực đặt lại mật khẩu đã được gửi.');
    //     navigation.navigate('Login'); // Ví dụ: Điều hướng người dùng đến màn hình đăng nhập
    //   })
    //   .catch(error => {
    //     // Xử lý lỗi gửi email xác thực đặt lại mật khẩu
    //     alert(error.message);
    //   });

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Reset Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Send Reset Email" onPress={handleResetPassword} />
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
