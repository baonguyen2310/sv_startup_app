import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileSettingScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ProfileSettingScreen</Text>
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
});