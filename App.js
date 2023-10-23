import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import Header from './src/components/Header';

export default function App() {
  return (
    <AppNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
