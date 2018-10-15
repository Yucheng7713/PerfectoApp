import { AsyncStorage } from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export const LOGGED_IN = "loggedin-status";
// Constantly stored local username and password
export const STATIC_NAME = "yucheng8168";
export const STATIC_PASSWORD = "steven0824";

export const onSignIn = (username, password) => {
  if(username === STATIC_NAME && password === STATIC_PASSWORD) {
    AsyncStorage.setItem(LOGGED_IN, 'true');
    return true;
  }
  return false;
}
export const onSignOut = () => {
  LoginManager.logOut();
  return AsyncStorage.removeItem(LOGGED_IN);
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(LOGGED_IN)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
