import React,{useState} from 'react'
import {FlatList,
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    
    TouchableHighlight} from 'react-native';
import { Divider,Icon } from 'react-native-elements';
import DisplayPrayer from './DisplayPrayer';
const PrayerList= require('./prayertext/PrayerList').Payers;
function NovenaList(props) {
   const [showPrayer,setShowPrayer]=useState(false);
   const [prayerObject,setPrayerObject]=useState(null);
    const novenaList=[
        {
            id:'1',
            name:'Divine Mercy',
            prayer:PrayerList[0].DivinMercy
        },
        {
            id:'2',
            name:'Morning Prayer',
            prayer:PrayerList[0].MorningPrayer
        },
        {
            id:'3',
            name:'Morning Offering',
            prayer:PrayerList[0].MorningOffering
        },
        {
            id:'4',
            name:'Act of Faith',
            prayer:PrayerList[0].Act_of_faith
        },
        {
            id:'5',
            name:'Act of Hope',
            prayer:PrayerList[0].Act_of_hope
        },
        {
            id:'6',
            name:'Act of Charity',
            prayer:PrayerList[0].Act_of_charity
        },
        {
            id:'7',
            name:'Act of Contrition',
            prayer:PrayerList[0].Act_of_contrition
        },
        {
            id:'8',
            name:'Prayer To Redeem Lost Time',
            prayer:PrayerList[0].prayer_to_redeem_lost_time
        },
        {
            id:'9',
            name:'Offering To The Holy Trinity',
            prayer:PrayerList[0].offering_to_the_HolyTrinity
        },
        {
            id:'10',
            name:'Act of Spiritual Communion',
            prayer:PrayerList[0].Act_of_spiritualCommunion
        },
        {
            id:'11',
            name:'Regina Coil',
            prayer:PrayerList[0].Regina_Coil
        },
        {
            id:'12',
            name:'Angelus',
            prayer:PrayerList[0].Angelus
        }
    ];

    const onPress=(item)=>{
        // setShowPrayer(true);
        // setPrayerObject(item);
        props.navigation.push('DisplayPrayer',{prayer:item});
        
    }
    return (
        !showPrayer?
        (
        <SafeAreaView>
            <FlatList
            data={novenaList}
            renderItem={({item})=>(
                <View style={{flexDirection:"row"}}>
                   
                    <TouchableHighlight
                    onPress={()=>{
                        onPress(item);
                    }}
                    underlayColor="transparent">
                    <Text style={style.Text}
                    onPress={()=>{
                        onPress(item);
                    }}>{item.name}</Text>
                    </TouchableHighlight>
                    
                   
                </View>
            )}
            ItemSeparatorComponent={()=>{
                return <Divider style={style.Divider}/>
            }}

            ListHeaderComponent={()=>{
              return  <View style={{marginTop:20}}></View>
            }}
            
            ListFooterComponent={()=>{
                return (
                    <View style={{marginBottom:100}}>

                    </View>
                )
            }}
            />
        </SafeAreaView>)
        :(
           
            <DisplayPrayer value={prayerObject}/>
        )
    )
}

const style=StyleSheet.create({
    Text:{
        marginLeft:20,
        marginTop:10
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
export default NovenaList
