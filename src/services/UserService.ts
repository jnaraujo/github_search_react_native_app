export function searchUsers(value: string, limit: number) {
  return fetch(
    `https://api.github.com/search/users?q=${value}&per_page=${limit}`,
  )
    .then(response => response.json())
    .then(json => json.items);
}

export function getUserProfile(username: string) {
  return fetch(`https://api.github.com/users/${username}`).then(response =>
    response.json(),
  );
}

export function getUserRepositories(username: string, limit: number) {
  return fetch(
    `https://api.github.com/users/${username}/repos?per_page=${limit}`,
  ).then(response => response.json());
}
