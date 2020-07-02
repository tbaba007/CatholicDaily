import React,{useState,useEffect, useMemo} from 'react'
import {View,Text,SafeAreaView,Alert,StyleSheet,ScrollView,BackHandler} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {Card,Image,ListItem} from 'react-native-elements';
const Storage=require('../../helper/Storage');
function DashBoard(props) {
    const [user,setUser]=useState('');
    const [quoteToShow,setQuoteToShow]=useState('');
    const [registered,setRegistered]=useState(false);
    const [readingCount,setReadingCount]=useState(0);
    const day= new Date().getDay();
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
        //backAction()

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


    const backAction=()=>{
        console.log(props.route.name)
        if(props.route.name==='Home')
        {
            BackHandler.addEventListener('hardwareBackPress',()=>{
                Alert.alert("Hold on!", "Are you sure you want to exit?", [
                    {
                      text: "Cancel",
                      onPress: () => null,
                      style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                  ]);
                  return true;
                
            })
        }
        
    }
 
const dashBoardList=[
    {
        id:'1',
        name:'Hymns',
        subtitle:'From catholic hymn book Nigeria',
        count:356
    },
    {
        id:'2',
        name:'Prayers',
        subtitle:'Rich collections of prayers',
        count:12
    },
    {
        id:'3',
        name:'Downloaded Readings',
        subtitle:'Daily mass readings',
        count:readingCount
    },
    {
        id:'4',
        name:`Rosary Today:`,
        subtitle:`${day===0?
            'Glorious Mystery'
            :day===1?
            'Joyful Mystery'
            :day===2?
            'Sorrowful Mystery'
            :day===3?
            'Glorious Mystery'
            :day===4?
            'Luminious Mystery'
            :day===5?
            'Sorrowful Mystery'
            :day===6?
            'Joyful Mystery':''

        }`,
        count:''
    }
 ]
const onClickMenu=(menuId,value)=>{

    switch(menuId){
        case 'Hymns':
         return props.navigation.navigate('hymn')
        case 'Prayers':
         return props.navigation.navigate('prayer')
        case 'Downloaded Readings':
            if(value>0)
            {
            return props.navigation.navigate('DailyReadings',{screen:'Offline Readings'})
            }
            return props.navigation.navigate('UserPreferences',{screen:'DownloadReadings'})
       default:
            return props.navigation.navigate('prayer',{screen:'RosaryOption'})
    }
props.navigation.navigate('')
}
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
            <ScrollView>
                 <View>
                 <SliderBox images={Images} 
                    autoplay
                    circleLoop/>
                 </View>
                 
                <Card title={`Welcome ${user}`}  containerStyle={{borderRadius:30}}>
                 {
                     dashBoardList.map((item,id)=>{
                         return (
                           <ListItem 
                           badge={{value:item.count===undefined?'':item.count,textStyle:{color:'white'}}}
                           bottomDivider
                           chevron
                           leftAvatar={{source:require('../../assets/images/catholicImage.png')}}
                           title={item.name}
                           subtitle={item.subtitle}
                           key={id}
                           onPress={(p)=>{
                            onClickMenu(item.name,item.count)
                           }}
                           /> 
                         )
                     })
                 }
                </Card>
                </ScrollView>
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
