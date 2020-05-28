import React,{useState,useEffect} from 'react';
import {View,
        SafeAreaView,
        FlatList,
        StyleSheet,
        Text,
        TouchableHighlight,
        Alert
       } from 'react-native';

import * as MessageStorage from '../../helper/Storage';
import { Icon,Divider } from 'react-native-elements';
const Homily=(props)=>{
    let [homilyList,setHomilyList]=useState([]);
    const [deleteid,setDeleteID]=useState(0);
    const fetchHomilyList=()=>{
        MessageStorage.getAllMessages().then(response=>{
            response.map(item=>{
                if(item.includes('HomilyDate'))
                {
                    MessageStorage.getMessageById(item)
                    .then(response=>{
                        if(!homilyList.includes(item))
                        setHomilyList(oldArr=>[...oldArr,{response:response,date:item}])
                    })
                }
            })
        })
    }
    useEffect(()=>{
        let fetch=true;
        fetchHomilyList();
        fetch=false;
    },[deleteid])

    const displayHomily=(item)=>{
        props.navigation.push('DisplayHomily',{item,_delete,setDeleteID,homilyList});
    }

    const _delete=(id)=>{
        MessageStorage.removeMessageById(id);
        Alert.alert('Success','Homily deleted successfully!',[{
            text:'Ok',
            onPress:()=>{
                homilyList.length=0;
                setDeleteID(Math.floor(Math.random() * 100) + 1)
            }
        }])
    }   

    const deleteHomily=(id)=>{
        Alert.alert('Prompt','Are you sure you want to delete?',[{
            text:'No'
        },{
            text:'Yes',
            onPress:()=>{
                _delete(id);

            }
        }])
    }
    return (
        <SafeAreaView>
            <FlatList
            data={homilyList}
            renderItem={({item})=>(
                <SafeAreaView>
                 
                <View style={{flexDirection:'row'}}> 
                <Icon name="edit" containerStyle={style.Icon}/>
               <TouchableHighlight 
               underlayColor="transparent"
                onPress={()=>displayHomily(item)}>
               <Text 
               style={style.Text}>
                   {item.date.split(':')[1]} ({JSON.parse(item.response).title})
                   </Text>
               </TouchableHighlight>
                </View>
                <View style={{alignItems:'flex-end',marginTop:-25,marginRight:20}}>
                    <Icon name="delete" onPress={()=>deleteHomily(item.date)} />
                </View>
                </SafeAreaView>
            )}
            keyExtractor={keys=>keys.response}
            ListEmptyComponent={()=>{
                return <View><Text style={style.NotFound}>No Homily Found!!!</Text></View>
            }}
            ItemSeparatorComponent={()=>{
                return <Divider style={style.Divider}/>
            }}
            />
            
        </SafeAreaView>

    );
}

const style=StyleSheet.create({
    NotFound:{
        textAlign:'center',
        marginTop:30
    },
    Text:{
        marginLeft:20,
        marginTop:20
    },
    Icon:{
        marginTop:20,
        marginLeft:20
    },
    Divider:{
        backgroundColor:'maroon',
        marginTop:10
    }
})

export default Homily;