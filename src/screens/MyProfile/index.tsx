import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import {numberFormatter} from './utils';
import {useConfig} from '../../hooks/useConfig';
import RepoList from '../../components/RepoList';

interface IUserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface IRepos {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}

function Profile() {
  const [noProfileUserName, setNoProfileUserName] = useState<string>('');

  const [userData, setUserData] = useState<IUserData>();
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [loading, setLoading] = useState(true);

  const {config, setConfig} = useConfig();

  const handleUpdateName = () => {
    setLoading(true);
    setRepos([]);
    setUserData(undefined);
    setConfig({
      profile: {
        name: noProfileUserName,
      },
    });
  };

  const handleRepoFetch = async (value: string) => {
    return await fetch(`https://api.github.com/users/${value}/repos`).then(
      res => res.json(),
    );
  };

  useEffect(() => {
    const username = config?.profile?.name || '';

    if (username) {
      const timeout = setTimeout(() => {
        fetch(`https://api.github.com/users/${username}`)
          .then(res => res.json())
          .then(data => {
            setUserData(data);
            handleRepoFetch(username).then(repoData => {
              setRepos(repoData);
              setLoading(false);
            });
          });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [config?.profile?.name]);

  return (
    <View style={styles.main}>
      {config?.profile?.name ? (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.list}>
            <View style={styles.header}>
              <Image
                source={{
                  uri: userData?.avatar_url,
                }}
                style={styles.avatar}
              />
              <View style={styles.textInfoView}>
                <View style={styles.userNameView}>
                  <Text style={styles.username}>{config.profile.name}</Text>
                  <Icon
                    style={styles.editIcon}
                    name="pencil"
                    size={20}
                    color="#6c757d"
                    onPress={() => {
                      setConfig({
                        profile: {
                          name: '',
                        },
                      });
                    }}
                  />
                </View>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bio}>
                  {userData?.bio}
                </Text>
                <View style={styles.userFollow}>
                  <Text style={styles.followNumber}>
                    <Text style={styles.followBold}>
                      {numberFormatter(userData?.followers || 0)}
                    </Text>{' '}
                    followers
                  </Text>
                  <Text style={styles.followNumber}>
                    <Text style={styles.followBold}>
                      {numberFormatter(userData?.following || 0)}
                    </Text>{' '}
                    following
                  </Text>
                </View>
              </View>
            </View>

            <RepoList loading={loading} repos={repos} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noProfileView}>
          <View style={styles.noProfileTextView}>
            <Text style={styles.noProfileText}>
              Qual o seu nome de usuário do GitHub?
            </Text>
          </View>
          <TextInput
            style={styles.noProfileInput}
            value={noProfileUserName}
            placeholder="Digite seu nome de usuário do Github"
            onChangeText={setNoProfileUserName}
            placeholderTextColor="#6c757d"
          />

          <TouchableOpacity
            style={styles.noProfileButton}
            onPress={handleUpdateName}>
            <Text style={styles.noProfileButtonText}>Salvar meu nome</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Profile;
