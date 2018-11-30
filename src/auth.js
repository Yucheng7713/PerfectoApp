import { AsyncStorage } from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export const LOGGED_IN = "loggedin-status";
// Constantly stored local username and password
export const STATIC_USERID = "yucheng8168";
export const STATIC_PASSWORD = "steven0824";

// Sign in function
export const onSignIn = (username, password) => {
  // Send sign in request to the backend (Sails)
  fetch("http://18.223.142.153:1337/api/v1/entrance/login", {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailAddress: username,
      password: password
    }),
  })
  .then(function(res){
    // Server backend callback status
    // If login success -> navigate to home page
    console.log(res);
    if(res.status === 200) {
      AsyncStorage.setItem(LOGGED_IN, 'true');
      // Store recipes locally
      AsyncStorage.setItem('Card', JSON.stringify({
        "cardNum": null,
        "cardType": null
      }));
      AsyncStorage.setItem('Recipes',JSON.stringify({
        "customList": []
      }));
      // Store order history locally
      AsyncStorage.setItem('Orders', JSON.stringify({
        "orderHistory": []
      }));
      return true;
    } else {
      return false;
    }
  })
  .catch((error) => {
    // Error message
    console.error(error);
  });

  // if(username === STATIC_USERID && password === STATIC_PASSWORD) {
  //   AsyncStorage.setItem(LOGGED_IN, 'true');
  //   // Store recipes locally
  //   AsyncStorage.setItem("Recipes",JSON.stringify({
  //     'customList': []
  //   }));
  //   return true;
  // }

  // return false;
}

// Facebook Log in function
export const FBSignIn = (username, password) => {
  // fetch(this.loginAPI, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     emailAddress: fb_token.email,
  //     password: password
  //   }),
  // })
  // .then(function(res){
  //   Server backend callback status
  //   If login success -> navigate to home page
  //   console.log(res);
  //   if() {
  //     AsyncStorage.setItem(LOGGED_IN, 'true');
  //     // Store recipes locally
  //     AsyncStorage.setItem("Recipes",JSON.stringify({
  //       'customList': []
  //     }));
  //     // AsyncStorage.setItem('USER_PROFILE', result.picture.data.url);
  //     AsyncStorage.setItem('USER_FB_INFO', JSON.stringify({
  //       name: fb_token.name,
  //       email: fb_token.email,
  //       picture_url: fb_token.picture.data.url
  //     }));
  //     return true;
  //   }
  // })
  // .catch((error) => {
  //   // Error message
  //   console.error(error);
  // });
  if(username === STATIC_USERID && password === STATIC_PASSWORD) {
    // Store login status locally
    AsyncStorage.setItem(LOGGED_IN, 'true');
    // Store credit card locally
    AsyncStorage.setItem('Card', JSON.stringify({
      "cardNum": null,
      "cardExpiry": null,
      "cardCvc": null,
      "cardType": null
    }));
    // Store recipes locally
    AsyncStorage.setItem("Recipes",JSON.stringify({
      'customList': []
    }));
    // Store order history locally
    AsyncStorage.setItem('Orders', JSON.stringify({
      "orderHistory": []
    }));
    return true;
  }
  return false;
}

// Sign out function
export const onSignOut = () => {
  LoginManager.logOut();
  AsyncStorage.removeItem('USER_FB_INFO');
  // Store recipes locally
  AsyncStorage.removeItem('Recipes');
  AsyncStorage.removeItem('Card');
  AsyncStorage.removeItem('Orders');
  return AsyncStorage.removeItem(LOGGED_IN);
};

// Check if user has already signed in -> save the status
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
