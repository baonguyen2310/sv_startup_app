import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import AuthService from '../../services/firebase/AuthServices';
import UserServices from '../../services/firebase/UserServices';

import { tinhTuoi } from '../../utils';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState(new Date())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [childName, setChildName] = useState('')
  const [childGender, setChildGender] = useState('Male')
  const [childBirthdate, setChildBirthdate] = useState(new Date())

  const [chamNoiLevel, setChamNoiLevel] = useState(0)
  const [roiLoanNgonNguLevel, setRoiLoanNgonNguLevel] = useState(0)

  const [showBirthdatePicker, setShowBirthdatePicker] = useState(false)
  const [showChildBirthdatePicker, setShowChildBirthdatePicker] = useState(false)

  function handleBirthdatePickerChange(event, selectedDate) {
    setShowBirthdatePicker(false)
    setBirthdate(selectedDate)
  }

  function handleChildBirthdatePickerChange(event, selectedDate) {
    setShowChildBirthdatePicker(false)
    setChildBirthdate(selectedDate)
  }

  const handleRegister = async () => {
    const user = await AuthService.register(email, password)
    
    if (user) {
      try {
        await UserServices.createUser({
          userId: user,
          email: email,
          phone: phone,
          birthdate: birthdate,
          firstName: firstName,
          lastName: lastName,
          childName: childName,
          childGender: childGender,
          childBirthdate: childBirthdate
        })
      } catch (error) {
        return
      }
      console.log(user)
      Alert.alert(
        title="Thông báo",
        message="Đăng ký thành công!",
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
      navigation.navigate('Login'); 
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.secondary}>Thông tin người dùng:</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          inputMode='email'
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          inputMode='tel'
        />
        <Text style={styles.input} onPress={() => setShowBirthdatePicker(true)}>
          Ngày sinh: { birthdate.toLocaleDateString() }
        </Text>
        {
          showBirthdatePicker && (
            <DateTimePicker
              value={birthdate}
              mode='date'
              is24Hour={true}
              onChange={handleBirthdatePickerChange}
            />
          )
        }
        <TextInput
          placeholder="Họ"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Tên"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <Text style={styles.secondary}>Thông tin của bé:</Text>
        <TextInput
          placeholder="Tên"
          value={childName}
          onChangeText={setChildName}
          style={styles.input}
        />
        <View style={styles.selectContainer}>
          <Text>Giới tính của bé:</Text>
          <Picker
            mode="dropdown"
            style={styles.selectPicker}
            prompt='Child Gender'
            selectedValue={childGender}
            onValueChange={(itemValue) => setChildGender(itemValue)}>
            <Picker.Item label="Nam" value="Male" />
            <Picker.Item label="Nữ" value="Female" />
          </Picker>
        </View>
        <Text style={styles.input} onPress={() => setShowChildBirthdatePicker(true)}>
          Ngày sinh: { childBirthdate.toLocaleDateString() }
        </Text>
        {
          showChildBirthdatePicker && (
            <DateTimePicker
              value={childBirthdate}
              mode='date'
              is24Hour={true}
              onChange={handleChildBirthdatePickerChange}
            />
          )
        }
        <TextInput
          placeholder=""
          value={`Tuổi: ${tinhTuoi(childBirthdate)}`}
          style={styles.input}
          editable={false}
        />
        <TouchableOpacity>
        <Text style={styles.surveyLink}>Khảo sát đánh giá mức độ chậm nói</Text>
        </TouchableOpacity>
        <View style={[styles.input, styles.containerInput]}>
          <Text>Mức độ chậm nói: {chamNoiLevel}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#508D69"
            maximumTrackTintColor="#000000"
            step={1}
            onValueChange={(value) => setChamNoiLevel(value)}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.surveyLink}>Khảo sát đánh giá rối loạn ngôn ngữ</Text>
        </TouchableOpacity>
        <View style={[styles.input, styles.containerInput]}>
          <Text>Mức độ rối loạn ngôn ngữ: {roiLoanNgonNguLevel}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#508D69"
            maximumTrackTintColor="#000000"
            step={1}
            onValueChange={(value) => setRoiLoanNgonNguLevel(value)}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
  containerInput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 70
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
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: -25,
    padding: 5
  },
  selectPicker: {
    width: '45%'
  },
  surveyLink: {
    color: "#508D69",
    fontStyle: "italic",
    textDecorationLine: "underline"
  }
});
