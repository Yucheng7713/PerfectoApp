# PerfectoApp
CSCI577a - Software Development - Team 05 - Perfecto Coffee

## Prerequisites :
- For setting up React Native, follow the guidelines in https://developers.facebook.com/docs/react-native/getting-started,
  choose "Building Projects with Native Code" then select your development OS and targeted OS.
- It is recommended to set up a sample project as a warm-up practice to make sure your environment is operating seamlessly.
- Download and install Facebook SDK and unzip it to ~/Documents/FacebookSDK.
- Setting up Cocoapods for integrating Google Map API.

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

6. Cd to /ios directory and install pod
```
pod install
```
Note: If pod install does not work, remove Podfile.lock.

7. Open PerfectoApp.xcworkspace, Change the build directory :
    1. Go to PerfectoApp -> ios -> PerfectoApp.xcodeproj.
    2. Go to File -> Project Settings -> Click Advanced...
    3. Select Custom -> Relative to Workspace.
    4. Change the Products path to "build/Build/Products", Intermidates path to "build/Build/Intermediates.noindex".
    5. Click Done -> Done.

8. Run the project with the command below: ( It may take couple minutes for the first execution. )
```
react-native run-ios
```
## Troubleshooting
- If it is your first time to run the code, you might get an error indicating "CFBundleIdentifier not found", there are
  several solutions available :

  1.Remove Node modules and re-install them :
      1. Go to project's directory and run "rm -rf node_modules".
      2. Run "npm install".

  2.Remove ios build and re-build it :
      1. Go to project's directory and run "rm -rf ios/build".
      2. Terminate your react packager which you run in Step 5.
      3. Run "react-native run-ios".

  3.Upgrade React native ( Use with caution!!! )
      1. Go to project's directory and run "react-native upgrade".
      2. Note that several upgraded questions will pop up asking if you want to replace the given path,
         do not replace the files under ios or the configuration in native project will be overridded.
         
- If you confront "GoogleMapsBase not found on xCode"
  
  1. In PerfectoApp.xcworkspace, Click on project -> Click on target PerfectoApp -> Build Settings -> Framework Search Paths 
     -> Add $(SRCROOT)/Pods -> set it to recursive by clicking selector on the right.

- A trubleshooting doc is provided on React Native website : https://facebook.github.io/react-native/docs/troubleshooting#content

