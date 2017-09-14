/*******************************************************************************
***********      Global variables to use in the whole system         ***********
*******************************************************************************/
/**
Global Scenes, pages, screen or whataver you want to call it.
**/
import * as colors              from '../asset/colors'
import * as firebase            from 'firebase'; // Firebase App RealtimeDatabase, Authentication
global.ID_SCENE_TASK_LIST           = 1;
global.ID_SCENE_TASK_DETAIL         = 2;
/**
Firebase Config with the keys from 'console.firebase.com'.
**/
global.FIREBASE_CONFIG    = {
    apiKey: "AIzaSyC5L5Acc5s3t1yFDhu1ZyeE9EIyYjm0rss",
    authDomain: "todo-react-native-f0c1c.firebaseapp.com",
    databaseURL: "https://todo-react-native-f0c1c.firebaseio.com",
    projectId: "todo-react-native-f0c1c",
    storageBucket: "todo-react-native-f0c1c.appspot.com",
    messagingSenderId: "753460415007"
};
global.FIREBASEAPP        = firebase.initializeApp(FIREBASE_CONFIG);
/**
Firebase Config with the keys from 'console.firebase.com'.
**/
global.COLOR_PRIMARY                      = MD_BLUE_500;
global.COLOR_PRIMARY_DARK                 = MD_BLUE_700;
global.COLOR_ACCENT                       = MD_BLACK_1000;
global.COLOR_BACKGROUND_LISTVIEW          = MD_GREY_300;
global.COLOR_OVERLAY                      = "#FF0D47A1";
