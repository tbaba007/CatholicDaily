import React from 'react';
import {FlatList,
    TouchableHighlight,
    View,
    Text,
    Switch,
    StyleSheet,
    SafeAreaView} from 'react-native';
import {Divider,Icon} from 'react-native-elements';

const SettingsList=(props)=>{
const userPreferenceList=[
    // {
    //     id:'1',
    //     name:'Set Reminders',
    //     icon:'schedule'
    // },
    // {
    //     id:'2',
    //     name:'Enable Dark Theme',
    //     icon:'color-lens'
    // },
    {
        id:'3',
        name:'Download Daily Readings Offline',
        icon:'file-download'
    }
]

const onPress=(item)=>{
    if(item.id==='1')
    props.navigation.push('Reminders',item);
    else if(item.id==='3')
    props.navigation.push('DownloadReadings',item);
}
    return(
        <SafeAreaView>
        <FlatList
        data={userPreferenceList}
        renderItem={({item})=>(
            <View style={{flexDirection:"row"}}>
                <Icon name={item.icon}
                containerStyle={style.Icon}/>
               <TouchableHighlight onPress={()=>onPress(item)} underlayColor="transparent">
                   <Text style={style.Text}>{item.name}</Text>
               </TouchableHighlight>
           </View>
        )}
        keyExtractor={(items)=>items.id}
        ItemSeparatorComponent={()=>{
            return <Divider style={style.Divider}/>
        }}/>

        
    </SafeAreaView>
    )

}

const style=StyleSheet.create({
    Divider:{
        backgroundColor:'maroon',
        marginTop:20
    },
    Text:{
        marginLeft:10,
        marginTop:20
    },
    Icon:{
        marginLeft:10,
        marginTop:20
    }
})

export default SettingsList;