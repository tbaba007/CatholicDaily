import React from 'react';
import {FlatList,
    View,
    SafeAreaView,
    Text,
    TouchableHighlight,
    StyleSheet} from 'react-native';
    import {Divider} from 'react-native-elements';
const PrayerList = require('../traditional/prayertext/PrayerList').Payers;
const RosaryList=(props)=>{
    const rosaryArray=[{
        id:'1',
        name:'Joyful Mystery  (Mondays and Saturdays)',
        prayer:PrayerList[0].Rosary  
        +PrayerList[0].JoyfulMystery
        +PrayerList[0].HailHolyQueen
        +PrayerList[0].Litany},
        {
        id:'2',
        name:'Sorrowful Mystery  (Tuesdays and Fridays)',
        prayer:PrayerList[0].Rosary
        +PrayerList[0].SorrowfulMystery
        +PrayerList[0].HailHolyQueen
        +PrayerList[0].Litany},
        
        {id:'3',
        name:'Luminous Mystery  (Thursdays Only)',
        prayer:PrayerList[0].Rosary
        +PrayerList[0].LuminousMystery
        +PrayerList[0].HailHolyQueen
        +PrayerList[0].Litany},
        {id:'4',
        name:'Glorious Mystery  (Wednesdays and Sundays)',
        prayer:PrayerList[0].Rosary
        +PrayerList[0].GloriousMystery
        +PrayerList[0].HailHolyQueen
        +PrayerList[0].Litany
    }]

    const onPress=(item)=>{
        props.navigation.push('DisplayPrayer',{prayer:item});
    }
    return (
        <SafeAreaView>
            <FlatList
            data={rosaryArray}
            renderItem={({item})=>(
                <View>
                    <TouchableHighlight onPress={()=>{
                        onPress(item)
                    }} underlayColor="transparent">
                        <Text style={style.Text}>
                            {item.name}
                        </Text>
                    </TouchableHighlight>
                </View>
            )}
            keyExtractor={(item)=>item.id}
            ListHeaderComponent={()=>{
                return <View style={{marginTop:20}}></View>
            }}
            ItemSeparatorComponent={()=>{
                return<Divider style={style.Divider}/>
            }}
            />
        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    Text:{
        marginLeft:20,
        marginTop:10,
        
    },
    Divider:{
        backgroundColor:'maroon',
        marginTop:10,
        marginBottom:10
    },
    GoBack:{
        backgroundColor:'maroon',
        borderRadius:10,
        height:50,
        width:200,
        alignSelf:"center",
        marginTop:20,
        marginBottom:20
    },
    ButtonText:{
        color:'white',
        textAlign:"center",
        marginTop:18
    },
    Icon:{
    alignSelf:"flex-end"
    }
})

export default RosaryList