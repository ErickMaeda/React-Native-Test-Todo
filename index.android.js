import React, { Component }                 from 'react';
import {
    AppRegistry,
    BackHandler
}                                           from 'react-native';
import CustomComponents                     from 'react-native-deprecated-custom-components';
import globals                              from './common/utils/globals'
import TaskListComponent                    from './common/component/activities/TaskListComponent'
import TaskDetailComponent                  from './common/component/activities/TaskDetailComponent'

export default class todo extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <CustomComponents.Navigator
            initialRoute  = {{id: ID_SCENE_TASK_LIST}} // The initial route is always TaskListComponent
            renderScene   = {this.renderScene} // Callback Function to render the Scene
            />
        );
    }
    /**
    The navigator that controll the scenes
    If you want to call any scene just call
    **/
    renderScene(route, navigator){
        switch (route.id) {
            case ID_SCENE_TASK_LIST:
            return (<TaskListComponent      route={route} navigator={navigator} />)
            case ID_SCENE_TASK_DETAIL:
            return (<TaskDetailComponent    route={route} navigator={navigator}/>)
        }
    }
}

AppRegistry.registerComponent('todo', () => todo);
