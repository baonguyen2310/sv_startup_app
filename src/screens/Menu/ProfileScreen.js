import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AuthService from '../../services/firebase/AuthServices';
import UserServices from '../../services/firebase/UserServices';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

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
      <Text>Profile</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        inputMode='email'
        editable={false}
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        inputMode='tel'
      />
      <Text style={styles.input} onPress={() => setShowBirthdatePicker(true)}>
        Birthdate: { birthdate.toLocaleDateString() }
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
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Child Name"
        value={childName}
        onChangeText={setChildName}
        style={styles.input}
      />
      <View style={styles.selectContainer}>
        <Text style={{ color: "#555" }}>Child Gender</Text>
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
        Child Birthdate: { childBirthdate.toLocaleDateString() }
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
      <Button title="Update" onPress={handleUpdate} />
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
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5
  },
  selectPicker: {
    width: '45%'
  }
});
