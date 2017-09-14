import React, { Component }                 from 'react';
import {
    AppRegistry,
    BackHandler,
    Text,
    View,
    StyleSheet
}                                           from 'react-native';
import CustomComponents                     from 'react-native-deprecated-custom-components';
import globals                              from '../../utils/globals'
import { Form, Item, Label, Input, Header, Container, Content, Button, Body, Title, Left, Icon } from 'native-base';

export default class TaskDetailComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            task: {},
            isLoading: true
        }
    }
    componentWillMount(){
    }
    componentDidMount() {
        if(this.props.route.key){
            this.fetchTask(FIREBASEAPP.database().ref().child("tasks/"+this.props.route.key))
        }else{
            this.setState({
                isLoading: false
            })
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>{ this.props.navigator.pop()}}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Nova Tarefa</Title>
                    </Body>
                </Header>
                <Content style={styles.content}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Titulo da tarefa</Label>
                            <Input
                                value = {this.state.task.title}
                                onChangeText = {(value)=> this.onChangeProperty({title: value})}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Descrição da tarefa</Label>
                            <Input
                                value = {this.state.task.description}
                                onChangeText = {(value)=> this.onChangeProperty({description: value})}
                            />
                        </Item>
                        <Button full style={styles.buttonSave} onPress={this.onPressSave.bind(this)}>
                            <Text style={{color:"#FFF"}}>Salvar</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
    onPressSave(){
        if(this.state.task.title.trim !== "" && this.state.task.description.trim !== ""){
            if(this.props.route.key){
                FIREBASEAPP.database().ref("tasks/" + this.props.route.key).update(this.state.task)
            }else{
                FIREBASEAPP.database().ref("tasks").push(this.state.task)
            }
            this.props.navigator.pop()
        } else {
            Alert.alert(
                'Atenção',
                'Impossível inserir uma tarefa em branco!',
                [
                    {text: 'Ok'}
                ],
                { cancelable: true }
            )
        }
    }
    onChangeProperty(value){
        item = Object.assign(this.state.task, value)
        this.setState({task: item})
    }
    fetchTask(node){
        node.on("value", (snap) => {
            this.setState({
                task: snap.val()
            })
        })
    }
}

const styles = StyleSheet.create({
    content: {
        margin: 20
    },
    buttonSave: {
        marginTop: 20
    }
})

AppRegistry.registerComponent('TaskDetailComponent', () => TaskDetailComponent);
