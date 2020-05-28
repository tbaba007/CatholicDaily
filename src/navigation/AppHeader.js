import React from 'react';
import {View,StyleSheet,SafeAreaView,TouchableHighlight,Text} from 'react-native'
import {Icon,Header} from 'react-native-elements';

const AppHeader=(props)=>{


    function leftComponent()
{
    return (
        <SafeAreaView>
            <View style={style.Header}>
                <TouchableHighlight 
                onPress={props.navigation}
                underlayColor={style.menu.overlayColor}>
                <Icon name="menu"
                 color={style.menu.color}
                 size={40}
                />
                </TouchableHighlight>
          
            </View>
        </SafeAreaView>
    )
}
    return <Header
    leftComponent={leftComponent()}
    centerComponent={{ text: `${props.title}`, style: { color: '#fff' } }}
    containerStyle={{height:60,backgroundColor:'maroon'}}
    leftContainerStyle={{marginTop:-30}} centerContainerStyle={{marginTop:-30}} rightContainerStyle={{marginTop:-30}}/>

    
}

const style=StyleSheet.create({
    menu:{
        color:'white',
        overlayColor:'transparent'
    },
    Header:{
        backgroundColor:'maroon',
        flexDirection:"row",
        height:50
    },
    ModuleText:{
        textAlign:"center",
        color:"white"
    }
})
export default AppHeader;