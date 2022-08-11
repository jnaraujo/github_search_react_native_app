import {Linking, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';

import Lottie from 'lottie-react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {numberFormatter} from './utils';

interface IRepos {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}

interface IRepoListProps {
  repos: IRepos[];
  loading: boolean;
}

export default function RepoList({repos, loading}: IRepoListProps) {
  return (
    <View>
      {!loading ? (
        repos.length > 0 ? (
          repos
            .sort((a, b) => {
              return b.stargazers_count - a.stargazers_count;
            })
            .map(repo => {
              return (
                <TouchableHighlight
                  key={repo.id}
                  style={styles.repoContainer}
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
                  <View style={styles.repo}>
                    <View style={styles.repoHeader}>
                      <Text style={styles.repoTitle}>{repo.name}</Text>
                      <View style={styles.repoHeaderStarView}>
                        <Icon name="star" size={18} color="#8338ec" />
                        <Text style={styles.repoHeaderStarCount}>
                          {numberFormatter(repo.stargazers_count)}
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
                  </View>
                </TouchableHighlight>
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
  );
}
