import React from 'react';
import {Text,
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    FlatList,
    TouchableHighlight} from 'react-native';
import {Icon, Divider,Avatar} from 'react-native-elements';
function Menu(props) {
    const imagePath='../assets/images/menuicons/';
    const appMenu=[
        {
            id:'0',
            name:'Home',
            icon:require(imagePath+'home.png')
        },
        {
            id:'1',
            name:'Prayers',
            icon:require(imagePath+'prayer.jpg')
        },
        {
            id:'2',
            name:'Daily Readings',
            icon:require(imagePath+'missal.jpg')
        },
        {
            id:'3',
            name:'Catholic Hymns',
            icon:require(imagePath+'hymnbook.png')
        },
        // {
        //     id:'4',
        //     name:'Stations of the Cross',
        //     icon:require(imagePath+'way_of_the_cross.jpg')
        // },
        // {
        //     id:'5',
        //     name:'Daily Reflection/Encourager',
        //     icon:require(imagePath+'encourager.jpg')
        // },
        {
            id:'6',
            name:'User Prefrences',
            icon: require(imagePath+'settings.png')
        },
        // {
        //     id:'7',
        //     name:'FAQ',
        //     icon: require(imagePath+'faq.png')
        // },
        // {
        //     id:'8',
        //     name:'About Catholic Daily',
        //     icon: require(imagePath+'aboutus.jpg')
        // },
      
        
    ]

    const navigateMenu=(menu)=>{
        props.router(menu.id)
    }
    return (
        <SafeAreaView>
            <FlatList
            data={appMenu}
            renderItem={({item}) => (
                <SafeAreaView>
                    <View style={{flexDirection:"row"}}>
                    <Avatar
                    source={item.icon}
                    rounded
                    size={40}
                    containerStyle={style.Icon}/>
                    
                 <TouchableHighlight onPress={()=>navigateMenu(item)} underlayColor="transparent">
                   
                    <Text style={style.Text}>
                    {item.name}
                    </Text>
                    </TouchableHighlight>
                    </View>
                    
                </SafeAreaView>
            )}
            ItemSeparatorComponent={()=>{
                return <Divider style={style.ItemSeparator}/>
            }}
            ListHeaderComponent={()=>{
               return (
                <Image
                source={require('../assets/images/catholicImage.png')}
                style={style.Avatar}
                />
               )
            }}
            ListFooterComponent={()=>{
                return (
                    <View style={{marginTop:50}}>

                    </View>
                )
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
        marginTop:20,
        fontFamily:'Foundation'
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
export default Menu
