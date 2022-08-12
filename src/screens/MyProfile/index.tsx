import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

import {useConfig} from '../../hooks/useConfig';

import {getUserProfile, getUserRepositories} from '../../services/UserService';

import ProfileHeader from '../../components/ProfileHeader';
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
    return await getUserRepositories(value, 20);
  };

  useEffect(() => {
    const username = config?.profile?.name || '';

    if (username) {
      const timeout = setTimeout(() => {
        getUserProfile(username).then(data => {
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
            <ProfileHeader
              username={config.profile.name}
              profilePicture={userData?.avatar_url || ''}
              onEdit={() => {
                setConfig({
                  profile: {
                    name: '',
                  },
                });
              }}
              bio={userData?.bio}
              followers={userData?.followers || 0}
              following={userData?.following || 0}
            />
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
