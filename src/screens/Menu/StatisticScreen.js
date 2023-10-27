import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function StatisticScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>StatisticScreen</Text>
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