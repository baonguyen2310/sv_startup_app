import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';

export default function NotificationSettingScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cài đặt thông báo</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.content}>Thông báo</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scale: 2 }] }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1
  }
});