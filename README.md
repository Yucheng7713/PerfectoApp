# PerfectoApp
CSCI577a - Software Development - Team 05 - Perfecto Coffee

## Prerequisites :
- Follow the instructions in https://facebook.github.io/react-native/docs/getting-started.html, choose
  "Building Projects with Native Code" then select your development OS and targeted OS.
- It is recommended to set up a sample project as a warm-up practice to make sure your environment is operating seamlessly.

## Getting Started
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
### For Mac OS:
```
npm start
```
If it gets stuck at 75.6% while loading the dependencies ( after start running the ios app. ), try the below command instead :
```
react-native start --reset-cache
```

### For Windows:
```
### Not filled yet ###
```

6. Run the project with the command below: ( It may take couple minutes for the first execution. )
### For Mac OS:
```
react-native run-ios
```

- If it is your first time to run the code, you might get an error indicating "CFBundleIdentifier not found", there are
  several solutions available :

- Setting Xcode
    1. Go to PerfectoApp -> ios -> PerfectoApp.xcodeproj.
    2. Go to File -> Project Settings -> Click Advanced...
    3. Select Custom -> Relative to Workspace.
    5. Change the Products path to "build/Build/Products", Intermidates path to "build/Build/Intermediates.noindex".
    6. Click Done -> Done.

- Remove Node modules and re-install them :
    1. Go to project's directory and run "rm -rf node_modules".
    2. Run "npm install".

- Remove ios build and re-build it :
    1. Go to project's directory and run "rm -rf ios/build".
    2. Terminate your react packager which you run in Step 5.
    2. Run "react-native run-ios".

- Upgrade React native ( Use with caution!!! )
    1. Go to project's directory and run "react-native upgrade".
    2. Note that several upgraded questions will pop up asking if you want to replace the given path,
       do not replace the files under ios or the configuration in native project will be overridded.

  - A trubleshooting doc is provided on React Native website :
    - https://facebook.github.io/react-native/docs/troubleshooting#content

### For Windows:
```
### Not filled yet ###
```

- Note for using COTS features ( Facebook SDK, Google API ), please install and set up the required dependencies locally.
