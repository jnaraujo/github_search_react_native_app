export function searchRepositories(query: string) {
  return fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=5`,
  )
    .then(response => response.json())
    .then(json => json.items);
}

export function getUserProfile(username: string) {
  return fetch(`https://api.github.com/users/${username}`).then(response =>
    response.json(),
  );
}

export function getUserRepositories(username: string) {
  return fetch(
    `https://api.github.com/users/${username}/repos?per_page=5`,
  ).then(response => response.json());
}
