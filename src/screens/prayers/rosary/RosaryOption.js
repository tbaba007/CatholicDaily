import React from 'react';
import {FlatList,SafeAreaView,View,StyleSheet,Text,TouchableHighlight} from 'react-native';
import {Icon,Divider } from 'react-native-elements';

const RosaryOption=(props)=>{
    const rosaryOptionList=[
        {
          id:'1',
          name:'Audio',
          icon:'library-music'
        },
        {
            id:'2',
            name:'Text',
            icon:'event-note'
        }
    ]

    const navigateOptions=(item)=>{
        props.navigation.push(item.id==='1'?'RosaryAudio':'RosaryList')
    }
    return(
        <SafeAreaView>
            <FlatList
            
            data={rosaryOptionList}
            renderItem={({item})=>(
                <View style={{flexDirection:'row'}}>
                    <Icon name={item.icon} containerStyle={style.Icon}/>
                    <TouchableHighlight onPress={()=>{
                        navigateOptions(item)
                    }} underlayColor="transparent">
                      <Text style={style.Text}>{item.name}</Text>
                    </TouchableHighlight>
                </View>
            )}
            keyExtractor={keys=>keys.id}

            ItemSeparatorComponent={()=>{
                return <Divider style={style.Divider}/>
            }}
            />
        </SafeAreaView>
    )
}
const style=StyleSheet.create({
    Text:{
        marginLeft:10,
        marginTop:20
    },
    Divider:{
        backgroundColor:'maroon',
        marginTop:20
    },
    Icon:{
        marginTop:20,
        marginLeft:20
    },
    SearchText:{
        borderBottomColor:'black',
        borderBottomWidth:1,
        width:150,
        alignSelf:"center",
    },
    TouchableHighlightButton:{
        marginTop:10,
        alignSelf:"center",
        
        backgroundColor:'green',
        borderRadius:15,
        width:100,
        height:50,
        justifyContent:"center"
    },
    TouchableHighlightButtonText:{
        color:'white',
        textAlign:"center",
    },
    Reset:{
        marginTop:10,
        alignSelf:"center",
        
        backgroundColor:'red',
        borderRadius:15,
        width:100,
        height:50,
        justifyContent:"center",
        marginLeft:30
    }

})
export default RosaryOption;