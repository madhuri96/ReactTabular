const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => {
  return fetch(`${API_BASE_URL}/users`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
};

export const getPosts = () => {
  return fetch(`${API_BASE_URL}/posts`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
};

export const getComments = () => {
  return fetch(`${API_BASE_URL}/comments`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching comments:', error);
    });
};
