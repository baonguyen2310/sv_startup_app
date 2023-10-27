import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function LanguageSettingScreen() {
  const [selectedItem, setSelectedItem] = useState("vietnamese");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt ngôn ngữ</Text>
      <Picker
        mode="dropdown"
        style={{ backgroundColor: 'lightgray', color: "black" }}
        prompt='Chọn ngôn ngữ'
        selectedValue={selectedItem}
        onValueChange={(itemValue) => setSelectedItem(itemValue)}>
        <Picker.Item label="Tiếng Việt" value="vietnamese" />
        <Picker.Item label="English" value="english" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});