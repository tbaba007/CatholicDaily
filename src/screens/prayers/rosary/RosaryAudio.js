import React,{useState} from 'react';
import {FlatList,SafeAreaView,View,StyleSheet,Text,TouchableHighlight} from 'react-native';
import {Icon,Divider } from 'react-native-elements';
import SoundPlayer from 'react-native-sound-player'

const RosaryAudio=()=>{
    const [active,setActive]=useState('');
    const iconSize=30;
    const [value,setvalue]=useState(0);
    
    let [rosaryArray,setRosaryArray]=useState([
        {
        id:'1',
        name:'Joyful Mystery  (Mondays and Saturdays)',
        isPlaying:false
        },
        {
        id:'2',
        name:'Sorrowful Mystery  (Tuesdays and Fridays)',
        isPlaying:false
        },
        
        {
        id:'3',
        name:'Luminous Mystery  (Thursdays Only)',
        isPlaying:false
        },
        {
        id:'4',
        name:'Glorious Mystery  (Wednesdays and Sundays)',
        isPlaying:false
        }])


    const playSong=(rosary)=> {
        try {
          SoundPlayer.playSoundFile(rosary, 'mp3')
        } catch (e) {
          alert('Cannot play the file')
     //     console.log('cannot play the song file', e)
        }
      }

    const stopPlaying=()=>{
        try{
            SoundPlayer.stop();
            resetPlayer();
            setvalue(Math.floor(Math.random() * 100) + 1);
        }
        catch{

        }
    }


        const chooseRosary=(id)=>{
            setActive(id)
            
            id==='1'?(playSong('joyful'))
                    :id==='2'?(playSong('sorrowful')):
                    id==='3'?(playSong('luminous'))
                    :id==='4'?(playSong('glorious'))
                    :null
                    rosaryArray.map(item=>{
                        if(item.id!==id)
                        item.isPlaying=false;
                        else
                        item.isPlaying=true;
                    })
                    setvalue(Math.floor(Math.random() * 100) + 1);
        }

        const resetPlayer=()=>{
            rosaryArray.map(item=>{
                
                item.isPlaying=false;
                
            })
        }

        const emums=(id)=>{
            switch (id) {
                case '1':
                    return 'Joyful Mysteries Now Playing'
                    break;
                case '2':
                    return 'Sorrowful Mysteries Now Playing'
                    break;
                case '3':
                    return 'Luminous Mysteries Now Playing'
                    break;  
                case '4':
                    return 'Glorious Mysteries Now Playing'
                    break;    
                default:
                    break;
            }
        }
      const mediaController=(item)=>{
         
         
          return(
              <SafeAreaView>
                   <View style={{flexDirection:'row',marginLeft:20}}>
                       <Icon name="stop"  disabled={!item.isPlaying && rosaryArray.includes(true)?true:false} size={iconSize} onPress={()=>
                      stopPlaying()
                        
                       }/>
                       <Icon name="play-arrow" color={item.isPlaying?'green':'black'}
                       disabled={!item.isPlaying && rosaryArray.includes(true)?true:false} size={iconSize}onPress={()=>
                        chooseRosary(item.id)
                        
                    
                  }/>
                       {/* <Icon name="pause" size={iconSize} onPress={()=>console.log('pause'+ id)}/> */}
                   </View>
              </SafeAreaView>
          )
      }  
    return(
        <SafeAreaView>
            <FlatList
            
            data={rosaryArray}
            renderItem={({item})=>(
                <View>
                  
                    <TouchableHighlight>
                      <Text style={style.Text}>{item.name}</Text>
                    </TouchableHighlight>

                    {mediaController(item)}

            <Text style={style.Text}>{item.isPlaying?'Now Playing':''}</Text>
                </View>
            )}
            keyExtractor={keys=>keys.id}
            extraData={value}
            ItemSeparatorComponent={()=>{
                return <Divider style={style.Divider}/>
            }}
            ListHeaderComponent={()=>{
                return <Text style={{textAlign:'center',marginTop:30,fontWeight:'bold',fontSize:20}}>{emums(active)}</Text>
            }}
            />
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
    },
    Active:{
        backgroundColor:'green'
    }
})
export default RosaryAudio;