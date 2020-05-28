import React,{useState, useEffect} from 'react';
import {View,
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    TouchableHighlight,
    Alert} from 'react-native';
import { Icon } from 'react-native-elements';

    const messageStorage=require('../../helper/Storage');

const DisplayReadings=(props)=>{

    const [homily,setHomily]=useState('');
    const [title,setTitle]=useState('');
    const [homilyId,setHomilyId]=useState('');
    const [successValue,setSuccessValue]=useState(0);
    let {FirstReading,Psalm,Gospel,SecondReading,FirstReadingHeader,
        PsalmHeader,SecondReadingHeader,GospelReadingHeader,date}=props.route.params;


    const fetchHomily=()=>{
        
        messageStorage.getMessageById(`HomilyDate:${date}`)
        .then(success=>{
            if(success!==null)
            {
                setHomily(JSON.parse(success).homily);
                setTitle(JSON.parse(success).title);
            }
            else{
                setHomily('');
                setTitle('');
            }
        })
    }

    useEffect(()=>{
        let ishomily=true;
        fetchHomily();
        ishomily=false;
    },[successValue])
    
    const addHomily=(date)=>{
        props.navigation.push('AddHomily',props.route.params)
    }

    const editHomily=()=>{
        let homilyObj={
            Homily:homily,
            Title:title,
            Date:date,
            id:`HomilyDate:${date}`
        }
        props.navigation.push('EditHomily',homilyObj)
    }
  
    const deleteHomily=()=>{
        Alert.alert('Prompt','Are you sure you want to delete?',[
            {
                text:'NO'
            },
            {
                text:'Yes',
                onPress:()=>{
                    messageStorage.removeMessageById(`HomilyDate:${date}`)
                    Alert.alert('Success','Homily deleted Successfully!',[{
                        text:'OK',
                        onPress:()=>{
                            setSuccessValue(Math.floor(Math.random() * 100) + 1);
                        }
                    }])
                    
                }
            }
        ])
    }
    return(
        <SafeAreaView>
            <ScrollView>
    <Text style={style.Header}>FirstReading: {FirstReadingHeader}</Text>
        <Text style={style.Body}>{FirstReading}</Text>

    <Text style={style.Header}>Reponsorial Psalm: {PsalmHeader }</Text>
        <Text style={style.Body}>{Psalm}</Text>

        {SecondReading !==''?<Text style={style.Header}>Second Reading:{SecondReadingHeader}</Text>:null}
        <Text style={style.Body}>{SecondReading}</Text>
        
    <Text style={style.Header}>Gospel : {GospelReadingHeader}</Text>
        <Text style={style.Body}>{Gospel}</Text>
        
    <Text style={style.Header}>Homily:</Text>
    
    <View style={{flexDirection:'row'}}>

        {homily!=='' ?
    <TouchableHighlight onPress={editHomily} underlayColor="transparent">
        <Icon name="edit" containerStyle={style.EditIcon}/>
    </TouchableHighlight>:null}

    {title!==''?<TouchableHighlight underlayColor="transparent" onPress={deleteHomily}>
        <Icon name="delete" containerStyle={style.EditIcon}/>
    </TouchableHighlight>:null}

    </View>
   
    <View>
    {homily!==''?
    
    <Text style={style.HomilyDisplayText}>{`Title:${title}` + '\n\n'} {homily}</Text>
    :

    (
    <TouchableHighlight 
    style={style.Homily} 
    onPress={addHomily}>
    <Text 
    style={style.Body,style.HomilyText}
    >Add</Text>
    </TouchableHighlight>)
    }
    </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    Header:{
        fontWeight:'bold',
        marginLeft:20,
        fontSize:20,
        marginTop:10
    },
    Body:{
        marginLeft:20,
        marginRight:10
    },
    Homily:{
        backgroundColor:'green',
        width:70,
        borderRadius:100,
        height:20,
        marginLeft:20,
        marginBottom:50
    },
    HomilyText:{
        color:'white',
        textAlign:'center'
    },
    HomilyDisplayText:{
        fontWeight:'bold',
        marginLeft:20,
        marginTop:10,
        marginBottom:20
    },
    EditIcon:{
        marginLeft:20
    }
})    


export default DisplayReadings;