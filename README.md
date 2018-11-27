# PerfectoApp
CSCI577a - Software Development - Team 05 - Perfecto Coffee

## Prerequisites :
- For setting up React Native, follow the guidelines in https://developers.facebook.com/docs/react-native/getting-started,
  choose "Building Projects with Native Code" then select your development OS and targeted OS.
- It is recommended to set up a sample project as a warm-up practice to make sure your environment is operating seamlessly.
- Download and install Facebook SDK and unzip it to ~/Documents/FacebookSDK.
- Install and set up Cocoapods for integrating Google Map API.

## Getting Started - For Mac OSX
1. Click "fork" to get a fork of the original repository

2. Clone the project and cd into the directory
```
git clone https://github.com/YOUR_USERNAME/PerfectoApp.git
```
Useful links for setting up Git developed environment
  - https://help.github.com/articles/fork-a-repo/
  - https://guides.github.com/activities/forking/

3. Run the command to install all require packages
```
npm install
```

4. Run the command to link all packages
```
react-native link
```

5. Navigate to the directory and run React native Metro Bundler( Default on port 8081 )
Note : Re-run it when any new Node package is added.
```
npm start
```
If it a bundle error occurs, try the below command instead :
```
react-native start --reset-cache
```

6. Open PerfectoApp.xcworkspace, Change the build directory :
    1. Go to PerfectoApp -> ios -> PerfectoApp.xcodeproj.
    2. Go to File -> Project Settings -> Click Advanced...
    3. Select Custom -> Relative to Workspace.
    4. Change the Products path to "build/Build/Products", Intermidates path to "build/Build/Intermediates.noindex".
    5. Click Done -> Done.

7. Install the file ios_setup.js by executing the following command in a command prompt at your project's root folder.
```
curl -O https://raw.githubusercontent.com/facebook/react-native-fbsdk/master/bin/ios_setup.js
```

8. Install the plist package, the xcode package, and the adm-zip package, by executing the following command.
```
node ios_setup.js 273929963245701 PerfectoExpress
```
!! For those who hasn't joined the Facebook app but want to run the project, please ask for invitation.

9. Cd to /ios directory and install pod
!! Note: If pod install does not work, remove Podfile.lock.
```
pod install
```

10. Link the react native libraries again
```
react-native link
```

11. Build and run the project in PerfectoApp.xcworkspace: ( It may take couple minutes for the first execution. )
!! You can either build and run the project in terminal, but it is recommend to build it with Xcode for first time in that way you are able to identify any possible error and solve it.
For building the project in terminal, run the command below:
```
react-native run-ios
```

## Troubleshooting

- If you get any error related to "SplashScreen", this is probably because you miss the library in your xcworkspace

      1. Right click the folder "Libraries" -> Choose Add File to "PerfectoApp"...
      
      2. Go to node_modules -> react-native-splashscreen -> ios -> Select SplashScreen.xcodeproj
      
      3. Go to project overview of PerfectoApp -> Under "Targets" select "PerfectoApp"
      
      4. Choose "General" -> "Linked Frameworks and Libraries" -> Add "libSplashScreen.a"

- If you confront "GoogleMapsBase not found on xCode"
  
      1. In PerfectoApp.xcworkspace, Click on project -> Click on target PerfectoApp -> Build Settings -> Framework Search
         Paths -> Add $(SRCROOT)/Pods -> set it to recursive by clicking selector on the right.

- A troubleshooting doc is provided on React Native website : https://facebook.github.io/react-native/docs/troubleshooting#content

## Getting Started - For Android
1. Follow steps 1-5 on "Getting Started - For Mac OSX".

2. Assuming the pre-requisite setup and installations have been completed, open Android Studio, navigate to the Android Virtual Device (AVD) Manager, and launch an Android emulator.

3. Build the project via commandline by running the command below:
```
react-native run-android
```