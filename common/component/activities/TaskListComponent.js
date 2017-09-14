import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    TouchableOpacity,
    Alert,
    BackHandler
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Fab, Left, Body, Title } from 'native-base';
import Spinner                      from 'react-native-loading-spinner-overlay';

export default class TaskListComponent extends Component {
    /***************************************************************************
    Constructor optional method. The first to be called when render the Component
    ***************************************************************************/
    constructor(props){
        super(props)
        this.fetchNode = FIREBASEAPP.database().ref().child("tasks");
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.items = []
        this.state = {
            dataSource:   ds.cloneWithRows(this.items),
            isLoading: true
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
        this.fetchTasks(this.fetchNode);
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    }
    /**
    LifeCycle Method
    **/
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress')
    }
    /***************************************************************************
    Required method for the Component
    ***************************************************************************/
    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={"Carregando..."}
                    textStyle={{color: '#FFF'}}
                    overlayColor={COLOR_OVERLAY}
                />
                <Header>
                    <Body>
                        <Title>Tarefas</Title>
                    </Body>
                </Header>
                <View style={{flex: 1}}>
                    <View style={styles.containerContent}>
                        <ListView
                          dataSource= {this.state.dataSource}
                          renderRow=  {this.renderRow.bind(this)}
                          enableEmptySections={true}
                        />
                    </View>
                    <Fab direction="right" position="bottomRight" onPress={this.onPressAdd.bind(this)}>
                        <Icon name="add" />
                    </Fab>
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
                    FIREBASEAPP.database().ref("tasks").child(item._key).remove()
                }
            },
            {text: 'Concluir', onPress: () => {
                    FIREBASEAPP.database().ref("tasks/" + item._key + "/concluded").set(true)
                }
            }
          ],
          { cancelable: true }
        )
    }
    fetchTasks(itemsRef) {
        itemsRef.on('value', (snap) => {
            // get children as an array
            items = [];
            snap.forEach((child) => {
                item = child.val()
                item._key = child.key
                items.push(item);
            });
            this.items = items
            setTimeout(function(){
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows([])
                });
            }.bind(this), 1)
            setTimeout(function(){
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.items),
                    isLoading: false
                });
            }.bind(this), 1)
        });
    }
    /***************************************************************************
    On Press Add this method is called to add another task
    ***************************************************************************/
    onPressAdd(){
        this.props.navigator.push({
            id: ID_SCENE_TASK_DETAIL
        })
    }
    /***************************************************************************
    Render the row of the ListView
    ***************************************************************************/
    renderRow(item){
        return(
            <TouchableOpacity  onPress={() => {this.onPressItem(item)}}>
              <Content>
                <Card>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.description}</Text>
                        <Text note>{item.concluded ? "Concluído" : "A fazer"}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </Content>
            </TouchableOpacity>
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
        flex: 1
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

AppRegistry.registerComponent('TaskListComponent', () => TaskListComponent);
