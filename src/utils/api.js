const baseUrl = 'http://127.0.0.1:5000/api/v1'

const handleResponse = response => response.text().then((text) => {
  const data = text && JSON.parse(text);
  if (!response.ok) {
    return Promise.reject(data);
  }
  return data;
});

export function authHeader(authenticated = true) {
  // return authorization header with jwt token
  if (!authenticated) {
    return {};
  }
  const user = localStorage.getItem('user');
  if (!user) {
    return {};
  }
  const { token } = JSON.parse(user);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

const api = ({
  endpoint, method, data, authenticated,
}) => fetch(`${baseUrl}${endpoint}`, {
  method,
  headers: {
    'content-type': 'application/json',
    ...authHeader(authenticated),
  },
  body: JSON.stringify(data),
}).then(handleResponse);

export default api;