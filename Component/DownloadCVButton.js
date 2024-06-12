import React from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const DownloadCVButton = () => {
  const downloadCV = async () => {
    let downloadUrl = '';


    downloadUrl = 'https://drive.google.com/file/d/18g2QmmPhyyihQUh8EWG1ebo_83WgTh_m/view';

    if (Platform.OS === 'web') {

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'CV.pdf';
      document.body.appendChild(a);
      a.click();
    } else {

      const fileUri = FileSystem.documentDirectory + 'CV.pdf';
      const download = await FileSystem.downloadAsync(downloadUrl, fileUri);

      if (download.status === 200) {
        await Sharing.shareAsync(download.uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Download CV" onPress={downloadCV} color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default DownloadCVButton;
