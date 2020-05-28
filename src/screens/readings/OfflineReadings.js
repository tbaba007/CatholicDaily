import React,{useState,useEffect} from 'react';
import {View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableHighlight,
    StyleSheet,
    Alert
    } from 'react-native';

import { CheckBox } from 'react-native-elements'
import {Divider,Icon} from 'react-native-elements';

const storage= require('../../helper/Storage');
const OfflineReadings=(props)=>{

    let [readingList,setReadingList]=useState([]);
    const [success,setSuccess]=useState(0);
    const [refresh,setRefresh]=useState(false);
    const todayDate=new Date().getFullYear()+'-'+ parseInt(new Date().getMonth()+1)+'-'+new Date().getDate().toString();

    const deleteReading=(id)=>{
        Alert.alert('Prompt','Are you sure you want to delete?',
        [
            {
                text:'No'
            },
            {
                text:'Yes',
                onPress:()=>{
                    storage.removeMessageById( `{\"date\":\"${id}\"}`)
                    refreshArray();
                   Alert.alert('Notification',`${id} Mass reading(s) deleted successfully`)
                }
            }
        ])
                

    }
    useEffect(()=>{
        storage.getAllMessages().then(success=>{
               success.map(item=>{
                  // let key=JSON.parse(item).date
                  if(item!=='registered' && !item.includes('HomilyDate'))
                  {
                    
                     storage.getMessageById(item).then((response) => {
                    if (!readingList.includes(JSON.parse(response).date)) {     
                            
                    setReadingList((oldarray) => [ ...oldarray, {date:JSON.parse(response).date,
                                                    FirstReading:JSON.parse(response).FirstReading,
                                                    Psalm:JSON.parse(response).Psalm,
                                                    SecondReading:JSON.parse(response).SecondReading,
                                                    Gospel:JSON.parse(response).Gospel,
                                                    Title:JSON.parse(response).Title,
                                                    FirstReadingHeader:JSON.parse(response).FirstReadingHeader,
                                                    PsalmHeader:JSON.parse(response).PsalmHeader,
                                                    SecondReadingHeader:JSON.parse(response).SecondReadingHeader,
                                                    GospelReadingHeader:JSON.parse(response).GospelReadingHeader}
                                                ]);
                    }
                    
                    }); 
                  }
               
               })
           
        })
    },[success])

    
	const refreshArray=()=>{
		readingList.length=0;
		if(success===Math.round(10))
		{
			setSuccess(Math.round(30))
		}
		else
		{
			setSuccess(Math.round(10))
		}
    }
    
    const onClick=(item)=>{
        props.navigation.push('Readings',item)
    }

    const deleteAll=()=>{
        Alert.alert('Prompt','Are you sure you want to delete all readings?',
        [{
            text:'No'
        },
    {
        text:'Yes',
        onPress:()=>{
            let arr=[];
        readingList.map(item=>{
            arr.push( `{\"date\":\"${item.date}\"}` );
        })
        storage.removeAllKeys(arr);
        refreshArray();
        Alert.alert('Success','Readings Deleted Successfully');
       
        }
    }])
        
    }


    const downloadLink=()=>{
        console.log('here')
        props.navigation.navigate('UserPreferences', { screen: 'DownloadReadings' });
    }
    return (
        
        <SafeAreaView>
            <View style={{flexDirection:'row'}}>
            

              {readingList.length>0? <TouchableHighlight style={style.DeleteButton}
             onPress={()=>deleteAll()}>
                    <Text style={style.DeleteText}>Delete All</Text>
                </TouchableHighlight>:null}
            </View>
              
            <FlatList
            data={readingList}
            extraData={success}
          
            renderItem={({item})=>(

                <View>
                    <TouchableHighlight style={{width:300}} onPress={()=>{
                        onClick(item)
                    }} underlayColor="transparent">
                    <Text 
                    style={style.Text}>
                    {item.date + ' ' + item.Title}
                    </Text>
                    </TouchableHighlight>
                    <View style={{alignItems:'flex-end',marginTop:-50,marginRight:20}}>
                    <TouchableHighlight onPress={()=>{
                        deleteReading(item.date)
                    }} underlayColor="transparent">
                    <Icon
                    containerStyle={style.Text}
                    name="delete"/>
                    </TouchableHighlight>
                    

                    </View>
                    
                </View>  
               
            )}
            key={items=>items.date}
            keyExtractor={items=>items.date}
            ListHeaderComponent={()=>{
                return <View style={{marginTop:30}}></View>
            }}
            ItemSeparatorComponent={()=>{
                return <Divider style={style.Divider}/>
            }}
            ListFooterComponent={()=>{
                return <View style={{marginBottom:200}}></View>
            }}
            ListEmptyComponent={()=>{
                return (<View>
                    <Text style={style.Text}>No Readings Found! Kindly goto userpreferences and download readings offline</Text>
                     {/* <TouchableHighlight style={style.DownloadButton} onPress={downloadLink}>
                         <Text style={style.DeleteText}>Download</Text>
                     </TouchableHighlight>
                    */}
                </View>)
            }}
            />
            
        </SafeAreaView>
    )
        }
    
    const style=StyleSheet.create({
        Divider:{
            backgroundColor:'maroon',
            
        },
        Text:{
            marginTop:15,
            marginBottom:10,
            marginLeft:20
        },
        CheckBox:{
            marginTop:20
        },
        DeleteText:{
            color:'white',
            textAlign:'center'
        },
        DeleteButton:{
            marginTop:20,
            alignSelf:"center",
            
            backgroundColor:'red',
            borderRadius:15,
            width:100,
            height:50,
            justifyContent:"center",
            marginLeft:10
        },
        DownloadButton:{
            marginTop:20,
            alignSelf:"center",
            
            backgroundColor:'green',
            borderRadius:15,
            width:100,
            height:50,
            justifyContent:"center",
            marginLeft:10
        },
    })
export default OfflineReadings