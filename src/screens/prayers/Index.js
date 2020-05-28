import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,FlatList,StyleSheet,Text,TouchableHighlight} from 'react-native'
import {Avatar, Divider} from 'react-native-elements';
import NovenaList from './traditional/TraditionalList';
function Index(props) {
    const [selected,setSelected]=useState(0);
    const imagePath='../../assets/images/prayericons/';
    const prayerList=[
        {
            id:'1',
            name:'Traditional Prayers',
            icon:require(imagePath+'novenaicon.jpg')
        },
        {
            id:'2',
            name:'Holy Rosary',
            icon:require(imagePath+'commonprayericon.jpg')
        }
    ]

    const navigateMenu=(id)=>{
       // props.navigation.push(id==='1'?'NovenaList':'RosaryList',{name:id==='1'?'Traditional Prayers':'Holy Rosary'});
        props.navigation.push(id==='1'?'NovenaList':'RosaryOption',{name:id==='1'?'Traditional Prayers':'Holy Rosary'});
    }

    useEffect(()=>{
        setSelected(0);
       
    },[])

   
    return (
        
            
        <SafeAreaView>
           
                    <FlatList
                    data={prayerList}
                    renderItem={({item}) => (
                        <SafeAreaView>
                            <View style={{flexDirection:"row"}}>
                                <Avatar
                                 size={50}
                                 rounded
                                 source={item.icon}
                                 containerStyle={[style.Icon]}
                                 />
                                <TouchableHighlight
                                onPress={()=>{
                                    navigateMenu(item.id)
                                }} 
                                underlayColor="transparent">
                                <Text 
                                 style={style.Text}
                                 onPress={()=>{
                                     navigateMenu(item.id)
                                 }}>
                                     {item.name}
                                 </Text>
                                </TouchableHighlight>
                               
        
                                
                            </View>
                        </SafeAreaView>
                    )}
                    ItemSeparatorComponent={()=>{
                        return <Divider style={style.ItemSeparator}/>
                    }}
                    />
                   
            
           
        </SafeAreaView>
        
    )
}
const style=StyleSheet.create({
    Icon:{
        marginLeft:10,
        marginTop:10,
        borderColor:'maroon',
        borderWidth:2
       },
    ItemSeparator:{
        backgroundColor:'maroon',
        marginTop:10
    },
    Text:{
        marginLeft:10,
        marginTop:20
    },
    Avatar:
    {
        alignSelf:"center",
        marginTop:10,
        height:200,
        width:150,
        backgroundColor:'white'
    }
})
export default Index
