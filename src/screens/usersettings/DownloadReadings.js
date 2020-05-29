import React,{useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    Alert,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    SafeAreaView,
    ToastAndroid,
    YellowBox
    } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
const NetworkHekper=require('../../helper/Internet');
const Storage=require('../../helper/Storage');
import DatePicker from 'react-native-datepicker';
const HymnService=require('../../services/HymnService.service');
export default function DownloadReadings(props)
{
    var DateInstance=new Date();
    let defaultDate=DateInstance.getFullYear()+
    '-'+(parseInt(DateInstance.getMonth())<10?'0'+parseInt(DateInstance.getMonth()+1):parseInt(DateInstance.getMonth()))
    +'-'+DateInstance.getDate()

    const [readingArray,setReadingArray]=useState([]);
    const [showDatePicker,setShowDatePicker]=useState(false);
    const [datefetcher,setDateFetcher]=useState(defaultDate);
    const [title,setTitle]=useState('');
    const [firstReading,setFirstReading]=useState('');
    const [responsorialpsalm,setResponsorialPsalm]=useState('');
    const [secondReading,setSecondReading]=useState('');
    const [gospelReading,setGospelReading]=useState('');
    const [firstReadingBody,setFirstReadingBody]=useState('');
    const [secondReadingBody,setSecondReadingBody]=useState('');
    const [responsorialReadingBody,setResponsorialReadingBody]=useState('');
    const [gospelReadingBody,setGospelReadingBody]=useState('');
    const [loading,setLoading]=useState(false);
    const [startDate,setStartDate]=useState('');
    const [endDate,setEndDate]=useState('');
    const [error,setError]=useState('');
    let readingBodyArr=[];
    const [date,setDate]=useState(new Date())
    YellowBox.ignoreWarnings(['componentWillReceiveProps']);
    const validation=()=>{
        if(startDate==='')
        {
            ToastAndroid.showWithGravity('Please Select A Valid Start Date',1000,ToastAndroid.CENTER);
            return false;
        }
        if(endDate==='')
        {
            ToastAndroid.showWithGravity('Please Select A Valid End Date',1000,ToastAndroid.CENTER);
            return false;
        }

        return true;
    }

    const isConnected=async()=>{
        let connected=false;
        await NetworkHekper.isConnected()
        .then(success=>{
            console.log(success)
            if(!success.isConnected)
            {
              connected=false;
            }
            else
            if(!success.isInternetReachable)
            {
                connected=false;
            }else{
                connected=true;
            }
        })
        return connected;
    }
 
    const handleDataPull=(startDate, endDate)=>
    {
        setError('');
         Promise.resolve(isConnected()).then(err=>{
           
             if(!err)
             {
                setError('err');
                Alert.alert('Error','Internet Network Not Detectedd');
                return;
             }
             else
             {
                if(startDate>endDate)
                {
                    Alert.alert('Error','StartDate Cannot Be Greater Than EndDate');
                    return;
                }
                    var dates = [],
                        currentDate = startDate,
                        addDays = function(days) {
                          var date = new Date(this.valueOf());
                          date.setDate(date.getDate() + days);
                          return date;
                        };
                    while (currentDate <= endDate) {
                       dates.push(formatDate(currentDate));
                      currentDate = addDays.call(currentDate, 1);
                    }
                   
                    if(dates.length>29)
                    {
                        Alert.alert('Error','Please Select Maximum 30days');
                        return;
                    }
        
                    for(var i=0;i<dates.length;i++)
                    {
                        setLoading(true);
                        
                        fetchReadingHeader(dates[i])
                           
                        
                        
                    }
        
                    setTimeout(()=>{
                        setLoading(false)
                        console.log(error);
                        if(error==='')
                        {
                            Alert.alert('Success','Mass Readings Downloaded Successfully');

                        }
                    },10000)
                    return dates;
             }
         })
    
    }

    const formatDate=(date)=> {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + (month-1);
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }


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

       saveReadingToLocalStorage(readingObj)
        
        
    }

    const fetchReadingHeader=async(_date)=>{

      
        
    await HymnService.getHymn(`https://www.ewtn.com/se/readings/readingsservice.svc/day/${_date}/en`)
        .then(
            response=>response.json()
            
        )
        .then(success=>{
            setReadingHeader(success,_date);
           
            
        }).catch(error=>{
            Alert.alert('Internet Connection Error',error.message + '\n Check your internet connection')
            setLoading(false)
            return;
        })
        
    }

    const fetchReadingDetails=async(_response)=>{
      
            setFirstReadingBody('');
            let refrences=_response.second_Reading!==''?[_response.first_reading,
                _response.responsorial_psalm,_response.second_Reading,
                _response.gospel_reading]:
                [_response.first_reading,_response.responsorial_psalm,
                _response.gospel_reading]

                
             await HymnService.getBooks(`https://www.ewtn.com/se/readings/readingsservice.svc/books`,refrences)
            .then(
                response=>response.json()
                
            ).then(success=>{
                //console.log('response',success)
                setReadingText(success,_response)
               
            })
       
     
        //.catch(error=>Alert.alert('error','An Error Occured While Fetching The Readings'))
    }

    const saveReadingToLocalStorage=(obj)=>{
      
        let massDate=obj.date;
        var Readingobj={
           FirstReading:obj.FirstReading,
           Psalm:obj.Psalm,
           SecondReading:obj.SecondReading,
           Gospel:obj.Gospel,
           date:obj.date,
           Title:obj.Title,
           FirstReadingHeader:obj.FirstReadingHeader,
           PsalmHeader:obj.PsalmHeader,
           SecondReadingHeader:obj.SecondReadingHeader,
           GospelReadingHeader:obj.GospelReadingHeader
           
       }

     //  console.log(Readingobj)

       var dateObj={
           date:massDate
       }
       var myJSON=JSON.stringify(Readingobj);
       var myDate=JSON.stringify(dateObj);
       Storage.saveMessage(myDate,myJSON);
    }

    return(
        <SafeAreaView>
     <Text style={{textAlign:'center',marginTop:30}}>Download Daily Readings Offline</Text>       
    <View style={{flexDirection:'row',alignSelf:'center'}}>
        <Text style={style.Text}>From:</Text>
    <DatePicker
    style={style.DatePicker}
    date={startDate}
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
        marginLeft: 0
        
      },
      dateInput: {
        marginLeft: 36
      }
    }}
    onDateChange={(date) => setStartDate(date)}/>
             
    <Text style={style.Text}>To:</Text>
    <DatePicker
    style={style.DatePicker}
    date={endDate}
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
        marginLeft: 0
        
      },
      dateInput: {
        marginLeft: 36
      }
    }}
    onDateChange={(date) => setEndDate(date)}/>
             
       </View>
       <TouchableHighlight disabled={loading?true:false} style={style.DownloadButton}
       onPress={()=>{
         if(!validation())
         {
             return;
         }
        
            let from_date=startDate.replace('-',',').replace('-',',').split(',');
            let to_date=endDate.replace('-',',').replace('-',',').split(',');
           
           handleDataPull(new Date(parseInt(from_date[0]),parseInt(from_date[1]),parseInt(from_date[2])),
            new Date(parseInt(to_date[0]),parseInt(to_date[1]),parseInt(to_date[2])));   
       }}>
           <Text style={style.DownloadText}>Download</Text>
       </TouchableHighlight>
       {loading?
       <ActivityIndicator
       size="large"
       style={{marginTop:100}}/>:null}
         
       </SafeAreaView>  
    );
}


const style=StyleSheet.create({
    DatePicker:{
        alignSelf:'center',
        marginTop:20
    },
    Text:{
        marginTop:30,
        marginLeft:5,
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
   }
})