import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import Lottie from 'lottie-react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingRepo from '../../components/LoadingRepo';
import styles from './styles';
import {searchRepositories} from '../../services/UserService';

interface IUserData {
  login: string;
  avatar_url: string;
}

export default function Home(props: any) {
  const [userValue, setUserValue] = useState('');
  const [users, setUsers] = useState<IUserData[]>([]);

  const handleFetch = async (value: string) => {
    searchRepositories(value).then(response => {
      setUsers(response || []);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFetch(userValue);
    }, 500);
    return () => clearTimeout(timeout);
  }, [userValue]);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text
          onPress={() =>
            props.navigation.navigate('Profile', {user: userValue})
          }
          style={styles.headerTitle}>
          Repositórios
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserValue}
          value={userValue}
          placeholder="Digite o nome do usuário do Github"
          keyboardType="default"
          placeholderTextColor={'#6c757d'}
        />
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.safeBackground}>
          {userValue === '' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Ei! Digite um nome de usuário para fazer uma pesquisa!
              </Text>
              <Lottie
                source={require('../../assets/lotties/9867-github-logo-octocat-animated.json')}
                autoPlay
                autoSize
                loop
              />
            </View>
          ) : users.length > 0 ? (
            users.map(user => {
              return (
                <TouchableHighlight
                  style={styles.userTouchable}
                  key={user.login}
                  activeOpacity={1}
                  underlayColor="#171a1d"
                  onPress={() =>
                    props.navigation.navigate('Profile', {user: user.login})
                  }>
                  <View style={styles.userView}>
                    <Image
                      source={{uri: user.avatar_url || ''}}
                      style={styles.userAvatar}
                    />
                    <Text style={styles.userName}>{user.login}</Text>
                    <TouchableHighlight style={styles.userButton}>
                      <Icon name="chevron-right" size={20} color="#fff" />
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              );
            })
          ) : (
            <LoadingRepo />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
