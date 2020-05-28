import React,{useState, useEffect} from 'react'
import {FlatList,SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    ToastAndroid} from 'react-native';
import {Divider,Icon} from 'react-native-elements';
import ShowHymn from './ShowHymn';
import { hymnList } from './HymnList';

let HymnList= require('./HymnList').hymnList;
const Messages=require('../../helper/MessageList').messageList;
let Arr=[];
function HymnIndex(props) {
const [renderList,setRenderList]=useState([]);
const [showHymn,setShowHymn]=useState(false);
const [hymnObject,setHymnObject]=useState(false);
const [searchParam,setSearchParam]=useState('');

const handleClick=(item)=>{
    // setHymnObject(item);
    // setShowHymn(true);

    props.navigation.push('ShowHymn',item)
}

function compare(a,b)
{
  if(parseInt(a.HymnNumber)<parseInt(b.HymnNumber))
  {
    return -1;
  }
  return 0;
}
useEffect(()=>{
    setRenderList(HymnList.sort(compare));
},[]);

const resetSearch=()=>{
    setSearchParam('')
        renderList.length=0;
        setRenderList(HymnList.sort(compare));
        return;         
}

    const Search=(id)=>{
        if(searchParam.trim().length===0)
        {
            ToastAndroid.show("Enter A Valid Hymn Number",1000);
           
            return;
        }
        //
        let searched=renderList.map(item=>{
            if(item.HymnNumber===searchParam)
            {
                //console.log(item);
                Arr.push(item);
                 setRenderList(Arr);
                return item;
            }
        })

                 
    }
    return (
        <SafeAreaView>

        <View style={{flexDirection:"column"}}>
                    <TextInput style={style.SearchText}
                    value={searchParam}
                    onChangeText={(value)=>setSearchParam(value)}
                    placeholder="Enter Hymn Number"/>
            <View style={{flexDirection:"row",alignSelf:'center'}}>
                    <TouchableHighlight style={style.TouchableHighlightButton}
                        onPress={()=>{
                            Search();
                        }}>
                            <Text style={style.TouchableHighlightButtonText}>
                                Search
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight style={style.Reset}
                        disabled={searchParam!==''?false:true}
                        onPress={()=>{
                            resetSearch();
                        }}>
                            <Text style={style.TouchableHighlightButtonText}>
                                Clear
                            </Text>
                        </TouchableHighlight>
            </View>
                        
        </View>
                    
        

            {!showHymn?
            (
            <FlatList
            keyboardDismissMode="none"
            data={renderList}
            renderItem={({item})=>(
                <View style={{flexDirection:"row"}}>
                    <Icon
                    name="music-note"
                    containerStyle={style.Icon}
                    />
                    <TouchableHighlight
                    onPress={()=>{
                        handleClick(item);
                    }}
                    underlayColor="transparent">
                    <Text style={style.Text}
                    >{item.HymnNumber+"." + " " +item.HymnName}</Text>
                    </TouchableHighlight>
                </View>
            )}
            keyExtractor={(item)=>{ return item.HymnNumber}}

            ItemSeparatorComponent={()=>{
                return <Divider style={style.Divider}/>
            }}

           
            />)
            :
            (
                <ShowHymn value={hymnObject}/>
            )
        }
            
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
export default HymnIndex
