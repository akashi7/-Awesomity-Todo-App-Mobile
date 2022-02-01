# Task-Force-Challenge-Mobile

## Getting Started

These instructions will get you a copy of the project up and running on your android device or your local machine.

The project is built using:

- React Native cli

This project was build with android emulator with android version 10. Therefore, you will use an android emulator or android device with android version >=10.

## Easy steps to run the application

For running the application in a fast and easy way :

1. You must have android phone with version >=10 , otherwise you will have a messed up application interface
2. Download the APK file at this [link here](https://drive.google.com/file/d/15tZq9JnXeJlG5FFwhU42dpQv-L5LxqWp/view?usp=sharing)

3. Use Xender or USB or other ways you want to move the downloaded APK file from the machine to your android phone.
4. Install APK file to your android phone.
5. In installing you will encounter a message that says `BLOCKED BY PLAY PROTECT`, click `INSTALL ANYWAY`
6. After the app is succesfully installed , Open it
7. You will encounter another message that says `SEND APP FOR SCANNING` , click `DON'T SEND`

That's it for the easy and fast steps , sit down and enjoy the application

## Other ways to run the application

these other steps are followed when you want to run the application on your local machine , it is a bit long since it requires many steps and many tools downloaded.

On my advice follow the Easy steps i mentioned above, but if you want to try also on your machine feel free to try also these below steps

### Cloning the project

- Simply [Clone](https://github.com/akashi7/-Awesomity-Todo-App-Mobile.git) The project
- OR use git bash:
  1.  First [download](https://git-scm.com/downloads) git bash
  2.  Install it
  3.  Clone it by running `git clone https://github.com/akashi7/-Awesomity-Todo-App-Mobile.git`
  4.  Find the project directory from where you are tunning the git bash.

## Installation

1.For running the project, you need to install the following:

1.  First download and install [Node JS](https://nodejs.org/en/download/)
2.  Second Download and install [Android studio](https://developer.android.com/studio).
3.  Third download android emulator, use the article [here](https://developer.android.com/studio/run/managing-avds) to see the process
4.  Download android emulator with android version 10 please

## Running the project

1. Open command prompt
2. Navigate to the directory of cloned project
3. Run the automated test by running `npm run install` command
4. After the completion of the above command , Link assets folder by running `npx react native link` or `react native link`command to see custom fonts used in the project
5. After the completion of the above command , Open android studio
6. Open existing project tab in android studio
7. Navigate to where you cloned the repository
8. Select android folder
9. Wait for android studio to sync gradle files , after finishing the sync
10. Open the android emulator and run it , make sure the emulator is up and running otherwise the application won't run as expected
11. navigate to the directory of cloned project again using command prompt
12. Run `npx react-native run-android ` or `npm run android` in your terminal. this command will start your react native server and open the application in your running android emulator.

that's it , these are the steps , sit down and enjoy the application

## The App includes following features:

- Creating a task by providing a title, description, task priority, and uploading an image from your phone gallery
  and then save the above data in a local sqlite database.
- Viewing details of a task
- Editing the task
- Changing the task status from Active to Done vice versa
- Deleting the task
- Filtering tasks by priority

## Technologies used

- React Native Cli
- React hooks
- Redux
- Sqlite database

## Author

[Kabuto christian](https://github.com/akashi7)
