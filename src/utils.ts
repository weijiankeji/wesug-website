export const isLogin = () => {
  const userInfo = JSON.parse(localStorage.getItem('user-info') || '{}');
  if (userInfo.accessToken && userInfo.username) {
    return true;
  }
};
