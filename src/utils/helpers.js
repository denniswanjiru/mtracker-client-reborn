export const getCurrentUser = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {name: null};
}
