import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import AuthService from '../../services/firebase/AuthServices';
import UserServices from '../../services/firebase/UserServices';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

import { tinhTuoi } from '../../utils';

export default function ProfileScreen({ navigation }) {
  const [userId, setUserId] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    async function getUser() {
      const userId = await AuthService.checkLoggedIn()
      if (userId) {
        try {
          const user = await UserServices.getUserById({ userId })
          if (user) {
            setUserId(userId)
            setEmail(user.email)
            setPhone(user.phone)
            setBirthdate(new Date(user.birthdate))
            setFirstName(user.firstName)
            setLastName(user.lastName)

            setChildName(user.childName)
            setChildGender(user.childGender)
            setChildBirthdate(new Date(user.childBirthdate))
          }
        } catch (error) {
          console.log(error)
          return
        }
      }
    }

    getUser()
  }, [])


  const [email, setEmail] = useState('')
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

  const handleUpdate = async () => {
    try {
      await UserServices.updateUser({
        userId: userId,
        phone: phone,
        birthdate: birthdate,
        firstName: firstName,
        lastName: lastName,
        childName: childName,
        childGender: childGender,
        childBirthdate: childBirthdate
      })

      const user = await UserServices.getUserById({ userId })
      if (user) {
        dispatch(setUser(user))
      }
    } catch (error) {
      return
    }
    alert("Cập nhật thành công")
  }

  return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.secondary}>Thông tin người dùng:</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        inputMode='email'
        editable={false}
      />
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
      <Text style={styles.secondary}>Thông tin của bé:</Text>
      <TextInput
        placeholder="Tên"
        value={childName}
        onChangeText={setChildName}
        style={styles.input}
      />
      <View style={styles.selectContainer}>
        <Text>Giới tính của bé: </Text>
        <Picker
          mode="dropdown"
          style={styles.selectPicker}
          prompt='Giới tính'
          selectedValue={childGender}
          onValueChange={(itemValue) => setChildGender(itemValue)}>
          <Picker.Item label="Nam" value="Male" />
          <Picker.Item label="Nữ" value="Female" />
        </Picker>
      </View>
      <Text style={styles.input} onPress={() => setShowChildBirthdatePicker(true)}>
        Ngày sinh: { childBirthdate.toLocaleDateString() }
      </Text>
      <TextInput
        placeholder=""
        value={`Tuổi: ${tinhTuoi(childBirthdate)}`}
        style={styles.input}
        editable={false}
      />
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
      <Button title="Cập nhật" onPress={handleUpdate} />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  containerInput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 70
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5
  },
  selectPicker: {
    width: '45%'
  },
  surveyLink: {
    color: "#508D69",
    fontStyle: "italic",
    textDecorationLine: "underline"
  },
  secondary: {
    color: "#0dcaf0",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: 'center'
  },
});
