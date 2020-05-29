import React,{useState,useEffect, useMemo} from 'react'
import {View,Text,SafeAreaView,StyleSheet,FlatList} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {Divider,Icon} from 'react-native-elements';
const Storage=require('../../helper/Storage');
function DashBoard(props) {
    const [user,setUser]=useState(null);
    const [quoteToShow,setQuoteToShow]=useState('');
    const [registered,setRegistered]=useState(false);
    const [readingCount,setReadingCount]=useState(0);
    let Images=[
        require('../../assets/images/slider/slider1.png'),
        require('../../assets/images/slider/slider2.png'),
        require('../../assets/images/slider/slider3.png'),
        require('../../assets/images/slider/slider4.png'),
      ]
    let arr=[];
    const getDownloadHymns=()=>{
      let mounted=true;
      let readingListCount=0;
        Storage.getAllMessages().then(success=>{
            success.map(item=>{
                // let key=JSON.parse(item).date
                if(item!=='registered' && !item.includes('HomilyDate'))
                  {
                    readingListCount=readingListCount+1;
                 }
            })

        setReadingCount(readingListCount)
            
        })
        return ()=>mounted=false;
    }

    useEffect(()=>{
        let mounted=true;
       const fetchUser= Storage.getMessageById('registered')
        .then(success=>{
            if(mounted){
                if(success!==null)
                {
                  setUser(success);
                  setRegistered(true);
                }
                getDownloadHymns();
            }
           
        }).catch(error=>{
    })
        fetchUser;
        

        return ()=>{
            mounted=false;
        }
    },[])
 
const dashBoardList=[
    {
        id:'1',
        name:'Hymns',
        count:355,
        backgroundColor:'green',
        color:'white',
        icon:'book',
        iconcolor:'white'
    },
    {
        id:'2',
        name:'Prayers',
        count:12,
        backgroundColor:'gold',
        color:'white',
        icon:'book',
        iconcolor:'white'
    },
    {
        id:'3',
        name:'Downloaded Readings',
        count:readingCount,
        backgroundColor:'purple',
        color:'white',
        icon:'cloud-download',
        iconcolor:'white'
    },
    // {
    //     id:'4',
    //     name:'Reminders Set',
    //     count:0,
    //     backgroundColor:'transparent',
    //     color:'black',
    //     icon:'alarm',
    //     iconcolor:'black'
    // }
]

function fnDashBoardList(arr)
{
    return arr;
}

        const showQuote=async()=>{
            let show_quote=quoteList[Math.floor(Math.random()*quoteList.length)];
            setQuoteToShow(show_quote.Quote)
        }

        const reRenderList=useMemo(()=>fnDashBoardList(dashBoardList),[dashBoardList])

    return (
        <SafeAreaView>
                 <View>
                 <SliderBox images={Images} 
                    autoplay
                    circleLoop/>
                 </View>
                <FlatList
                
                data={dashBoardList}
                renderItem={({item})=>(
                    <SafeAreaView style={{backgroundColor:item.backgroundColor}}>
                    <View style={{flexDirection:'row'}}> 
                        <Icon name={item.icon} containerStyle={styles.Icon} color={item.iconcolor}/>
                        <Text style={styles.Text}>{item.name}</Text>
                    </View>
                    <View>
                        <Text style={{marginLeft:65,fontSize:30,color:item.color}}>{item.count}</Text>
                    </View>
                    </SafeAreaView>
                )}
                keyExtractor={item=>item.id}
                ItemSeparatorComponent={()=>{return <Divider style={styles.Divider} />}}
                ListHeaderComponent={()=>{
                    return <View 
                    style={{marginTop:0,alignSelf:'center',marginBottom:0}}>
                  </View>
                }}

                ListFooterComponent={()=>{
                    return <View style={{marginBottom:500}}>

                    </View>
                }}
                /> 
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    Welcome:{
        textAlign:"center",
        marginTop:-10
    },
    Icon:{
        marginTop:28,
        marginLeft:20
    },
    Text:{
        marginTop:30,
        marginLeft:20,
        color:'white'
    },
    Divider:{
        backgroundColor:'maroon',
        marginTop:0
    }
})
export default DashBoard
