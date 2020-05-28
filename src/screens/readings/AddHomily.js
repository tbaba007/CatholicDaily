import React,{useState,useEffect} from 'react';
import {SafeAreaView,
        TextInput,
        View,
        Text,
        TouchableHighlight,
        StyleSheet,
        ScrollView,
        Alert,
        ToastAndroid} from 'react-native';
const messageStorage=require('../../helper/Storage');
const AddHomily=(props)=>{
    const [title,setTitle]=useState('');
    const [homily,setHomily]=useState('');
    let {date,Title}=props.route.params;

    const saveHomily=()=>{

        if(title.trim().length===0)
        return ToastAndroid.showWithGravity('Please Enter A Valid Title',1000,ToastAndroid.CENTER)
        else if(homily.trim().length===0)
        return ToastAndroid.showWithGravity('Please Enter A Valid Homily Text',1000,ToastAndroid.CENTER)
        messageStorage.saveMessage(`HomilyDate:${date}`,JSON.stringify({title:title,homily:homily}));
        Alert.alert('Success','Homily saved successfully',[{
            text:'OK',
            onPress:()=>{
                props.navigation.pop(2);
            }
        }])
    }
    return (

        <SafeAreaView>
            <ScrollView>
            <View>
            <Text style={style.TextHeader}>Homily for {date}</Text>
            <TextInput placeholder="Enter Title" style={style.Title} multiline={true} onChangeText={(val)=>setTitle(val)} value={title}/>
            <TextInput placeholder="Enter Text" style={style.Text} numberOfLines={10}
				multiline={true} onChangeText={(val)=>setHomily(val)} value={homily}/>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                <TouchableHighlight style={style.Cancel} onPress={()=>{
                    setHomily('');
                }}>
                    <Text style={{color:style.Cancel.color,textAlign:'center'}}>Clear</Text>
                </TouchableHighlight>
                <TouchableHighlight style={style.Save} onPress={()=>{
                   saveHomily();
                }}>
                    <Text style={{color:style.Cancel.color,textAlign:'center'}}>Save</Text>
                </TouchableHighlight>
                </View>
                
            </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const style=StyleSheet.create({
    Title:{
        borderBottomWidth:1,
        alignSelf:'center',
        width:250,
        marginBottom:30
    },
    Text:{
        borderWidth:1,
        height:200,
        alignSelf:'center',
        width:300,
        marginBottom:30,
        textAlignVertical: 'top'
    },
    Cancel:{
        marginTop:10,
        alignSelf:"center",
        color:'white',
        backgroundColor:'red',
        borderRadius:15,
        width:100,
        height:50,
        justifyContent:"center",
        marginLeft:30
    },
    Save:{
        marginTop:10,
        alignSelf:"center",
        color:'white',
        backgroundColor:'green',
        borderRadius:15,
        width:100,
        height:50,
        justifyContent:"center",
        marginLeft:30
    },
    TextHeader:{
        textAlign:'center',
        marginTop:20,
        marginBottom:20,
        fontSize:30
    }
})

export default AddHomily;