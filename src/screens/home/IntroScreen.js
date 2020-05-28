import React, { useState,useEffect } from 'react';
import {TextInput,SafeAreaView,StyleSheet,TouchableHighlight,View,Text,ToastAndroid} from 'react-native';
const Storage=require('../../helper/Storage').saveMessage;
function IntroScreen(props) {
        const [name,setName]=useState('');
    const save=()=>{
        if(name.trim().length===0)
        {
            ToastAndroid.show('Please Enter A Valid Name',1000);
            return;
        }
        Storage('registered',name);
        props.skip();
    }
    const skip=()=>{
        props.skip();
    }

    return (
        <SafeAreaView>
            <TextInput 
            maxLength={10}
            placeholder="Enter your name"
            value={name}
            onChangeText={(value)=>{
                setName(value)
            }}
            style={style.TextInput}/>
            <View style={{flexDirection:"row",alignSelf:'center'}} >
            <TouchableHighlight style={style.ButtonSkip}
            onPress={()=>{
                skip();
            }}>
            <Text style={style.Text}
            onPress={()=>{
                skip();
            }}>
                    Skip
                </Text>
            </TouchableHighlight>

            <TouchableHighlight style={style.ButtonProceed}
            onPress={()=>{
                save();
            }}>
                <Text style={style.Text}
                onPress={()=>{
                    save();
                }}>
                    Proceed
                </Text>
            </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    TextInput:{
        alignSelf:"center",
        width:'80%',
        textAlign:"center",
        borderBottomColor:'black',
        borderBottomWidth:1,
        marginTop:300
    },
    ButtonSkip:{
        backgroundColor:'orange',
        borderRadius:20,
        height:30,
        justifyContent:"center",
        width:80,
        alignContent:"center",
        marginTop:20,
        alignSelf:'flex-start'
    },
    ButtonProceed:{
        backgroundColor:'green',
        borderRadius:20,
        height:30,
        justifyContent:"center",
        width:80,
        marginLeft:50,
        alignContent:"center",
        marginTop:20,
        alignSelf:'flex-end'
    },
    Text:{
        textAlign:"center",
        color:'white'
    }
})
export default IntroScreen
