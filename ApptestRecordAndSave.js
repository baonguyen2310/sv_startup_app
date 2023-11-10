import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { View, Button } from 'react-native';

export default function App() {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const { sound } = await recording.createNewLoadedSoundAsync();
    setSound(sound);

    // Lưu tệp âm thanh dưới dạng MP3
    const info = await FileSystem.getInfoAsync(recording.getURI());
    const newUri = FileSystem.documentDirectory + 'recording.mp3';
    await FileSystem.copyAsync({
      from: info.uri,
      to: newUri,
    });

    // Phát lại tệp âm thanh sau khi lưu
    const { sound: playbackSound } = await Audio.Sound.createAsync(
      { uri: newUri },
      { shouldPlay: true }
    );
    playbackSound.setOnPlaybackStatusUpdate(status => {
      if (!status.isPlaying) {
        playbackSound.unloadAsync();
      }
    });
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ margin: 100 }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}
