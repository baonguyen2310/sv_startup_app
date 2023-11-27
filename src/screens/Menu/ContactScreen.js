import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Liên hệ</Text>
      <Text style={styles.secondary}>Địa chỉ email:</Text>
      <Text style={styles.secondary}>baonguyencoder97@gmail.com</Text>
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
    color: '#F875AA',
    margin: 10
  },
  content: {
    fontSize: 16,
  },
  secondary: {
    color: "#0dcaf0",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: 'center'
  },
});