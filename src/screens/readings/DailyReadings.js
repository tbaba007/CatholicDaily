import React,{useState,useEffect} from 'react';
import {
    Text,
    View,
    ScrollView,
    Alert,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    SafeAreaView,
    ToastAndroid
    } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
const NetworkHekper=require('../../helper/Internet');
const Storage=require('../../helper/Storage');
import DatePicker from 'react-native-datepicker';
const HymnService=require('../../services/HymnService.service');
export default function DailyReadings(props)
{
    var DateInstance=new Date();
    let defaultDate=DateInstance.getFullYear()+
    '-'+(parseInt(DateInstance.getMonth())<10?'0'+parseInt(DateInstance.getMonth()+1):parseInt(DateInstance.getMonth()))
    +'-'+DateInstance.getDate()

    const [loading,setLoading]=useState(false);
    const [loaded,setLoaded]=useState(false);
    const [readingBodyArr,setReadingBodyArr]=useState([]);
    const [date,setDate]=useState(defaultDate)


    const readingFooter=[{
        firstReading:'\n\nThe word of the lord,Thanks be to God',
        secondReading:'\n\nThe word of the lord,Thanks be to God',
        Gospel:'\n\nThe gospel of the lord, Praise be to you lord Jesus Christ'
    }]

    

    const isInternetAvailable=()=>{
        let res=false;
        NetworkHekper.isConnected()
        .then(success=>{
            if(!success.isConnected)
          res=false;
           else
           res= true;
        })
        return res;
    }

    useEffect(()=>{
        readingBodyArr.length=0;
        let fetch=false;
        fetchReadingHeader(date)
        fetch=true;
    },[date])

 
    const setReadingHeader=(response,_date)=>{
      
         let responseDate={
             date:_date,
             title:response.Title,
             first_reading:response.ReadingGroups[0].Readings[0].Citations[0].Reference,
             responsorial_psalm:response.ReadingGroups[0].Readings[1].Citations[0].Reference,
             second_Reading:response.ReadingGroups[0].Readings[2].Type==='Reading 2'
             ? response.ReadingGroups[0].Readings[2].Citations[0].Reference:'',
             gospel_reading:response.ReadingGroups[0].Readings[2].Type==='Gospel'
             ?
             (response.ReadingGroups[0].Readings[2].Citations[0].Reference)
             :
             response.ReadingGroups[0].Readings[3].Type==='Gospel'
             ?
             (response.ReadingGroups[0].Readings[3].Citations[0].Reference)
             :
             'Not Available'
         }
        
       
        fetchReadingDetails(responseDate);
       
    }

  
    const setReadingText=(response,response_data)=>{
        
        
         let firstreadingbody='';
         let Psalm='';
         let secondReadingBody='';
         let gospelReading='';
        if( Object.entries(response).length===4)
        {
            
            Object.entries(response)[0][1].Chapters[0].Verses.map(item=>{
                firstreadingbody=firstreadingbody+item.Number+'. '+item.Text
               
            })
            
            Object.entries(response)[1][1].Chapters[0].Verses.map(item=>{
                Psalm=Psalm+item.Number+'. '+item.Text
            })
            Object.entries(response)[2][1].Chapters[0].Verses.map(item=>{
                
                secondReadingBody=secondReadingBody+item.Number+'. '+item.Text
            })
            Object.entries(response)[3][1].Chapters[0].Verses.map(item=>{
               gospelReading=gospelReading+item.Number+'. '+item.Text
            })
            
        }
        else
        {
            Object.entries(response)[0][1].Chapters[0].Verses.map(item=>{
                firstreadingbody=firstreadingbody+item.Number+'. '+item.Text 
            })
            Object.entries(response)[1][1].Chapters[0].Verses.map(item=>{
                Psalm=Psalm+'\n'+item.Number+'. '+item.Text
            })
            Object.entries(response)[2][1].Chapters[0].Verses.map(item=>{
               gospelReading=gospelReading+item.Number+'. '+item.Text
            })
        }
       
        
        var readingObj={
           FirstReading:firstreadingbody,
           Psalm:Psalm,
           SecondReading:secondReadingBody,
           Gospel:gospelReading,
           date:response_data.date,
           Title:response_data.title,
           FirstReadingHeader:response_data.first_reading,
           PsalmHeader:response_data.responsorial_psalm,
           SecondReadingHeader:response_data.second_Reading,
           GospelReadingHeader:response_data.gospel_reading
           
        };
        setReadingBodyArr(oldarr=>[...oldarr,readingObj])
        // readingBodyArr=readingObj;
        
        setLoaded(true);
        //console.log('obj',readingBodyArr.Title)
    }

    const fetchReadingHeader=async(_date)=>{
        setLoading(true);
        NetworkHekper.isConnected()
        .then(success=>{
            console.log(success)
            if(!success.isConnected)
            {
                return Alert.alert('Error','Internet Network Not Found. Kindly Connect To A Network.')
            }
            else
            if(!success.isInternetReachable)
            {
                return Alert.alert('Error','Internet Network Not Found. Kindly Connect To A Network.')
            }
        })
        await HymnService.getHymn(`https://www.ewtn.com/se/readings/readingsservice.svc/day/${_date}/en`)
        .then(
            response=>response.json()
            
        )
        .then(success=>{
            setReadingHeader(success,_date);
           console.log(success)
            
        }).catch(error=>{
            
            Alert.alert('Internet Connection Error',error.message + '\n Check your internet connection')
            
        }).finally(
            ()=>{
                setLoaded(true)
            setLoading(false)
            }
        )
        
    }

    const fetchReadingDetails=async(_response)=>{
      
            let refrences=_response.second_Reading!==''?[_response.first_reading,
                _response.responsorial_psalm,_response.second_Reading,
                _response.gospel_reading]:
                [_response.first_reading,_response.responsorial_psalm,
                _response.gospel_reading]

                
             await HymnService.getBooks(`https://www.ewtn.com/se/readings/readingsservice.svc/books`,refrences)
            .then(
                response=>response.json()
                
            ).then(success=>{
                console.log('response',success)
                setReadingText(success,_response)
               
            })
       
     
        //.catch(error=>Alert.alert('error','An Error Occured While Fetching The Readings'))
    }

    return(
        <SafeAreaView>
    <View style={{flexDirection:'row'}}>
    <DatePicker
    style={style.DatePicker}
    date={date}
    mode="date"
    placeholder="select date"
    format="YYYY-MM-DD"
    confirmBtnText="Confirm"
    customStyles={{
      dateIcon: {
        position: 'absolute',
        alignSelf:'center',
        left: 0,
        top: 4,
        marginLeft: 5
        
      },
      dateInput: {
        marginLeft: 36
      }
    }}
    onDateChange={(date) => {
        setLoaded(false)
        setDate(date)
    }}/>
             
   
             
       </View>


           {loaded && readingBodyArr.length>0?
           (
           <View>
             
                <Text style={style.Header}>Title:{readingBodyArr[0].Title}</Text>

                <Text style={style.Header}>First Reading: {readingBodyArr[0].FirstReadingHeader}</Text>

                <Text style={style.Header}>Responsorial Psalm: {readingBodyArr[0].PsalmHeader}</Text>

                <Text style={style.Header}>{readingBodyArr[0].SecondReadingHeader!==''?
                'Second Reading: '+ readingBodyArr[0].SecondReadingHeader:'Second Reading Not Available Today'}</Text>

                <Text style={style.Header}>Gospel : {readingBodyArr[0].GospelReadingHeader}</Text>

                <Text style={{borderBottomColor: 'black',borderBottomWidth: 1,}}></Text>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                <Text style={style.Header}>First Reading : {readingBodyArr[0].FirstReadingHeader} </Text>


                <Text style={style.Body}>{readingBodyArr[0].FirstReading +'\n'}</Text>

                <Text style={style.Header}>Responsiorial Psalm:{readingBodyArr[0].PsalmHeader}</Text>

                <Text style={style.Body}>{readingBodyArr[0].Psalm}</Text>

                <Text style={style.Header}>{readingBodyArr[0].SecondReadingHeader!==''?
                'Second Reading: '+ readingBodyArr[0].SecondReadingHeader:'Second Reading Not Available Today'}</Text>

                <Text  style={style.Body}>{readingBodyArr[0].SecondReading}</Text>

                <Text style={style.Header}>Gospel : {readingBodyArr[0].GospelReadingHeader}</Text>

                <Text style={style.Body}>{readingBodyArr[0].Gospel}</Text>

                <Text style={style.Footer}>{readingBodyArr[0].Gospel!==''?'The gospel of the Lord...praise be to you Lord Jesus Christ!':''}</Text>
                </ScrollView>
           </View>):!loaded?(
                             <ActivityIndicator
                            size="large"
                            style={{marginTop:100}}/>
                            ):null}
             
         
       </SafeAreaView>  
    );
}


const style=StyleSheet.create({
    Header:{
        marginLeft:10,
        marginTop:10
    },
    Body:{
        marginLeft:15,
        marginRight:10,
        marginTop:1,
        marginBottom:20
    },
    DatePicker:{
        alignSelf:'center',
        marginTop:20
    },
    Text:{
        marginTop:30,
        marginLeft:20,
    },
   DownloadButton:{
       backgroundColor:'green',
       width:100,
       borderRadius:20,
       height:40,
       marginTop:20,
       alignSelf:'center'
   },
   DownloadText:{
       textAlign:'center',
       marginTop:10,
       color:'white'
   },
   Footer:{
    marginLeft:'2%',
    fontStyle:"italic",
    marginBottom:700
},
})