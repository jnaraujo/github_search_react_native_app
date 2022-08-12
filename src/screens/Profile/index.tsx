import React, {memo, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

import styles from './styles';
import {getUserRepositories} from '../../services/UserService';
import RepoList from '../../components/RepoList';
import ProfileHeader from '../../components/ProfileHeader';

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
          <ProfileHeader
            username={userData?.name || 'Sem nome'}
            profilePicture={userData?.avatar_url || ''}
            followers={userData?.followers || 0}
            following={userData?.following || 0}
            bio={userData?.bio}
          />
          <RepoList loading={loading} repos={repos} />
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(Profile);
