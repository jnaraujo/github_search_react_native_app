import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageModal from '../ImageModal';

import styles from './styles';

import {numberFormatter} from './utils';

interface IProfileHeaderProps {
  username: string;
  profilePicture: string;
  followers: number;
  following: number;

  onEdit?: () => void;
  bio?: string;
}

export default function ProfileHeader({
  username,
  profilePicture,
  onEdit,
  bio,
  followers,
  following,
}: IProfileHeaderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={openModal}>
          <Image
            source={
              profilePicture
                ? {
                    uri: profilePicture,
                  }
                : require('../../assets/Octocat.jpg')
            }
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View style={styles.textInfoView}>
          <View style={styles.userNameView}>
            <Text style={styles.username}>{username}</Text>
            {onEdit && (
              <Icon
                style={styles.editIcon}
                name="pencil"
                size={20}
                color="#6c757d"
                onPress={() => {
                  onEdit();
                }}
              />
            )}
          </View>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bio}>
            {bio || 'Sem bio :('}
          </Text>
          <View style={styles.userFollow}>
            <Text style={styles.followNumber}>
              <Text style={styles.followBold}>
                {numberFormatter(followers || 0)}
              </Text>{' '}
              followers
            </Text>
            <Text style={styles.followNumber}>
              <Text style={styles.followBold}>
                {numberFormatter(following || 0)}
              </Text>{' '}
              following
            </Text>
          </View>
        </View>
      </View>
      <ImageModal
        image={profilePicture}
        onClose={() => setIsModalVisible(false)}
        isClosed={isModalVisible}
      />
    </>
  );
}
