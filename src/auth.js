import { AsyncStorage } from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
// User login status 
export const LOGGED_IN = "loggedin-status";
// Statically stored local username and password -> (for convenient testing and developing)
export const STATIC_USERID = "perfecto1234";
export const STATIC_PASSWORD = "Perfecto3f";

// Sign in function (!! The function is not called by any component
// due to the lack of implementation of asynchronous function, the
// operating sign in function is stated in SignIn.js explicitly by now.)
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
}

// Facebook Log in function
export const FBSignIn = (username, password) => {
  // Fetching authentication from Sails backend by sending Facebook token
  // The below code is considered a template which needs more modification before calling. ( fb_token is not declared )
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

  // Statically login with hardcoded userID and password
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

// Sign out function -> When user sign out, wipe out the saved data
// including user login info, saved recipe, order, and payment method.
export const onSignOut = () => {
  LoginManager.logOut();
  AsyncStorage.removeItem('USER_FB_INFO');
  // Store recipes locally
  AsyncStorage.removeItem('Recipes');
  AsyncStorage.removeItem('Card');
  AsyncStorage.removeItem('Orders');
  return AsyncStorage.removeItem(LOGGED_IN);
};

// Check if user has already signed in -> save the login status when user close the app
// without logging out.
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
