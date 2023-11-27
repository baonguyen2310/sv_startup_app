import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PrivacySettingScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cài đặt quyền riêng tư</Text>
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
    textAlign: 'center',
    color: '#F875AA'
  },
  content: {
    fontSize: 16,
  },
});