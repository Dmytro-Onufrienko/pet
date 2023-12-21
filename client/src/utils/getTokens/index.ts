import { LOCALE_STORAGE_KEYS } from "../../config/localStorageKeys";

const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCALE_STORAGE_KEYS;

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};
