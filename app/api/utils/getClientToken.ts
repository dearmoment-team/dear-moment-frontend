export const getClientToken = (): string | null => {
  const token = localStorage.getItem('accessToken');
  return token;
};
