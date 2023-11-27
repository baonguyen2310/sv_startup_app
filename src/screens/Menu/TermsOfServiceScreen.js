import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Điều khoản dịch vụ</Text>
      <WebView
        style={styles.containerWebView}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        source={{ uri: 'https://ivkids.vercel.app/termsofservice' }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerWebView: {
    flex: 1,
    width: "100%",
    height: 700,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
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