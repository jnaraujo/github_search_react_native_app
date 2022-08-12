import React from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
  PermissionsAndroid,
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import rnf from 'react-native-fs';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

interface IImageModalProps {
  image: string;
  isClosed: boolean;
  onClose: () => void;
  username?: string;
}

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export default function ImageModal({
  image,
  isClosed,
  onClose,
  username,
}: IImageModalProps) {
  const close = () => {
    onClose();
  };

  const saveProfilePic = async () => {
    const hasPermission = await hasAndroidPermission();
    if (hasPermission) {
      const downloadDest = `${rnf.TemporaryDirectoryPath}/${
        username?.replace(/\s/g, '') || 'profile'
      }.jpg`;

      await rnf.downloadFile({
        fromUrl: image,
        toFile: downloadDest,
      });

      console.log(downloadDest);

      CameraRoll.save(downloadDest, {
        type: 'photo',
        album: 'AweProfile',
      })
        .then(() => {
          Alert.alert('Imagem salva com sucesso!');
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Erro ao salvar a imagem.');
        })
        .finally(() => {
          rnf.unlink(downloadDest);
        });
    } else {
      Alert.alert('A permissão de armazenamento não foi concedida.');
    }
  };

  return (
    <View style={styles.main}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isClosed}
        onRequestClose={close}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={[styles.buttonClose]} onPress={close}>
              <Icon name="close" size={15} color="#ffffff" />
            </Pressable>

            <Image source={{uri: image}} style={styles.image} />

            <Pressable style={[styles.buttonDownload]} onPress={saveProfilePic}>
              <Icon name="download" size={18} color="#000000" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
