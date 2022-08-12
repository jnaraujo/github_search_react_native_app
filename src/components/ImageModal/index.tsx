import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

interface IImageModalProps {
  image: string;
  isClosed: boolean;
  onClose: () => void;
}

export default function ImageModal({
  image,
  isClosed,
  onClose,
}: IImageModalProps) {
  const close = () => {
    onClose();
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
          </View>
        </View>
      </Modal>
    </View>
  );
}
