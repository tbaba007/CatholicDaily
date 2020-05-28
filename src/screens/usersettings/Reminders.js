import React,{useState,useEffect} from 'react';
import {Picker,View,FlatList,SafeAreaView,StyleSheet,Alert,Text,TouchableHighlight,Switch} from 'react-native';
import Dialog from "react-native-dialog";
import {Divider,Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
const messageStorage=require('../../helper/Storage');
const Reminders=(props)=>{
    const [showDatePicker,setShowDatePicker]=useState(false);
    const [refresh, setRefresh] = useState(0);
    const [date,setDate]=useState(new Date())
    const [name,setName]=useState('');
    const [itemId,setItemId]=useState(0);
    const [value,setSelectedValue]=useState(false);
    const [success,setSuccess]=useState(false);
    const [saveMessageResponse,setSaveMessageResponse]=useState(false);
    const [reminderResponse,setReminderResponse]=useState([]);
    let responseArray=[];
    let [reminderList, setReminderList] = useState([
        {
            id:'1',
            name:'Angelus Prayer',
            isChecked:false,
            times:''
        },
        {
            id:'2',
            name:'Regina Caeli',
            isChecked:false,
            times:''
        },
        {
            id:'3',
            name:'Holy Rosary',
            isChecked:false,
            times:''
        },
        {
            id:'4',
            name:'Divine Mercy',
            isChecked:false,
            times:''
        },
        {
            id:'5',
            name:'Holy Rosary',
            isChecked:false,
            times:''
        }
    ])
    var DateInstance=new Date();
    let defaultDate=DateInstance.getFullYear()+
    '-'+(parseInt(DateInstance.getMonth())<10?'0'+parseInt(DateInstance.getMonth()+1):parseInt(DateInstance.getMonth()))
    +'-'+DateInstance.getDate()



    const findReminder = id => {
        for (let i = 0; i < reminderList.length; i++) {
          if (reminderList[i].id === id) {
            return i;
          }
        }
        return -1;
      };
      const checkCopy = id => {
        var findChecked = findReminder(id);
        reminderList[findChecked].isChecked = !reminderList[
            findChecked
        ].isChecked;
        setRefresh(Math.floor(Math.random() * 100) + 1);
        
      };

      const saveMessage=(id,value)=>{
        messageStorage.getMessageById(id)
        .then(success=>{
            console.log(success)
            if(success===null)
            {
                messageStorage.saveMessage(id,value)
            }
            else{
                var val=success+','+value;
                messageStorage.saveMessage(id,val);
            }
        })
      }

    const onChange = (event, selectedDate) => {
        
        if(event.type==='dismissed')
         {
            setShowDatePicker(false);
            setSuccess(false);
            setSelectedValue(false);
            reminderList[itemId-1].isChecked=false;
            setRefresh(Math.floor(Math.random() * 100) + 1);
            return;
         }
         let id=(itemId-1).toString();
         let value=selectedDate.toString().split('T')[0].split(' ')[4]
         saveMessage(id,value)
         Alert.alert('Success','Reminder Added Successfully...Do you want to add another one',
         [
             {text:'No'},{text:'Yes',onPress:()=>{
                 setShowDatePicker(true)
                 setSuccess(true);
                
             }}
        ])
 };

 
 

useEffect(()=>{
    messageStorage.getAllMessages().then(success=>{
        success.map(item=>{
            
            if(item==='0'||item===1||item===2||item===3||item===4)
            {
                messageStorage.getMessageById(item)
                .then(response=>{
                    times(response,item)
                })
            }
        })
        
    })
    
},[])

const times =(response,id)=>{
    switch (id) {
        case 0:
            reminderList[0].times=response
            break;
        case 1:
            reminderList[1].times=response
            break;
        case 2:
            reminderList[2].times=response
            break;
        case 3:
            reminderList[3].times=response
            break;
        case 4:
            reminderList[4].times=response
            break;
        default:
            break;
    }
}
   
    return (
        
        <SafeAreaView>
            <FlatList 
            data={reminderList}
            renderItem={({item})=>(
                <View style={{flexDirection:'column'}}>
                 <TouchableHighlight>
                    <Text style={style.Text}>
                        {item.name}
                    </Text>
                </TouchableHighlight>

              <Text style={style.Text}>{item.times}</Text>
                
                <Switch 
                style={style.Switch}
                onValueChange={(value)=>{
                    checkCopy(item.id)
                  //  setShowDatePicker(true);
                    setName(item.name);
                    setItemId(item.id);
                   value?setShowDatePicker(true):setShowDatePicker(false)
                 } }
                value={item.isChecked}/>
                
                </View>
               
            )}
           keyExtractor={item=>item.id}
           ItemSeparatorComponent={()=>{
            return <Divider style={style.Divider}/>
        }
        }/>

            <View>
             
                 {showDatePicker || success ?  
                <DateTimePicker
                timeZoneOffsetInMinutes={3}
                value={date}
                mode={'time'}
                display="default"
                onChange={onChange}

                />:null}
            </View>
        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    Divider:{
        backgroundColor:'maroon',
        marginTop:20
    },
    Text:{
        marginLeft:20,
        marginTop:20
    },
    Icon:{
        marginLeft:10,
        marginTop:20
    },
    Switch:{
        marginRight:20,
        marginTop:-25
    }
})
export default Reminders;