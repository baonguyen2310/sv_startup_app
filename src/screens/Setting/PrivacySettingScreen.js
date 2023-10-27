import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PrivacySettingScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>PrivacySettingScreen</Text>
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