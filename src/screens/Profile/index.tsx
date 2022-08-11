import React, {memo, useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

import styles from './styles';
import {numberFormatter} from './utils';
import {getUserRepositories} from '../../services/UserService';
import RepoList from '../../components/RepoList';

interface IProfileProps {
  route?: {
    params?: {
      user?: string;
    };
  };
  navigation: {
    navigate: (screen: string) => void;
  };
}

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

function Profile(props: IProfileProps) {
  const user = props?.route?.params?.user;
  const [userData, setUserData] = useState<IUserData>();
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRepoFetch = async (value: string) => {
    return await getUserRepositories(value, 20);
  };

  useEffect(() => {
    if (!user) {
      return props.navigation.navigate('Home');
    }

    fetch(`https://api.github.com/users/${user}`)
      .then(res => res.json())
      .then(data => setUserData(data));

    handleRepoFetch(user).then(data => {
      setRepos(data);
      setLoading(false);
    });

    // handleRepoFetch(user);
  }, [user, props.navigation]);

  return (
    <View style={styles.main}>
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
              <Text style={styles.username}>{userData?.name}</Text>
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
    </View>
  );
}

export default memo(Profile);
