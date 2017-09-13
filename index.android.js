/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Button,
    TouchableOpacity,
    TextInput,
    Alert,
    ToolbarAndroid
} from 'react-native';

export default class todo extends Component {
    /***************************************************************************
    Constructor optional method. The first to be called when render the Component
    ***************************************************************************/
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.items = [
            {"name": 'Do the dishes', "concluded": false, "guid": guid()},
            {"name": 'Iron Clothes', "concluded": false, "guid": guid()},
            {"name": 'Play videogame', "concluded": false, "guid": guid()},
            {"name": 'Finish Homework', "concluded": false, "guid": guid()},
        ]
        this.state = {
          dataSource:   ds.cloneWithRows(this.items),
          taskTemp:     ""
        };
    }
    /**
    LifeCycle Method
    **/
    componentWillMount(){
    }
    /**
    LifeCycle Method
    **/
    componentDidMount(){
    }
    /***************************************************************************
    Required method for the Component
    ***************************************************************************/
    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                     style={styles.toolbar}
                     logo={require('./common/asset/app_logo.png')}
                     title="Todo App"
                     onActionSelected={this.onActionSelected} />
                <View style={{flex: 1, margin: 10, marginBottom: 50}}>
                    <View style={styles.containerContent}>
                        <ListView
                          dataSource= {this.state.dataSource}
                          renderRow=  {this.renderRow.bind(this)}
                          enableEmptySections={true}
                          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                        />
                    </View>
                    <View style={styles.containerAdd}>
                        <TextInput
                          style={styles.inputAdd}
                          placeholder="Task ex. Do the dishes..."
                          value={this.state.taskTemp}
                          onChangeText={(text) => this.setState({taskTemp: text})}
                        />
                        <Button title="Adicionar" onPress={this.onPressAdd.bind(this)} style={styles.buttonAdd} />
                    </View>
                </View>
            </View>
        );
    }
    /***************************************************************************
    On Press Item Will call this method to ask for the action to be done
    ***************************************************************************/
    onPressItem(item){
        Alert.alert(
          'Atenção',
          'Qual a ação desejada?',
          [
            {text: 'Excluir', onPress: () => {
                    for(var i in this.items){
                        if(item.guid == this.items[i].guid){
                            this.items.splice(i, 1)
                        }
                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows([])
                    })
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.items)
                    })
                }
            },
            {text: 'Concluir', onPress: () => {
                    objIndex = this.items.findIndex((obj => obj.guid == item.guid));
                    this.items[objIndex].concluded = true
                    /**
                    * I don't know why but if I don't clear the array it doesn't refresh the ListView :/
                    **/
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows([])
                    })
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.items)
                    })
                }
            }
          ],
          { cancelable: true }
        )
    }
    /***************************************************************************
    On Press Add this method is called to add another task
    ***************************************************************************/
    onPressAdd(){
        if(this.state.taskTemp.trim()){
            this.items.push({
                "name": this.state.taskTemp,
                "concluded": false,
                "guid": guid()
            })
            this.state.taskTemp = ""
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.items)
            });
        }else{
            Alert.alert(
              'Atenção',
              'Impossível inserir um item em branco!',
              [
                {text: 'Ok'}
              ],
              { cancelable: true }
            )
        }
    }
    /***************************************************************************
    Render the row of the ListView
    ***************************************************************************/
    renderRow(item){
        styleTodoText = item.concluded ? styles.todoListviewItemTextDone : styles.todoListviewItemTextTodo
        return(
            <View style={styles.todoListviewItemContainer}>
                <TouchableOpacity onPress={()=>{ this.onPressItem(item)}}>
                    <Text style={styleTodoText}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

/*******************************************************************************
Generate the unique universal identifier
*******************************************************************************/
const guid = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
/*******************************************************************************
StyleSheet for the entire Component
*******************************************************************************/
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerContent: {
        flex: 0.9
    },
    containerAdd: {
        flex: 0.1
    },
    buttonAdd: {
        flex: 1,
        color: "#841584"
    },
    todoListviewItemTextTodo: {
        fontSize: 20,
        color: "red",
        textAlign: 'center'
    },
    todoListviewItemTextDone: {
        fontSize: 20,
        color: "green",
        textAlign: 'center'
    },
    todoListviewItemContainer: {
        margin: 20
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    toolbar: {
        backgroundColor: '#607D8B',
        height: 56,
        alignSelf: 'stretch',
    }
});

AppRegistry.registerComponent('todo', () => todo);
