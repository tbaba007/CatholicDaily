import React,{useEffect} from 'react'
import {SafeAreaView,View,Text,StyleSheet,ScrollView} from 'react-native';
import AppHeader from '../../navigation/AppHeader';
function ShowHymn(props) {
    useEffect(()=>{
    },);
    return (
        
        <SafeAreaView>
            <View>
            <ScrollView>
            <Text style={style.HymnBody}>
           {props.route.params.Hymn}
            </Text>
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    HymnHeader:{
        textAlign:"center",
        fontWeight:"bold",
        marginTop:20
    },
    HymnBody:{
        marginLeft:40,
        fontWeight:"bold",
        marginBottom:300
    }
})
export default ShowHymn
