import React, {memo, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {numberFormatter} from './utils';

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
    return await fetch(`https://api.github.com/users/${value}/repos`).then(
      res => res.json(),
    );
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

          {!loading ? (
            repos.length > 0 ? (
              repos
                .sort((a, b) => {
                  return b.stargazers_count - a.stargazers_count;
                })
                .map(repo => {
                  return (
                    <View key={repo.id} style={styles.repo}>
                      <View style={styles.repoHeader}>
                        <Text style={styles.repoTitle}>{repo.name}</Text>
                        <View style={styles.repoHeaderStarView}>
                          <Icon name="star" size={18} color="#8338ec" />
                          <Text style={styles.repoHeaderStarCount}>
                            {repo.stargazers_count}
                          </Text>
                        </View>
                      </View>

                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.repoDescription}>
                        {repo.description ||
                          'O amigo não colocou descrição. Muito feio!'}
                      </Text>
                      <TouchableHighlight
                        style={styles.repoButton}
                        activeOpacity={1}
                        underlayColor="#DDDDDD"
                        onPress={async () => {
                          if (await InAppBrowser.isAvailable()) {
                            return InAppBrowser.open(repo.html_url, {
                              showTitle: true,
                              toolbarColor: '#8338ec',
                              secondaryToolbarColor: 'black',
                              navigationBarColor: 'black',
                              navigationBarDividerColor: 'white',
                              enableUrlBarHiding: true,
                              enableDefaultShare: true,
                              forceCloseOnRedirection: false,
                            });
                          } else {
                            Linking.openURL(repo.html_url);
                          }
                        }}>
                        <Text style={styles.repoButtonText}>Abrir Repo</Text>
                      </TouchableHighlight>
                    </View>
                  );
                })
            ) : (
              <Text style={styles.noRepos}>Cri, cri, cri...</Text>
            )
          ) : (
            <View style={styles.loading}>
              <View style={styles.loadingAnimation}>
                <Lottie
                  source={require('../../assets/lotties/58916-momo-run.json')}
                  autoPlay
                  autoSize
                  loop
                />
              </View>
              <Text style={styles.textLoading}>Carregando...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(Profile);