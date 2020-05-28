import React,{useState,useRef} from 'react';
import {View,
Image,
SafeAreaView,
Text,
StyleSheet,
TouchableHighlight,
ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
const stationPrayeList=require('../prayers/traditional/prayertext/PrayerList').Stations;
const StationsOfTheCross=()=>{
    const [station,setStation]=useState(0);
    const scroll=useRef(null);
    const scrollTop = () =>{
       
            scroll.current.scrollTo({ x: 0,y:0, animated: true });
     };
    return (
        <SafeAreaView>
            <ScrollView ref={ref=>(scroll.current=ref)}>
            <View style={{alignSelf:'center'}}>
            {station===1?
            (
            <Image
            source={stationPrayeList[1].Image}/>
            )   
            :station===2?
            (
            <Image
            source={stationPrayeList[2].Image}/>
            ) 
            :station===3?
            (
            <Image
            source={stationPrayeList[3].Image}/>
            )   
            :station===4?
            (
            <Image
            source={stationPrayeList[4].Image}/>
            )
            :station===5?
            (
            <Image
            source={stationPrayeList[5].Image}/>
            )   
            :station===6?
            (<Image
            source={stationPrayeList[6].Image}/>
            )
            :station===7?
            (
            <Image
            source={stationPrayeList[7].Image}/>
            )   
            :station===8?
            (<Image
            source={stationPrayeList[8].Image}/>
            )   
            :station===9?
            (<Image
            source={stationPrayeList[9].Image}/>
            )  
            :station===10?
            (<Image
            source={stationPrayeList[10].Image}/>
            )  
            :station===11?
            (
            <Image
            source={stationPrayeList[11].Image}/>
            )   
            :station===12?
            (
            <Image
            source={stationPrayeList[12].Image}/>
            )   
            :station===13?
            (
            <Image
            source={stationPrayeList[13].Image}/>
            )   
            :station===14?
            (
            <Image
            source={stationPrayeList[14].Image}/>
            )
          
            :null}
                
                </View>
                
             
             {station ===0?(
                 
            <Text style={style.Text}>
                {stationPrayeList[0].OpeningPrayer}

            </Text>
            )

            :station ===1?(<Text style={style.Text}>
                {stationPrayeList[1].Header}
                {stationPrayeList[1].Leader}
                {stationPrayeList[1].Reading}
                
                </Text>)
            :station===2?(<Text style={style.Text}>

                {stationPrayeList[2].Header}
                {stationPrayeList[2].Leader}
                {stationPrayeList[2].Reading}
            </Text>)
            :station===3?(<Text style={style.Text}>
                {stationPrayeList[3].Header}
                {stationPrayeList[3].Leader}
                {stationPrayeList[3].Reading}

            </Text>)
            :station===4?(<Text style={style.Text}>

                {stationPrayeList[4].Header}
                {stationPrayeList[4].Leader}
                {stationPrayeList[4].Reading}
            </Text>)
            :station===5?(<Text style={style.Text}>

                {stationPrayeList[5].Header}
                {stationPrayeList[5].Leader}
                {stationPrayeList[5].Reading}
            </Text>)
            :station===6?(<Text style={style.Text}>

                {stationPrayeList[6].Header}
                {stationPrayeList[6].Leader}
                {stationPrayeList[6].Reading}
            </Text>)
            :station===7?(<Text style={style.Text}>

                {stationPrayeList[7].Header}
                {stationPrayeList[7].Leader}
                {stationPrayeList[7].Reading}
            </Text>)
            :station===8?(<Text style={style.Text}>

                {stationPrayeList[8].Header}
                {stationPrayeList[8].Leader}
                {stationPrayeList[8].Reading}
            </Text>)
            :station===9?(<Text style={style.Text}>

                {stationPrayeList[9].Header}
                {stationPrayeList[9].Leader}
                {stationPrayeList[9].Reading}
            </Text>)
            :station===10?(<Text style={style.Text}>

                {stationPrayeList[10].Header}
                {stationPrayeList[10].Leader}
                {stationPrayeList[10].Reading}
            </Text>)
            :station===11?(<Text style={style.Text}>

                {stationPrayeList[11].Header}
                {stationPrayeList[11].Leader}
                {stationPrayeList[11].Reading}
            </Text>)
            :station===12?(<Text style={style.Text}>

                {stationPrayeList[12].Header}
                {stationPrayeList[12].Leader}
                {stationPrayeList[12].Reading}
            </Text>)
            :station===13?(<Text style={style.Text}>

                {stationPrayeList[13].Header}
                {stationPrayeList[13].Leader}
                {stationPrayeList[13].Reading}
            </Text>)
            :station===14?(<Text style={style.Text}>
                {stationPrayeList[14].Header}
                {stationPrayeList[14].Leader}
                {stationPrayeList[14].Reading + '\n\n\n\n'}
                {stationPrayeList[15].Conclusion}
            </Text>)
           
                :null}
                <View style={{flexDirection:"row",alignSelf:"center"}}>

                {station>0?
            <TouchableHighlight style={style.Button} onPress={()=>{
                
                setStation(station-1)
                scrollTop();
                }
                }>
            <Text style={style.ButtonText}>{station==0?(""):station>0?("Previous"):"Begin"}</Text>
            </TouchableHighlight>
            :null}
            {station<14?
            
            <TouchableHighlight style={style.Button} onPress={()=>{
                
                setStation(station+1)
                scrollTop();
                }
                }>
            <Text style={style.ButtonText}>{station>0?"Next Station":"Begin"}</Text>
            </TouchableHighlight>
            :null}
            </View>
            </ScrollView>

            
        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    Text:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        top:0
    },
    Button:{
        marginTop:10,
        alignSelf:"center",
        marginLeft:5,
        backgroundColor:'green',
        borderRadius:15,
        width:100,
        height:50,
        justifyContent:"center",
        marginBottom:20
    },
    ButtonText:{
        textAlign:'center',
        color:'white'
    }
})
export default StationsOfTheCross;