import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech'

export default function BabylonTextToSpeechWebView() {
  useEffect(() => {
    setTimeout(() => {
      Speech.speak('Xin chào, tớ là trợ lý ảo AI của cậu. Cậu có thể hỏi tớ bất cứ gì cậu muốn')
    }, 5000)
  })


  //https://periwinkle-rust-ceiling.glitch.me/
  //https://sunny-continuous-sock.glitch.me/
    return (
      <WebView
        style={styles.container}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        source={{ uri: 'https://exclusive-fate-wolfsbane.glitch.me/' }}
      />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});